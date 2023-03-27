import { getAuth, signInAnonymously } from "firebase/auth";
import app from "../../Firebase";
import "./AnonymousLoginButton.css";
import { FaUserSecret } from "react-icons/fa";

const auth = getAuth(app);

const signAnonymously = async () => {
  //await signInWithPopup(auth, googleProvider);
  await signInAnonymously(auth);
};

// Render
export default function AnonymousLoginButton() {
  return (
    <button onClick={signAnonymously} className="signAnonymous">
      <FaUserSecret className="icon" /> Sign up anonymously
    </button>
  );
}
