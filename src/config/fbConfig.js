// import components
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

const config = {
  apiKey: "AIzaSyBeL50uQozl75sBsBVJS78zG4mWgMS5hv8",
  authDomain: "message-board-3cbab.firebaseapp.com",
  databaseURL: "https://message-board-3cbab.firebaseio.com",
  projectId: "message-board-3cbab",
  storageBucket: "message-board-3cbab.appspot.com",
  messagingSenderId: "563288636866",
  appId: "1:563288636866:web:45685d015f7eac639c2a5b"
};

// initialise firebase with config
firebase.initializeApp(config);

export default firebase;