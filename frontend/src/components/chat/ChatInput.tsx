import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  accent: "a" | "b";
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ accent, onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`chat-input chat-input--${accent}`}>
      <textarea
        className="chat-input__field"
        placeholder="Type a message…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
      />
      <button
        type="button"
        className={`chat-input__send chat-input__send--${accent}`}
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="Send"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
