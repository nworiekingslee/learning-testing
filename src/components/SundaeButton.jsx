import React from "react";
import "../styles/components/SundaeButton.css";

export default function SundaeButton({ isDisabled }) {
  return (
    <button
      className={`sundae-button ${isDisabled && "disabled"}`}
      disabled={isDisabled}
      onClick={() => console.log("clicked")}
    >
      Submit
    </button>
  );
}
