import { describe, expect, it } from "vitest";
import { validateChatGptAuthConfig, validateRedirectUri } from "../chatgpt-auth";

const baseConfig = {
  issuer: "https://defrag.app",
  audience: "defrag-chatgpt-app",
  secret: "12345678901234567890123456789012",
  allowedRedirectOrigins: ["https://chatgpt.com", "https://chat.openai.com"],
  accessTokenTtlSeconds: 900,
  refreshTokenTtlSeconds: 2592000,
  authorizationCodeTtlSeconds: 300,
};

describe("chatgpt auth validation", () => {
  it("accepts exact allowed redirect origins", () => {
    expect(validateRedirectUri("https://chatgpt.com/callback", baseConfig.allowedRedirectOrigins)).toBe(
      "https://chatgpt.com/callback",
    );
  });

  it("rejects unapproved redirect origins", () => {
    expect(() =>
      validateRedirectUri("https://evil.example.com/callback", baseConfig.allowedRedirectOrigins),
    ).toThrow("redirect_origin_not_allowed");
  });

  it("rejects short auth secrets", () => {
    expect(() =>
      validateChatGptAuthConfig({
        ...baseConfig,
        secret: "too-short-secret",
      }),
    ).toThrow("auth_secret_too_short");
  });

  it("rejects invalid ttl ordering", () => {
    expect(() =>
      validateChatGptAuthConfig({
        ...baseConfig,
        accessTokenTtlSeconds: 3600,
        refreshTokenTtlSeconds: 300,
      }),
    ).toThrow("access_token_ttl_exceeds_refresh_token_ttl");
  });
});
