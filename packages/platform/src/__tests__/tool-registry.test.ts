import { describe, expect, it } from "vitest";
import { DEFRAG_TOOL_REGISTRY } from "../tool-registry";

type JsonSchema = {
  type?: string;
  required?: string[];
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
  oneOf?: JsonSchema[];
  anyOf?: JsonSchema[];
};

function validateAgainstSchema(value: unknown, schema: JsonSchema): boolean {
  if (schema.oneOf) {
    return schema.oneOf.some((candidate) => validateAgainstSchema(value, candidate));
  }

  if (schema.anyOf) {
    return schema.anyOf.some((candidate) => validateAgainstSchema(value, candidate));
  }

  if (!schema.type) {
    return true;
  }

  if (schema.type === "object") {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      return false;
    }

    const record = value as Record<string, unknown>;
    for (const key of schema.required ?? []) {
      if (!(key in record)) {
        return false;
      }
    }

    for (const [key, propertySchema] of Object.entries(schema.properties ?? {})) {
      if (key in record && !validateAgainstSchema(record[key], propertySchema)) {
        return false;
      }
    }

    return true;
  }

  if (schema.type === "array") {
    if (!Array.isArray(value)) {
      return false;
    }

    return schema.items ? value.every((item) => validateAgainstSchema(item, schema.items as JsonSchema)) : true;
  }

  if (schema.type === "string") {
    return typeof value === "string";
  }

  if (schema.type === "number") {
    return typeof value === "number";
  }

  if (schema.type === "boolean") {
    return typeof value === "boolean";
  }

  return true;
}

describe("DEFRAG tool registry", () => {
  it("defines every required future tool", () => {
    expect(Object.keys(DEFRAG_TOOL_REGISTRY).sort()).toEqual([
      "begin_upgrade_checkout",
      "generate_relationship_insight",
      "get_account_entitlements",
      "get_companion_guidance",
      "interpret_world_signal",
      "open_billing_portal",
    ]);
  });

  it("marks helper-only tools as redirect-only", () => {
    for (const entry of Object.values(DEFRAG_TOOL_REGISTRY)) {
      if (entry.helperOnly) {
        expect(entry.display.capability).toBe("redirect-only");
        expect(entry.redirectToWebsite).toBe(true);
      }
    }
  });

  it("keeps user-facing MVP tools explicit", () => {
    const userFacing = Object.values(DEFRAG_TOOL_REGISTRY)
      .filter((entry) => entry.userFacing)
      .map((entry) => entry.name)
      .sort();

    expect(userFacing).toEqual([
      "generate_relationship_insight",
      "get_account_entitlements",
      "get_companion_guidance",
      "interpret_world_signal",
    ]);
  });

  it("keeps examples aligned with registry schemas", () => {
    for (const entry of Object.values(DEFRAG_TOOL_REGISTRY)) {
      expect(validateAgainstSchema(entry.inputExample, entry.inputSchema as JsonSchema), `${entry.name} input example drifted from schema`).toBe(true);
      expect(validateAgainstSchema(entry.outputExample, entry.outputSchema as JsonSchema), `${entry.name} output example drifted from schema`).toBe(true);
    }
  });
});
