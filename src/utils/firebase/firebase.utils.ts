import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0SDW9CFw0TjYtVoDRXOZ9Zqiey7Q551k",
  authDomain: "crown-clothing-db-2789b.firebaseapp.com",
  projectId: "crown-clothing-db-2789b",
  storageBucket: "crown-clothing-db-2789b.appspot.com",
  messagingSenderId: "825254140653",
  appId: "1:825254140653:web:f14a6263f69a421e950ae4",
};

const app = initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});

facebookAuthProvider.setCustomParameters({
  display: "popup",
});

export const auth = getAuth(app);

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleAuthProvider);
export const signInWithFacebookPopup = () =>
  signInWithPopup(auth, facebookAuthProvider);

export const db = getFirestore(app);

export const createUserDocumentFromAuth = async (userAuth: User) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error: any) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
