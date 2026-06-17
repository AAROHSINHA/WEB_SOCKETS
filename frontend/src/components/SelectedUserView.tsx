import { useEffect, useRef, useState } from "react";
import { User } from "../types";
import { ChatTopBar } from "./chat/ChatTopBar";
import { ChatMessages, ChatMessage } from "./chat/ChatMessages";
import { ChatInput } from "./chat/ChatInput";

function nowTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface SelectedUserViewProps {
  user: User;
  accent: "a" | "b";
  allUsers: User[];
  setSelected: React.Dispatch<React.SetStateAction<User | null>>;
}

export function SelectedUserView({
  user,
  accent,
  setSelected,
  allUsers,
}: SelectedUserViewProps) {
  const [activeTabId, setActiveTabId] = useState<string | number | null>(
    allUsers[0]?.id ?? null,
  );
  const [unread, setUnread] = useState<Record<string, number>>({});
  const [allMessages, setAllMessages] = useState<Record<string, ChatMessage[]>>(
    {},
  );

  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [, setWsMessages] = useState<string[]>([]);

  // set up a connection when loaded
  useEffect(() => {
    if (!user) return;
    ws.current = new WebSocket(`ws://localhost:8000/ws/chat/${user.id}`);
    ws.current.onopen = () => {
      setIsConnected(true);
      setWsMessages([]);
    };
    ws.current.onmessage = (event: MessageEvent) => {
      setWsMessages((prev) => [...prev, event.data as string]);
    };
    ws.current.onclose = () => {
      setIsConnected(false);
    };
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [user]);

  // remove user connection when logout
  const logout = () => {
    if (ws.current) {
      ws.current.close();
    }

    setSelected(null);
  };
  const handleTabSelect = (id: string | number) => {
    setActiveTabId(id);
    setUnread((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleSend = (text: string) => {
    if (!activeTabId) return;
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      fromMe: true,
      timestamp: nowTime(),
    };
    setAllMessages((prev) => ({
      ...prev,
      [activeTabId]: [...(prev[activeTabId] ?? []), msg],
    }));
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(text);
    }
  };

  const activeTabUser = allUsers.find((u) => u.id === activeTabId) ?? null;
  const activeMessages = activeTabId ? (allMessages[activeTabId] ?? []) : [];
  const tabsWithUnread = allUsers.map((u) => ({
    ...u,
    unread: unread[u.id] ?? 0,
  }));

  // No users at all
  if (!allUsers.length) {
    return (
      <div
        className={`selected-view selected-view--${accent} selected-view--chat`}
      >
        <div className="chat-empty-state">
          <span className="chat-empty-state__label">no users available</span>
        </div>
      </div>
    );
  }

  // No tab selected
  if (!activeTabUser) {
    return (
      <div
        className={`selected-view selected-view--${accent} selected-view--chat`}
      >
        <ChatTopBar
          users={tabsWithUnread}
          activeId={null}
          accent={accent}
          onSelect={handleTabSelect}
        />
        <div className="chat-empty-state">
          <span className="chat-empty-state__label">
            select a user to start
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`selected-view selected-view--${accent} selected-view--chat`}
    >
      <ChatTopBar
        users={tabsWithUnread}
        activeId={activeTabId}
        accent={accent}
        onSelect={handleTabSelect}
      />

      <div className="chat-peer-header">
        <div
          className={`chat-peer-header__avatar chat-peer-header__avatar--${accent}`}
        >
          {activeTabUser.username.charAt(0)}
        </div>
        <div className="chat-peer-header__info">
          <span className="chat-peer-header__name">
            {activeTabUser.username}
          </span>
          <span
            className={`chat-peer-header__dot chat-peer-header__dot--${isConnected ? "on" : "off"}`}
          />
          <span className="chat-peer-header__status">
            {isConnected ? "connected" : "offline"}
          </span>
        </div>
        <button
          type="button"
          className="selected-view__release chat-peer-header__release"
          onClick={logout}
        >
          [ logout ]
        </button>
      </div>

      <ChatMessages
        messages={activeMessages}
        accent={accent}
        peerName={activeTabUser.username}
      />

      <ChatInput accent={accent} onSend={handleSend} />
    </div>
  );
}
