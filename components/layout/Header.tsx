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
import heroBg from '@/assets/hero-bg.png';
import productSmall from '@/assets/product-small.png';
import productMain from '@/assets/product-main.png';
import categoriesImg from '@/assets/categories.png';
import recommendedImg from '@/assets/recommended.png';
import Link from 'next/link';

export default function Header() {
	return (
		<div>
			{/* Background Image with Overlay */}
			<div className='absolute top-0 left-0 w-full h-screen z-0'>
				<img
					src={heroBg.src}
					alt='Background Texture'
					className='w-full h-full object-cover opacity-60'
				/>
				<div className='absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50' />
				<div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent' />
			</div>

			{/* Navigation */}
			<nav className='fixed top-0 left-0 right-0 z-50 flex items-cent er justify-between px-8 py-6'>
				<div className='flex items-center'>
					<a
						href='#'
						className='text-2xl font-bold tracking-tight text-white font-serif'>
						Velorm
					</a>
				</div>

				{/* Center Menu - Glass Pill */}
				<div className='hidden md:flex items-center gap-8 px-8 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10'>
					<Link
						href='/shop'
						className='text-sm font-medium text-gray-300 hover:text-white transition-colors'>
						Product
					</Link>
					<a
						href='#'
						className='text-sm font-medium text-gray-300 hover:text-white transition-colors'>
						Our Story
					</a>
					<a
						href='#'
						className='text-sm font-medium text-gray-300 hover:text-white transition-colors'>
						News & Event
					</a>
				</div>

				<div className='flex items-center gap-6'>
					<button className='text-white hover:text-primary transition-colors'>
						<Search className='w-5 h-5' />
					</button>
					<Link href='/cart'>
						<button className='text-white hover:text-primary transition-colors relative cursor-pointer'>
							<ShoppingBag className='w-5 h-5' />
							<span className='absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full' />
						</button>
					</Link>
					<button className='px-6 py-2.5 text-sm font-medium text-black bg-[#9CAFA3] rounded-full hover:bg-[#8B9E92] transition-colors'>
						Login
					</button>
				</div>
			</nav>
		</div>
	);
}
