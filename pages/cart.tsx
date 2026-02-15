import { motion } from 'framer-motion';
import {
	
	Trash2,
	ArrowRight,
	CreditCard,
	Shield,
} from 'lucide-react';

import productSmall from '@/assets/product-small.png';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import {
	fetchCart,
	removeFromCart,
	updateCartItem,
} from '@/store/slices/cartSlice';
import Link from 'next/link';


const DEMO_USER_ID = '6624e2faa3bd4fd5287d508e'; // Example ID from router.js comments

export default function Cart() {
	const dispatch = useDispatch<AppDispatch>();
	const { items, status } = useSelector((state: RootState) => state.cart);

	useEffect(() => {
		dispatch(fetchCart(DEMO_USER_ID));
	}, [dispatch]);

	// Calculate totals based on Redux state
	// Note: backend response structure for items might vary, assuming item.cartProduct has price
	const subtotal = items.reduce((acc, item) => {
		const price =
			item.cartProduct?.regularPrice || item.cartProduct?.price || 0;
		return acc + price * item.selQty;
	}, 0);
	const shipping = 5.0;
	const total = subtotal + shipping;

	const handleIncrement = (item: any) => {
		dispatch(
			updateCartItem({
				productId: item.cartProduct?._id,
				userId: DEMO_USER_ID,
				action: 'inc',
			}),
		);
	};

	const handleDecrement = (item: any) => {
		dispatch(
			updateCartItem({
				productId: item.cartProduct?._id,
				userId: DEMO_USER_ID,
				action: 'dec',
			}),
		);
	};

	const handleRemove = (item: any) => {
		dispatch(
			removeFromCart({ productId: item.cartProduct?._id, userId: DEMO_USER_ID }),
		);
	};
	return (
		<div className='min-h-screen bg-background text-foreground pt-32 pb-24'>
			<div className='container mx-auto px-6'>
				<h1 className='text-4xl font-serif text-white mb-12'>
					Your Shopping Bag
				</h1>

				<div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
					<div className='lg:col-span-8 space-y-8'>
						{status === 'loading' && <p>Loading cart...</p>}
						{items.map((item: any) => (
							<motion.div
								key={item._id || item.cartProduct._id}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								className='flex items-center gap-8 p-6 rounded-3xl bg-white/5 border border-white/5'>
								<div className='w-24 h-24 rounded-2xl overflow-hidden bg-black/20 shrink-0'>
									<img
										src={item.cartProduct?.image || productSmall.src}
										className='w-full h-full object-contain'
										alt={item.cartProduct?.name || 'Product'}
									/>
								</div>
								<div className='flex-1'>
									<h3 className='text-xl font-serif text-white mb-1'>
										{item.cartProduct?.name || 'Product Name'}
									</h3>
									<p className='text-primary font-medium'>
										₹{(item.cartProduct?.regularPrice || 0).toFixed(2)}
									</p>
								</div>
								<div className='flex items-center border border-white/10 rounded-full px-4 py-2 gap-4 bg-white/5'>
									<button
										onClick={() => handleDecrement(item)}
										className='text-white hover:text-primary'>
										-
									</button>
									<span className='text-white font-medium'>{item.selQty}</span>
									<button
										onClick={() => handleIncrement(item)}
										className='text-white hover:text-primary'>
										+
									</button>
								</div>
								<p className='text-white font-bold min-w-[80px] text-right'>
									₹
									{(
										(item.cartProduct?.regularPrice || 0) * item.selQty
									).toFixed(2)}
								</p>
								<button
									onClick={() => handleRemove(item)}
									className='text-gray-500 hover:text-destructive transition-colors'>
									<Trash2 className='w-5 h-5' />
								</button>
							</motion.div>
						))}
						{items.length === 0 && status !== 'loading' && (
							<p className='text-gray-400'>Your cart is empty.</p>
						)}
					</div>

					<div className='lg:col-span-4'>
						<div className='p-8 rounded-3xl bg-white/5 border border-white/5 sticky top-32'>
							<h2 className='text-2xl font-serif text-white mb-8'>
								Order Summary
							</h2>
							<div className='space-y-4 mb-8'>
								<div className='flex justify-between text-gray-400'>
									<span>Subtotal</span>
									<span className='text-white'>₹{subtotal.toFixed(2)}</span>
								</div>
								<div className='flex justify-between text-gray-400'>
									<span>Shipping</span>
									<span className='text-white'>₹{shipping.toFixed(2)}</span>
								</div>
								<div className='pt-4 border-t border-white/10 flex justify-between'>
									<span className='text-xl font-serif text-white'>Total</span>
									<span className='text-xl font-bold text-primary'>
										₹{total.toFixed(2)}
									</span>
								</div>
							</div>
							<Link href='/checkout'>
								<button className='w-full py-4 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3'>
									Proceed to Checkout <ArrowRight className='w-4 h-4' />
								</button>
							</Link>

							<div className='mt-8 pt-8 border-t border-white/10 space-y-4'>
								<div className='flex items-center gap-3 text-xs text-gray-500'>
									<Shield className='w-4 h-4 text-primary' />
									<span>Secure checkout with SSL encryption</span>
								</div>
								<div className='flex items-center gap-3 text-xs text-gray-500'>
									<CreditCard className='w-4 h-4 text-primary' />
									<span>All major payment methods accepted</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
