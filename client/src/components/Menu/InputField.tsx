/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { FC, useRef } from "react";
import "./InputField.css";

interface InputFieldProps {
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputField: FC<InputFieldProps> = ({ setIsGameStarted }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = React.useState("");
  const [isSync, setIsSync] = React.useState(false);
  const [user, setUser] = React.useState<FirebaseUser | null>(null);

  useEffect(() => {
    if (isSync) return;

    const auth = getAuth();
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        setUser(_user);
        return;
      } else {
        setUser(null);
      }
      setIsSync(true);
    });
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || "");
    } else {
      setUsername("");
    }
  }, [user]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = username;
    }
  }, [username]);

  return (
    <div className="inputField-container">
      <form
        className="input-form"
        onSubmit={() => {
          inputRef.current?.blur();
        }}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder="Username 🤔"
        onChange={(e) => setUsername(e.target.value)}
        className="input-field-box"
      />
      <select id="gameMode" className="input-select">
        <option key="normal" value="normal" className="input-select-option">
          Normal
        </option>
        <option key="hardcore" value="hardcore" className="input-select-option">
          Hardcore
        </option>
      </select>
      <button
        className="input-field-submit"
        type="submit"
        onClick={() => setIsGameStarted(true)}
      >
        GO
      </button>
    </div>
  );
};

export default InputField;
