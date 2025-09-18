"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
function SectionCard({
  title,
  summary,
  children,
  defaultOpen = false,
  id,
}: {
  title: string;
  summary?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.section
      id={id}
      whileInView={{ opacity: [0, 1], y: [50, 0] }}
      aria-label={title}
      className="mt-12 max-w-4xl mx-auto bg-background-muted p-6 border-l-4 border-accent/70 rounded-lg rounded-l-none"
    >
      <h2 className="heading">{title}</h2>
      <div className="code-block"></div>
      {children}
    </motion.section>
  );
}
