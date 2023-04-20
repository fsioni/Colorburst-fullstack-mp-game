import React, { FC, useEffect, useRef } from "react";
import "./SingleRoom.css";
import { TfiLock } from "react-icons/tfi";
import Private from "./SingleRoomComponents/Private";
import NbPlayers from "./SingleRoomComponents/NbPlayers";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";

interface Props {
  gameID: string;
  gameName: string;
  connectedPlayersCount: number;
  nbPlayersMax: number;
  isPrivate: boolean;
  setIsConnectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const singleRoom: FC<Props> = ({
  gameID,
  gameName,
  connectedPlayersCount,
  nbPlayersMax,
  isPrivate,
  setIsConnectionModalOpen,
  setIsGameStarted,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = React.useState("");
  const [isSync, setIsSync] = React.useState(false);
  const [user, setUser] = React.useState<FirebaseUser | null>(null);

  useEffect(() => {
    if (isSync) return;

    const auth = getAuth();
    onAuthStateChanged(auth, (_user: FirebaseUser | null) => {
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

  const onClick = () => {
    if (!user) {
      setIsConnectionModalOpen(true);
      return;
    }
    if (!isPrivate) {
      localStorage.setItem("gameId", gameID);
      setIsGameStarted(true);
    }

    if (!username) return;
    if (username == user.displayName) return;

    updateProfile(user, {
      displayName: username,
    }).then(() => {
      console.log("Updated profile");
    });
  };

  return (
    <div className="single-room-container" onClick={onClick}>
      <div className="room-name">
        <Private isPrivate={isPrivate} />
        {gameName}
      </div>
      <div className="room-nbPlayers">
        <NbPlayers
          connectedPlayersCount={connectedPlayersCount}
          nbPlayersMax={nbPlayersMax}
        />
      </div>
    </div>
  );
};

export default singleRoom;
