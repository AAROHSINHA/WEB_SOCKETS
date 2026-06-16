interface TabUser {
  id: string | number;
  username: string;
  unread: number;
}

interface ChatTopBarProps {
  users: TabUser[];
  activeId: string | number | null;
  accent: "a" | "b";
  onSelect: (id: string | number) => void;
}

export function ChatTopBar({
  users,
  activeId,
  accent,
  onSelect,
}: ChatTopBarProps) {
  return (
    <div className="chat-topbar">
      {users.map((u) => {
        const isActive = u.id === activeId;
        return (
          <button
            key={u.id}
            type="button"
            className={`chat-topbar__tab ${isActive ? `chat-topbar__tab--active chat-topbar__tab--${accent}` : ""}`}
            onClick={() => onSelect(u.id)}
          >
            <span className="chat-topbar__avatar">{u.username.charAt(0)}</span>
            <span className="chat-topbar__name">{u.username}</span>
            {!isActive && u.unread > 0 && (
              <span className="chat-topbar__badge">{u.unread}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
