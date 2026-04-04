interface BaseAppEnv {
  NEXT_PUBLIC_APP_URL: string;
  DEFRAG_MCP_APP_URL?: string;
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

interface StripeServerEnv {
  STRIPE_SECRET_KEY: string;
}

interface StripeWebhookEnv extends StripeServerEnv {
  STRIPE_WEBHOOK_SECRET: string;
}

interface ChatGptAuthEnv {
  DEFRAG_CHATGPT_AUTH_SECRET: string;
  DEFRAG_CHATGPT_RESOURCE_AUDIENCE: string;
  DEFRAG_CHATGPT_ALLOWED_REDIRECT_ORIGINS: string[];
  DEFRAG_CHATGPT_ACCESS_TOKEN_TTL_SECONDS: number;
  DEFRAG_CHATGPT_REFRESH_TOKEN_TTL_SECONDS: number;
  DEFRAG_CHATGPT_AUTH_CODE_TTL_SECONDS: number;
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export function getBaseAppEnv(): BaseAppEnv {
  return {
    NEXT_PUBLIC_APP_URL: required("NEXT_PUBLIC_APP_URL"),
    DEFRAG_MCP_APP_URL: process.env.DEFRAG_MCP_APP_URL?.trim() || undefined,
    NEXT_PUBLIC_SUPABASE_URL: required("NEXT_PUBLIC_SUPABASE_URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: required("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    SUPABASE_SERVICE_ROLE_KEY: required("SUPABASE_SERVICE_ROLE_KEY"),
  };
}

export function getStripeServerEnv(): StripeServerEnv {
  return {
    STRIPE_SECRET_KEY: required("STRIPE_SECRET_KEY"),
  };
}

export function getStripeWebhookEnv(): StripeWebhookEnv {
  return {
    ...getStripeServerEnv(),
    STRIPE_WEBHOOK_SECRET: required("STRIPE_WEBHOOK_SECRET"),
  };
}

function integer(name: string, fallback: number): number {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid integer env var: ${name}`);
  }

  return parsed;
}

export function getChatGptAuthEnv(): ChatGptAuthEnv {
  return {
    DEFRAG_CHATGPT_AUTH_SECRET: required("DEFRAG_CHATGPT_AUTH_SECRET"),
    DEFRAG_CHATGPT_RESOURCE_AUDIENCE:
      process.env.DEFRAG_CHATGPT_RESOURCE_AUDIENCE?.trim() || "defrag-chatgpt-app",
    DEFRAG_CHATGPT_ALLOWED_REDIRECT_ORIGINS: required("DEFRAG_CHATGPT_ALLOWED_REDIRECT_ORIGINS")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    DEFRAG_CHATGPT_ACCESS_TOKEN_TTL_SECONDS: integer(
      "DEFRAG_CHATGPT_ACCESS_TOKEN_TTL_SECONDS",
      900,
    ),
    DEFRAG_CHATGPT_REFRESH_TOKEN_TTL_SECONDS: integer(
      "DEFRAG_CHATGPT_REFRESH_TOKEN_TTL_SECONDS",
      60 * 60 * 24 * 30,
    ),
    DEFRAG_CHATGPT_AUTH_CODE_TTL_SECONDS: integer(
      "DEFRAG_CHATGPT_AUTH_CODE_TTL_SECONDS",
      300,
    ),
  };
}
