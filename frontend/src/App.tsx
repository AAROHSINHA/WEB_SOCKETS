import { useState } from "react";
import { SplitPanel } from "./components/SplitPanel";
import { Divider } from "./components/Divider";
import { leftUsers, rightUsers } from "./data/users";
import { User } from "./types";
import "./styles.css";
export default function App() {
  const [leftSelected, setLeftSelected] = useState<User | null>(null);
  const [rightSelected, setRightSelected] = useState<User | null>(null);

  const disabledOnLeft = new Set(rightSelected ? [rightSelected.id] : []);
  const disabledOnRight = new Set(leftSelected ? [leftSelected.id] : []);
  const linked = Boolean(leftSelected && rightSelected);

  return (
    <div className="app">
      <div className="app__status">
        <span className="app__status-label">pair-select</span>
        <span className={`app__status-state ${linked ? "is-linked" : ""}`}>
          {linked ? "linked" : "awaiting selection"}
        </span>
      </div>

      <div className="split">
        <SplitPanel
          label="pool a"
          accent="a"
          users={leftUsers}
          selected={leftSelected}
          disabledIds={disabledOnLeft}
          onSelect={setLeftSelected}
          onRelease={() => setLeftSelected(null)}
        />

        <Divider linked={linked} />

        <SplitPanel
          label="pool b"
          accent="b"
          users={rightUsers}
          selected={rightSelected}
          disabledIds={disabledOnRight}
          onSelect={setRightSelected}
          onRelease={() => setRightSelected(null)}
        />
      </div>
    </div>
  );
}
