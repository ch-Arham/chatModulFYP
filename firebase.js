import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9IXRwuqexeQpn3n1Gu8DtA1TqqZebp5Y",
  authDomain: "mychat-535df.firebaseapp.com",
  projectId: "mychat-535df",
  storageBucket: "mychat-535df.appspot.com",
  messagingSenderId: "237124362632",
  appId: "1:237124362632:web:3a7af7efa72ab46ba61a3d"
  };

  let app;

  if (firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
  } else{
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export { db , auth, app };