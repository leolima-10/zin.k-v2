import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import type { ComponentType, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  as?: "div" | "nav" | "h1" | "h2" | "p" | "span" | "section";
  className?: string;
  id?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

type MotionElementProps = MotionProps & {
  children?: ReactNode;
  className?: string;
  id?: string;
};

const motionTags = new Map<string, ComponentType<MotionElementProps>>();

function motionTag(tag: NonNullable<FadeInProps["as"]>) {
  let Element = motionTags.get(tag);
  if (!Element) {
    Element = motion.create(tag) as ComponentType<MotionElementProps>;
    motionTags.set(tag, Element);
  }
  return Element;
}

/**
 * fade-in ao entrar na viewport; deslocamento inicial desligado
 * quando o usuário prefere menos movimento.
 */
export function FadeIn({
  children,
  as = "div",
  className,
  id,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  const reduce = useReducedMotion();
  const Element = motionTag(as);

  return (
    <Element
      className={className}
      id={id}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Element>
  );
}
