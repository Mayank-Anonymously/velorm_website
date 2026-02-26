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
import { Link } from 'wouter';
import heroBg from '@/assets/hero-bg.png';
import productSmall from '@/assets/product-small.png';
import productMain from '@/assets/product-main.png';
import categoriesImg from '@/assets/categories.png';
import recommendedImg from '@/assets/recommended.png';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/router';

export default function Home() {
	const router  = useRouter()
	return (
		<>
			<Header />
			<div className='min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white overflow-x-hidden'>
				{/* Hero Content */}
				<section className='relative z-10 container mx-auto px-6 h-screen flex flex-col justify-center pt-20'>
					<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full'>
						{/* Left Side - Bottom Product Card */}
						<div className='lg:col-span-5 h-full flex flex-col justify-end pb-24 relative'>
							<div className='absolute top-1/4 left-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full' />
							<motion.div
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8 }}
								className='relative group'>
								<div className='flex items-end gap-6 p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 w-full max-w-md'>
									<div className='relative shrink-0'>
										<img
											src={productSmall.src}
											alt='Humbling Forest Cologne'
											className='w-24 h-auto drop-shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500'
										/>
									</div>
									<div className='flex-1 pb-2'>
										<h3 className='text-xl font-serif font-medium text-white mb-2'>
											Humbling Forest
										</h3>
										<p className='text-sm text-gray-400 leading-relaxed mb-6 line-clamp-2'>
											Velorm elevates your daily routine — blending care,
											confidence,
										</p>
										<div className='flex items-center gap-4'>
											<button className='px-6 py-2 rounded-full border border-white/20 text-sm hover:bg-white hover:text-black transition-all'>
												Buy Now
											</button>
											<button className='w-10 h-10 flex items-center justify-center rounded-full bg-[#9CAFA3] text-black hover:scale-105 transition-transform'>
												<ShoppingBag className='w-4 h-4' />
											</button>
										</div>
									</div>
								</div>
							</motion.div>
						</div>

						{/* Right Side - Hero Text & Main Image */}
						<div className='lg:col-span-7 h-full flex flex-col justify-center relative'>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className='relative z-20 text-center lg:text-left lg:pl-12'>
								<h1 className='text-6xl lg:text-8xl font-medium tracking-tight text-white mb-6 leading-[0.9]'>
									Gentlemen <br />
									<span className='text-[#9CAFA3]/90 italic font-serif'>
										Everyday
									</span>{' '}
									Care
								</h1>
								<div className='flex flex-col lg:flex-row items-center gap-8 mt-12'>
									<p className='text-gray-400 max-w-sm text-center lg:text-left leading-relaxed'>
										Velorm elevates your daily routine — blending care,
										confidence, and community in every moment.
									</p>
									<button className='flex items-center gap-4 px-8 py-3 rounded-full border border-white/20 text-white hover:bg-[#9CAFA3] hover:border-[#9CAFA3] hover:text-black transition-all group'>
										<Link href="/shop"><span>View Our Collections</span></Link>
										<span className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10'>
											<ArrowRight className='w-4 h-4' />
										</span>
									</button>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, scale: 0.95, x: 50 }}
								animate={{ opacity: 1, scale: 1, x: 0 }}
								transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
								className='absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[120%] h-[120%] pointer-events-none translate-x-24 opacity-80 mix-blend-lighten'>
								<div className='w-full h-full flex items-center justify-center relative'>
									<img
										src={productMain.src}
										alt='Man holding Velorm Cologne'
										className='w-full h-full object-contain object-right drop-shadow-2xl'
									/>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 1.2 }}
										className='absolute right-1/4 bottom-1/3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10'>
										<p className='text-xs text-white/80 uppercase tracking-widest mb-1'>
											Eau de Toilette
										</p>
										<p className='text-lg font-serif text-white'>
											Humbling Forest
										</p>
										<p className='text-xs text-right text-white/50 mt-1'>
											35ml
										</p>
									</motion.div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Section 2: More Categories */}
				<section className='py-24 bg-background relative z-10'>
					<div className='container mx-auto px-6'>
						<div className='flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6'>
							<div>
								<p className='text-primary font-medium tracking-widest uppercase text-sm mb-4'>
									Discover More
								</p>
								<h2 className='text-4xl md:text-5xl font-serif text-white'>
									Curated Collections
								</h2>
							</div>
							<a
								href='#'
								className='flex items-center gap-2 text-gray-400 hover:text-primary transition-colors'>
								<span>Explore All Categories</span>
								<ArrowRight className='w-4 h-4' />
							</a>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							{[
								{
									title: 'Face Care',
									desc: 'Gentle cleansing for active skin',
									img: categoriesImg,
								},
								{
									title: 'Body Care',
									desc: 'Long lasting freshness all day',
									img: productSmall,
								},
								{
									title: 'Fragrance',
									desc: 'Nature-inspired signature scents',
									img: productMain,
								},
							].map((cat, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className='group relative h-[450px] overflow-hidden rounded-3xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer'>
									<div className='absolute inset-0 p-8 z-20 flex flex-col justify-between'>
										<div>
											<h3 className='text-2xl font-serif text-white mb-2'>
												{cat.title}
											</h3>
											<p className='text-gray-400 text-sm max-w-[200px]'>
												{cat.desc}
											</p>
										</div>
										<button className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all'>
											<ArrowRight className='w-5 h-5' />
										</button>
									</div>
									<img
										src={cat.img.src}
										className='absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700'
										alt={cat.title}
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80' />
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Section 3: Recommended Product */}
				<section className='py-24 bg-[#111] relative overflow-hidden'>
					<div className='absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full' />
					<div className='container mx-auto px-6'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className='relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/5'>
								<img
									src={recommendedImg.src}
									alt='Recommended'
									className='w-full h-full object-cover opacity-80'
								/>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}>
								<p className='text-primary font-medium tracking-widest uppercase text-sm mb-4'>
									Recommended for you
								</p>
								<h2 className='text-5xl font-serif text-white mb-6 leading-tight'>
									Revitalizing Beard & Hair Serum
								</h2>
								<p className='text-gray-400 text-lg mb-8 leading-relaxed'>
									Formulated with natural forest extracts to strengthen hair
									roots and provide a healthy shine. The ultimate companion for
									your grooming ritual.
								</p>
								<div className='flex items-center gap-1 mb-8'>
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className='w-5 h-5 fill-primary text-primary'
										/>
									))}
									<span className='ml-4 text-white font-medium'>4.9 / 5.0</span>
									<span className='ml-2 text-gray-500'>(128 Reviews)</span>
								</div>
								<div className='flex flex-wrap gap-4'>
									<button className='px-10 py-4 bg-primary text-black font-medium rounded-full hover:scale-105 transition-transform'>
										Add to Cart — ₹749.00
									</button>
									<button className='px-10 py-4 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors'>
										Product Details
									</button>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Section 4: Testimonials */}
				<section className='py-24 bg-background'>
					<div className='container mx-auto px-6'>
						<div className='text-center mb-16'>
							<h2 className='text-4xl md:text-5xl font-serif text-white mb-4'>
								Voices of Velorm
							</h2>
							<p className='text-gray-400 max-w-xl mx-auto'>
								Real stories from men who have elevated their daily routine with
								our nature-inspired care.
							</p>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							{[
								{
									name: 'Alexander Rivers',
									role: 'Adventurer',
									text: "The forest scent is unparalleled. It's not overwhelming but lasts throughout my entire trek.",
								},
								{
									name: 'Julian Chen',
									role: 'Creative Director',
									text: 'Velorm understands the modern man. Minimalist packaging that actually looks good in the bathroom.',
								},
								{
									name: 'Marcus Thorne',
									role: 'Fitness Coach',
									text: "Finally found a face wash that doesn't dry me out. My skin feels clean and ready for the day.",
								},
							].map((t, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className='p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all'>
									<p className='text-gray-300 italic mb-8 leading-relaxed'>
										"{t.text}"
									</p>
									<div className='flex items-center gap-4'>
										<div className='w-12 h-12 rounded-full bg-primary/20' />
										<div>
											<p className='text-white font-medium'>{t.name}</p>
											<p className='text-gray-500 text-sm'>{t.role}</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Section 5: Instagram Account Images */}
				<section className='py-24 bg-[#0a0a0a]'>
					<div className='container mx-auto px-6'>
						<div className='flex items-center justify-between mb-12'>
							<div>
								<h2 className='text-3xl font-serif text-white flex items-center gap-3'>
									<Instagram className='w-6 h-6 text-primary' />{' '}
									@Velorm.official
								</h2>
							</div>
							<a
								href='#'
								className='text-primary hover:underline font-medium'>
								Follow Us
							</a>
						</div>
						<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
							{[1, 2, 3, 4, 5, 6].map((idx) => (
								<div
									key={idx}
									className='aspect-square relative group overflow-hidden rounded-xl cursor-pointer'>
									<img
										src={`/src/assets/ig/post_${idx}.jpg`}
										alt='IG Post'
										className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
									/>
									<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
										<Instagram className='text-white w-6 h-6' />
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
}
