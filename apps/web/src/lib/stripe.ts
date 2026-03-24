import Stripe from "stripe";
import { getAppEnv } from "../server/env";

let stripeClient: Stripe | null = null;

export function getStripeServerClient(): Stripe {
  const env = getAppEnv();

  if (!stripeClient) {
    stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
    });
  }

  return stripeClient;
}
