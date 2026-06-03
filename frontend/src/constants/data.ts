// users.ts
export interface User {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export const SEEDED_USERS: User[] = [
  { id: "1", name: "Alice_UX", avatar: "👩‍💻", color: "#ff6b6b" },
  { id: "2", name: "Bob_Dev", avatar: "👨‍💻", color: "#4dadf7" },
  { id: "3", name: "Charlie_Bit", avatar: "🤖", color: "#51cf66" },
  { id: "4", name: "Diana_Core", avatar: "🕵️‍♀️", color: "#fcc419" },
  { id: "5", name: "Evan_Log", avatar: "🚀", color: "#b197fc" },
  { id: "6", name: "Fiona_Net", avatar: "📡", color: "#ff922b" },
];
