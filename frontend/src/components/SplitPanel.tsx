import { User } from "../types";
import { SelectedUserView } from "./SelectedUserView";
import { UserList } from "./UserList";

interface SplitPanelProps {
  label: string;
  accent: "a" | "b";
  users: User[];
  selected: User | null;
  disabledIds: Set<string>;
  onSelect: (user: User) => void;
  onRelease: () => void;
  allUsers: User[];
}

export function SplitPanel({
  label,
  accent,
  users,
  selected,
  disabledIds,
  onSelect,
  onRelease,
  allUsers,
}: SplitPanelProps) {
  return (
    <section className="panel">
      <header className="panel__header">
        <span className="panel__label">{label}</span>
        <span className="panel__count">
          {selected ? "1 / 1" : `${users.length} nodes`}
        </span>
      </header>
      <div className="panel__body">
        {selected ? (
          <SelectedUserView
            user={selected}
            accent={accent}
            onRelease={onRelease}
            allUsers={allUsers}
          />
        ) : (
          <UserList
            users={users}
            accent={accent}
            disabledIds={disabledIds}
            onSelect={onSelect}
          />
        )}
      </div>
    </section>
  );
}
