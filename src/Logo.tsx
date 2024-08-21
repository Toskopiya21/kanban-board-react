import React from "react";
import "./app.scss";
import logoCheckbox from "./assets/logoCheckbox.svg";

export default function Logo() {
  return (
    <header className="header">
      <div className="logoTitle">
        <img src={logoCheckbox} alt="" />
        Kboard
      </div>
    </header>
  );
}
