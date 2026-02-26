import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getEffectiveUserId } from '@/lib/auth';

export default function Shop() {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.auth);
	const [products, setProducts] = useState<any[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [prodRes, catRes] = await Promise.all([
					fetch('https://api.velorm.com/api/v1/product/get-all-products'),
					fetch('https://api.velorm.com/api/v1/category/get-all-categories'),
				]);
				const prodData = await prodRes.json();
				const catData = await catRes.json();
				setProducts(prodData.response || []);
				setCategories(catData.response || []);
			} catch (error) {
				console.error('Error fetching shop data:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleAddToCart = (product: any) => {
		const userId = getEffectiveUserId(user);
		dispatch(
			addToCart({
				productId: product._id,
				userId,
				productData: {
					cartProduct: product,
					selQty: 1,
				},
			}),
		);
	};

	const filteredProducts = products.filter((p) => {
		const matchesSearch = p.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === 'All' ||
			p.category?.name === selectedCategory ||
			p.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});


	return (
		<>
			<Header />
			<div className='min-h-screen bg-background text-foreground pt-32 pb-24'>
				<div className='container mx-auto px-4 sm:px-6'>
					{/* Shop Header */}
					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16'>
						<div>
							<h1 className='text-4xl md:text-5xl font-serif text-white mb-2'>
								The Collection
							</h1>
							<p className='text-gray-400'>
								Explore our curated range of premium attars and perfumes
							</p>
						</div>

						<div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
							<div className='relative w-full sm:w-auto'>
								<input
									type='text'
									placeholder='Search...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='w-full sm:w-64 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm focus:outline-none focus:border-primary text-white transition-all'
								/>
								<Search className='w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500' />
							</div>
							<div className='relative w-full sm:w-auto'>
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className='w-full sm:w-auto px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm appearance-none focus:outline-none focus:border-primary transition-all text-white pr-12'>
									<option value='All'>All Categories</option>
									{categories.map((cat) => (
										<option
											key={cat._id}
											value={cat.name}>
											{cat.name}
										</option>
									))}
								</select>
								<SlidersHorizontal className='w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none' />
							</div>
						</div>
					</div>

					{/* Product Grid */}
					{loading ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
							{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
								<div
									key={i}
									className='aspect-[4/5] rounded-[2.5rem] bg-white/5 animate-pulse'
								/>
							))}
						</div>
					) : (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12'>
							<AnimatePresence>
								{filteredProducts.map((product) => (
									<motion.div
										key={product._id}
										layout
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.95 }}
										className='group'>
										<Link
											href={`/product-details/${product.slug} `}>
											<div className='aspect-[4/5] rounded-[2.5rem] bg-white/5 border border-white/5 overflow-hidden mb-6 relative'>
												<img
													src={`https://api.velorm.com/resources/${product.productImage[0].filename}`}
													alt={product.name}
													className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
												/>
												<div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity' />
												<button
													onClick={(e) => {
														e.preventDefault();
														handleAddToCart(product);
													}}
													className='absolute bottom-6 right-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-black opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110'>
													<ShoppingBag className='w-5 h-5' />
												</button>
											</div>
										</Link>

										<div className='px-2'>
											<p className='text-xs font-bold tracking-widest text-primary uppercase mb-2'>
												{product.category?.name || product.category}
											</p>
											<h3 className='text-xl font-medium text-white mb-2'>
												{product.name}
											</h3>
											<p className='text-lg text-gray-400'>₹{product.price}</p>
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					)}

					{/* Empty State */}
					{!loading && filteredProducts.length === 0 && (
						<div className='text-center py-32'>
							<p className='text-xl text-gray-500'>
								No products found matching your criteria.
							</p>
							<button
								onClick={() => {
									setSearchTerm('');
									setSelectedCategory('All');
								}}
								className='mt-6 text-primary hover:underline'>
								Clear all filters
							</button>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
}
