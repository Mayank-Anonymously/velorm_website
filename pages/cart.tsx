import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import {
	fetchCart,
	removeFromCart,
	updateCartItem,
} from '@/store/slices/cartSlice';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getEffectiveUserId } from '@/lib/auth';

export default function Cart() {
	const dispatch = useDispatch<AppDispatch>();
	const { items, status } = useSelector((state: RootState) => state.cart);
	const { user } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		const userId = getEffectiveUserId(user);
		dispatch(fetchCart(userId));
	}, [dispatch, user]);

	const handleRemove = (productId: string) => {
		const userId = getEffectiveUserId(user);
		dispatch(removeFromCart({ productId, userId }));
	};

	const handleIncrement = (item: any) => {
		const userId = getEffectiveUserId(user);
		dispatch(
			updateCartItem({
				productId: item.cartProduct._id,
				userId,
				action: 'inc',
			}),
		);
	};

	const handleDecrement = (item: any) => {
		if (item.selQty > 1) {
			const userId = getEffectiveUserId(user);
			dispatch(
				updateCartItem({
					productId: item.cartProduct._id,
					userId,
					action: 'dec',
				}),
			);
		} else {
			handleRemove(item.cartProduct._id);
		}
	};

	const subtotal = items.reduce((acc, item) => {
		const price =
			item.cartProduct?.regularPrice || item.cartProduct?.price || 0;
		return acc + price * item.selQty;
	}, 0);
	const shipping = items.length > 0 ? 200.0 : 0;
	const total = subtotal + shipping;

	return (
		<>
			<Header />
			<div className='min-h-screen bg-background text-foreground pt-32 pb-24'>
				<div className='container mx-auto px-4 sm:px-6'>
					<div className='flex items-center justify-between mb-12'>
						<h1 className='text-4xl md:text-5xl font-serif text-white'>
							Your Bag
						</h1>
						<span className='text-gray-400'>({items.length} items)</span>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
						{/* Cart Items */}
						<div className='lg:col-span-8 space-y-6'>
							<AnimatePresence mode='popLayout'>
								{items.length === 0 ? (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className='text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/5'>
										<ShoppingBag className='w-16 h-16 text-gray-600 mx-auto mb-6' />
										<p className='text-xl text-gray-400 mb-8'>
											Your bag is empty
										</p>
										<Link
											href='/shop'
											className='inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform'>
											Explore Collection <ArrowRight className='w-4 h-4' />
										</Link>
									</motion.div>
								) : (
									items.map((item) => (
										<motion.div
											key={item._id || item.cartProduct._id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, scale: 0.95 }}
											className='flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8 p-4 sm:p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group'>
											{/* Product Image */}
											<div className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 flex-shrink-0 overflow-hidden'>
												<img
													src={item.cartProduct.image || ''}
													alt={item.cartProduct.name}
													className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
												/>
											</div>

											{/* Product Info */}
											<div className='flex-grow min-w-[200px]'>
												<h3 className='text-lg font-medium text-white mb-1'>
													{item.cartProduct.name}
												</h3>
												<p className='text-sm text-gray-400 mb-4'>
													{item.cartProduct.category?.name ||
														item.cartProduct.category}
												</p>

												<div className='flex items-center gap-6'>
													{/* Quantity Selector */}
													<div className='flex items-center gap-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/10'>
														<button
															onClick={() => handleDecrement(item)}
															className='p-1 hover:text-primary transition-colors'>
															<Minus className='w-3 h-3' />
														</button>
														<span className='text-sm font-medium w-4 text-center text-white'>
															{item.selQty}
														</span>
														<button
															onClick={() => handleIncrement(item)}
															className='p-1 hover:text-primary transition-colors'>
															<Plus className='w-3 h-3' />
														</button>
													</div>

													<button
														onClick={() =>
															handleRemove(
																item.cartProduct._id || item.cartProduct.id,
															)
														}
														className='text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1'>
														<Trash2 className='w-3 h-3' /> Remove
													</button>
												</div>
											</div>

											{/* Price */}
											<div className='text-right w-full sm:w-auto'>
												<p className='text-xl font-medium text-white'>
													₹
													{(
														(item.cartProduct.regularPrice ||
															item.cartProduct.price ||
															0) * item.selQty
													).toFixed(2)}
												</p>
											</div>
										</motion.div>
									))
								)}
							</AnimatePresence>
						</div>

						{/* Order Summary */}
						<div className='lg:col-span-4'>
							<div className='p-8 rounded-[2.5rem] bg-white/5 border border-white/5 top-32 lg:sticky'>
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
								</div>

								<div className='pt-6 border-t border-white/10 mb-10'>
									<div className='flex justify-between items-center'>
										<span className='text-lg font-medium text-white'>
											Total
										</span>
										<span className='text-3xl font-bold text-primary'>
											₹{total.toFixed(2)}
										</span>
									</div>
								</div>

								<Link href='/checkout'>
									<button
										disabled={items.length === 0}
										className='w-full py-5 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed'>
										Proceed to Checkout <ArrowRight className='w-4 h-4' />
									</button>
								</Link>

								<p className='text-center text-[10px] text-gray-500 mt-6 leading-relaxed'>
									Shipping and taxes calculated at checkout. <br />
									Secure encrypted payments.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
