import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/lib/supabase';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check initial session
        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session) {
                    await fetchUserProfile(session.user.id);
                }
            } catch (err) {
                console.error('Error checking session:', err);
            } finally {
                setLoading(false);
            }
        };

        checkSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    await fetchUserProfile(session.user.id);
                } else {
                    setUser(null);
                }
                setLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const fetchUserProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (error && error.code !== 'PGRST116') {
                throw error;
            }

            if (data) {
                setUser(data);
            }
        } catch (err) {
            console.error('Error fetching user profile:', err);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        hd: 'mitsgwl.ac.in' // Restrict to MITS domain
                    },
                    redirectTo: window.location.origin + '/unified-registration'
                }
            });

            if (error) throw error;
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
            // Validate MITS email domain
            if (!email.endsWith('@mitsgwl.ac.in')) {
                throw new Error('Only MITS email addresses are allowed');
            }

            console.log('Calling Supabase signInWithOtp for:', email);

            const { data, error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: window.location.origin + '/unified-registration'
                }
            });

            console.log('Supabase OTP response:', { data, error });

            if (error) {
                console.error('Supabase OTP error:', error);
                throw error;
            }

            console.log('OTP request successful');
        } catch (err: any) {
            console.error('signInWithOTP error:', err);
            setError(err.message);
            throw err; // Re-throw to let caller handle it
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async (email: string, token: string) => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.verifyOtp({
                email,
                token,
                type: 'email'
            });

            if (error) throw error;

            if (data.user) {
                await fetchUserProfile(data.user.id);
            }
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
            // Validate MITS email domain
            if (!userData.email.endsWith('@mitsgwl.ac.in')) {
                throw new Error('Only MITS email addresses are allowed');
            }

            // Check if enrollment number already exists
            const { data: existingUser, error: checkError } = await supabase
                .from('users')
                .select('id')
                .eq('enrollment_no', userData.enrollment_no)
                .single();

            if (checkError && checkError.code !== 'PGRST116') {
                throw checkError;
            }

            if (existingUser) {
                throw new Error('Enrollment number already registered');
            }

            // Create user in auth using OTP flow
            const { error: authError } = await supabase.auth.signInWithOtp({
                email: userData.email,
                options: {
                    emailRedirectTo: window.location.origin + '/register'
                }
            });

            if (authError) throw authError;
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        setLoading(true);
        try {
            await supabase.auth.signOut();
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