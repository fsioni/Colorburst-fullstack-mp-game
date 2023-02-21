/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { FC, useRef } from "react";
import "./InputField.css";

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
        placeholder={isLoged === -1 ? "Username 🤔" : username}
        className="input-feild-box"
      />
      <select id="gameMode" className="input-select">
        <option key="normal" value="normal" className="input-select-option">
          Normal
        </option>
        <option key="hardcore" value="hardcore" className="input-select-option">
          Hardcore
        </option>
      </select>
      <button className="input-feild-submit" type="submit">
        GO
      </button>
    </div>
  );
};

export default InputFeild;
