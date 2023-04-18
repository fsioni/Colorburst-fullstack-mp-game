import React, { FC, useEffect, useRef } from "react";
import "./SingleRoom.css";
import { TfiLock } from "react-icons/tfi";
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

const isFull = (
  connectedPlayersCount: number,
  nbPlayersMax: number
): boolean => {
  return connectedPlayersCount - nbPlayersMax === 0;
};

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
    localStorage.setItem("gameId", gameID);
    setIsGameStarted(true);
    if (!username) return;
    if (username == user.displayName) return;

    updateProfile(user, {
      displayName: username,
    }).then(() => {
      console.log("Updated profile");
    });
  };

  return (
    <div className="single-room-container" onClick={() => onClick()}>
      <div className="room-name">
        {isPrivate ? (
          <span className="lock-icon">
            <TfiLock />
          </span>
        ) : (
          ""
        )}
        {gameName}
      </div>
      <div className="players-number">
        {isFull(connectedPlayersCount, nbPlayersMax) ? (
          <div className="nbPlayers-Full">FULL</div>
        ) : (
          <div className="nbPlayers">
            {connectedPlayersCount + "/" + nbPlayersMax}
          </div>
        )}
      </div>
    </div>
  );
};

export default singleRoom;
