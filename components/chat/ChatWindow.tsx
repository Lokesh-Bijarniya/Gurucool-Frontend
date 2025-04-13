"use client";

import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Message } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { generateBotReply } from "@/lib/bot-utils";
import { toast } from "sonner";

export function ChatWindow() {
  const [messages, setMessages] = useLocalStorage<Message[]>("chat-messages", []);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (
    content: string,
    type: "text" | "image" | "file",
    file?: File
  ) => {
    let fileUrl = "";
    let fileName = "";

    if (file) {
      try {
        fileUrl = URL.createObjectURL(file);
        fileName = file.name;
      } catch (error) {
        toast.error("Error processing file");
        return;
      }
    }

    // Create and add user message
    const newMessage: Message = {
      id: Date.now(),
      content,
      type,
      sender: "user",
      timestamp: new Date().toISOString(),
      fileUrl,
      fileName,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(async () => {
      const botReply = await generateBotReply(content);
      const botMessage: Message = {
        id: Date.now(),
        content: botReply,
        type: "text",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages([...updatedMessages, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleClearChat = () => {
    setMessages([]);
    toast.success("Chat cleared");
  };

  return (
    <div className="flex h-[80vh] flex-col rounded-lg border bg-card shadow-lg">
      <ChatHeader onClearChat={handleClearChat} />
      <ChatMessages 
        messages={messages} 
        isTyping={isTyping} 
        messagesEndRef={messagesEndRef}
      />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}