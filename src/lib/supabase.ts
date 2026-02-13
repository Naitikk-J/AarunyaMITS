import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. Please check your .env file.');
    console.error('VITE_SUPABASE_URL present:', !!supabaseUrl);
    console.error('VITE_SUPABASE_ANON_KEY present:', !!supabaseAnonKey);
}

// Fallback to avoid crash during build if env vars are missing, but real usage will fail
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        },
    }
);

// Type definitions for our database
export interface User {
    id: string;
    uid: string;
    name: string;
    email: string;
    enrollment_no: string;
    created_at: string;
}

export interface Event {
    id: string;
    event_name: string;
    club_name: string;
    fee: number;
    is_free: boolean;
    created_at: string;
}

export interface Registration {
    id: string;
    user_id: string;
    event_id: string;
    payment_status: string;
    created_at: string;
}

export interface Payment {
    id: string;
    user_id: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    amount: number;
    status: string;
    created_at: string;
}

export interface EPass {
    id: string;
    user_id: string;
    qr_data: any;
    pass_url: string;
    created_at: string;
}