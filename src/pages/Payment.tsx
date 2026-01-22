import { useEffect, useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ amount: 1000, currency: 'INR' }), // Example amount
      });

      const order = await response.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Aarunya',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verificationResponse = await fetch('/api/payment/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verificationData = await verificationResponse.json();

            if (verificationResponse.ok) {
              toast({ title: 'Payment Successful', description: `Payment ID: ${response.razorpay_payment_id}` });
              window.location.href = '/confirmation';
            } else {
              toast({ title: 'Payment Verification Failed', description: verificationData.message, variant: 'destructive' });
            }
          } catch (error) {
            toast({ title: 'Payment Verification Error', description: 'An error occurred while verifying the payment.', variant: 'destructive' });
          }
        },
        prefill: {
          name: 'Test User',
          email: 'test.user@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Test Address',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast({ title: 'Payment Error', description: 'An error occurred while creating the order.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <div className="container mx-auto px-6 py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Complete Your Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">To complete your registration, please make a payment of ₹1000.</p>
            <Button onClick={handlePayment} disabled={loading}>
              {loading ? 'Processing...' : 'Pay Now'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
