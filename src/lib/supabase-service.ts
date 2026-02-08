import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// Service role client for server-side operations
export const supabaseService = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
  },
});

// Helper functions for database operations
export const db = {
  users: {
    create: async (userData: {
      id: string;
      uid: string;
      name: string;
      email: string;
      enrollment_no: string;
    }) => {
      const { data, error } = await supabaseService
        .from('users')
        .insert([userData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    findByEmail: async (email: string) => {
      const { data, error } = await supabaseService
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },

    findByEnrollment: async (enrollment_no: string) => {
      const { data, error } = await supabaseService
        .from('users')
        .select('*')
        .eq('enrollment_no', enrollment_no)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  },

  events: {
    getAll: async () => {
      const { data, error } = await supabaseService
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    getById: async (id: string) => {
      const { data, error } = await supabaseService
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  },

  registrations: {
    create: async (registrationData: {
      user_id: string;
      event_id: string;
      payment_status: string;
    }) => {
      const { data, error } = await supabaseService
        .from('registrations')
        .insert([registrationData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    findByUser: async (userId: string) => {
      const { data, error } = await supabaseService
        .from('registrations')
        .select(`
          *,
          events (
            event_name,
            club_name,
            fee,
            is_free
          )
        `)
        .eq('user_id', userId);
      
      if (error) throw error;
      return data;
    },
  },

  payments: {
    create: async (paymentData: {
      user_id: string;
      razorpay_order_id: string;
      amount: number;
      status: string;
    }) => {
      const { data, error } = await supabaseService
        .from('payments')
        .insert([paymentData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    update: async (id: string, updates: any) => {
      const { data, error } = await supabaseService
        .from('payments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
  },

  epasses: {
    create: async (epassData: {
      user_id: string;
      qr_data: any;
      pass_url: string;
    }) => {
      const { data, error } = await supabaseService
        .from('epasses')
        .insert([epassData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    findByUser: async (userId: string) => {
      const { data, error } = await supabaseService
        .from('epasses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      return data?.[0];
    },
  },
};