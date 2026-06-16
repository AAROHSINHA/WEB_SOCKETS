import { useEffect, useRef } from "react";

export interface ChatMessage {
  id: string;
  text: string;
  fromMe: boolean;
  timestamp: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  accent: "a" | "b";
  peerName: string;
}

export function ChatMessages({
  messages,
  accent,
  peerName,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat-bubble-row ${msg.fromMe ? "chat-bubble-row--me" : "chat-bubble-row--them"}`}
        >
          {!msg.fromMe && (
            <div
              className={`chat-bubble__avatar chat-bubble__avatar--${accent}`}
            >
              {peerName.charAt(0)}
            </div>
          )}
          <div
            className={`chat-bubble ${msg.fromMe ? "chat-bubble--me" : `chat-bubble--them chat-bubble--them-${accent}`}`}
          >
            <p className="chat-bubble__text">{msg.text}</p>
            <span className="chat-bubble__time">{msg.timestamp}</span>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
