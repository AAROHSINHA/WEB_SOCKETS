import { useState, useEffect } from "react";
import axios from "axios";

import { SplitPanel } from "./components/SplitPanel";
import { Divider } from "./components/Divider";
import Loader from "./components/Loader";

import { User } from "./types";

import "./styles.css";

export default function App() {
  const [leftSelected, setLeftSelected] = useState<User | null>(null);
  const [rightSelected, setRightSelected] = useState<User | null>(null);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [leftUsers, setLeftUsers] = useState<User[]>([]);
  const [rightUsers, setRightUsers] = useState<User[]>([]);

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<User[]>("http://127.0.0.1:8000/users");

        console.log("API Response:", result.data);

        const users = result.data ?? [];

        const midpoint = Math.ceil(users.length / 2);

        setAllUsers(users);

        setLeftUsers(users.slice(0, midpoint));
        setRightUsers(users.slice(midpoint));
      } catch (error) {
        console.error(error);

        setAllUsers([]);
        setLeftUsers([]);
        setRightUsers([]);
      } finally {
        setShowLoader(false);
      }
    };

    fetchData();
  }, []);

  const disabledOnLeft = new Set(rightSelected ? [rightSelected.id] : []);

  const disabledOnRight = new Set(leftSelected ? [leftSelected.id] : []);

  const linked = Boolean(leftSelected && rightSelected);

  return (
    <div className="app">
      <Loader visible={showLoader} />

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
          allUsers={allUsers}
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
          allUsers={allUsers}
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
