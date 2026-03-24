import Stripe from "stripe";
import { getStripeServerEnv } from "../server/env";

let stripeClient: Stripe | null = null;

export function getStripeServerClient(): Stripe {
  const env = getStripeServerEnv();

  if (!stripeClient) {
    stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
    });
  }

  return stripeClient;
}
