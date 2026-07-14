"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
};

export function MagneticButton({
  href,
  children,
  className,
  variant = "solid",
  onClick,
  type = "button",
  disabled,
  external,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const base =
    "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300";
  const variants = {
    solid: "bg-fg text-bg hover:bg-accent hover:text-bg",
    outline:
      "border border-border-strong text-fg hover:border-accent hover:text-accent bg-transparent",
    ghost: "text-fg hover:text-accent px-0 py-0",
  };

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  }

  function onLeave() {
    setPos({ x: 0, y: 0 });
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </motion.div>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block disabled:opacity-50">
      {content}
    </button>
  );
}
