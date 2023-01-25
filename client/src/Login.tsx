import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React from "react";
import app from "./Firebase";

const auth = getAuth(app);
const db = getFirestore(app);
const users = collection(db, "users");
// Sign in with Google
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  const user = res.user;
  // On regarde si l'utilisateur existe déjà dans la base de données
  const q = query(users, where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);
  const registered = querySnapshot.docs[0];
  if (!registered) {
    // Si l'utilisateur n'existe pas, on le crée
    const newUser = {
      uid: user.uid,
      displayName: user.displayName,
      createdAt: Date.now(),
    };
    await setDoc(doc(users), newUser);
  }
  const userData = querySnapshot.docs[0].data();
  console.log(userData);
  console.log(user);
};

// Render
export default function Login() {
  return (
    <div>
      <button onClick={signInWithGoogle}>Log / Sign in with Google</button>
    </div>
  );
}
