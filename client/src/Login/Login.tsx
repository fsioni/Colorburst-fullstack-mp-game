import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";
import app from "../Firebase";
import "./Login.css";

const auth = getAuth(app);
const db = getFirestore(app);
const users = collection(db, "users");
// Sign in with Google
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  const data = await signInWithPopup(auth, googleProvider);
};

const signout = () => auth.signOut();

// Render
export default function Login() {
  const [user, loading, error] = useAuthState(auth);
  console.log("Rendered");
  return (
    <div>
      {!user ? (
        <button onClick={signInWithGoogle} className="signWithGoogle">
          <img src="./ress/google.webp" /> Sign up with Google
        </button>
      ) : null}
      {user ? <span>Hi {user.displayName}</span> : null}
      <br />
      {user ? <button onClick={signout}>Sign out</button> : null}
    </div>
  );
}
