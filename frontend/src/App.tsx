import React, { useState } from "react";
import { SEEDED_USERS, User } from "./constants/data";

const T = {
  bg: "#111111",
  panelBg: "#0d0d0d",
  header: "#0a0a0a",
  border: "#1e1e1e",
  border2: "#252525",
  text: "#cccccc",
  muted: "#444444",
  faint: "#282828",
  font: '"Courier New", Courier, monospace',
};

interface UserSelectorProps {
  label: string;
  selectedId: string;
  onChange: (id: string) => void;
  excludeId?: string;
}

const UserSelector: React.FC<UserSelectorProps> = ({
  label,
  selectedId,
  onChange,
  excludeId,
}) => {
  const selected = SEEDED_USERS.find((u) => u.id === selectedId);
  const c = selected ? selected.color : "#444";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span
        style={{
          fontFamily: T.font,
          fontSize: "10px",
          color: T.muted,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          minWidth: "58px",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, position: "relative" }}>
        {selected && (
          <div
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              borderRadius: "2px",
              background: c + "15",
              border: `1px solid ${c}35`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8px",
              fontWeight: "bold",
              color: c,
              fontFamily: T.font,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {selected.avatar}
          </div>
        )}
        <select
          value={selectedId}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            appearance: "none",
            WebkitAppearance: "none",
            background: T.header,
            border: `1px solid ${T.border2}`,
            color: selected ? c : T.muted,
            fontFamily: T.font,
            fontSize: "12px",
            padding: "7px 26px 7px 34px",
            cursor: "pointer",
            outline: "none",
            letterSpacing: ".04em",
          }}
        >
          <option value="">-- select --</option>
          {SEEDED_USERS.map((u) => (
            <option key={u.id} value={u.id} disabled={u.id === excludeId}>
              {u.avatar} {u.name}
            </option>
          ))}
        </select>
        <span
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "9px",
            color: T.muted,
            pointerEvents: "none",
          }}
        >
          ▼
        </span>
      </div>
    </div>
  );
};

interface ChatPanelProps {
  panelTitle: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ panelTitle }) => {
  const [sendAsId, setSendAsId] = useState<string>("");
  const [sendToId, setSendToId] = useState<string>("");
  const [inputMessage, setInputMessage] = useState<string>("");
  const [focused, setFocused] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const sender = SEEDED_USERS.find((u) => u.id === sendAsId);
  const canSend = sendAsId && sendToId;
  const c = sender ? sender.color : "#2a2a2a";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: T.panelBg,
        border: `1px solid ${T.border}`,
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      {/* top bar */}
      <div
        style={{
          background: T.header,
          borderBottom: `1px solid ${T.border}`,
          padding: "9px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: T.font,
            color: "#c8a84b",
            fontSize: "11px",
            letterSpacing: ".12em",
          }}
        >
          {panelTitle}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#1a3a1a",
            }}
          />
          <span
            style={{ fontFamily: T.font, fontSize: "10px", color: T.faint }}
          >
            ws://localhost:8080
          </span>
        </div>
      </div>

      {/* selectors */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "11px 14px",
          borderBottom: `1px solid ${T.border}`,
          background: "#0f0f0f",
          flexShrink: 0,
        }}
      >
        <UserSelector
          label="Send As"
          selectedId={sendAsId}
          onChange={setSendAsId}
          excludeId={sendToId}
        />
        <UserSelector
          label="Send To"
          selectedId={sendToId}
          onChange={setSendToId}
          excludeId={sendAsId}
        />
      </div>

      {/* chat area */}
      <div
        style={{
          flex: 1,
          background: "#0a0a0a",
          overflowY: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: T.font,
            color: "#222",
            fontSize: "11px",
            letterSpacing: ".14em",
            userSelect: "none",
          }}
        >
          // awaiting stream...
        </span>
      </div>

      {/* input bar */}
      <div
        style={{
          padding: "11px 14px",
          borderTop: `1px solid ${T.border}`,
          background: T.header,
          display: "flex",
          gap: "8px",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "9px",
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: T.font,
              fontSize: "13px",
              pointerEvents: "none",
              zIndex: 1,
              color: focused ? c + "cc" : c + "55",
              transition: "color .15s",
            }}
          >
            ›
          </span>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={
              canSend ? "type a message..." : "select identities above..."
            }
            disabled={!canSend}
            style={{
              width: "100%",
              background: "#090909",
              border: `1px solid ${focused ? c + "44" : T.border}`,
              borderLeft: `2px solid ${focused ? c + "88" : c + "22"}`,
              padding: "8px 10px 8px 27px",
              color: T.text,
              fontFamily: T.font,
              fontSize: "12px",
              outline: "none",
              transition: "border-color .15s",
            }}
          />
        </div>
        <button
          disabled={!canSend || !inputMessage.trim()}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            background: btnHover && canSend ? c + "14" : "transparent",
            color:
              canSend && inputMessage.trim()
                ? btnHover
                  ? c
                  : c + "99"
                : "#2a2a2a",
            border: `1px solid ${canSend && inputMessage.trim() ? (btnHover ? c + "66" : c + "33") : T.border}`,
            padding: "8px 16px",
            fontFamily: T.font,
            fontSize: "11px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: ".1em",
            cursor: canSend && inputMessage.trim() ? "pointer" : "default",
            transition: "all .15s",
            whiteSpace: "nowrap",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div
      style={{
        background: T.bg,
        color: T.text,
        fontFamily: T.font,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          height: "36px",
          borderBottom: `1px solid ${T.border}`,
          background: "#0c0c0c",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span
            style={{
              fontFamily: T.font,
              fontSize: "11px",
              color: "#c8a84b",
              letterSpacing: ".1em",
            }}
          >
            ▶ WS://CHAT
          </span>
          <span
            style={{
              fontFamily: T.font,
              fontSize: "10px",
              color: T.faint,
              letterSpacing: ".14em",
              textTransform: "uppercase",
            }}
          >
            websocket simulation
          </span>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          {[
            ["PROTOCOL", "WS/1.1"],
            ["USERS", "6 ONLINE"],
            ["PORT", "8080"],
          ].map(([k, v]) => (
            <span
              key={k}
              style={{ fontFamily: T.font, fontSize: "10px", color: T.faint }}
            >
              {k}
              <span style={{ color: "#2a4a2a", marginLeft: "4px" }}>{v}</span>
            </span>
          ))}
        </div>
      </div>

      {/* panels */}
      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          padding: "14px",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <ChatPanel panelTitle="[TERMINAL_NODE_ALPHA]" />
        <ChatPanel panelTitle="[TERMINAL_NODE_BETA]" />
      </main>
    </div>
  );
}
