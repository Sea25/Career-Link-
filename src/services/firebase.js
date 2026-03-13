import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABGYpeM3uo59fqb1bNheJhcdKdyCdPBXo",
  authDomain: "careerlink-d6e8b.firebaseapp.com",
  projectId: "careerlink-d6e8b",
  storageBucket: "careerlink-d6e8b.firebasestorage.app",
  messagingSenderId: "995192744263",
  appId: "1:995192744263:web:46040a4ffd5f594e0d0462",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;