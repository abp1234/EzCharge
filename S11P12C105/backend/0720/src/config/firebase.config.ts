// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as admin from 'firebase-admin';
import * as serviceAccount from "./firebase-service-account.json";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId
};




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// admin.initializeApp({
//   credential: admin.credential.cert(firebaseConfig),
// });
export const firebaseAdmin = admin;