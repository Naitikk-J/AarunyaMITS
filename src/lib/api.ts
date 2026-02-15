import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authApi = {
    sendRegistrationOTP: (email: string) =>
        api.post('/api/auth/send-registration-otp', { email }),

    register: (userData: any) =>
        api.post('/api/auth/register', userData),

    login: (identifier: string) =>
        api.post('/api/auth/login', { identifier }),

    verifyOTP: (userId: string, otp: string) =>
        api.post('/api/auth/verify-otp', { userId, otp }),

    googleLogin: (googleData: any) =>
        api.post('/api/auth/google', googleData),

    onboardExternalParticipant: (data: any) =>
        api.post('/api/external-participants/onboarding', data),

    requestOTP: (email: string) =>
        api.post('/api/auth/otp/request-otp', { email }),

    verifyOTPGeneric: (data: any) =>
        api.post('/api/auth/otp/verify-otp', data),
};

export const paymentApi = {
    createOrder: (amount: number, currency: string = 'INR') =>
        api.post('/api/payments/create-order', { amount, currency }),

    verifyPayment: (paymentData: any) =>
        api.post('/api/payments/verify', paymentData),

    createPaymentLink: (data: { participantId: string, participantType: string, paymentType: string, quantity: number }) =>
        api.post('/api/payments/create-link', data),

    verifyPaymentExternal: (data: { razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string, participantId: string }) =>
        api.post('/api/payments/verify', data),
};

export const eventApi = {
    getEvents: () => api.get('/api/events'),
    getEventById: (id: string) => api.get(`/api/events/${id}`),
};

export const eventRegistrationApi = {
    registerForEvent: (data: any) =>
        api.post('/api/event-registrations/register', data),

    getMyEventRegistrations: (data: any) =>
        api.post('/api/event-registrations/my-registrations', data),

    getEventRegistrationById: (id: string) =>
        api.get(`/api/event-registrations/${id}`),

    listEventRegistrations: (params?: any) =>
        api.get('/api/event-registrations', { params }),

    cancelEventRegistration: (id: string) =>
        api.post(`/api/event-registrations/${id}/cancel`),

    confirmEventAttendance: (id: string) =>
        api.post(`/api/event-registrations/${id}/confirm-attendance`),

    verifyPayment: (data: any) =>
        api.post('/api/event-registrations/verify-payment', data),
};

export default api;
