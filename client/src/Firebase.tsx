import { initializeApp } from "firebase/app";

import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDBWQ3dMJYZ_lvox0igPKUVTMRPlhB4NiI",
  authDomain: "colorburst-5f1ed.firebaseapp.com",
  projectId: "colorburst-5f1ed",
  storageBucket: "colorburst-5f1ed.appspot.com",
  messagingSenderId: "687765481583",
  appId: "1:687765481583:web:10c64ba1224638291ec59a",
};
const app = initializeApp(firebaseConfig);

export default app;
