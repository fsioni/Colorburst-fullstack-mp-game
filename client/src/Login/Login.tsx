import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";
import app from "../Firebase";
import "./Login.css";

export default function Login() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const users = collection(db, "users");
  let idToken;
  // Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    auth.currentUser?.getIdToken(true).then(function (token) {
      idToken = token;
      console.log(idToken);
    });
  };

  const [user, loading, error] = useAuthState(auth);
  const signout = () => auth.signOut();

  const startGame = () => {
    console.log("Start game with userID : " + user?.uid);
  };

  console.log("Rendered");
  return (
    <div>
      {!user ? (
        <button onClick={signInWithGoogle} className="signWithGoogle">
          <img src="./ress/google.webp" /> Sign up with Google
        </button>
      ) : null}

      {user ? (
        <div>
          <span>Hi {user.displayName}</span>
          <button onClick={signout}>Sign out</button>
          <br />
          <button onClick={startGame}>Launch game</button>
        </div>
      ) : null}
    </div>
  );
}
