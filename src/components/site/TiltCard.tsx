import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Springy 3D tilt that follows the pointer across the surface, plus a soft
 * light glare that tracks the cursor. Disabled under prefers-reduced-motion.
 */
export function TiltCard({
  children,
  className,
  intensity = 7,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const config = { stiffness: 150, damping: 20, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), config);
  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), config);

  const glareX = useTransform(px, [0, 1], [18, 82]);
  const glareY = useTransform(py, [0, 1], [12, 88]);
  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12), transparent 62%)`;

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
    >
      {children}
      {glare && !reduce ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          style={{ background: glareBackground }}
        />
      ) : null}
    </motion.div>
  );
}
