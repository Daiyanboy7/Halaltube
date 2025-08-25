
import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
  projectId: "halaltube-aywjt",
  appId: "1:884230837831:web:d5d2889adfa67413174362",
  storageBucket: "halaltube-aywjt.firebasestorage.app",
  apiKey: "AIzaSyAD3809OQODmpvJ-wWB-V8lEZhcGtCu_GI",
  authDomain: "halaltube-aywjt.firebaseapp.com",
  messagingSenderId: "884230837831"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
