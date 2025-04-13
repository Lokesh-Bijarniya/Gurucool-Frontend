"use client";

import { ChatWindow } from "@/components/chat/ChatWindow";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-4xl">
          <ChatWindow />
        </div>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}