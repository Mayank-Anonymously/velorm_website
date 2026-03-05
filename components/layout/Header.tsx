import { useState } from 'react';
import { Search, ShoppingBag, Menu, X, User, LogOut, Package, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { logout } from '@/store/slices/authSlice';

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
	const { items: cartItems } = useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch<AppDispatch>();

	const handleLogout = () => {
		dispatch(logout());
		setMobileMenuOpen(false);
	};

	return (
		<>
			{/* Navigation */}
			<nav className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6'>
				{/* Logo */}
				<div className='flex items-center'>
					<Link
						href='/'
						className='text-2xl font-bold tracking-tight text-white font-serif'>
						Velorm
					</Link>
				</div>

				{/* Center Menu - Glass Pill (desktop only) */}
				<div className='hidden md:flex items-center gap-8 px-8 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10'>
					<Link
						href='/shop'
						className='text-sm font-medium text-gray-300 hover:text-white transition-colors'>
						Product
					</Link>
					<Link
						href='/about'
						className='text-sm font-medium text-gray-300 hover:text-white transition-colors'>
						Our Story
					</Link>
					<Link
						href='/contact'
						className='text-sm font-medium text-gray-300 hover:text-white transition-colors'>
						Contact Us
					</Link>
					<div className="relative group">
						<button className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1 cursor-default">
							Policies <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
						</button>
						<div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[200px] py-2 bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl flex flex-col">
							<div className="absolute -top-4 left-0 right-0 h-4 bg-transparent"></div>
							<Link href="/terms-of-service" className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Terms of Service</Link>
							<Link href="/privacy-policy" className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Privacy Policy</Link>
							<Link href="/shipping-policy" className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Shipping Policy</Link>
							<Link href="/refund-policy" className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Return & Refund Policy</Link>
						</div>
					</div>
				</div>

				{/* Right Icons */}
				<div className='flex items-center gap-3 md:gap-6'>
					<button className='text-white hover:text-primary transition-colors'>
						<Search className='w-5 h-5' />
					</button>

					<Link href='/cart'>
						<button className='text-white hover:text-primary transition-colors relative cursor-pointer'>
							<ShoppingBag className='w-5 h-5' />
							{cartItems.length > 0 && (
								<span className='absolute -top-2 -right-2 w-4 h-4 bg-primary text-black rounded-full text-[10px] font-bold flex items-center justify-center leading-none'>
									{cartItems.length > 9 ? '9+' : cartItems.length}
								</span>
							)}
						</button>
					</Link>

					{isAuthenticated ? (
						<div className='hidden sm:flex items-center gap-4'>
							<Link
								href='/orders'
								className='flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm'>
								<Package className='w-4 h-4' />
								<span>Orders</span>
							</Link>
							<div className='flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10'>
								<User className='w-4 h-4 text-primary' />
								<span className='text-sm text-white font-medium'>{user?.name?.split(' ')[0]}</span>
							</div>
							<button
								onClick={handleLogout}
								className='p-2 text-gray-400 hover:text-white transition-colors'
								title='Logout'>
								<LogOut className='w-4 h-4' />
							</button>
						</div>
					) : (
						<Link href='/login'>
							<button className='hidden sm:block px-5 py-2 text-sm font-medium text-black bg-[#9CAFA3] rounded-full hover:bg-[#8B9E92] transition-colors'>
								Login
							</button>
						</Link>
					)}

					{/* Hamburger (mobile only) */}
					<button
						className='md:hidden text-white p-1'
						onClick={() => setMobileMenuOpen((o) => !o)}
						aria-label='Toggle menu'>
						{mobileMenuOpen ? (
							<X className='w-6 h-6' />
						) : (
							<Menu className='w-6 h-6' />
						)}
					</button>
				</div>
			</nav>

			{/* Mobile Nav Drawer */}
			{mobileMenuOpen && (
				<div className='fixed top-0 left-0 right-0 z-40 pt-20 px-6 pb-8 bg-background/95 backdrop-blur-lg border-b border-white/10 md:hidden'>
					<nav className='flex flex-col gap-6'>
						<Link
							href='/shop'
							onClick={() => setMobileMenuOpen(false)}
							className='text-lg font-medium text-gray-200 hover:text-white transition-colors'>
							Product
						</Link>
						<Link
							href='/about'
							onClick={() => setMobileMenuOpen(false)}
							className='text-lg font-medium text-gray-200 hover:text-white transition-colors'>
							Our Story
						</Link>
						<Link
							href='/contact'
							onClick={() => setMobileMenuOpen(false)}
							className='text-lg font-medium text-gray-200 hover:text-white transition-colors'>
							Contact Us
						</Link>

						<div className="flex flex-col gap-4 mt-2 border-t border-white/10 pt-6">
							<span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Policies</span>
							<Link
								href='/terms-of-service'
								onClick={() => setMobileMenuOpen(false)}
								className='text-lg font-medium text-gray-200 hover:text-white transition-colors'>
								Terms of Service
							</Link>
							<Link
								href='/privacy-policy'
								onClick={() => setMobileMenuOpen(false)}
								className='text-lg font-medium text-gray-200 hover:text-white transition-colors'>
								Privacy Policy
							</Link>
							<Link
								href='/shipping-policy'
								onClick={() => setMobileMenuOpen(false)}
								className='text-lg font-medium text-gray-200 hover:text-white transition-colors'>
								Shipping Policy
							</Link>
							<Link
								href='/refund-policy'
								onClick={() => setMobileMenuOpen(false)}
								className='text-lg font-medium text-gray-200 hover:text-white transition-colors'>
								Return & Refund Policy
							</Link>
						</div>

						{isAuthenticated ? (
							<div className='flex flex-col gap-4 mt-2'>
								<div className='flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10'>
									<User className='w-5 h-5 text-primary' />
									<span className='text-white font-medium'>{user?.name}</span>
								</div>
								<Link
									href='/orders'
									onClick={() => setMobileMenuOpen(false)}
									className='flex items-center gap-2 p-4 text-sm font-medium text-gray-200 hover:text-white bg-white/5 rounded-2xl border border-white/10 transition-colors'>
									<Package className='w-4 h-4 text-primary' /> My Orders
								</Link>
								<button
									onClick={handleLogout}
									className='w-full py-3 text-sm font-medium text-white bg-red-500/20 border border-red-500/50 rounded-full hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2'>
									<LogOut className='w-4 h-4' /> Logout
								</button>
							</div>
						) : (
							<Link href='/login' onClick={() => setMobileMenuOpen(false)}>
								<button className='mt-2 w-full py-3 text-sm font-medium text-black bg-[#9CAFA3] rounded-full hover:bg-[#8B9E92] transition-colors'>
									Login
								</button>
							</Link>
						)}
					</nav>
				</div>
			)}
		</>
	);
}
