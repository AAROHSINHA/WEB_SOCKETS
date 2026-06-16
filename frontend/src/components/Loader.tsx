// components/Loader.tsx
import React from "react";
import "../styles.css";

interface LoaderProps {
  visible: boolean;
  text?: string;
}

const Loader = ({ visible, text = "Loading..." }: LoaderProps) => {
  if (!visible) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-spinner" />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Loader;
