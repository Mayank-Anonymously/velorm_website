import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { createOrder } from '@/store/slices/orderSlice';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PaymentStatus() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch<AppDispatch>();
    const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
    const [message, setMessage] = useState('Verifying your payment...');

    useEffect(() => {
        if (id) {
            const verifyPayment = async () => {
                try {
                    const apiBase = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
                        ? 'http://localhost:9291' 
                        : 'https://api.velorm.com';
                    const res = await fetch(`${apiBase}/api/v1/payment/status`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ merchantTransactionId: id })
                    });
                    const data = await res.json();
                    
                    if (data.response?.code === 'PAYMENT_SUCCESS') {
                        // Retrieve temp order data and place final order
                        const tempOrderData = localStorage.getItem('temp_order_data');
                        if (tempOrderData) {
                            const orderData = JSON.parse(tempOrderData);
                            orderData.status = 'ORDERED';
                            orderData.paymentId = id;
                            
                            const result = await dispatch(createOrder(orderData));
                            if (createOrder.fulfilled.match(result)) {
                                setStatus('success');
                                setMessage('Payment successful! Your order has been placed.');
                                localStorage.removeItem('temp_order_data');
                            } else {
                                throw new Error('Failed to create order despite payment success');
                            }
                        } else {
                            setStatus('success');
                            setMessage('Payment successful! (Order already processed)');
                        }
                    } else {
                        setStatus('failed');
                        setMessage(data.response?.message || 'Payment failed. Please try again.');
                    }
                } catch (error) {
                    console.error('Verification error:', error);
                    setStatus('failed');
                    setMessage('An error occurred during verification.');
                }
            };
            verifyPayment();
        }
    }, [id, dispatch]);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-20 px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full p-10 rounded-[3rem] bg-white/5 border border-white/5 text-center"
                >
                    {status === 'loading' && (
                        <div className="flex flex-col items-center gap-6">
                            <Loader2 className="w-16 h-16 text-primary animate-spin" />
                            <h1 className="text-2xl font-serif text-white">Verifying Payment</h1>
                            <p className="text-gray-400">{message}</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h1 className="text-3xl font-serif text-white">Payment Success!</h1>
                            <p className="text-gray-400 leading-relaxed">{message}</p>
                            <Link href="/orders" className="w-full">
                                <button className="w-full py-4 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
                                    View My Orders <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    )}

                    {status === 'failed' && (
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                                <XCircle className="w-10 h-10" />
                            </div>
                            <h1 className="text-3xl font-serif text-white">Payment Failed</h1>
                            <p className="text-gray-400 leading-relaxed">{message}</p>
                            <Link href="/checkout" className="w-full">
                                <button className="w-full py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors">
                                    Try Again
                                </button>
                            </Link>
                        </div>
                    )}
                </motion.div>
            </div>
            <Footer />
        </>
    );
}
