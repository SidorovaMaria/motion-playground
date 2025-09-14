import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
const CodeHighliter = ({ children }: { children: string }) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={nightOwl}
      customStyle={{
        borderRadius: 12,
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 24,
        paddingTop: 16,
        paddingBottom: 16,
        background: "var(--color-code-block-bg)",
        fontSize: 12,
        lineHeight: "18px",
      }}
      codeTagProps={{ style: { background: "transparent" } }}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeHighliter;
