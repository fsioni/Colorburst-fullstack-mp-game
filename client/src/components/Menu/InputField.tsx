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

const InputField = ({ username, isLoged }: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  isLoged = -1;
  return (
    <div className="inputField-main">
      <div className="inputField">
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
          placeholder={"Username 🤔"}
          className="input-field-box"
        />
      </div>
      <div className="mode-and-go">
        <select id="gameMode" className="input-select">
          <option key="normal" value="normal" className="input-select-option">
            Normal
          </option>
          <option
            key="hardcore"
            value="hardcore"
            className="input-select-option"
          >
            Hardcore
          </option>
        </select>
        <button className="input-field-submit" type="submit">
          GO
        </button>
      </div>
    </div>
  );
};

export default InputField;
