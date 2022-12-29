import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2d_Q21lh4pjbUby9MNTpFHoB2QX7P2UE",
  authDomain: "dusted-705a0.firebaseapp.com",
  projectId: "dusted-705a0",
  storageBucket: "dusted-705a0.appspot.com",
  messagingSenderId: "668830982372",
  appId: "1:668830982372:web:d3e4ea1cfffe7e8bf9ccf1",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
