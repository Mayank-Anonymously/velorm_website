import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';
import {
	Star,
	ShoppingBag,
	Heart,
	ArrowLeft,
	Truck,
	ShieldCheck,
	RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/router';

interface Product {
	_id: string;
	name: string;
	slug: string;
	categoryId: string;
	productType: string;
	price: number;
    regularPrice: number;
	description: string;
    productImage: string[];
}

interface Props {
	product: Product;
    error?: string;
}

// Hardcoded user ID for demo purposes
const DEMO_USER_ID = "6624e2faa3bd4fd5287d508e";

export default function ProductDetails({ product, error }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white">
                <h1 className="text-4xl font-serif mb-4">Product Not Found</h1>
                <Link href="/shop" className="text-primary hover:underline">Return to Shop</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        const productData = {
           productwithdates: {
               subscribed_type: "One Time",
               start_date: new Date(),
               membership_offer: false,
               regularPrice: product.regularPrice || product.price,
               subscription_dates: "",
               name: product.name,
               image: product.productImage && product.productImage.length > 0 ? product.productImage[0] : '', 
           },
           price: product.price,
           name: product.name
        };

        dispatch(addToCart({ 
            productId: product._id, 
            userId: DEMO_USER_ID, 
            productData 
        }));
        router.push('/cart');
    };

	return (
		<> <Header />
			<div className='min-h-screen bg-background text-foreground pt-32 pb-24'>
				<div className='container mx-auto px-6'>
					<Link
						href='/shop'
						className='inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors'>
						<ArrowLeft className='w-4 h-4' /> Back to Shop
					</Link>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
						{/* LEFT SIDE IMAGE */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							className='space-y-4'>
							<div className='aspect-[4/5] rounded-[2rem] overflow-hidden bg-white/5 border border-white/5'>
								<img
									src={product.productImage && product.productImage.length > 0 
                                        ? (product.productImage[0].startsWith('http') ? product.productImage[0] : `https://api.velorm.com/images/${product.productImage[0]}`) 
                                        : '/images/placeholder.png'}
									className='w-full h-full object-cover'
									alt={product.name}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=No+Image';
                                    }}
								/>
							</div>
						</motion.div>

						{/* RIGHT SIDE DETAILS */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}>
							<div className='flex items-center gap-2 mb-4'>
								<div className='flex gap-1'>
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className='w-4 h-4 fill-primary text-primary'
										/>
									))}
								</div>
								<span className='text-sm text-gray-500'>
									(128 Customer Reviews)
								</span>
							</div>

							<h1 className='text-5xl font-serif text-white mb-4'>
								{product.name}
							</h1>

							<p className='text-3xl font-medium text-primary mb-4'>
								₹{product.price}
							</p>

							<p className='text-sm text-gray-400 mb-6'>
								{/** We don't have category name here easily unless we fetch it or pass it. 
                                     Backend response has categoryId. 
                                     For now, just show type if available or hardcode 'Collection' */}
								Collection • {product.productType || 'Attar'}
							</p>

							<p className='text-gray-400 text-lg leading-relaxed mb-10'>
								{product.description}
							</p>

							<div className='flex items-center gap-6 mb-10'>
								<div className='flex-1'>
									<button 
                                        onClick={handleAddToCart}
                                        className='w-full py-4 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3'>
										<ShoppingBag className='w-5 h-5' /> Add to Cart
									</button>
								</div>
								<button className='w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors'>
									<Heart className='w-6 h-6' />
								</button>
							</div>

							{/* FEATURES */}
							<div className='grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10'>
								<div className='flex flex-col items-center text-center'>
									<Truck className='w-6 h-6 text-primary mb-3' />
									<p className='text-xs text-white uppercase font-bold'>
										Free Shipping
									</p>
								</div>
								<div className='flex flex-col items-center text-center'>
									<ShieldCheck className='w-6 h-6 text-primary mb-3' />
									<p className='text-xs text-white uppercase font-bold'>
										Premium Quality
									</p>
								</div>
								<div className='flex flex-col items-center text-center'>
									<RefreshCw className='w-6 h-6 text-primary mb-3' />
									<p className='text-xs text-white uppercase font-bold'>
										Easy Returns
									</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export async function getServerSideProps(context: any) {
    const { slug } = context.params;

    try {
        const res = await fetch(`https://api.velorm.com/api/v1/product/get-product-by-slug/${slug}`);
        
        if (!res.ok) {
            return { props: { error: 'Product not found' } }; // Or notFound: true
        }

        const data = await res.json();
        
        if (!data.response) {
             return { notFound: true };
        }

        return {
            props: {
                product: data.response,
            },
        };
    } catch (error) {
        console.error("Error fetching product:", error);
        return {
             props: { error: 'Failed to load product' }
        };
    }
}
