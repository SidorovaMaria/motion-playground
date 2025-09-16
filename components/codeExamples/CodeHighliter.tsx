import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
const CodeHighliter = ({ children, inline = false }: { children: string; inline?: boolean }) => {
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
        fontSize: 12,
        lineHeight: inline ? "22px" : "18px",
        fontWeight: inline ? 800 : 600,
        display: inline ? "inline" : "block",
      }}
      codeTagProps={{ style: { background: "transparent" } }}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeHighliter;
