import { describe, expect, it } from "vitest";
import { storyCanvasGrammarRegistry } from "../index";

const BANNED = [/villain/i, /humiliat/i, /manipulat/i, /diagnos/i];

describe("story canvas grammar registry", () => {
  it("includes all six required grammars", () => {
    expect(Object.keys(storyCanvasGrammarRegistry).sort()).toEqual([
      "cursedHouse",
      "exileAndReturn",
      "invisibleLabor",
      "maskedProtector",
      "repeatingTriangle",
      "royalHierarchy",
    ]);
  });

  it("keeps grammar copy policy-safe", () => {
    for (const grammar of Object.values(storyCanvasGrammarRegistry)) {
      for (const template of grammar.beatTemplates) {
        const combined = `${grammar.intent} ${template.plainOverlayTemplate} ${template.cinematicOverlayTemplate}`;
        for (const banned of BANNED) {
          expect(combined).not.toMatch(banned);
        }
      }
    }
  });
});
