import React from "react";
import ReactMarkdown from "react-markdown";
import { Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.2), rgba(124,58,237,0.2))", border: "1px solid rgba(212,175,55,0.3)" }}>
          <Moon className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>
      )}
      <div className={cn("max-w-[85%]", isUser && "flex flex-col items-end")}>
        <div className={cn(
          "rounded-2xl px-4 py-3",
          isUser
            ? "bg-[#7c3aed]/30 text-[#f5f0ff] text-sm"
            : "bg-[#1a0533]/60 border border-[#d4af37]/15 text-[#e2dcff]"
        )}>
          {isUser ? (
            <p className="text-sm">{message.content}</p>
          ) : (
            <>
              <p className="text-xs text-[#d4af37] mb-1.5" style={{ fontFamily: "'Cinzel', serif" }}>Dream Oracle</p>
              <ReactMarkdown
                className="text-sm prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                components={{
                  p: ({ children }) => <p className="my-1 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="my-1 ml-4 list-disc">{children}</ul>,
                  ol: ({ children }) => <ol className="my-1 ml-4 list-decimal">{children}</ol>,
                  li: ({ children }) => <li className="my-0.5">{children}</li>,
                  strong: ({ children }) => <strong className="text-[#d4af37]">{children}</strong>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </>
          )}
        </div>
      </div>
    </div>
  );
}