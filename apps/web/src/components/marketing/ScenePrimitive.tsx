import type { ReactNode } from "react";

type SceneTone = "dark" | "mist" | "ember";
type ScenePace = "linger" | "steady" | "quick";
type SceneAlign = "left" | "center" | "split";

interface ScenePrimitiveProps {
  id?: string;
  label: string;
  title: string;
  description?: string;
  tone?: SceneTone;
  pace?: ScenePace;
  align?: SceneAlign;
  children?: ReactNode;
}

export function ScenePrimitive({
  id,
  label,
  title,
  description,
  tone = "dark",
  pace = "steady",
  align = "left",
  children,
}: ScenePrimitiveProps) {
  return (
    <section id={id} className={`mk-scene mk-scene--${tone} mk-scene--${pace} mk-scene--${align}`}>
      <div className="mk-scene__head">
        <div className="mk-scene__label">{label}</div>
        <h2 className="mk-scene__title">{title}</h2>
        {description ? <p className="mk-scene__description">{description}</p> : null}
      </div>
      {children ? <div className="mk-scene__body">{children}</div> : null}
    </section>
  );
}
