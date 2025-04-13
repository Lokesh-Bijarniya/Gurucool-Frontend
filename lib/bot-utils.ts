const RESPONSES = [
  "That's interesting! Tell me more.",
  "I understand what you mean.",
  "Thanks for sharing that with me.",
  "I appreciate your perspective on this.",
  "That's a great point!",
  "I hadn't thought about it that way before.",
  "Could you elaborate on that?",
  "What made you think of that?",
  "That's fascinating!",
  "I see what you mean.",
];

export async function generateBotReply(userMessage: string): Promise<string> {
  // In a real app, this would call an AI API
  return RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
}