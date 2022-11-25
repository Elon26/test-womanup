import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyCecBgYGj0i6OUYOUs7chyA0oc6exzCato",
    authDomain: "womanup-11d5e.firebaseapp.com",
    databaseURL: "https://womanup-11d5e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "womanup-11d5e",
    storageBucket: "womanup-11d5e.appspot.com",
    messagingSenderId: "487084775906",
    appId: "1:487084775906:web:4507267ec9ad796265c1bb",
    measurementId: "G-E5J1YJKLBV"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);