
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import { createContext, useContext } from "react";
import { getDatabase,set,ref } from "firebase/database";
import { getFirestore } from "firebase/firestore";
const FireBaseContext=createContext(null);
export const useFirebase=()=>useContext(FireBaseContext);
import config from '../../config.js';
const firebaseConfig = {
  apiKey:config.VITE_API_KEY,
  authDomain:config.VITE_AUTH_DOMAIN,
  projectId:config.VITE_PROJECT_ID,
  storageBucket:config.VITE_STORAGE_BUCKET,
  messagingSenderId:config.VITE_MESSAGING_SENDER_ID,
  appId:config.VITE_APP_ID,
  measurementId:config.VITE_MEASUREMENT_ID,
  databaseURL:config.VITE_DATABASE_URL
};


const app= initializeApp(firebaseConfig);
const FireBaseAuth=getAuth(app);
const database=getDatabase(app);
const db = getFirestore(app);
export const FirebaseProvider=(props)=>{
  const signupwithemailandpassword=(email,password)=>{
    createUserWithEmailAndPassword(FireBaseAuth,email,password);
  }
  const putdata=(data,key)=>{
    return set(ref(database,key),data);
  }
  return(<FireBaseContext.Provider value={{signupwithemailandpassword,putdata}}>
      {props.children}
    </FireBaseContext.Provider>)
}

export default app;