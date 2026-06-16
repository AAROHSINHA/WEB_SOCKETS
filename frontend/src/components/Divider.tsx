interface DividerProps {
  linked: boolean;
}

export function Divider({ linked }: DividerProps) {
  return (
    <div className={`divider ${linked ? "divider--linked" : ""}`}>
      <span className="divider__node" />
    </div>
  );
}
