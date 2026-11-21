import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";

export function Markdown({ source }: { source: string }) {
  return (
    <div className="prose-lesson">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { strict: false, throwOnError: false }], [rehypeHighlight, { detect: false }]]}
        components={{
          // Đoạn code ngắn dạng /.../ hoặc [...] được coi là phiên âm IPA: dùng font riêng, không hiện như code.
          code({ className, children, ...rest }) {
            const text = typeof children === "string" ? children : "";
            if (!className && /^[\/\[][\s\S]+[\/\]]$/.test(text) && !text.includes("\n")) {
              return <span className="ipa">{text}</span>;
            }
            return (
              <code className={className} {...rest}>
                {children}
              </code>
            );
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
