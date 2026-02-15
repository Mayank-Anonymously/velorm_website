import { motion } from 'framer-motion';
import { Search, Filter, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { AppDispatch } from '@/store/store';
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Product {
	_id: string;
	name: string;
	slug: string;
	categoryId: string;
	price: number;
	regularPrice: number;
	description: string;
	productImage: string[];
	status: boolean;
	selQty?: number;
}

interface Category {
	_id: string;
	categoryName: string;
	slug: string;
}

interface ShopProps {
	products: Product[];
	categories: Category[];
}

// Helper to get category name
const getCategoryName = (categoryId: string, categories: Category[]) => {
	const cat = categories.find((c) => c._id === categoryId);
	return cat ? cat.categoryName : 'Collection';
};

export default function Shop({ products = [], categories = [] }: any) {
	const dispatch = useDispatch<AppDispatch>();
	const [searchTerm, setSearchTerm] = useState('');

	const handleAddToCart = (e: React.MouseEvent, product: Product) => {
		e.preventDefault();
		e.stopPropagation();

		// Use a valid User ID (store in auth slice or context IRL)
		const DEMO_USER_ID = '6624e2faa3bd4fd5287d508e';

		const productData = {
			productwithdates: {
				subscribed_type: 'One Time',
				start_date: new Date(),
				membership_offer: false,
				regularPrice: product.regularPrice || product.price,
				subscription_dates: '',
				name: product.name,
				image:
					product.productImage && product.productImage.length > 0 ?
						product.productImage[0]
					:	'',
			},
			price: product.price,
			name: product.name,
		};

		dispatch(
			addToCart({
				productId: product._id,
				userId: DEMO_USER_ID,
				productData,
			}),
		);
		alert('Added to cart!');
	};

	// Filter products
	const filteredProducts = products.filter((p: any) =>
		p.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<>
			<Header />
			<div className='min-h-screen bg-background text-foreground pt-32 pb-24'>
				<div className='container mx-auto px-6'>
					<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
						<div>
							<h1 className='text-5xl font-serif text-white mb-4'>Shop All</h1>
							<p className='text-gray-400'>
								Discover our full range of nature-inspired grooming essentials.
							</p>
						</div>
						<div className='flex gap-4'>
							<div className='relative'>
								<input
									type='text'
									placeholder='Search...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm focus:outline-none focus:border-primary w-64 text-white'
								/>
								<Search className='w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400' />
							</div>

							<select className='px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm appearance-none focus:outline-none focus:border-primary transition-all pr-12 text-white'>
								<option>Sort by: Popularity</option>
								<option>Price: Low to High</option>
								<option>Price: High to Low</option>
							</select>
						</div>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
						{filteredProducts.map((product: any, i: any) => {
							console.log(product);
							return (
								<motion.div
									key={product._id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.1 }}
									className='group'>
									<Link href={`/product-details/${product.slug}`}>
										<div className='cursor-pointer'>
											<div className='relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 border border-white/5 mb-6'>
												<img
													src={`https://api.velorm.com/resources/${product.productImage[0].filename}`}
													alt={product.name}
													className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
													onError={(e) => {
														(e.target as HTMLImageElement).src =
															'https://via.placeholder.com/400x500?text=No+Image';
													}}
												/>
												<button className='absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity'>
													<Heart className='w-5 h-5' />
												</button>
												<div className='absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all'>
													<button
														onClick={(e) => handleAddToCart(e, product)}
														className='w-full py-3 bg-primary text-black font-bold rounded-xl shadow-xl'>
														Add to Cart
													</button>
												</div>
											</div>
											<div className='flex justify-between items-start'>
												<div>
													<p className='text-primary text-xs uppercase tracking-widest mb-1 font-bold'>
														{getCategoryName(product.categoryId, categories)}
													</p>
													<h3 className='text-lg font-serif text-white group-hover:text-primary transition-colors'>
														{product.name}
													</h3>
												</div>
												<p className='text-white font-medium'>
													₹{product.price}
												</p>
											</div>
											<div className='flex items-center gap-1 mt-2'>
												<Star className='w-3 h-3 fill-primary text-primary' />
												<span className='text-xs text-gray-500'>4.5</span>
											</div>
										</div>
									</Link>
								</motion.div>
							);
						})}
						{filteredProducts.length === 0 && (
							<p className='text-white col-span-3 text-center'>
								No products found.
							</p>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export async function getServerSideProps() {
	try {
		const [productsRes, categoriesRes] = await Promise.all([
			fetch('https://api.velorm.com/api/v1/product/get-all-products'),
			fetch('https://api.velorm.com/api/v1/category/get-all-categories'),
		]);

		const productsData = await productsRes.json();
		const categoriesData = await categoriesRes.json();

		return {
			props: {
				products: productsData.response || [],
				categories: categoriesData.response || [],
			},
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			props: {
				products: [],
				categories: [],
			},
		};
	}
}
