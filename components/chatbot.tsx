"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  sendChatMessage,
  streamChatMessage,
  type Citation,
  type ChatStreamEvent,
} from "@/lib/chat-api";
 import {
   Conversation,
   ConversationContent,
   ConversationEmptyState,
   ConversationScrollButton,
 } from "@/components/ui/conversation";
 import { Orb } from "@/components/ui/orb";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmedInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      citations: [],
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      await streamChatMessage(
        {
          query: trimmedInput,
          mode: "full_book",
        },
        (event: ChatStreamEvent) => {
          if (event.type === "delta") {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: m.content + event.delta } : m
              )
            );
            return;
          }

          if (event.type === "final") {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? {
                      ...m,
                      citations: event.citations,
                    }
                  : m
              )
            );
            return;
          }

          if (event.type === "error") {
            throw new Error(event.message);
          }
        }
      );
    } catch (err) {
      try {
        const response = await sendChatMessage({
          query: trimmedInput,
          mode: "full_book",
        });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: response.answer, citations: response.citations }
              : m
          )
        );
      } catch (fallbackErr) {
        setError(
          fallbackErr instanceof Error
            ? fallbackErr.message
            : "Failed to send message"
        );
      }
    } finally {
      setIsLoading(false);
      // Focus input after response
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-5 z-50 flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-stone-200 to-gray-300 linear-gradient px-4 text-white shadow-2xl transition-all duration-200 hover:scale-110 hover:bg-primary-olive/90 sm:h-12 sm:px-4"
          aria-label="Open chat"
        >
          <Orb
            className="h-[35px] w-[35px]"
            colors={["#a855f7", "#f97316"]}
            agentState={null}
            resizeDebounce={2000}
          />
          <span className="font-semibold text-sm text-black">Ask AI</span>
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "w-full max-w-md h-[600px] max-h-[calc(100vh-3rem)]",
            "flex flex-col",
            "animate-in slide-in-from-bottom-10 fade-in duration-300"
          )}
        >
          <Conversation className="h-full shadow-2xl glass glass-dark">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <Orb
                  className="h-9 w-9"
                  colors={["#a855f7", "#f97316"]}
                  agentState={isLoading ? "thinking" : null}
                />
                <div className="leading-tight">
                  <h3 className="text-sm font-semibold">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask about the book</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4 text-foreground" />
              </button>
            </div>

            <ConversationContent className="space-y-4">
              {messages.length === 0 ? (
                <ConversationEmptyState
                  title="Welcome To AI Native Book"
                  description="Ask me anything about the AI-Native Book to get started."
                />
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex w-full gap-3",
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {message.role === "user" ? (
                      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    ) : (
                      <Orb className="mt-0.5 h-8 w-8 flex-shrink-0" colors={["#a855f7", "#f97316"]} />
                    )}

                    <div
                      className={cn(
                        "flex min-w-0 flex-col gap-1",
                        message.role === "user" ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        )}
                      >
                        {message.content}
                      </div>

                      {message.citations && message.citations.length > 0 && (
                        <div className="max-w-[85%] rounded-xl border border-border/60 bg-background/50 px-3 py-2">
                          <p className="text-xs font-semibold text-foreground">Sources</p>
                          <div className="mt-1 space-y-0.5">
                            {message.citations.slice(0, 2).map((citation, idx) => (
                              <p key={idx} className="text-xs text-muted-foreground truncate">
                                {citation.chapter && `${citation.chapter} • `}Relevance:{" "}
                                {Math.round(citation.score * 100)}%
                              </p>
                            ))}
                            {message.citations.length > 2 && (
                              <p className="text-xs text-muted-foreground">
                                +{message.citations.length - 2} more sources
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      <span className="text-[11px] text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex w-full gap-3">
                  <Orb
                    className="mt-0.5 h-8 w-8 flex-shrink-0"
                    colors={["#a855f7", "#f97316"]}
                    agentState="thinking"
                  />
                  <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />

              <ConversationScrollButton />
            </ConversationContent>

            <div className="border-t border-border bg-background/40 p-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your question..."
                  rows={1}
                  className={cn(
                    "flex-1 rounded-xl border border-input bg-background px-4 py-3",
                    "text-sm text-foreground placeholder:text-muted-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring",
                    "resize-none overflow-y-auto",
                    "transition-all"
                  )}
                  style={{
                    minHeight: "44px",
                    maxHeight: "140px",
                  }}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "inline-flex h-[44px] w-[44px] items-center justify-center rounded-xl",
                    "bg-primary text-primary-foreground",
                    "hover:opacity-90 active:opacity-80",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-all"
                  )}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </Conversation>
        </div>
      )}
    </>
  );
}
