import firebase from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAp-ssSHWN7_ElVSfbDnCoAGRLx6k18Tnc",
    authDomain: "tenedores-7f552.firebaseapp.com",
    databaseURL: "https://tenedores-7f552.firebaseio.com",
    projectId: "tenedores-7f552",
    storageBucket: "tenedores-7f552.appspot.com",
    messagingSenderId: "367014555627",
    appId: "1:367014555627:web:0c663fc8f6ab09113333ae"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);