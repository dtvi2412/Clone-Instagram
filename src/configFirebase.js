import * as firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3jtjMYHP8nnfg_O1oauaT0fNorbUSi-E",
    authDomain: "clone-netflix-reacjs.firebaseapp.com",
    databaseURL: "https://clone-netflix-reacjs.firebaseio.com",
    projectId: "clone-netflix-reacjs",
    storageBucket: "clone-netflix-reacjs.appspot.com",
    messagingSenderId: "392037908462",
    appId: "1:392037908462:web:9005077776cc10cff0d8ff",
    measurementId: "G-PD3Z3TFHB7"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();