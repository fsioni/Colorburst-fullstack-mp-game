import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import app from "../../Firebase";
import "./GoogleLoginButton.css";

const auth = getAuth(app);
// Sign in with Google
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  const data = await signInWithPopup(auth, googleProvider);
};

// Render
export default function GoogleLoginButton() {
  return (
    <div>
      <button onClick={signInWithGoogle} className="signWithGoogle">
        <img src="./ress/google.webp" /> Sign up with Google
      </button>
    </div>
  );
}
