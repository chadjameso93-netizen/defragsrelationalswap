import type { ProviderId } from "./provider";

export type RouteResult =
  | {
      status: "ok";
      provider: ProviderId;
      reason: string;
    }
  | {
      status: "no-route";
      reason: string;
    };
