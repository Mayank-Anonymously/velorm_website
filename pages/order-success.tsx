import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function OrderSuccess() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-background flex items-center justify-center pt-32 pb-24 px-6">
                {/* Background glow */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full max-w-lg text-center relative z-10"
                >
                    {/* Animated check icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-28 h-28 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-10"
                    >
                        <CheckCircle2 className="w-14 h-14 text-primary" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-serif text-white mb-4">
                            Order Placed!
                        </h1>
                        <p className="text-gray-400 text-lg mb-3 leading-relaxed">
                            Thank you for your order. We've received it and will begin processing shortly.
                        </p>
                        <p className="text-gray-500 text-sm mb-12">
                            You'll receive a confirmation once your order is dispatched.
                        </p>

                        {/* Info card */}
                        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 mb-10 text-left space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Payment Method</span>
                                <span className="text-sm font-medium text-white">Cash on Delivery</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Estimated Delivery</span>
                                <span className="text-sm font-medium text-white">3–5 Business Days</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Status</span>
                                <span className="text-sm font-bold text-primary uppercase tracking-wider">Ordered</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/orders" className="flex-1">
                                <button className="w-full py-4 bg-primary text-black font-bold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                    <ShoppingBag className="w-4 h-4" /> View My Orders
                                </button>
                            </Link>
                            <Link href="/" className="flex-1">
                                <button className="w-full py-4 border border-white/15 text-white font-medium rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                                    <Home className="w-4 h-4" /> Back to Home
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}
