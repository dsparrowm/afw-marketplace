"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before enter animation (seconds) */
  delay?: number;
};

/** Fade-up reveal when scrolled into view. Skips transforms under reduced motion. */
export function MotionReveal({
  children,
  className,
  delay = 0,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
