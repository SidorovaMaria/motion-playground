import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
const CodeHighliter = ({
  children,
  inline = false,
  fontSize = 12,
  lineHeight = 18,
}: {
  children: string;
  inline?: boolean;
  fontSize?: number;
  lineHeight?: number;
}) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={nightOwl}
      customStyle={{
        borderRadius: 12,
        marginTop: inline ? 4 : 16,
        marginBottom: inline ? 4 : 16,
        marginLeft: inline ? 4 : 0,
        marginRight: 0,
        paddingLeft: inline ? 12 : 24,
        paddingTop: inline ? 4 : 16,
        paddingBottom: inline ? 4 : 16,
        background: "var(--color-code-block-bg)",
        fontSize: fontSize,
        lineHeight: inline ? "22px" : lineHeight + "px",
        fontWeight: inline ? 800 : 600,
        display: inline ? "inline" : "block",
      }}
      showLineNumbers={!inline}
      wrapLines={true}
      codeTagProps={{ style: { fontFamily: "Fira Code, monospace", fontSize: fontSize } }}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeHighliter;
