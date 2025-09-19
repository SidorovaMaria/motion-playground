"use client";
import React from "react";
import { MotionExampleProps } from "@/components/codeExamples/MotionExample";
import dynamic from "next/dynamic";
import LazyMount from "@/utils/LazyMount";

type CodeAndExampleProps = {
  codeText: string;
  motionProps: MotionExampleProps;
  className?: string;
};
const CodeHighliter = dynamic(() => import("@/components/codeExamples/CodeHighliter"), {
  ssr: false,
  loading: () => <div className="h-24 w-full animate-pulse rounded-md bg-foreground/5" />,
});
const MotionExample = dynamic(() => import("@/components/codeExamples/MotionExample"), {
  ssr: false,
  loading: () => <div className="h-24 w-full animate-pulse rounded-md bg-foreground/5" />,
});

const CodeAndExample = ({ codeText, motionProps, className }: CodeAndExampleProps) => {
  const { initial, animate, transition } = motionProps;
  return (
    <LazyMount
      className={`grid grid-cols-1 md:grid-cols-[2fr_1fr] items-center justify-between ${className}`}
    >
      <CodeHighliter>{codeText}</CodeHighliter>
      <MotionExample
        initial={initial}
        animate={animate}
        transition={transition}
        className="w-full"
      />
    </LazyMount>
  );
};

export default CodeAndExample;
