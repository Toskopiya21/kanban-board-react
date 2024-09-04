import "react";
import "./styles/app.scss";
import logoCheckbox from "./assets/logoCheckbox.svg";
import React from "react";

export const Logo = React.memo(() =>{
  return (
    <header className="header">
      <div className="logoTitle">
        <img src={logoCheckbox} alt="" />
        Kboard
      </div>
    </header>
  );
})
