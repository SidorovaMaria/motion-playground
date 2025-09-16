import React, { ReactNode } from "react";
import CodeHighliter from "../codeExamples/CodeHighliter";
import PropertyShowcase from "./PropertyShowcase";
type overviewItem = {
  label: string;
  content: ReactNode;
};
type Props = {
  id: string;
  title: string;
  description: ReactNode;
  snippet: string;
  overview: overviewItem[];
  examples: ReactNode;
  defaultOpenExamples?: boolean;
};
const TransitionPropertySection = ({
  id,
  title,
  description,
  snippet,
  overview,
  examples,
  defaultOpenExamples = false,
}: Props) => {
  return (
    <section id={id} className="bordered-section">
      <h2 className="heading mb-2">{title}</h2>
      <p className="paragraph">{description}</p>
      {snippet && (
        <div className="code-block">
          <CodeHighliter>{snippet}</CodeHighliter>
        </div>
      )}
      {overview.length > 0 && (
        <>
          <h5 className="subheading text-lg my-2">Quick Overview</h5>
          <ul className="space-y-2 py-1 w-full [&>li>span]:font-display [&>li>span]:text-base props ">
            {overview.map((item, i) => (
              <li key={i}>
                <span>{item.label}:</span> {item.content}
              </li>
            ))}
          </ul>
        </>
      )}
      {examples && (
        <PropertyShowcase
          id={`${id}-examples`}
          defaultOpen={defaultOpenExamples}
          examples={examples}
        />
      )}
    </section>
  );
};

export default TransitionPropertySection;
