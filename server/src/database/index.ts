// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBWQ3dMJYZ_lvox0igPKUVTMRPlhB4NiI",
  authDomain: "colorburst-5f1ed.firebaseapp.com",
  projectId: "colorburst-5f1ed",
  storageBucket: "colorburst-5f1ed.appspot.com",
  messagingSenderId: "687765481583",
  appId: "1:687765481583:web:10c64ba1224638291ec59a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default class Database {
  private db: Firestore;
  constructor() {
    this.db = getFirestore(app);
  }

  public async getUsers() {
    const querySnapshot = await getDocs(collection(this.db, "users"));
    const users: any[] = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  }
}
