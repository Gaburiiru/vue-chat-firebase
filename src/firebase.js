import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBEx1fWLO5R-1NazsSUP1Sr0NVcFiz9tk0",
  authDomain: "vue-chat-5c675.firebaseapp.com",
  projectId: "vue-chat-5c675",
  storageBucket: "vue-chat-5c675.appspot.com",
  messagingSenderId: "1055090742715",
  appId: "1:1055090742715:web:573075db443f9a525ba09e",
};

// Initialize Firebase
firebase.initializeApp(config);
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();

export { firebase, auth, db, storage };
