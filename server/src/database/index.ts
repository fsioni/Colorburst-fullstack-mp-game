import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import PlayerGameStats from "../game/playerGameStats";

const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "FireBaseAuth.json"), "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const usersRef = admin.firestore().collection("users");

const statRef = admin.firestore().collection("stats");

const getUsers = async () => {
  const users = (await usersRef.get()).docs.map((doc) => doc.data());
  return users;
};

const getStats = async () => {
  const stats = (await statRef.get()).docs.map((doc) => doc.data());
  return stats;
};

const checkIfUserExists = async (playerId: string) => {
  const doc = await usersRef.doc(playerId).get();
  return doc.exists;
};

const saveUser = async (playerId: string) => {
  const userExists = await checkIfUserExists(playerId);
  if (!userExists) {
    await usersRef.doc(playerId).set({});
    usersRef.doc(playerId).update({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      displayName: pseudo,
      uid: playerId,
    });
  }
};

const saveUserStats = async (
  playerUID: string,
  user: PlayerGameStats,
  docName: string
) => {
  if (!playerUID) return;

  saveUser(playerUID);

  await statRef.doc(docName).update({
    [playerUID]: {
      kills: admin.firestore.FieldValue.increment(user._kills),
      deaths: admin.firestore.FieldValue.increment(user._killed),
      blockTravelled: admin.firestore.FieldValue.increment(
        user._blocksTravelled
      ),
      blocksCaptured: admin.firestore.FieldValue.increment(
        user._blocksCaptured
      ),
    },
  });
};

export { db, getUsers, getStats, saveUserStats };
