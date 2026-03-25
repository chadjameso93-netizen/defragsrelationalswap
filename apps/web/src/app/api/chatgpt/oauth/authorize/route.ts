import { NextRequest, NextResponse } from "next/server";
import { createAuthorizationCode, type ChatGptAuthConfig, parseScope } from "../../../../../../../../packages/platform-server/src";
import { getAuthenticatedUserOrNull } from "../../../../../server/auth";
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

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const clientId = url.searchParams.get("client_id");
  const redirectUri = url.searchParams.get("redirect_uri");
  const state = url.searchParams.get("state");
  const codeChallenge = url.searchParams.get("code_challenge");
  const codeChallengeMethod = url.searchParams.get("code_challenge_method") ?? "S256";
  const scope = parseScope(url.searchParams.get("scope"));

  if (!clientId || !redirectUri || !state || !codeChallenge) {
    return NextResponse.json(
      { error: "invalid_request", error_description: "Missing OAuth authorization parameters." },
      { status: 400 },
    );
  }

  const user = await getAuthenticatedUserOrNull();
  if (!user) {
    const loginUrl = new URL("/login", getBaseAppEnv().NEXT_PUBLIC_APP_URL);
    loginUrl.searchParams.set("next", `${url.pathname}${url.search}`);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const code = await createAuthorizationCode(getAuthConfig(), {
      clientId,
      redirectUri,
      scopes: scope.length > 0 ? scope : ["defrag:read", "defrag:billing"],
      codeChallenge,
      codeChallengeMethod,
      userId: user.userId,
      email: user.email,
    });

    const redirect = new URL(redirectUri);
    redirect.searchParams.set("code", code);
    redirect.searchParams.set("state", state);
    return NextResponse.redirect(redirect);
  } catch (error) {
    return NextResponse.json(
      {
        error: "invalid_request",
        error_description:
          error instanceof Error ? error.message : "Unable to complete account linking.",
      },
      { status: 400 },
    );
  }
}
