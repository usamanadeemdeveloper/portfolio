import ReactMarkdown from "react-markdown";
import { markdownComponents } from "@/app/lib/markdownComponents";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
  );
}
