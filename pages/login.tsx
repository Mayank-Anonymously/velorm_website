import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from '@/store/slices/authSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Login() {
    const [contact, setContact] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Contact, 2: OTP
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { status, error } = useSelector((state: RootState) => state.auth);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(sendOtp({ contact }));
        if (sendOtp.fulfilled.match(result)) {
            setStep(2);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(verifyOtp({ contact, otp }));
        if (verifyOtp.fulfilled.match(result)) {
            // Check if user has name/email, if not, redirect to complete-profile (signup)
            const user = result.payload.user;
            if (!user.name) {
                router.push('/signup');
            } else {
                router.push('/');
            }
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-background flex items-center justify-center pt-32 pb-24 px-6">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative z-10"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-serif text-white mb-3">Welcome Back</h1>
                        <p className="text-gray-400">Experience premium care with Velorm</p>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Mobile Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input 
                                        type="tel"
                                        required
                                        placeholder="Enter your mobile number"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-primary text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Sending...' : (
                                    <>Get Verification Code <ArrowRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Verification Code</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input 
                                        type="text"
                                        required
                                        placeholder="Enter 6-digit OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white tracking-[0.5em] font-mono placeholder:tracking-normal placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                            <button 
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-primary text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Verifying...' : (
                                    <>Verify & Continue <CheckCircle2 className="w-5 h-5" /></>
                                )}
                            </button>

                            <button 
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full text-sm text-gray-400 hover:text-white transition-colors py-2"
                            >
                                Change Mobile Number
                            </button>
                        </form>
                    )}

                    <p className="mt-8 text-center text-xs text-gray-500 leading-relaxed">
                        By continuing, you agree to Velorm's <br />
                        <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>
                    </p>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}
