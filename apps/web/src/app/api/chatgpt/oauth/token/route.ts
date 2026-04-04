import { NextRequest, NextResponse } from "next/server";
import {
  createTokenPair,
  exchangeAuthorizationCode,
  exchangeRefreshToken,
  type ChatGptAuthConfig,
} from "../../../../../../../../packages/platform-server/src";
import { getBaseAppEnv, getChatGptAuthEnv } from "../../../../../server/env";

function getAuthConfig(): ChatGptAuthConfig {
  const baseEnv = getBaseAppEnv();
  const authEnv = getChatGptAuthEnv();

  return {
    issuer: baseEnv.NEXT_PUBLIC_APP_URL,
    audience: authEnv.DEFRAG_CHATGPT_RESOURCE_AUDIENCE,
    secret: authEnv.DEFRAG_CHATGPT_AUTH_SECRET,
    allowedRedirectOrigins: authEnv.DEFRAG_CHATGPT_ALLOWED_REDIRECT_ORIGINS,
    accessTokenTtlSeconds: authEnv.DEFRAG_CHATGPT_ACCESS_TOKEN_TTL_SECONDS,
    refreshTokenTtlSeconds: authEnv.DEFRAG_CHATGPT_REFRESH_TOKEN_TTL_SECONDS,
    authorizationCodeTtlSeconds: authEnv.DEFRAG_CHATGPT_AUTH_CODE_TTL_SECONDS,
  };
}

async function parseBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = (await request.json()) as Record<string, unknown>;
    return {
      grantType: typeof json.grant_type === "string" ? json.grant_type : "",
      code: typeof json.code === "string" ? json.code : "",
      clientId: typeof json.client_id === "string" ? json.client_id : "",
      redirectUri: typeof json.redirect_uri === "string" ? json.redirect_uri : "",
      codeVerifier: typeof json.code_verifier === "string" ? json.code_verifier : "",
      refreshToken: typeof json.refresh_token === "string" ? json.refresh_token : "",
    };
  }

  const params = new URLSearchParams(await request.text());
  return {
    grantType: params.get("grant_type") ?? "",
    code: params.get("code") ?? "",
    clientId: params.get("client_id") ?? "",
    redirectUri: params.get("redirect_uri") ?? "",
    codeVerifier: params.get("code_verifier") ?? "",
    refreshToken: params.get("refresh_token") ?? "",
  };
}

export async function POST(request: NextRequest) {
  const body = await parseBody(request);
  const config = getAuthConfig();

  try {
    if (body.grantType === "authorization_code") {
      const exchange = await exchangeAuthorizationCode(config, {
        code: body.code,
        clientId: body.clientId,
        redirectUri: body.redirectUri,
        codeVerifier: body.codeVerifier,
      });

      const tokens = await createTokenPair(config, exchange);
      return NextResponse.json({
        token_type: "Bearer",
        access_token: tokens.accessToken,
        expires_in: tokens.expiresIn,
        refresh_token: tokens.refreshToken,
        scope: tokens.scope,
      });
    }

    if (body.grantType === "refresh_token") {
      const tokens = await exchangeRefreshToken(config, {
        refreshToken: body.refreshToken,
        clientId: body.clientId,
      });

      return NextResponse.json({
        token_type: "Bearer",
        access_token: tokens.accessToken,
        expires_in: tokens.expiresIn,
        refresh_token: tokens.refreshToken,
        scope: tokens.scope,
      });
    }

    return NextResponse.json(
      { error: "unsupported_grant_type", error_description: "Only authorization_code and refresh_token are supported." },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "invalid_grant",
        error_description: error instanceof Error ? error.message : "Token exchange failed.",
      },
      { status: 400 },
    );
  }
}
