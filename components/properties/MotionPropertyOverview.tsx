import { MotionProp } from "@/constants/motion-components-props";
import React from "react";
import InViewArticle from "../pageFormat/InViewArticle";
import LazyMount from "@/utils/LazyMount";
import dynamic from "next/dynamic";
import { codeFromBackticks } from "@/utils/textFormat";
import InViewSection from "../pageFormat/InViewSection";

const CodeHighliter = dynamic(() => import("@/components/codeExamples/CodeHighliter"), {
  ssr: false,
  loading: () => <div className="h-24 w-full animate-pulse rounded-md bg-foreground/5" />,
});
const MotionPropertyOverview = ({ overview }: { overview: MotionProp }) => {
  const { id, title, whyMatters, tips_and_notes, when } = overview;
  const { coreProps } = overview;
  const articleInsideClassName =
    "[&>h3]:text-base [&>h3]:text-primary! [&>h3]:pb-2 [&>h3]:border-b-2 [&>h3]:w-full pb-2 [&>h3]:border-foreground/20!";
  return (
    <InViewSection
      id={id}
      defaultOpen={false}
      className="bg-background [&>button>h2]:text-lg! [&>button]:py-4 '[&>div>div]:bg-red-500! border-2! border-foreground/20! rounded-xl!"
      contentClassName="pt-2! pb-0!"
      title="Learn More: core, when, tips, why"
    >
      {coreProps && (
        <InViewArticle
          title={'Core Properties of "' + title + '"'}
          ariaLabelledBy={`${id}-core-props`}
          id={`${id}-core-props`}
          className={articleInsideClassName}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
            <LazyMount block="code">
              <CodeHighliter>{overview.snippet}</CodeHighliter>
            </LazyMount>
            <ul className="space-y-2 " aria-label={`Quick overview of ${overview.title} property`}>
              {coreProps.map((prop) => (
                <li key={prop.label}>
                  <span className="font-display text-sm text-accent">{prop.label}:</span>
                  {prop.content && (
                    <p className="text-sm italic text-foreground  paragraph ">
                      {codeFromBackticks(prop.content, "code-a")}
                    </p>
                  )}
                  {prop.contentArray && (
                    <ol className="list-decimal list-inside p-2 text-sm tracking-[0.015rem] italic  space-y-2">
                      {prop.contentArray.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          <span className="ml-1 text-xs text-accent font-display">
                            {item.label.length !== 0 && codeFromBackticks(item.label, "code-a")}{" "}
                            &#10142;{" "}
                          </span>{" "}
                          {codeFromBackticks(item.content, "code-a")}
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </InViewArticle>
      )}
      {whyMatters && (
        <InViewArticle
          title={`Why "${title}" matters`}
          ariaLabelledBy={`${id}-why-it-matters`}
          id={`${id}-why-it-matters`}
          className={articleInsideClassName}
        >
          <ul
            aria-label={`Why ${overview.title} matters`}
            className="space-y-2 w-full [&>li>span]:font-display [&>li>span]:text-base props"
          >
            {whyMatters.map((item, idx) => (
              <li key={idx}>
                <span className="text-sm! capitalize">{item.label} </span> &#10142;
                <p className="inline ml-2 text-sm">
                  {item.content && codeFromBackticks(item.content, "code-a")}
                </p>
              </li>
            ))}
          </ul>
        </InViewArticle>
      )}
      {tips_and_notes && (
        <InViewArticle
          id={`${id}-tips-and-notes`}
          title={`Tips and Tricks for "${title}"`}
          ariaLabelledBy={`${id}-tips-and-notes`}
          className={articleInsideClassName}
        >
          <ul
            aria-label={`Why ${overview.title} matters`}
            className="space-y-1 w-full [&>li>span]:font-display [&>li>span]:text-base props"
          >
            {tips_and_notes.map((item, idx) => (
              <li key={idx}>
                <span className="text-sm! capitalize">{item.label} &#10142;</span>{" "}
                <p className="inline ml-2 text-sm">
                  {item.content && codeFromBackticks(item.content, "code-a")}
                </p>
              </li>
            ))}
          </ul>
        </InViewArticle>
      )}
      {when && (
        <InViewArticle
          id={`${id}-when-to-use`}
          title={`When to Use "${title}"`}
          ariaLabelledBy={`${id}-when-to-use`}
          className={articleInsideClassName}
        >
          <ul
            aria-label={`When to use ${overview.title}`}
            className="space-y-1 w-full [&>li>span]:font-display [&>li>span]:text-base props"
          >
            {when.map((item, idx) => (
              <li key={idx}>
                <span className="text-sm! capitalize">{item.label} &#10142;</span>{" "}
                <p className="inline ml-2 text-sm">
                  {item.content && codeFromBackticks(item.content, "code-a")}
                </p>
              </li>
            ))}
          </ul>
        </InViewArticle>
      )}
    </InViewSection>
  );
};

export default MotionPropertyOverview;
