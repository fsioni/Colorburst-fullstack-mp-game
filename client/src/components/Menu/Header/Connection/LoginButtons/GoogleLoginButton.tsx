import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../../../../Firebase";
import "./GoogleLoginButton.css";

const auth = getAuth(app);
// Sign in with Google
const googleProvider = new GoogleAuthProvider();

interface GoogleLoginButtonProps {
  setIsConnectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Render
export default function GoogleLoginButton({
  setIsConnectionModalOpen,
}: GoogleLoginButtonProps) {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    setIsConnectionModalOpen(false);
  };

  return (
    <button onClick={signInWithGoogle} className="signWithGoogle">
      <img src="./ress/google.webp" /> Sign up with Google
    </button>
  );
}
