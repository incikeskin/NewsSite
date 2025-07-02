// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCFVHyTb3gdQfbdBXLZODC2ShS-M4g1Ru4',
  authDomain: 'haber-site-auth.firebaseapp.com',
  projectId: 'haber-site-auth',
  storageBucket: 'haber-site-auth.firebasestorage.app',
  messagingSenderId: '51593746090',
  appId: '1:51593746090:web:bec36cc83d892c4aa4a2d3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
