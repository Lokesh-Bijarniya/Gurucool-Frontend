"use client";

import { Bot } from "lucide-react";
import { ModeToggle } from "../theme/ModeToggle";
import { Button } from "../ui/button";

interface ChatHeaderProps {
  onClearChat: () => void;
}

export function ChatHeader({ onClearChat }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <Bot className="h-6 w-6" />
        <h2 className="text-lg font-semibold">Chat Assistant</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearChat}
          className="text-sm"
        >
          Clear Chat
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}