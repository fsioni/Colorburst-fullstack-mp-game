/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { FC, useRef } from "react";
import "./InputFeild.css";

interface Props {
  // TODO 1 fct aléatoire que ne s'affiche pas si il est log
  username: string;
  // TODO2 faire en sorte que le username ne sois pas modifiable si il est log
  isLoged: number;
}

const InputFeild = ({ username, isLoged }: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  isLoged = -1;
  return (
    <div className="inputFeild-container">
      <form
        className="input-form"
        onSubmit={() => {
          inputRef.current?.blur();
        }}
      />
      <input
        ref={inputRef}
        type="input"
        value={username}
        placeholder={isLoged === -1 ? "C'est quoi ton petit nom 🤔" : username}
        className="input-feild-box"
      />
      <button className="input-feild-submit" type="submit">
        GO
      </button>
    </div>
  );
};

export default InputFeild;
