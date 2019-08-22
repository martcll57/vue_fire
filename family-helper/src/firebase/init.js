 import firebase from 'firebase'
 import firestore from 'firebase/firestore'
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyD4-cUcXhfbQQWCDQaA7GBLz43cUJx4tNU",
    authDomain: "family-helper-edce7.firebaseapp.com",
    databaseURL: "https://family-helper-edce7.firebaseio.com",
    projectId: "family-helper-edce7",
    storageBucket: "family-helper-edce7.appspot.com",
    messagingSenderId: "459136636860",
    appId: "1:459136636860:web:37d5fd269431d224"
  };
  // Initialize Firebase
 const firebaseApp = firebase.initializeApp(firebaseConfig);
 firebaseApp.firestore().settings({ timestampsInSnapshots: true })
 //export firestore database
 export default firebaseApp.firestore()
