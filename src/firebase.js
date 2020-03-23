import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAVcRjM3Wsc-3yQf9YxKfcZ57MgjpwD4jA",
  authDomain: "smartgoaltracker-track.firebaseapp.com",
  databaseURL: "https://smartgoaltracker-track.firebaseio.com",
  projectId: "smartgoaltracker-track",
  storageBucket: "smartgoaltracker-track.appspot.com",
  messagingSenderId: "829929046479",
  appId: "1:829929046479:web:a142734aeb3ff9ea5c52ba"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
