import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "./config/firebase-config";

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
