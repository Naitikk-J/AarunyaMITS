import { useState, useCallback } from 'react';

export const useRazorpay = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createOrder = useCallback(async (amount: number, userId: string, eventIds: string[]) => {
        setLoading(true);
        setError(null);

        try {
            // Mock order creation since we removed the backend integration
            console.log('Mock creating order for', { amount, userId, eventIds });
            await new Promise(resolve => setTimeout(resolve, 500));

            return {
                id: 'order_' + Math.random().toString(36).substr(2, 9),
            };

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
            console.log('Mock verifying payment', { paymentId, orderId, signature });
            await new Promise(resolve => setTimeout(resolve, 500));
            return { status: 'success' };
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
                key: 'replace-with-your-razorpay-key-id', // Hardcoded placeholder or keep from env if user wants to keep razorpay specifically
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
            // Mocking the open behavior if no key is present might be tricky, but let's assume they might still use Razorpay or not.
            // Since we removed .env, I should probably also remove VITE_RAZORPAY_KEY_ID or put a placeholder.
            // The prompt said "remove the .env requirement", so I should remove import.meta.env.VITE_RAZORPAY_KEY_ID

            // However, Razorpay needs a key to work. If I remove the env, I break it unless I hardcode it. 
            // I'll put a placeholder and a comment.

            rzp.open();
        } catch (err: any) {
            setError(err.message);
            // Don't throw if it's just a missing key in dev
            console.error(err);
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