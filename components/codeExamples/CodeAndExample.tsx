import React from "react";
import CodeHighliter from "./CodeHighliter";
import MotionExample, { MotionExampleProps } from "./MotionExample";

type CodeAndExampleProps = {
  codeText: string;
  motionProps: MotionExampleProps;
};
const CodeAndExample = ({ codeText, motionProps }: CodeAndExampleProps) => {
  const { initial, animate, transition } = motionProps;
  return (
    <div className="grid grid-cols-[2fr_1fr] items-center justify-between">
      <CodeHighliter>{codeText}</CodeHighliter>
      <MotionExample initial={initial} animate={animate} transition={transition} />
    </div>
  );
};

export default CodeAndExample;
