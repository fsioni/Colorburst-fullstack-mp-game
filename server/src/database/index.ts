import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "FireBaseAuth.json"), "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const usersRef = admin.firestore().collection("users");

const getUsers = async () => {
  const users = (await usersRef.get()).docs.map((doc) => doc.data());
  return users;
};

export { db, getUsers };
