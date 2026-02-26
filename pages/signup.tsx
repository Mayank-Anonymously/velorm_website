import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '@/store/slices/authSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user, status, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else if (user?.name) {
            router.push('/');
        }
    }, [isAuthenticated, user, router]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.contact) return;

        const result = await dispatch(updateProfile({ 
            name, 
            email, 
            contact: user.contact.toString() 
        }));
        
        if (updateProfile.fulfilled.match(result)) {
            router.push('/');
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
                        <h1 className="text-4xl font-serif text-white mb-3">Almost There</h1>
                        <p className="text-gray-400">Complete your profile to start your journey</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input 
                                    type="text"
                                    required
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input 
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                        <button 
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-4 bg-primary text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Saving...' : (
                                <>Complete Profile <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}
