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

const saveUserStats = async (
  playerToken: string,
  user: PlayerGameStats,
  docName: string
) => {
  if (!playerToken) return;
  if (!(await statRef.doc(docName).get()).exists) {
    statRef.doc(docName).set({});
  }
  await admin
    .auth()
    .verifyIdToken(playerToken)
    .then((decodedToken) => {
      statRef.doc(docName).update({
        [decodedToken.uid]: {
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
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUserPseudo = async (playerToken: string) => {
  if (!playerToken) return;
  //verify the token
  const decodedToken = await admin.auth().verifyIdToken(playerToken);
  const user = await admin.auth().getUser(decodedToken.uid);
  return user.displayName;
};

export { db, getUsers, getStats, saveUserStats, getUserPseudo };
