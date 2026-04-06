import { describe, expect, it } from "vitest";
import { buildAnnotations } from "../core/buildAnnotations";
import { buildRewrite } from "../core/buildRewrite";
import { buildScene } from "../core/buildScene";
import { sampleDynamic } from "../fixtures/sampleDynamic";
import { royalHierarchyGrammar } from "../grammars/royalHierarchy";
import { invisibleLaborGrammar } from "../grammars/invisibleLabor";

describe("story canvas scene builders", () => {
  it("buildScene is deterministic for the same input", () => {
    const first = buildScene(sampleDynamic, royalHierarchyGrammar);
    const second = buildScene(sampleDynamic, royalHierarchyGrammar);

    expect(first).toEqual(second);
  });

  it("defaults to plain lens and supports plain + cinematic", () => {
    const scene = buildScene(sampleDynamic, royalHierarchyGrammar);

    expect(scene.lens).toBe("plain");
    expect(scene.availableLenses).toEqual(["plain", "cinematic"]);
    expect(scene.context.relationshipLabel).toBe(sampleDynamic.relationshipLabel);
    expect(scene.plainLanguageOverlay).toContain(scene.context.sharedGoal);
  });

  it("annotation and rewrite outputs stay constructive and anti-stigma", () => {
    const scene = buildScene(sampleDynamic, royalHierarchyGrammar, { lens: "cinematic" });
    const annotations = buildAnnotations(scene);
    const rewrites = buildRewrite(scene, annotations);

    expect(annotations.length).toBeGreaterThan(0);
    expect(rewrites.length).toBe(annotations.length);

    const banned = [/villain/i, /humiliat/i, /manipulat/i, /diagnos/i];

    for (const annotation of annotations) {
      expect(annotation.constructive).toBe(true);
      expect(annotation.message.toLowerCase()).toContain("dignity");
      expect(annotation.message.toLowerCase()).toContain("concrete");
      for (const rule of banned) {
        expect(annotation.message).not.toMatch(rule);
      }
    }

    for (const rewrite of rewrites) {
      expect(rewrite.rationale.toLowerCase()).toContain("non-diagnostic");
      expect(rewrite.after.toLowerCase()).toContain("i want us to move toward");
      for (const rule of banned) {
        expect(rewrite.after).not.toMatch(rule);
      }
    }
  });

  it("grammar-specific flavors stay differentiated for the same input", () => {
    const royalScene = buildScene(sampleDynamic, royalHierarchyGrammar);
    const laborScene = buildScene(sampleDynamic, invisibleLaborGrammar);

    expect(royalScene.beats[0]?.selectedOverlay).not.toEqual(laborScene.beats[0]?.selectedOverlay);
    expect(royalScene.beats[0]?.selectedOverlay.toLowerCase()).toContain("role pressure");
    expect(laborScene.beats[0]?.selectedOverlay.toLowerCase()).toContain("unseen");
  });
});
