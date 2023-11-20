import { createElement, ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeElementProps {
  node: {
    properties: {
      className: string[];
    };
    type: string;
    tagName: string;
    value: string;
    children: any[];
  };
  style: any; // Adjust the type based on your actual style object
  useInlineStyles: boolean;
  key: string;
  line: number;
}

function createStyleObject(classNames: string[], style: any): any {
  return classNames.reduce((styleObject, className) => {
    return { ...styleObject, ...style[className] };
  }, {});
}

function createClassNameString(classNames: string[]): string {
  return classNames.join(' ');
}

function createChildren(
  style: any, // Adjust the type based on your actual style object
  useInlineStyles: boolean
): (children: any[]) => ReactNode[] {
  let childrenCount = 0;
  return (children) => {
    childrenCount += 1;
    return children.map((child, i) =>
      createElement({
        node: child,
        style,
        useInlineStyles,
        key: `code-segment-${childrenCount}-${i}`,
        line: childrenCount,
      })
    );
  };
}

function createElement({
    node,
    style,
    useInlineStyles,
    key,
    line,
  }: CodeElementProps): ReactNode {
    const { properties, type, tagName, value, children } = node;
  
    if (type === 'text') {
      return value;
    } else if (tagName) {
      const TagName = tagName;
      const childrenCreator = createChildren(style, useInlineStyles);
      const props = useInlineStyles
        ? { style: createStyleObject(properties.className, style) }
        : { className: createClassNameString(properties.className) };
  
      // Ensure children is an array before mapping
      const childNodes = Array.isArray(children) ? children : [children];
  
      const renderedChildren = childrenCreator(childNodes);
  
      return (
        <TagName key={key} {...props}>
          <span className="line-number">{line}</span>
          {renderedChildren}
        </TagName>
      );
    }
  }

function CodeDisplay(): JSX.Element {
  // Your code
  const codeText = `
    function helloWorld() {
      console.log("Hello, World!");  // Highlight this line
    }
    
    for (let i = 0; i < 5; i++) {
      console.log(i);
    }
  `;

  const customStyle = {
    background: '#444',
    display: 'block',
    paddingLeft: '10px',
    borderLeft: '3px solid #ffcc00',
  };

  return (
    <SyntaxHighlighter language="javascript" style={dark}>
      {[codeText].split('\n').map((line, index) => (
        <div key={index} style={customStyle}>
          {line}
        </div>
      ))}
    </SyntaxHighlighter>
  );
}

export default CodeDisplay;
