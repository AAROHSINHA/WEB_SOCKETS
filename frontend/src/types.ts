export interface User {
  id: string;
  username: string;
  is_online: boolean;
  last_seen_at: Date;
}

export type PanelId = "left" | "right";
