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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  await batch.commit();
};

export const convertCollectionsSnapshoptToMap = collections => {
  const transformedCollection = collections.docs.map(docSnapshot => {
    const { title, items } = docSnapshot.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// This is not neccesary when using Firebase, it is just to mimick the use case 
// of persistence When firebase is not used
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}  

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
