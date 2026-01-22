import { MainNavigation } from '@/components/ui/MainNavigation';

const Confirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Registration Complete!</h1>
        <p className="text-lg">Thank you for registering. Your payment was successful and you will receive an email confirmation shortly.</p>
      </div>
    </div>
  );
};

export default Confirmation;
