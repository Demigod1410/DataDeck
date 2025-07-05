
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShineBorderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
  className?: string;
  children: React.ReactNode;
}

const ShineBorder = ({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#fff",
  className,
  children,
  ...props
}: ShineBorderProps) => {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
          "--border-width": `${borderWidth}px`,
          "--shine-color": Array.isArray(color) ? color.join(",") : color,
          "--animation-duration": `${duration}s`,
          padding: `${borderWidth}px`,
        } as React.CSSProperties
      }
      {...props}
      className={cn(
        "relative group",
        "bg-[linear-gradient(110deg,transparent,var(--shine-color),transparent)] bg-[length:200%_100%]",
        "animate-shine",
        "rounded-[var(--border-radius)]",
        className
      )}
    >
      <div
        className="h-full w-full bg-card"
        style={{
          borderRadius: `calc(var(--border-radius) - var(--border-width))`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ShineBorder;
