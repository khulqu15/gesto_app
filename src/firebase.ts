import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBKKGyuEMl8x5vsKmynWnZ0tEs1rViG03k",
    authDomain: "jalanku-apps.firebaseapp.com",
    databaseURL: "https://jalanku-apps-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jalanku-apps",
    storageBucket: "jalanku-apps.appspot.com",
    messagingSenderId: "812093961102",
    appId: "1:812093961102:web:c388d789a228a630ff2adf"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app);
const storage = getStorage(app)
export { app, auth, db, storage };