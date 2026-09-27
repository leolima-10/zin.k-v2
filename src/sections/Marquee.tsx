import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { projects } from "../data/projects";

/** imagens locais da zin.k até termos previews animados próprios. */
const GIFS = Array.from(
  { length: 21 },
  (_, index) => projects[index % projects.length].cover,
);

const ROW_1 = GIFS.slice(0, 11);
const ROW_2 = GIFS.slice(11);

function Tile({ url }: { url: string }) {
  return (
    <img
      src={url}
      alt=""
      loading="lazy"
      decoding="async"
      className="h-[200px] w-[310px] shrink-0 rounded-2xl border border-white/10 object-cover sm:h-[270px] sm:w-[420px]"
    />
  );
}

/**
 * duas fileiras de prévias que deslizam horizontalmente conforme o
 * scroll: a primeira vai para a direita, a segunda para a esquerda.
 */
export function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const section = sectionRef.current;
    if (!section) return;

    let sectionTop = 0;
    let raf = 0;

    const update = () => {
      raf = 0;
      const offset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3 - 200;
      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${offset}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-offset}px)`;
      }
    };

    const measure = () => {
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      update();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      ref={sectionRef}
      aria-hidden="true"
      className="relative pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-center">
          <div
            ref={row1Ref}
            className="flex w-max gap-3"
            style={{ willChange: "transform" }}
          >
            {[...ROW_1, ...ROW_1, ...ROW_1].map((url, i) => (
              <Tile key={i} url={url} />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div
            ref={row2Ref}
            className="flex w-max gap-3"
            style={{ willChange: "transform" }}
          >
            {[...ROW_2, ...ROW_2, ...ROW_2].map((url, i) => (
              <Tile key={i} url={url} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
