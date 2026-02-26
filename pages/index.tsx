import { motion, AnimatePresence } from 'framer-motion';
import {
	ShoppingBag,
	ArrowRight,
	Star,
	Instagram,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { getEffectiveUserId } from '@/lib/auth';
import iage from '@/assets/prods/image-one.png';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';

export default function Home() {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.auth);
	const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
	const [activeSlide, setActiveSlide] = useState(0);

	useEffect(() => {
		fetch('https://api.velorm.com/api/v1/product/get-all-products')
			.then(r => r.json())
			.then(d => {
				const products = (d.response || []).slice(0, 6);
				setFeaturedProducts(products);
			})
			.catch(console.error);
	}, []);

	const goNext = useCallback(() => {
		setActiveSlide(i => (i + 1) % Math.max(featuredProducts.length, 1));
	}, [featuredProducts.length]);

	const goPrev = useCallback(() => {
		setActiveSlide(i => (i - 1 + Math.max(featuredProducts.length, 1)) % Math.max(featuredProducts.length, 1));
	}, [featuredProducts.length]);

	const handleAddToCart = (product: any) => {
		const userId = getEffectiveUserId(user);
		dispatch(addToCart({ productId: product._id, userId, productData: { cartProduct: product, selQty: 1 } }));
	};

	const currentProduct = featuredProducts[activeSlide];

	return (
		<>
			<SEO 
				title="Home" 
				description="Velorm — Premium perfumes and luxury attars for the modern individual. Discover our curated collection of artisanal scents, including Woody, Sweet, and Floral fragrances."
			/>
			<Header />
			<main className='min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white overflow-x-hidden'>
				{/* Hero Background - only on home page */}
				<div className='absolute top-0 left-0 w-full h-screen z-0 pointer-events-none'>
					<img src={iage.src} alt="" className="w-full h-full object-cover opacity-60" />
					<div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
					<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
				</div>

				{/* Hero Content */}
				<section className='relative z-10 container mx-auto px-4 sm:px-6 h-screen flex flex-col justify-center pt-20'>
					<div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center h-full'>
						{/* Left Side - Bottom Product Card (hidden on mobile) */}
						<div className='hidden lg:flex lg:col-span-5 h-full flex-col justify-end pb-24 relative'>
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
												src={`https://api.velorm.com/resources/IMG_3285.JPG`}
											alt='Humbling Forest Cologne'
											className='w-24 h-auto drop-shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500'
										/>
									</div>
									<div className='flex-1 pb-2'>
										<h3 className='text-xl font-serif font-medium text-white mb-2'>
											Rose Gulab
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
						<div className='col-span-1 lg:col-span-7 h-full flex flex-col justify-center relative'>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className='relative z-20 text-center lg:text-left lg:pl-12'>
								<h1 className='text-4xl sm:text-6xl lg:text-8xl font-medium tracking-tight text-white mb-6 leading-[0.9]'>
									Gentlemen <br />
									<span className='text-black italic font-serif'>
										Everyday
									</span>{' '}
									Care
								</h1>
								<div className='flex flex-col sm:flex-row items-center gap-6 mt-10'>
									<p className='text-gray-300 max-w-sm text-center lg:text-left leading-relaxed text-sm sm:text-base'>
										Velorm elevates your daily routine — blending care,
										confidence, and community in every moment.
									</p>
									<Link href="/shop" className='flex-shrink-0 flex items-center gap-4 px-8 py-3 rounded-full border border-white/20 text-white hover:bg-[#9CAFA3] hover:border-[#9CAFA3] hover:text-black transition-all group'>
										<span>View Our Collections</span>
										<span className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10'>
											<ArrowRight className='w-4 h-4' />
										</span>
									</Link>
								</div>
							</motion.div>

							{/* Floating hero image — desktop only */}
							<motion.div
								initial={{ opacity: 0, scale: 0.95, x: 50 }}
								animate={{ opacity: 1, scale: 1, x: 0 }}
								transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
								className='hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[120%] h-[120%] pointer-events-none translate-x-24 opacity-80 mix-blend-lighten'>
								<div className='w-full h-full flex items-center justify-center relative'>
									<img
																						src={`https://api.velorm.com/resources/IMG_3285.JPG`}

										alt='Man holding Velorm Cologne'
										className='w-full h-full object-contain object-right drop-shadow-2xl'
									/>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

		
				{/* Showcase Section: Category Highlight */}
				<section className='py-24 bg-[#080808] relative overflow-hidden'>
					<div className='container mx-auto px-4 sm:px-6 relative z-10'>
						<div className='max-w-3xl mb-16'>
							<h2 className='text-4xl md:text-6xl font-serif text-white mb-6'>
								Signature <span className='italic text-primary'>Showcase</span>
							</h2>
							<p className='text-gray-400 text-lg leading-relaxed'>
								Immerse yourself in our most celebrated scent families. Each category is a journey through history, emotion, and craftsmanship.
							</p>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
							{/* Large Featured Category */}
							<motion.div 
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className='relative h-[600px] rounded-[3rem] overflow-hidden group cursor-pointer border border-white/5'
							>
								<img 
																				src={`https://api.velorm.com/resources/IMG_3285.JPG`}

									alt="Traditional Heritage" 
									className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90' />
								<div className='absolute bottom-12 left-12 right-12 z-20'>
									<span className='inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-6'>Premium Selection</span>
									<h3 className='text-4xl md:text-5xl font-serif text-white mb-4'>Traditional Heritage</h3>
									<p className='text-gray-300 text-lg mb-8 max-w-md'>The soul of Velorm. Concentrated oils that define luxury and tradition for the modern era.</p>
									<Link href="/shop" className='inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-primary transition-colors'>
										Explore Heritage <ArrowRight className='w-4 h-4' />
									</Link>
								</div>
							</motion.div>

							{/* Right Side Grid */}
							<div className='grid grid-cols-1 gap-12'>
								<motion.div 
									initial={{ opacity: 0, x: 30 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									className='relative h-[280px] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5'
								>
									<img 
				src={`https://api.velorm.com/resources/IMG_3288.JPG`}

										alt="Modern Sprays" 
										className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
									/>
									<div className='absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent opacity-80' />
									<div className='absolute inset-0 p-10 flex flex-col justify-center'>
										<h3 className='text-3xl font-serif text-white mb-3'>Modern Sprays</h3>
										<p className='text-gray-400 mb-6 max-w-xs'>Light, airy, and designed for the dynamic lifestyle of today.</p>
										<Link href="/shop" className='text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all'>
											Discover Collection <ArrowRight className='w-4 h-4' />
										</Link>
									</div>
								</motion.div>

								<motion.div 
									initial={{ opacity: 0, x: 30 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.2 }}
									className='relative h-[280px] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5'
								>
									<img 
										src={`https://api.velorm.com/resources/IMG_3306.JPG`} 
										alt="Artisan Blends" 
										className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
									/>
									<div className='absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent opacity-80' />
									<div className='absolute inset-0 p-10 flex flex-col justify-center'>
										<h3 className='text-3xl font-serif text-white mb-3'>Artisan Blends</h3>
										<p className='text-gray-400 mb-6 max-w-xs'>Unique, hand-crafted fragrances that tell a story with every note.</p>
										<Link href="/shop" className='text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all'>
											Discover Collection <ArrowRight className='w-4 h-4' />
										</Link>
									</div>
								</motion.div>
							</div>
						</div>
					</div>
					
					{/* Background Decorations */}
					<div className='absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2' />
					<div className='absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full' />
				</section>

				{/* Section 3: Recommended Product Slider */}
				<section className='py-16 md:py-24 bg-[#111] relative overflow-hidden'>
					<div className='absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full' />
					<div className='absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full' />
					<div className='container mx-auto px-4 sm:px-6'>

						{/* Section Label */}
						<p className='text-primary font-medium tracking-widest uppercase text-sm mb-12 text-center'>
							Recommended for you
						</p>

						{featuredProducts.length === 0 ? (
							/* Loading skeleton */
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'>
								<div className='aspect-square rounded-3xl bg-white/5 animate-pulse' />
								<div className='space-y-6'>
									<div className='h-8 w-2/3 bg-white/5 rounded-full animate-pulse' />
									<div className='h-16 bg-white/5 rounded-2xl animate-pulse' />
									<div className='h-6 w-1/3 bg-white/5 rounded-full animate-pulse' />
								</div>
							</div>
						) : (
							<>
								<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'>

									{/* Product Image with AnimatePresence */}
									<div className='relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/5'>
										<AnimatePresence mode='wait'>
											<motion.img
												key={currentProduct?._id}
												src={currentProduct?.productImage?.[0]?.filename
													? `https://api.velorm.com/resources/${currentProduct.productImage[0].filename}`
													: currentProduct?.image || ''
												}
												alt={currentProduct?.name}
												initial={{ opacity: 0, x: 60 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: -60 }}
												transition={{ duration: 0.4, ease: 'easeInOut' }}
												className='absolute inset-0 w-full h-full object-cover'
											/>
										</AnimatePresence>

										{/* Prev / Next arrows on image */}
										<button
											onClick={goPrev}
											className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all z-10'>
											<ChevronLeft className='w-5 h-5' />
										</button>
										<button
											onClick={goNext}
											className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all z-10'>
											<ChevronRight className='w-5 h-5' />
										</button>
									</div>

									{/* Product Details */}
									<AnimatePresence mode='wait'>
										<motion.div
											key={currentProduct?._id + '-info'}
											initial={{ opacity: 0, y: 24 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -24 }}
											transition={{ duration: 0.4, ease: 'easeInOut' }}
										>
											<p className='text-xs font-bold tracking-widest text-primary uppercase mb-4'>
												{currentProduct?.category?.name || currentProduct?.category || 'Collection'}
											</p>
											<h2 className='text-3xl md:text-5xl font-serif text-white mb-6 leading-tight'>
												{currentProduct?.name}
											</h2>
											<p className='text-gray-400 text-base md:text-lg mb-6 leading-relaxed'>
												{currentProduct?.description || 'A luxurious fragrance crafted with the finest ingredients for an unforgettable scent experience.'}
											</p>
											<div className='flex items-center gap-1 mb-8'>
												{[...Array(5)].map((_, i) => (
													<Star key={i} className='w-4 h-4 fill-primary text-primary' />
												))}
												<span className='ml-3 text-white font-medium text-sm'>4.9 / 5.0</span>
											</div>
											<p className='text-3xl font-bold text-primary mb-8'>
												₹{currentProduct?.regularPrice || currentProduct?.price || '—'}
											</p>
											<div className='flex flex-wrap gap-4'>
												<button
													onClick={() => handleAddToCart(currentProduct)}
													className='flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/20'>
													<ShoppingBag className='w-4 h-4' /> Add to Bag
												</button>
												<Link href={`/product-details/${currentProduct?.slug}`}>
													<button className='px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors'>
														View Details
													</button>
												</Link>
											</div>
										</motion.div>
									</AnimatePresence>
								</div>

								{/* Horizontal Pagination Dots */}
								<div className='flex items-center justify-center gap-2 mt-12'>
									{featuredProducts.map((_, i) => (
										<button
											key={i}
											onClick={() => setActiveSlide(i)}
											className={`transition-all duration-300 rounded-full ${
												activeSlide === i
													? 'w-8 h-2.5 bg-primary'
													: 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
											}`}
										/>
									))}
								</div>
							</>
						)}
					</div>
				</section>

				{/* Section 4: Testimonials */}
				<section className='py-16 md:py-24 bg-background'>
					<div className='container mx-auto px-4 sm:px-6'>
						<div className='text-center mb-12 md:mb-16'>
							<h2 className='text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4'>
								Voices of Velorm
							</h2>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
							{[
								{
									name: 'Alexander Rivers',
									role: 'Adventurer',
									text: "The forest scent is unparalleled. It's not overwhelming but lasts throughout my entire trek.",
								},
								{
									name: 'Julian Chen',
									role: 'Creative Director',
									text: 'Velorm understands the modern man.',
								},
								{
									name: 'Marcus Thorne',
									role: 'Fitness Coach',
									text: 'My Aura feels clean and ready for the day.',
								},
							].map((t, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className='p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all'>
									<p className='text-gray-300 italic mb-8 leading-relaxed'>
										&ldquo;{t.text}&rdquo;
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
				<section className='py-16 md:py-24 bg-[#0a0a0a]'>
					<div className='container mx-auto px-4 sm:px-6'>
						<div className='flex items-center justify-between mb-10 md:mb-12'>
							<div>
								<h2 className='text-2xl md:text-3xl font-serif text-white flex items-center gap-3'>
									<Instagram className='w-6 h-6 text-primary' />{' '}
									@Velorm.official
								</h2>
							</div>
							<a
								href='#'
								className='text-primary hover:underline font-medium text-sm md:text-base'>
								Follow Us
							</a>
						</div>
						<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4'>
							{[1, 2, 3, 4, 5, 6].map((idx) => (
								<div
									key={idx}
									className='aspect-square relative group overflow-hidden rounded-xl cursor-pointer'>
									<img
										src={`/src/assets/ig/post_${idx}.jpg`}
										alt='IG Post'
										className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
									/>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
