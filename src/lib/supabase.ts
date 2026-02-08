import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
});

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