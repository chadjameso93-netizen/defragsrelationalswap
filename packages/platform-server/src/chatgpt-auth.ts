import { createHash } from "node:crypto";
import { jwtVerify, SignJWT } from "jose";

export interface ChatGptAuthConfig {
  issuer: string;
  audience: string;
  secret: string;
  allowedRedirectOrigins: string[];
  accessTokenTtlSeconds: number;
  refreshTokenTtlSeconds: number;
  authorizationCodeTtlSeconds: number;
}

export interface AuthorizationRequestInput {
  clientId: string;
  redirectUri: string;
  scopes: string[];
  codeChallenge: string;
  codeChallengeMethod: string;
  userId: string;
  email: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  scope: string;
}

export interface VerifiedAccessToken {
  userId: string;
  email?: string;
  clientId: string;
  scope: string[];
}

function assertSecret(secret: string) {
  if (secret.trim().length < 32) {
    throw new Error("auth_secret_too_short");
  }
}

function assertTokenLifetimes(config: ChatGptAuthConfig) {
  if (config.accessTokenTtlSeconds > config.refreshTokenTtlSeconds) {
    throw new Error("access_token_ttl_exceeds_refresh_token_ttl");
  }
  if (config.authorizationCodeTtlSeconds > config.accessTokenTtlSeconds) {
    throw new Error("authorization_code_ttl_exceeds_access_token_ttl");
  }
}

function key(secret: string) {
  assertSecret(secret);
  return new TextEncoder().encode(secret);
}

function base64UrlSha256(value: string) {
  return createHash("sha256").update(value).digest("base64url");
}

function normalizeScopes(scopes: string[]) {
  return Array.from(new Set(scopes.filter(Boolean))).sort();
}

export function parseScope(scope?: string | null) {
  return normalizeScopes((scope ?? "").split(/\s+/).filter(Boolean));
}

export function validateRedirectUri(redirectUri: string, allowedOrigins: string[]) {
  let url: URL;
  try {
    url = new URL(redirectUri);
  } catch {
    throw new Error("invalid_redirect_uri");
  }

  if (!allowedOrigins.includes(url.origin)) {
    throw new Error("redirect_origin_not_allowed");
  }

  return url.toString();
}

export function validateChatGptAuthConfig(config: ChatGptAuthConfig) {
  if (!config.issuer.startsWith("https://")) {
    throw new Error("issuer_must_be_https");
  }
  if (!config.audience.trim()) {
    throw new Error("missing_resource_audience");
  }
  if (config.allowedRedirectOrigins.length === 0) {
    throw new Error("missing_allowed_redirect_origins");
  }
  assertSecret(config.secret);
  assertTokenLifetimes(config);
}

export async function createAuthorizationCode(config: ChatGptAuthConfig, input: AuthorizationRequestInput) {
  validateChatGptAuthConfig(config);
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({
    typ: "authorization_code",
    client_id: input.clientId,
    redirect_uri: validateRedirectUri(input.redirectUri, config.allowedRedirectOrigins),
    scope: normalizeScopes(input.scopes).join(" "),
    code_challenge: input.codeChallenge,
    code_challenge_method: input.codeChallengeMethod,
    email: input.email,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(config.issuer)
    .setAudience(config.audience)
    .setSubject(input.userId)
    .setIssuedAt(now)
    .setExpirationTime(now + config.authorizationCodeTtlSeconds)
    .sign(key(config.secret));
}

export async function exchangeAuthorizationCode(
  config: ChatGptAuthConfig,
  input: {
    code: string;
    clientId: string;
    redirectUri: string;
    codeVerifier: string;
  },
) {
  validateChatGptAuthConfig(config);
  const { payload } = await jwtVerify(input.code, key(config.secret), {
    issuer: config.issuer,
    audience: config.audience,
  });

  if (payload.typ !== "authorization_code") {
    throw new Error("invalid_authorization_code");
  }

  if (payload.client_id !== input.clientId) {
    throw new Error("client_id_mismatch");
  }

  const redirectUri = validateRedirectUri(input.redirectUri, config.allowedRedirectOrigins);
  if (payload.redirect_uri !== redirectUri) {
    throw new Error("redirect_uri_mismatch");
  }

  if (payload.code_challenge_method !== "S256") {
    throw new Error("unsupported_code_challenge_method");
  }

  if (payload.code_challenge !== base64UrlSha256(input.codeVerifier)) {
    throw new Error("pkce_verification_failed");
  }

  return {
    userId: String(payload.sub),
    email: typeof payload.email === "string" ? payload.email : undefined,
    clientId: String(payload.client_id),
    scope: parseScope(typeof payload.scope === "string" ? payload.scope : ""),
  };
}

export async function createTokenPair(
  config: ChatGptAuthConfig,
  input: {
    userId: string;
    email?: string;
    clientId: string;
    scope: string[];
  },
): Promise<TokenPair> {
  validateChatGptAuthConfig(config);
  const now = Math.floor(Date.now() / 1000);
  const scope = normalizeScopes(input.scope).join(" ");

  const accessToken = await new SignJWT({
    typ: "access_token",
    client_id: input.clientId,
    scope,
    email: input.email,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(config.issuer)
    .setAudience(config.audience)
    .setSubject(input.userId)
    .setIssuedAt(now)
    .setExpirationTime(now + config.accessTokenTtlSeconds)
    .sign(key(config.secret));

  const refreshToken = await new SignJWT({
    typ: "refresh_token",
    client_id: input.clientId,
    scope,
    email: input.email,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(config.issuer)
    .setAudience(config.audience)
    .setSubject(input.userId)
    .setIssuedAt(now)
    .setExpirationTime(now + config.refreshTokenTtlSeconds)
    .sign(key(config.secret));

  return {
    accessToken,
    refreshToken,
    expiresIn: config.accessTokenTtlSeconds,
    scope,
  };
}

export async function exchangeRefreshToken(
  config: ChatGptAuthConfig,
  input: {
    refreshToken: string;
    clientId: string;
  },
) {
  validateChatGptAuthConfig(config);
  const { payload } = await jwtVerify(input.refreshToken, key(config.secret), {
    issuer: config.issuer,
    audience: config.audience,
  });

  if (payload.typ !== "refresh_token") {
    throw new Error("invalid_refresh_token");
  }

  if (payload.client_id !== input.clientId) {
    throw new Error("client_id_mismatch");
  }

  return createTokenPair(config, {
    userId: String(payload.sub),
    email: typeof payload.email === "string" ? payload.email : undefined,
    clientId: String(payload.client_id),
    scope: parseScope(typeof payload.scope === "string" ? payload.scope : ""),
  });
}

export async function verifyAccessToken(config: ChatGptAuthConfig, accessToken: string): Promise<VerifiedAccessToken> {
  validateChatGptAuthConfig(config);
  const { payload } = await jwtVerify(accessToken, key(config.secret), {
    issuer: config.issuer,
    audience: config.audience,
  });

  if (payload.typ !== "access_token") {
    throw new Error("invalid_access_token");
  }

  return {
    userId: String(payload.sub),
    email: typeof payload.email === "string" ? payload.email : undefined,
    clientId: String(payload.client_id),
    scope: parseScope(typeof payload.scope === "string" ? payload.scope : ""),
  };
}
