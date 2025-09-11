"use client";
import React from "react";
import { motion } from "motion/react";
import { QuickShimmer, revealSpanVariant, shimmerSpanVariant } from "@/variants/buttonVariants";

import { revealFromBottom } from "@/variants/TextVariants";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type PathCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  className?: string;
  link: string;
  accentColor?: string;
};
const PathCard = ({
  icon: Icon,
  title,
  description,
  className,
  link,
  accentColor,
}: PathCardProps) => {
  const accent = `[${accentColor}]` || ["foreground"];
  const router = useRouter();
  return (
    <motion.div
      role="directory"
      initial="rest"
      whileHover="hovered"
      whileFocus="hovered"
      animate="rest"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          router.push(link);
        }
      }}
      onClick={() => router.push(link)}
      style={{
        borderColor: accentColor ? `${accentColor}88` : "#fff",
      }}
      className={` backdrop-blur-sm rounded-2xl py-4 px-5 border-2 relative overflow-hidden cursor-pointer hover:scale-105 transition-all
            hover:box-shadow-[2px_2px_0px]
       ${className}`}
    >
      <motion.div
        className="flex items-center justify-center w-12 h-12 rounded-full mb-2 hover:brightness-110 "
        variants={{
          rest: { x: 0, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 40 } },
          hovered: {
            x: "270px",
            rotate: 360,
            transition: { type: "spring", stiffness: 100, damping: 40 },
          },
        }}
      >
        <Icon className={`text-${accentColor}`} />
      </motion.div>
      <motion.h3
        variants={{
          rest: { y: 0, transition: { type: "spring", stiffness: 100, damping: 40 } },
          hovered: { y: -50, transition: { type: "spring", stiffness: 100, damping: 40 } },
        }}
        className="text-xl font-display font-bold mb-2"
      >
        {title}
      </motion.h3>
      <motion.p
        variants={{
          rest: { y: 0, transition: { type: "spring", stiffness: 100, damping: 40 } },
          hovered: { y: -40, transition: { type: "spring", stiffness: 100, damping: 40 } },
        }}
        className="paragraph font-bold leading-relaxed"
      >
        {description}
      </motion.p>
      <motion.button
        tabIndex={-1}
        variants={{
          rest: {
            y: 0,
            height: 0,

            opacity: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 },
          },
          hovered: {
            y: -10,
            height: "40px",
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 },
          },
        }}
        className={`accent-button w-full group`}
        style={{
          //   backgroundColor: accentColor || "var(--color-secondary)",
          // Using CSS variable to handle dynamic accent color
          ...(accentColor && ({ "--accent-color": accentColor } as React.CSSProperties)),
        }}
      >
        <motion.p
          variants={{
            rest: {
              opacity: 0,
              transition: { type: "spring", stiffness: 100, damping: 10 },
            },
            hovered: {
              opacity: 1,
              transition: { type: "spring", stiffness: 100, damping: 10 },
            },
          }}
        >
          Learn More <ArrowRight className="inline-block icon bounce-right" />
        </motion.p>
      </motion.button>

      <motion.span
        className={`shimmer-element white-shimmer-light  `}
        variants={QuickShimmer}
      ></motion.span>
    </motion.div>
  );
};

export default PathCard;
