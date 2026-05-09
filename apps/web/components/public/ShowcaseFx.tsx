"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function Marquee({
  items,
  speed = 34,
  className = ""
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const track = [...items, ...items, ...items];

  return (
    <div className={`marquee ${className}`} style={{ ["--marquee-speed" as string]: `${speed}s` }}>
      <div className="marquee-track">
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function RotatingWord({ words }: { words: string[] }) {
  return (
    <span className="rotating-word" aria-label={words.join(", ")}>
      {words.map((word, index) => (
        <span key={word} style={{ ["--word-index" as string]: index }}>
          {word}
        </span>
      ))}
    </span>
  );
}

export function FloatingPreview({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 36, rotateX: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      whileHover={reduceMotion ? undefined : { y: -8, rotateX: 1.5, rotateY: -2 }}
    >
      {children}
    </motion.div>
  );
}
