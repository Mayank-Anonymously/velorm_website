import { motion } from 'framer-motion';
import { Lock, ArrowLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { createOrder } from '@/store/slices/orderSlice';
import { useRouter } from 'next/router';

const DEMO_USER_ID = '6624e2faa3bd4fd5287d508e';

export default function Checkout() {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const { items } = useSelector((state: RootState) => state.cart);

	// Simple state for inputs
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

	const subtotal = items.reduce((acc, item) => {
		const price =
			item.cartProduct?.regularPrice || item.cartProduct?.price || 0;
		return acc + price * item.selQty;
	}, 0);
	const shipping = 5.0;
	const total = subtotal + shipping;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePayment = async () => {
		// Construct payload matching backend CreateOrderr expected structure
		const orderData = {
			orderPlace: 'Website',
			product: items.map((item) => ({
				id: item.cartProduct._id,
				selQty: item.selQty,
			})),
			user: {
				_id: DEMO_USER_ID,
				name: `${formData.firstName} ${formData.lastName}`,
				email: formData.email,
				contact: formData.contact || '9999999999', // Fallback
			},
			shippingaddress: {
				location: formData.city,
				street: formData.address,
				address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
				landmark: formData.landmark || formData.city,
				locationObj: {
					type: 'Point',
					coordinates: [0, 0], // Mock coordinates
				},
			},
			status: 'ORDERED',
			amount: total,
			deliverySchedule: 'Standard',
			deliveryDate: new Date().toISOString(),
			paymentOption: 'COD', // Defaulting to COD for simplicity in demo
			walletDeductedAmount: 0,
			deliveryType: 'Standard',
			type: 'web', // Triggers createOrderOnGateWayForWeb or simple response
		};

		const result = await dispatch(createOrder(orderData));
		if (createOrder.fulfilled.match(result)) {
			alert('Order Placed Successfully!');
			router.push('/');
		} else {
			console.error('Order failed:', result);
			alert(
				'Failed to place order: ' + (result.payload as any)?.message ||
					'Unknown error',
			);
		}
	};

	return (
		<div className='min-h-screen bg-background text-foreground pt-32 pb-24'>
			<div className='container mx-auto px-6 max-w-4xl'>
				<Link
					href='/cart'
					className='inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors'>
					<ArrowLeft className='w-4 h-4' /> Back to Bag
				</Link>

				<h1 className='text-4xl font-serif text-white mb-12'>Checkout</h1>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
					<div className='space-y-10'>
						<div>
							<h2 className='text-xl font-serif text-white mb-6 flex items-center gap-3'>
								<span className='w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center text-sm font-bold'>
									1
								</span>
								Shipping Details
							</h2>
							<div className='grid grid-cols-2 gap-4'>
								<input
									name='firstName'
									placeholder='First Name'
									onChange={handleInputChange}
									className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none text-white'
								/>
								<input
									name='lastName'
									placeholder='Last Name'
									onChange={handleInputChange}
									className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none text-white'
								/>
								<input
									name='email'
									placeholder='Email Address'
									onChange={handleInputChange}
									className='col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none text-white'
								/>
								<input
									name='contact'
									placeholder='Phone Number'
									onChange={handleInputChange}
									className='col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none text-white'
								/>
								<input
									name='address'
									placeholder='Address'
									onChange={handleInputChange}
									className='col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none text-white'
								/>
								<input
									name='city'
									placeholder='City'
									onChange={handleInputChange}
									className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none text-white'
								/>
								<input
									name='postalCode'
									placeholder='Postal Code'
									onChange={handleInputChange}
									className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none text-white'
								/>
							</div>
						</div>

						<div>
							<h2 className='text-xl font-serif text-white mb-6 flex items-center gap-3'>
								<span className='w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center text-sm font-bold'>
									2
								</span>
								Shipping Method
							</h2>
							<div className='p-4 rounded-2xl bg-primary/10 border border-primary/30 flex justify-between items-center cursor-pointer'>
								<div>
									<p className='text-white font-medium'>Standard Delivery</p>
									<p className='text-xs text-gray-400'>3-5 Business Days</p>
								</div>
								<p className='text-white font-bold'>₹200.00</p>
							</div>
						</div>
					</div>

					<div>
						<div className='p-8 rounded-3xl bg-white/5 border border-white/5 sticky top-32'>
							<h2 className='text-xl font-serif text-white mb-8 flex items-center gap-3'>
								<span className='w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center text-sm font-bold'>
									3
								</span>
								Payment
							</h2>

							<div className='space-y-4 mb-8'>
								<div className='p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-4'>
									<CreditCard className='w-5 h-5 text-primary' />
									<span className='text-sm text-white'>
										Cash On Delivery (Default)
									</span>
								</div>
							</div>

							<div className='pt-6 border-t border-white/10 mb-8'>
								<div className='flex justify-between items-center mb-2'>
									<span className='text-gray-400'>Total to pay</span>
									<span className='text-2xl font-bold text-primary'>
										${total.toFixed(2)}
									</span>
								</div>
							</div>

							<button
								onClick={handlePayment}
								className='w-full py-4 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3'>
								<Lock className='w-4 h-4' /> Place Order
							</button>

							<p className='text-center text-[10px] text-gray-500 mt-6 leading-relaxed'>
								By completing your purchase you agree to our <br />
								<a
									href='#'
									className='underline'>
									Terms of Service
								</a>{' '}
								and{' '}
								<a
									href='#'
									className='underline'>
									Privacy Policy
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
