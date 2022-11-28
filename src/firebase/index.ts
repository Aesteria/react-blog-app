import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCHFgSeQsrHq9imSjsfBUYODjuN8J6TRyg',
  authDomain: 'blog-firebase-7e160.firebaseapp.com',
  projectId: 'blog-firebase-7e160',
  storageBucket: 'blog-firebase-7e160.appspot.com',
  messagingSenderId: '377960262363',
  appId: '1:377960262363:web:b01033fcdf51a94599fafe',
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
