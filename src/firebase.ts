// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyASn8q7wQYDn51V_XLrJqerxtZwWHLRjwk',
  authDomain: 'zing-mp3-cca65.firebaseapp.com',
  projectId: 'zing-mp3-cca65',
  storageBucket: 'zing-mp3-cca65.appspot.com',
  messagingSenderId: '735337967687',
  appId: '1:735337967687:web:cb768c7a130e95c9790162',
  measurementId: 'G-CXDYBETTNQ',
};

// Initialize Firebase
/* eslint-disable */
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
