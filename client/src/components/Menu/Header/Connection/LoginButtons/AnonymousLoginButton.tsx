import { getAuth, signInAnonymously } from "firebase/auth";
import app from "../../../../../Firebase";
import "./AnonymousLoginButton.css";
import { FaUserSecret } from "react-icons/fa";

const auth = getAuth(app);

interface GoogleLoginButtonProps {
  setIsConnectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Render
export default function AnonymousLoginButton({
  setIsConnectionModalOpen,
}: GoogleLoginButtonProps) {
  const signAnonymously = async () => {
    await signInAnonymously(auth);
    console.log(setIsConnectionModalOpen);
    setIsConnectionModalOpen(false);
  };
  return (
    <button onClick={signAnonymously} className="signAnonymous">
      <FaUserSecret className="icon" /> Sign up anonymously
    </button>
  );
}
