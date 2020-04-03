import firebase from "firebase/app";


const firebaseConfig = {
    apiKey: null,
    authDomain: null,
    databaseURL: null,
    projectId: null,
    storageBucket: null,
    messagingSenderId: null,
    appId: null
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  