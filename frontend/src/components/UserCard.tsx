import { User } from "../types";

interface UserCardProps {
  user: User;
  accent: "a" | "b";
  disabled: boolean;
  onSelect: (user: User) => void;
}

export function UserCard({ user, accent, disabled, onSelect }: UserCardProps) {
  return (
    <button
      type="button"
      className={`user-card user-card--${accent}`}
      onClick={() => onSelect(user)}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <span className="user-card__avatar">{user.username.charAt(0)}</span>
      <span className="user-card__name">{user.username}</span>
      {disabled && <span className="user-card__tag">linked elsewhere</span>}
    </button>
  );
}
