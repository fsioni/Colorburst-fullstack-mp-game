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

const saveUser = async (playerId: string, pseudo: string) => {
  const userExists = await checkIfUserExists(playerId);
  const user = await admin.auth().getUser(playerId);
  if (!userExists) {
    await usersRef.doc(playerId).set({});
    await usersRef.doc(playerId).update({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      displayName: user.displayName,
      uid: playerId,
    });
  } else {
    console.log(
      "user exists, dipslayName : " + user.displayName + " pseudo :" + pseudo
    );
    await usersRef.doc(playerId).update({
      displayName: pseudo || user.displayName,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
};

const saveUserStats = async (
  playerToken: string,
  pseudo: string,
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
      saveUser(decodedToken.uid, pseudo);

      // get the current highest score in the database
      statRef
        .doc(docName)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data) {
              const userStats = data[decodedToken.uid];
              if (userStats !== undefined) {
                console.log("user exists in stats");
                const highestScore = getHighScore(userStats, user);

                saveExistingUserStats(
                  docName,
                  decodedToken,
                  user,
                  userStats,
                  highestScore
                );
              } else {
                saveNewUserStats(docName, decodedToken, user);
              }
            }
          }
        });
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

function saveExistingUserStats(
  docName: string,
  decodedToken: any,
  user: PlayerGameStats,
  userStats: any,
  highestScore: number
) {
  const kills = user._kills + (userStats.kills || 0);
  const death = user._killed + (userStats.deaths || 0);
  const blockTravelled =
    user._blocksTravelled + (userStats.blockTravelled || 0);
  const blocksCaptured = user._blocksCaptured + (userStats.blocksCaptured || 0);
  statRef.doc(docName).update({
    [decodedToken.uid]: {
      kills: kills,
      deaths: death,
      blockTravelled: blockTravelled,
      blocksCaptured: blocksCaptured,
      highestScore: highestScore,
    },
  });
}

function saveNewUserStats(
  docName: string,
  decodedToken: any,
  user: PlayerGameStats
) {
  console.log("user does not exist in stats");
  statRef.doc(docName).update({
    [decodedToken.uid]: {
      kills: user._kills,
      deaths: user._killed,
      blockTravelled: user._blocksTravelled,
      blocksCaptured: user._blocksCaptured,
      highestScore: user._highestScore,
    },
  });
}

function getHighScore(userStats: any, user: PlayerGameStats) {
  return (userStats.highestScore || 0) > (user._highestScore || 0)
    ? userStats.highestScore || 0
    : user._highestScore || 0;
}
