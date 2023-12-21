import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAddK_k3o5pebPzBrTOdJl3XcT9qpnAUZc",
  authDomain: "gesto-d6223.firebaseapp.com",
  databaseURL: "https://gesto-d6223-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gesto-d6223",
  storageBucket: "gesto-d6223.appspot.com",
  messagingSenderId: "772924726267",
  appId: "1:772924726267:web:fe4485d308822b59bec95e",
  measurementId: "G-SNWQNS7GMV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);
export { app, auth, db, storage };
