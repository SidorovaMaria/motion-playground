import React from "react";
import { motion } from "motion/react";
import { pre } from "motion/react-client";
import { revealToBottom } from "@/variants/TextVariants";
type TagProps = {
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  preview?: string;
};
const Tag = ({ text, icon, className, preview }: TagProps) => {
  const Icon = icon;
  return (
    <motion.div
      initial="hidden"
      whileHover="hovered"
      className={`inline-flex items-center px-4 py-2 bg-gradient-to-br from-background to-primary/50 border-none rounded-full text-foreground text-xs transition cursor-pointer hover:scale-[1.03] hover:brightness-110 active:scale-95 active:brightness-90 relative hover:z-50 z-10 group font-display ${className} `}
    >
      {Icon && <Icon className="mr-2 text-yellow-400 small-icon static" />}
      <h5 className="static z-10 max-w-sm">{text}</h5>
      {preview && (
        <motion.span
          variants={revealToBottom}
          className="absolute  left-5 right-5 bg-gradient-to-b from-background to-secondary text-foreground px-2 pt-1 pb-2 rounded-xl text-xs mt-2 top-full leading-relaxed z-50! pointer-events-none font-sans"
        >
          {preview}
        </motion.span>
      )}
    </motion.div>
  );
};

export default Tag;
