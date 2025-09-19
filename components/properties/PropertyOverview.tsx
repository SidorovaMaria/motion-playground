/**
 * PropertyOverview — Renders one property’s docs card
 *
 * Inputs:
 * - description: markdowny string (supports backticks) -> rendered with `codeFromBackticks`.
 * - snippet: inline code sample string -> highlighted via <CodeHighliter/>.
 * - overview: array of rows; each row is either:
 *    { label, content }             // single-line fact
 *  or { label, contentArray: [...] } // bullet list of label/content pairs
 *
 * Behavior:
 * - Snippet is lazy-mounted via <LazyMount block="code"> to avoid heavy initial paint.
 * - “Quick Overview” renders label/value lines; if `contentArray` exists, shows nested list.
 *
 * A11y/UX:
 * - Uses semantic headings and lists; code inline uses `codeFromBackticks("…", "code-a")`.
 *
 * Assumptions:
 * - Only one of `content` or `contentArray` is present per overview row.
 */

import { PropertyOverviewItem } from "@/constants/transition-properties";
import LazyMount from "@/utils/LazyMount";
import { codeFromBackticks } from "@/utils/textFormat";
import dynamic from "next/dynamic";
import React from "react";

const CodeHighliter = dynamic(() => import("@/components/codeExamples/CodeHighliter"), {
  ssr: false,
  loading: () => <div className="h-24 w-full animate-pulse rounded-md bg-foreground/5" />,
});

const PropertyOverview = (overview: PropertyOverviewItem) => {
  const { description, snippet, overview: overviewItems } = overview;
  return (
    <div className="">
      <p className="paragraph">{codeFromBackticks(description)}</p>
      {/* Lazy-mount code block to keep initial paint light */}
      {snippet && (
        <LazyMount block="code">
          <CodeHighliter>{snippet}</CodeHighliter>
        </LazyMount>
      )}
      {overviewItems && (
        <>
          <h5 className="subheading text-lg my-2">Quick Overview</h5>
          <ul
            className="space-y-2 w-full [&>li>span]:font-display [&>li>span]:text-base props"
            aria-label={`Quick overview of ${overview.title} property`}
          >
            {overviewItems.map((element, i) => {
              // Each row may have `content`, `contentArray`, or both.
              // This is intentional: a row can display a one-liner summary and also expand with details.
              const hasContentArray =
                "contentArray" in element && Array.isArray(element.contentArray);
              const hasContent = "content" in element && typeof element.content === "string";

              return (
                <li key={`${element.label}-${i}`} className="">
                  <span>{element.label}:</span>
                  {hasContent && (
                    <p className="inline ml-2 text-sm">
                      {codeFromBackticks(element.content ?? "", "code-a")}
                    </p>
                  )}
                  {hasContentArray && (
                    <dl className="list-decimal list-inside p-2 text-sm props space-y-2">
                      {element.contentArray!.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          <span className="ml-1">
                            {item.label.length !== 0 && codeFromBackticks(item.label, "code-a")}{" "}
                            &#10142;
                          </span>{" "}
                          {codeFromBackticks(item.content, "code-a")}
                        </li>
                      ))}
                    </dl>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default PropertyOverview;
