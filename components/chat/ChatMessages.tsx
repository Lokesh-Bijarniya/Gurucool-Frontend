"use client";

import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Bot, FileText, User } from "lucide-react";
import { RefObject, useEffect, useState } from "react";

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: RefObject<HTMLDivElement>;
}

export function ChatMessages({ messages, isTyping, messagesEndRef }: ChatMessagesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), "MMMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  const formatTime = (date: string) => {
    try {
      return format(new Date(date), "HH:mm");
    } catch (error) {
      return "--:--";
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach((message) => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case "image":
        return (
          <img
            src={message.fileUrl}
            alt="Shared image"
            className="max-h-60 rounded-lg object-contain"
          />
        );
      case "file":
        return (
          <a
            href={message.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
          >
            <FileText className="h-4 w-4" />
            {message.fileName}
          </a>
        );
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  if (!mounted) {
    return null;
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {Object.entries(messageGroups).map(([date, messages]) => (
        <div key={date} className="mb-6">
          <div className="mb-4 flex justify-center">
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {date}
            </span>
          </div>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "mb-4 flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "flex max-w-[80%] items-end gap-2",
                  message.sender === "user" && "flex-row-reverse"
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  {message.sender === "user" ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-lg px-4 py-2",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {renderMessageContent(message)}
                  <p className="mt-1 text-right text-xs opacity-70">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {isTyping && (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <Bot className="h-5 w-5" />
          </div>
          <div className="flex gap-1">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}