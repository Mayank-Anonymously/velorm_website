import { motion } from 'framer-motion';
import { Lock, ArrowLeft, CreditCard, User as UserIcon, Mail, Phone, MapPin, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { createOrder } from '@/store/slices/orderSlice';
import { sendOtp, updateProfile } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Checkout() {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const { items } = useSelector((state: RootState) => state.cart);
	const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		contact: '',
		address: '',
		city: '',
		postalCode: '',
		landmark: '',
	});

	const [loading, setLoading] = useState(false);

	// Pre-fill form if user is logged in
	useEffect(() => {
		if (isAuthenticated && user) {
			const [first, ...rest] = (user.name || '').split(' ');
			setFormData(prev => ({
				...prev,
				firstName: first || '',
				lastName: rest.join(' ') || '',
				email: user.email || '',
				contact: user.contact?.toString() || '',
			}));
		}
	}, [isAuthenticated, user]);

	const subtotal = items.reduce((acc, item) => {
		const price = item.cartProduct?.regularPrice || item.cartProduct?.price || 0;
		return acc + price * item.selQty;
	}, 0);
	const shipping = 200.0;
	const total = subtotal + shipping;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePayment = async () => {
		if (items.length === 0) {
			alert("Your bag is empty");
			return;
		}

		setLoading(true);
		try {
			let currentUserId = user?._id;

			// 1. If not authenticated, create user first
			if (!isAuthenticated) {
				// Step A: Create user record via sendOtp (backend creates user if missing)
				const otpResult = await dispatch(sendOtp({ contact: formData.contact }));
				if (sendOtp.fulfilled.match(otpResult)) {
					const newUser = otpResult.payload.response;
					currentUserId = newUser._id;

					// Step B: Update user details (name, email)
					await dispatch(updateProfile({
						name: `${formData.firstName} ${formData.lastName}`,
						email: formData.email,
						contact: formData.contact
					}));
				} else {
					throw new Error("Failed to create user account");
				}
			}

			// 2. Construct order payload
			const orderData = {
				orderPlace: 'Website',
				product: items.map((item) => ({
					id: item.cartProduct._id,
					selQty: item.selQty,
				})),
				user: {
					_id: currentUserId,
					name: `${formData.firstName} ${formData.lastName}`,
					email: formData.email,
					contact: formData.contact,
				},
				shippingaddress: {
					location: formData.city,
					street: formData.address,
					address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
					landmark: formData.landmark || formData.city,
					locationObj: {
						type: 'Point',
						coordinates: [0, 0],
					},
				},
				status: 'ORDERED',
				amount: total,
				deliverySchedule: 'Standard',
				deliveryDate: new Date().toISOString(),
				paymentOption: 'COD',
				walletDeductedAmount: 0,
				deliveryType: 'Standard',
				type: 'web',
			};

			const result = await dispatch(createOrder(orderData));
			if (createOrder.fulfilled.match(result)) {
				router.push('/order-success');
			} else {
				throw new Error((result.payload as any)?.message || 'Order placement failed');
			}
		} catch (err: any) {
			alert(err.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Header />
			<div className='min-h-screen bg-background text-foreground pt-32 pb-24'>
				<div className='container mx-auto px-6 max-w-5xl'>
					<Link
						href='/cart'
						className='inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group'>
						<ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' /> Back to Bag
					</Link>

					<h1 className='text-4xl md:text-5xl font-serif text-white mb-12'>Checkout</h1>

					<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16'>
						<div className='lg:col-span-7 space-y-12'>
							{/* Shipping Details */}
							<section>
								<div className="flex items-center gap-4 mb-8">
									<div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-serif italic text-xl">1</div>
									<h2 className='text-2xl font-serif text-white'>Shipping Details</h2>
								</div>
								
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
									<div className="space-y-2">
										<label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">First Name</label>
										<div className="relative">
											<UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
											<input
												name='firstName'
												placeholder='John'
												value={formData.firstName}
												onChange={handleInputChange}
												className='w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-primary focus:outline-none text-white transition-colors'
											/>
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Last Name</label>
										<input
											name='lastName'
											placeholder='Doe'
											value={formData.lastName}
											onChange={handleInputChange}
											className='w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm focus:border-primary focus:outline-none text-white transition-colors'
										/>
									</div>
									<div className="space-y-2 sm:col-span-2">
										<label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
										<div className="relative">
											<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
											<input
												name='email'
												type="email"
												placeholder='john@example.com'
												value={formData.email}
												onChange={handleInputChange}
												className='w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-primary focus:outline-none text-white transition-colors'
											/>
										</div>
									</div>
									<div className="space-y-2 sm:col-span-2">
										<label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
										<div className="relative">
											<Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
											<input
												name='contact'
												placeholder='+91 99999 99999'
												value={formData.contact}
												onChange={handleInputChange}
												className='w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-primary focus:outline-none text-white transition-colors'
											/>
										</div>
									</div>
									<div className="space-y-2 sm:col-span-2">
										<label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Address</label>
										<div className="relative">
											<MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
											<input
												name='address'
												placeholder='Street address, apartment, suite'
												value={formData.address}
												onChange={handleInputChange}
												className='w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-primary focus:outline-none text-white transition-colors'
											/>
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">City</label>
										<input
											name='city'
											placeholder='City'
											value={formData.city}
											onChange={handleInputChange}
											className='w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm focus:border-primary focus:outline-none text-white transition-colors'
										/>
									</div>
									<div className="space-y-2">
										<label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Postal Code</label>
										<input
											name='postalCode'
											placeholder='110001'
											value={formData.postalCode}
											onChange={handleInputChange}
											className='w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm focus:border-primary focus:outline-none text-white transition-colors'
										/>
									</div>
								</div>
							</section>

							{/* Delivery Method */}
							<section>
								<div className="flex items-center gap-4 mb-8">
									<div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-serif italic text-xl">2</div>
									<h2 className='text-2xl font-serif text-white'>Delivery Method</h2>
								</div>
								<div className='p-6 rounded-[2rem] bg-primary/5 border border-primary/20 flex justify-between items-center'>
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
											<Truck className="w-6 h-6" />
										</div>
										<div>
											<p className='text-white font-medium'>Standard Delivery</p>
											<p className='text-xs text-gray-500 tracking-wide'>Estimated 3-5 Business Days</p>
										</div>
									</div>
									<p className='text-white font-bold text-lg'>₹200.00</p>
								</div>
							</section>
						</div>

						{/* Payment & Summary */}
						<div className='lg:col-span-5'>
							<div className='p-8 rounded-[2.5rem] bg-white/5 border border-white/5 sticky top-32'>
								<div className="flex items-center gap-4 mb-10">
									<div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-serif italic text-xl">3</div>
									<h2 className='text-2xl font-serif text-white'>Payment</h2>
								</div>

								<div className='space-y-4 mb-10'>
									<div className='p-5 rounded-2xl border-2 border-primary bg-primary/5 flex items-center gap-4'>
										<div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black">
											<CreditCard className='w-5 h-5' />
										</div>
										<div>
											<span className='block text-sm font-bold text-white uppercase tracking-widest'>Cash On Delivery</span>
											<span className='text-xs text-primary'>Pay when your scent arrives</span>
										</div>
									</div>
								</div>

								<div className='pt-8 border-t border-white/10 space-y-4 mb-10'>
									<div className='flex justify-between items-center text-gray-400'>
										<span className="text-sm">Subtotal</span>
										<span>₹{subtotal.toFixed(2)}</span>
									</div>
									<div className='flex justify-between items-center text-gray-400'>
										<span className="text-sm">Shipping Fee</span>
										<span>₹{shipping.toFixed(2)}</span>
									</div>
									<div className='flex justify-between items-center pt-4'>
										<span className='text-lg font-medium text-white'>Total to pay</span>
										<span className='text-3xl font-bold text-primary'>
											₹{total.toFixed(2)}
										</span>
									</div>
								</div>

								<button
									onClick={handlePayment}
									disabled={loading || items.length === 0}
									className='w-full py-5 bg-primary text-black font-bold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50'>
									{loading ? (
										<div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
									) : (
										<><Lock className='w-4 h-4' /> Place Secure Order</>
									)}
								</button>

								<p className='text-center text-[10px] text-gray-500 mt-8 leading-relaxed px-4'>
									By completing your purchase you agree to our <br />
									<a href='#' className='underline hover:text-white transition-colors'>Terms of Service</a> and <a href='#' className='underline hover:text-white transition-colors'>Privacy Policy</a>
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
