import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const isConfigured = !!firebaseConfig.apiKey;

let app;
let authInstance;

if (isConfigured) {
    try {
        app = initializeApp(firebaseConfig);
        authInstance = getAuth(app);
    } catch (error) {
        console.error('Firebase initialization error:', error);
    }
}

export const auth = authInstance;
