import type { CSSProperties } from "react";

const CIRCLES = [
  { x: 0.5, y: 0.5, tone: "purple" as const },
  { x: 13.5, y: 1, tone: "cream" as const },
  { x: 0.5, y: 3, tone: "cream" as const },
  { x: 13.5, y: 4, tone: "purple" as const },
  { x: 0.5, y: 6.5, tone: "cream" as const },
  { x: 13.5, y: 7, tone: "cream" as const },
];

/** fundo decorativo — coloque dentro de um container com position: relative e overflow: hidden */
export function Pattern({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`zk-pattern ${className}`}>
      {CIRCLES.map((c, i) => (
        <span
          key={i}
          className={`zk-circle zk-circle--${c.tone}`}
          style={{ "--x": c.x, "--y": c.y } as CSSProperties}
        />
      ))}
    </div>
  );
}