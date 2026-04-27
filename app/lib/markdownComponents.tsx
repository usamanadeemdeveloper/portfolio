import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="text-3xl sm:text-4xl font-bold text-white mt-8 mb-4 tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold text-white mt-8 mb-4">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-white/70 text-lg leading-relaxed mb-6">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-3 text-white/70 mb-6">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-3 text-white/70 mb-6">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="text-white/70">{children}</li>,
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-6 italic text-white/60 my-8">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-white/10 my-8" />,
  code: ({ children }) => (
    <code className="bg-white/10 text-blue-300 px-2 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
};
