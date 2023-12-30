
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBtlyHTKo7oulXS8wWcrBuH4Nd_rM9dIjU",
  authDomain: "laundry-application-179f7.firebaseapp.com",
  projectId: "laundry-application-179f7",
  storageBucket: "laundry-application-179f7.appspot.com",
  messagingSenderId: "935539288060",
  appId: "1:935539288060:web:c7016dab494bd8d0ee7479"
};


const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore();

export {auth,db};