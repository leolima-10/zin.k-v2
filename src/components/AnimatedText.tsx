import { useRef, type CSSProperties } from "react";
import { Fragment } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

interface CharSpec {
  char: string;
  start: number;
  end: number;
}

/** fatia de progresso por caractere; espaços contam no índice pra manter fatias uniformes */
function buildWords(text: string): CharSpec[][] {
  const total = text.length;
  const words: CharSpec[][] = [];
  let index = 0;

  for (const word of text.split(" ")) {
    const chars: CharSpec[] = [];
    for (const char of word) {
      chars.push({
        char,
        start: index / total,
        end: Math.min(1, (index + 1) / total),
      });
      index += 1;
    }
    index += 1;
    words.push(chars);
  }
  return words;
}

function Char({
  char,
  start,
  end,
  progress,
}: CharSpec & { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

/**
 * reveal caractere a caractere guiado pelo scroll: cada letra sai de
 * opacity 0.2 e chega a 1 conforme a seção atravessa a viewport.
 * o texto integral fica em um span sr-only para leitores de tela.
 */
export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const words = buildWords(text);

  return (
    <p ref={ref} className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((chars, wordIndex) => (
          <Fragment key={wordIndex}>
            {wordIndex > 0 && " "}
            <span className="inline-block">
              {chars.map((spec, charIndex) => (
                <Char key={charIndex} {...spec} progress={scrollYProgress} />
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </p>
  );
}
