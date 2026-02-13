import { useState, useEffect } from 'react';

export interface User {
    id: string;
    uid: string;
    name: string;
    email: string;
    enrollment_no: string;
    created_at: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Mock initial check (always logged out initially for now)
    useEffect(() => {
        setLoading(false);
    }, []);

    const signInWithGoogle = async () => {
        setLoading(true);
        setError(null);
        try {
            // Mock sign in
            console.log('Google Sign In (Mock)');
            // Simulate success for demo purposes if needed, but for now we'll just log
            alert('Google Auth removed. This feature is disabled.');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const signInWithOTP = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            // Mock OTP
            console.log('OTP Sign In (Mock) for:', email);
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async (email: string, token: string) => {
        setLoading(true);
        setError(null);
        try {
            // Mock Verify
            console.log('Verify OTP (Mock) for:', email, token);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Log the user in with fake data (or just leave them logged out)
            // Let's create a fake user session for exploring the functionality
            setUser({
                id: 'mock-user-id',
                uid: 'mock-uid',
                name: 'Test Student',
                email: email,
                enrollment_no: '0901CS221000',
                created_at: new Date().toISOString()
            });

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (userData: {
        name: string;
        email: string;
        enrollment_no: string;
    }) => {
        setLoading(true);
        setError(null);
        try {
            console.log('Sign Up (Mock)', userData);
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Sign up successful (Mock). Check your email.');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        setLoading(true);
        try {
            console.log('Sign Out (Mock)');
            setUser(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        error,
        signInWithGoogle,
        signInWithOTP,
        verifyOTP,
        signUp,
        signOut,
        setError
    };
};