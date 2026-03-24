interface BaseAppEnv {
  NEXT_PUBLIC_APP_URL: string;
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
