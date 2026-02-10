import { useState, useCallback } from 'react';

export const useRazorpay = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createOrder = useCallback(async (amount: number, userId: string, eventIds: string[]) => {
        setLoading(true);
        setError(null);

        try {
            const { data: { session } } = await import('@/lib/supabase').then(m => m.supabase.auth.getSession());
            const token = session?.access_token;

            const response = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                },
                body: JSON.stringify({
                    amount: amount * 100, // Convert to paise
                    userId,
                    eventIds
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const data = await response.json();
            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const verifyPayment = useCallback(async (paymentId: string, orderId: string, signature: string) => {
        setLoading(true);
        setError(null);

        try {
            const { data: { session } } = await import('@/lib/supabase').then(m => m.supabase.auth.getSession());
            const token = session?.access_token;

            const response = await fetch('/api/payment/verify-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                },
                body: JSON.stringify({
                    razorpay_order_id: orderId,
                    razorpay_payment_id: paymentId,
                    razorpay_signature: signature
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to verify payment');
            }

            const data = await response.json();
            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const loadRazorpay = useCallback(() => {
        return new Promise((resolve, reject) => {
            if (window.Razorpay) {
                resolve(window.Razorpay);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(window.Razorpay);
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }, []);

    const openPaymentModal = useCallback(async (
        orderId: string,
        amount: number,
        currency: string,
        name: string,
        description: string,
        handler: (response: any) => void
    ) => {
        try {
            await loadRazorpay();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: amount * 100, // Razorpay expects amount in paise
                currency,
                name,
                description,
                order_id: orderId,
                handler,
                prefill: {
                    // Add user details if available
                },
                theme: {
                    color: '#ff00ff'
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    }, [loadRazorpay]);

    return {
        loading,
        error,
        createOrder,
        verifyPayment,
        openPaymentModal,
        setError
    };
};