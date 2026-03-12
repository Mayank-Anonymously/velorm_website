import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ValidateTransaction() {
    const router = useRouter();
    const { transactionId } = router.query;
    const [statusText, setStatusText] = useState('Verifying your payment...');

    useEffect(() => {
        if (!transactionId) return;

        const validate = async () => {
            try {
                const apiBase = typeof window !== 'undefined' && window.location.hostname === 'localhost'
                    ? 'http://localhost:9291'
                    : 'https://api.velorm.com';

                const res = await fetch(`${apiBase}/api/v1/order/validate-transaction/${transactionId}`);
                const data = await res.json();
                console.log('Validation response:', data);

                if (data.baseResponse?.status === 1) {
                    const amount = data.response?.amount;
                    const txnId = data.response?.transactionId || transactionId;
                    router.replace(`/order-success?transactionId=${txnId}&amount=${amount || ''}`);
                } else {
                    const message = data.baseResponse?.message || 'Payment verification failed';
                    router.replace(`/order-failed?message=${encodeURIComponent(message)}`);
                }
            } catch (error) {
                console.error('Validation error:', error);
                setStatusText('Something went wrong. Redirecting...');
                setTimeout(() => {
                    router.replace(`/order-failed?message=${encodeURIComponent('Unable to verify payment. Please contact support.')}`);
                }, 2000);
            }
        };

        validate();
    }, [transactionId, router]);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-20 px-4">
                <div className="max-w-md w-full p-10 rounded-[3rem] bg-white/5 border border-white/5 text-center">
                    <div className="flex flex-col items-center gap-6">
                        <Loader2 className="w-16 h-16 text-primary animate-spin" />
                        <h1 className="text-2xl font-serif text-white">Verifying Payment</h1>
                        <p className="text-gray-400">{statusText}</p>
                        <p className="text-gray-600 text-xs">Please do not close this page.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
