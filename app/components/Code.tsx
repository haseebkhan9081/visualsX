import React, { useState } from "react";
 
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula,vs2015,dark ,a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeHighlightProps {
  code: string;
  highlightedLines: number[];
}

const CodeHighlight: React.FC<CodeHighlightProps> = ({ code, highlightedLines }) => {
  const customStyle = (lineNumber: number): React.CSSProperties => ({
    background: highlightedLines.includes(lineNumber) ? "#ffe6e6" : "inherit",
  });

  return (
    <SyntaxHighlighter
      language="javascript"
      style={vs2015}
      wrapLines={true}
      showLineNumbers={true}
      lineProps={(lineNumber: number) => {
        const style: React.CSSProperties = { display: "block", width: "fit-content" };
        if (highlightedLines.includes(lineNumber)) {
          style.backgroundColor = "#B3E0FF";
        }
        return { style };
      }}
      className={"syntax-highlighter"} 
    >
      {code}
    </SyntaxHighlighter>
  );
};

 
export default CodeHighlight;