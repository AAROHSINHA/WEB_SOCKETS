import { User } from "../types";

interface SelectedUserViewProps {
  user: User;
  accent: "a" | "b";
  onRelease: () => void;
}

export function SelectedUserView({
  user,
  accent,
  onRelease,
}: SelectedUserViewProps) {
  return (
    <div className={`selected-view selected-view--${accent}`}>
      <div className="selected-view__avatar">{user.name.charAt(0)}</div>
      <h3 className="selected-view__name">{user.name}</h3>
      <span className="selected-view__status">assigned</span>
      <button
        type="button"
        className="selected-view__release"
        onClick={onRelease}
      >
        [ release ]
      </button>
    </div>
  );
}
