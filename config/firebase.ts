import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyB9Q3uaervFXFACenmFpC463TZA8NGqkI0",
  authDomain: "netflix-clone-f2601.firebaseapp.com",
  projectId: "netflix-clone-f2601",
  storageBucket: "netflix-clone-f2601.appspot.com",
  messagingSenderId: "959106441421",
  appId: "1:959106441421:web:75b29ee2c93b7dc652c984"
};


export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()