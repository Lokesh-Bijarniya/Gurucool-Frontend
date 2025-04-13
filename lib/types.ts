export interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: string;
  type: "text" | "image" | "file";
  fileUrl?: string;
  fileName?: string;
}