import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBWwsYntNC6eVhHx9S9xGidVz52_QVb22Y",
  authDomain: "crwn-db-react-follow-along.firebaseapp.com",
  databaseURL: "https://crwn-db-react-follow-along.firebaseio.com",
  projectId: "crwn-db-react-follow-along",
  storageBucket: "",
  messagingSenderId: "478560058013",
  appId: "1:478560058013:web:9e71f688a66501d4"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
