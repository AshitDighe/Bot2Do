import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCGnzZH10AWeSaaCEIX7K-gMWXrHFskUlA",
    authDomain: "bo2do-fac72.firebaseapp.com",
    projectId: "bo2do-fac72",
    storageBucket: "bo2do-fac72.appspot.com",
    messagingSenderId: "85269353801",
    appId: "1:85269353801:web:5a94a7bf7c9d3ec4e53698",
    measurementId: "G-WSBS0HDE15"
  };


export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
