// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr2eqZ4WsxjGN5kFuP-uDIVvcXPc7jun4",
  authDomain: "netflixgpt-6e84a.firebaseapp.com",
  projectId: "netflixgpt-6e84a",
  storageBucket: "netflixgpt-6e84a.appspot.com",
  messagingSenderId: "340362479521",
  appId: "1:340362479521:web:d85c7176c1a7fa9b35ede0",
  measurementId: "G-7DKDTY8FCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();