import { useState, useEffect, useCallback } from 'react';
import { authApi } from '@/lib/api';

export interface User {
    id: string;
    uid?: string;
    name: string;
    email: string;
    aarunyaId?: string;
    category?: string;
    enrollment_no?: string;
    created_at?: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>((() => {
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser && savedUser !== 'undefined') {
                return JSON.parse(savedUser);
            }
            return null;
        } catch {
            return null;
        }
    })());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tempUserId, setTempUserId] = useState<string | null>(null);

    const signInWithGoogle = async (googleData?: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authApi.googleLogin(googleData);
            console.log('[Auth] googleLogin raw response.data:', JSON.stringify(response.data).substring(0, 500));
            const payload = response.data?.data || response.data;
            const userData = payload?.user || payload;
            const token = payload?.token || response.data?.token;
            if (userData) {
                const normalizedUser = { ...userData, id: userData.id || userData._id };
                setUser(normalizedUser);
                localStorage.setItem('user', JSON.stringify(normalizedUser));
            }
            if (token) {
                localStorage.setItem('authToken', token);
            }
            return userData;
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signInWithOTP = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authApi.requestOTP(email);
            return response.data;
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async (email: string, otp: string, userData?: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authApi.verifyOTPGeneric({
                email,
                otp,
                ...userData
            });
            console.log('[Auth] verifyOTP raw response.data:', JSON.stringify(response.data).substring(0, 500));
            // Handle both response.data.data.user and response.data.user structures
            const payload = response.data?.data || response.data;
            const userDataRes = payload?.user || payload;
            const token = payload?.token || response.data?.token;

            if (userDataRes) {
                // Ensure user has an id field
                const normalizedUser = { ...userDataRes, id: userDataRes.id || userDataRes._id };
                setUser(normalizedUser);
                localStorage.setItem('user', JSON.stringify(normalizedUser));
            }
            if (token) {
                localStorage.setItem('authToken', token);
            }
            return userDataRes;
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (userData: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authApi.register(userData);
            console.log('[Auth] signUp raw response.data:', JSON.stringify(response.data).substring(0, 500));
            const payload = response.data?.data || response.data;
            const newUser = payload?.user || payload;
            const token = payload?.token || response.data?.token;
            if (newUser) {
                const normalizedUser = { ...newUser, id: newUser.id || newUser._id };
                setUser(normalizedUser);
                localStorage.setItem('user', JSON.stringify(normalizedUser));
            }
            if (token) {
                localStorage.setItem('authToken', token);
            }
            return newUser;
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signOut = useCallback(async () => {
        setLoading(true);
        try {
            setUser(null);
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

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