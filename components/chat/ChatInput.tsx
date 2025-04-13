"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Paperclip, Send, Smile } from "lucide-react";
import { KeyboardEvent, useState, useRef } from "react";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner";

interface ChatInputProps {
  onSendMessage: (message: string, type: "text" | "image" | "file", file?: File) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, "text");
      setMessage("");
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prev) => prev + emoji.native);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "image" | "file") => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Check file type for images
    if (type === "image" && !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    onSendMessage(file.name, type, file);
    event.target.value = ""; // Reset input
  };

  return (
    <div className="border-t p-4">
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-[60px] resize-none"
        />
        <div className="flex flex-col gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e, "file")}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => handleFileChange(e, "image")}
            className="hidden"
            accept="image/*"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => imageInputRef.current?.click()}
          >
            <Image className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="end">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme="light"
                previewPosition="none"
              />
            </PopoverContent>
          </Popover>
          <Button onClick={handleSend} className="h-9 w-9 p-0">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}