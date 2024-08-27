// const firebase = require("firebase");
// const mongoose = require('mongoose');
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyALS5QY5b7OL3afOeB72g7wLtyohBqm2oI",
//   authDomain: "quizzie-d27c9.firebaseapp.com",
//   projectId: "quizzie-d27c9",
//   storageBucket: "quizzie-d27c9.appspot.com",
//   messagingSenderId: "361484972012",
//   appId: "1:361484972012:web:e401d507cd48addfe99ac9",
//   measurementId: "G-9VGRFTSHJL",
// };

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const User = db.collection("Users");
// module.exports = User;

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

initializeApp();

const db = getFirestore();