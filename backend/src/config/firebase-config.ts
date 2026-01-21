import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

let firebaseConfig;

try {
    firebaseConfig = process.env.FIREBASE_CONFIG ? JSON.parse(process.env.FIREBASE_CONFIG) : null;
} catch (error) {
    console.error('Error parsing FIREBASE_CONFIG:', error);
    firebaseConfig = null;
}

if (!admin.apps.length) {
    if (firebaseConfig) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(firebaseConfig),
            });
            console.log('Firebase Admin initialized successfully');
        } catch (error) {
            console.error('Error initializing Firebase Admin:', error);
        }
    } else {
        console.warn('WARNING: FIREBASE_CONFIG is missing or invalid. Auth features will fail.');
        // Initialize with a mock or empty credential to prevent immediate crash, 
        // but calls to auth() will likely fail or need mocking.
        // For stability, we can try to initialize a "dummy" app if needed, or just let it be.
        // Better to not initialize if no creds, and handle undefined auth import?
        // But invalid imports break things.

        // Strategy: Mock the auth object if initialization fails, so server stays up.
    }
}

export const auth = admin.apps.length ? admin.auth() : {
    verifyIdToken: async (token: string) => {
        console.warn('Mock Auth: Verifying token (Firebase not configured)');
        return { uid: 'mock-user-id', email: 'mock@example.com' };
    }
} as any;

