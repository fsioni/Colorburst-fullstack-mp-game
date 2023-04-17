import React, { useEffect, FC } from "react";
import "./CreateButton.css";
import { MdOutlineAdd } from "react-icons/md";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";
interface Props {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateButton: FC<Props> = ({ setModalIsOpen }) => {
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

  const onCreateClick = () => {
    if (!user) {
      setIsConnectionModalOpen(true);
      return;
    }
    setModalIsOpen(true);
    if (!username) return;
    if (username == user.displayName) return;

    updateProfile(user, {
      displayName: username,
    }).then(() => {
      console.log("Updated profile");
    });
  };

  return (
    <div>
      <button className="create-button" onClick={() => onCreateClick()}>
        <MdOutlineAdd className="add-icon" />
      </button>
    </div>
  );
};

export default CreateButton;
