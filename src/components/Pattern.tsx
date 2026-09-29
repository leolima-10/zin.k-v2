import type { CSSProperties } from "react";

const CIRCLES = [
  { x: 8, y: 0, tone: "purple" as const },
  { x: 1, y: 1, tone: "cream" as const },
  { x: 10, y: 2, tone: "cream" as const },
  { x: 3, y: 4, tone: "purple" as const },
  { x: 9, y: 5, tone: "cream" as const },
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