import { motion } from 'framer-motion';
import { Package, ArrowLeft, ShoppingBag, ArrowRight, Clock, CheckCircle2, Truck } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const STATUS_STYLES: Record<string, { color: string; Icon: any }> = {
    ORDERED:   { color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', Icon: Clock },
    CONFIRMED: { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', Icon: CheckCircle2 },
    SHIPPED:   { color: 'text-primary bg-primary/10 border-primary/20', Icon: Truck },
    DELIVERED: { color: 'text-green-400 bg-green-400/10 border-green-400/20', Icon: CheckCircle2 },
};

export default function Orders() {
    const router = useRouter();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch('https://api.velorm.com/api/v1/order/get-all-orders');
                const data = await res.json();
                const allOrders: any[] = data.response || [];
                // Filter to only this user's orders
                const myOrders = allOrders.filter((o: any) => o.user?._id === user?._id);
                setOrders(myOrders);
            } catch (err) {
                console.error('Failed to fetch orders', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated, user, router]);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <div className="flex items-center gap-4 mb-12">
                        <Package className="w-8 h-8 text-primary" />
                        <h1 className="text-4xl md:text-5xl font-serif text-white">My Orders</h1>
                    </div>

                    {loading ? (
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-40 rounded-[2rem] bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : orders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-28 rounded-[2.5rem] bg-white/5 border border-white/5"
                        >
                            <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-6" />
                            <p className="text-xl text-gray-400 mb-8">No orders yet</p>
                            <Link href="/shop">
                                <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform">
                                    Explore Collection <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order, i) => {
                                const statusKey = (order.status || 'ORDERED').toUpperCase();
                                const { color, Icon } = STATUS_STYLES[statusKey] || STATUS_STYLES['ORDERED'];
                                const date = order.createdAt
                                    ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                                    : '—';

                                return (
                                    <motion.div
                                        key={order._id || i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        className="p-6 sm:p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                                    >
                                        {/* Header Row */}
                                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Order ID</p>
                                                <p className="text-sm text-white font-mono">{order._id}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 mb-1">{date}</p>
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${color}`}>
                                                    <Icon className="w-3 h-3" />
                                                    {statusKey}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Products */}
                                        <div className="space-y-3 mb-6">
                                            {(order.product || []).map((p: any, j: number) => (
                                                <div key={j} className="flex items-center gap-4">
                                                    {p.id?.image && (
                                                        <img
                                                            src={p.id.image}
                                                            alt={p.id?.name}
                                                            className="w-12 h-12 rounded-xl object-cover bg-white/10 flex-shrink-0"
                                                        />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-white truncate">{p.id?.name || 'Product'}</p>
                                                        <p className="text-xs text-gray-500">Qty: {p.selQty}</p>
                                                    </div>
                                                    {p.id?.price && (
                                                        <p className="text-sm text-white">₹{(p.id.price * p.selQty).toFixed(2)}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Footer Row */}
                                        <div className="pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                                                <p className="text-sm text-gray-300">{order.shippingaddress?.address || '—'}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 mb-1">Total</p>
                                                <p className="text-xl font-bold text-primary">₹{order.amount?.toFixed(2) || '—'}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
