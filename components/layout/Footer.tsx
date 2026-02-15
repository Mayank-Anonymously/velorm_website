import { motion } from 'framer-motion';
import {
	Search,
	ShoppingBag,
	ArrowRight,
	Star,
	Instagram,
	Facebook,
	Twitter,
	Mail,
	MapPin,
	Phone,
} from 'lucide-react';

export default function Footer() {
	return (
		<div>
			{/* Background Image with Overlay */}

			{/* Footer */}
			<footer className='pt-24 pb-12 bg-background border-t border-white/5'>
				<div className='container mx-auto px-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20'>
						<div className='lg:col-span-1'>
							<h2 className='text-3xl font-serif font-bold text-white mb-6'>
								Velorm
							</h2>
							<p className='text-gray-400 mb-8 max-w-xs'>
								Elevating the daily routine of modern gentlemen with
								nature-inspired premium care.
							</p>
							<div className='flex items-center gap-4'>
								<a
									href='#'
									className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all'>
									<Instagram className='w-5 h-5' />
								</a>
								<a
									href='#'
									className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all'>
									<Twitter className='w-5 h-5' />
								</a>
								<a
									href='#'
									className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all'>
									<Facebook className='w-5 h-5' />
								</a>
							</div>
						</div>
						<div>
							<h3 className='text-white font-medium mb-8'>Quick Links</h3>
							<ul className='space-y-4 text-gray-400'>
								<li>
									<a
										href='#'
										className='hover:text-primary transition-colors'>
										Shop All
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-primary transition-colors'>
										Our Story
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-primary transition-colors'>
										Sustainability
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-primary transition-colors'>
										Store Locator
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className='text-white font-medium mb-8'>Support</h3>
							<ul className='space-y-4 text-gray-400'>
								<li>
									<a
										href='#'
										className='hover:text-primary transition-colors'>
										Shipping & Returns
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-primary transition-colors'>
										FAQ
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-primary transition-colors'>
										Contact Us
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-primary transition-colors'>
										Terms of Service
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className='text-white font-medium mb-8'>Newsletter</h3>
							<p className='text-gray-400 mb-6'>
								Join the Velorm community for exclusive offers and care tips.
							</p>
							<div className='relative'>
								<input
									type='email'
									placeholder='Your email address'
									className='w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm text-white focus:outline-none focus:border-primary transition-colors'
								/>
								<button className='absolute right-1 top-1 bottom-1 px-6 bg-primary text-black rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#8B9E92] transition-colors'>
									Join
								</button>
							</div>
						</div>
					</div>
					<div className='flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6 text-gray-500 text-sm'>
						<p>© 2026 Velorm All rights reserved.</p>
						<div className='flex items-center gap-8'>
							<a
								href='#'
								className='hover:text-white transition-colors'>
								Privacy Policy
							</a>
							<a
								href='#'
								className='hover:text-white transition-colors'>
								Cookie Policy
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
