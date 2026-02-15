"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendChatMessage, type Citation } from "@/lib/chat-api";

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

    try {
      // Call API
      const response = await sendChatMessage({
        query: trimmedInput,
        mode: "full_book",
      });

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.answer,
        citations: response.citations,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
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
  console.log(messages[1]?.citations, "MESSAGE")
  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "flex items-center justify-center",
            "w-14 h-14 rounded-full",
            "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
            "text-white shadow-2xl",
            "hover:scale-110 active:scale-95",
            "transition-all duration-200",
            "animate-gradient"
          )}
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "w-full max-w-md h-[600px] max-h-[calc(100vh-3rem)]",
            "flex flex-col rounded-2xl shadow-2xl",
            "glass glass-dark",
            "border border-border",
            "animate-in slide-in-from-bottom-10 fade-in duration-300"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask about the book</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Welcome to AI Assistant</h4>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Ask me anything about the AI-Native Book. I'm here to help you understand the content.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient text-white"
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "flex flex-col gap-1 max-w-[80%]",
                      message.role === "user" ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "px-4 py-2 rounded-2xl",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.citations && message.citations.length > 0 && (
                      <div className="px-3 py-2 bg-accent/50 rounded-lg mt-1">
                        <p className="text-xs font-semibold mb-1">Sources:</p>
                        {message.citations.slice(0, 2).map((citation, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground truncate">
                            {citation.chapter && `${citation.chapter} • `} Relevance:{" "}
                            {Math.round(citation.score * 100)}%
                          </p>
                        ))}
                        {message.citations.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{message.citations.length - 2} more sources
                          </p>
                        )}
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground">
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
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 bg-muted rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="px-4 py-3 bg-destructive/10 text-destructive rounded-2xl text-sm">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                rows={1}
                className={cn(
                  "flex-1 px-4 py-3 rounded-xl",
                  "bg-background border border-input",
                  "text-sm text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring",
                  "resize-none overflow-hidden",
                  "transition-all"
                )}
                style={{
                  minHeight: "44px",
                  maxHeight: "120px",
                }}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={cn(
                  "px-4 py-3 rounded-xl",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 active:opacity-80",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-all",
                  "flex items-center justify-center"
                )}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      )}
    </>
  );
}
