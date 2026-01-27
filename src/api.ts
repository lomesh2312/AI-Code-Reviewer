import { auth } from './firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL;
if (!API_BASE_URL) {
    console.error('VITE_API_URL is not defined. Please set it in your environment variables.');
}


export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    if (!auth) {
        throw new Error('Firebase Authentication is not initialized');
    }
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User not authenticated');
    }

    const token = await user.getIdToken();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let errorMessage = 'API request failed';
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } catch {
            // If response is not JSON, use status text
            errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
    }

    return response.json();
};
