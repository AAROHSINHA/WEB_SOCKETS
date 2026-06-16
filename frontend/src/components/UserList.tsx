import { User } from "../types";
import { UserCard } from "./UserCard";

interface UserListProps {
  users: User[];
  accent: "a" | "b";
  disabledIds: Set<string>;
  onSelect: (user: User) => void;
}

export function UserList({
  users,
  accent,
  disabledIds,
  onSelect,
}: UserListProps) {
  return (
    <div className="user-list" role="listbox">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          accent={accent}
          disabled={disabledIds.has(user.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
