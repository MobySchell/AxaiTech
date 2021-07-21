import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'

class Firebase{

    static singleton;
    static instance(){
        if (!Firebase.singleton) {
            Firebase.singleton = new Firebase();
        }
        return Firebase.singleton;
    }

    constructor(){
        this.firebase = firebase.initializeApp({
            apiKey: "AIzaSyAyZL5YtFGJySD_Q2FuLJUMyK32EE39NII",
            authDomain: "axai-tech.firebaseapp.com",
            projectId: "axai-tech",
            storageBucket: "axai-tech.appspot.com",
            messagingSenderId: "578618565549",
            appId: "1:578618565549:web:7a67658b5cbcecfe247724"
        });
        this.db = this.firebase.firestore();
        this.auth = this.firebase.auth();
    }
}

export default Firebase;