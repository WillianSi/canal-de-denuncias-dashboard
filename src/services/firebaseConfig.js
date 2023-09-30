import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwsNLIyGs1rqTD-_RBSajt6HLDvH0smV0",
  authDomain: "canal-de-denuncias-2304d.firebaseapp.com",
  projectId: "canal-de-denuncias-2304d",
  storageBucket: "canal-de-denuncias-2304d.appspot.com",
  messagingSenderId: "701935506559",
  appId: "1:701935506559:web:e7cc7b3c13e27b870b9b4a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { app };