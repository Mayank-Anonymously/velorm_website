import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowLeft, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getEffectiveUserId } from '@/lib/auth';

export default function ProductDetails() {
	const router = useRouter();
	const { slug } = router.query;
	const dispatch = useDispatch<AppDispatch>();
	const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
	const [product, setProduct] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [activeImage, setActiveImage] = useState(0);

	useEffect(() => {
		if (slug) {
			const fetchProduct = async () => {
				try {
					const res = await fetch(`https://api.velorm.com/api/v1/product/get-product-by-slug/${slug}`);
					const data = await res.json();
					setProduct(data.response);
				} catch (error) {
					console.error('Error fetching product:', error);
				} finally {
					setLoading(false);
				}
			};
			fetchProduct();
		}
	}, [slug]);

	const handleAddToCart = () => {
		if (!product) return;
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
		alert('Added to bag!');
	};

	if (loading) return <div className="min-h-screen bg-background flex items-center justify-center pt-20">
		<div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
	</div>;
	
	if (!product) return <div className="min-h-screen bg-background flex items-center justify-center pt-20">
		<p className="text-white text-xl">Product not found</p>
	</div>;

	return (
		<>
			<Header />
			<div className='min-h-screen bg-background text-foreground pt-32 pb-24'>
				<div className='container mx-auto px-4 sm:px-6'>
					<Link
						href='/shop'
						className='inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group'>
						<ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
						Back to Collection
					</Link>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24'>
						{/* Product Images */}
						<div className='space-y-6'>
							{(() => {
								const allImages = [product.productImage[0].filename, ...(product.productImage[0].filename || [])].filter(Boolean);
								const displayImg = allImages[activeImage] || product.image || '';
								return (
									<>
										<motion.div
											key={displayImg}
											initial={{ opacity: 0, scale: 0.98 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ duration: 0.3 }}
											className='aspect-square rounded-[3rem] overflow-hidden bg-white/5 border border-white/5'>
											<img
												src={`https://api.velorm.com/resources/${product.productImage[0].filename}`}
												alt={product.name}
												className='w-full h-full object-cover'
											/>
										</motion.div>
										{/* <div className='grid grid-cols-4 gap-4'>
											{allImages.map((img, i) => (
												<button
													key={i}
													onClick={() => setActiveImage(i)}
													className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
														activeImage === i ? 'border-primary' : 'border-transparent opacity-50'
													}`}>
													<img
																										src={`https://api.velorm.com/resources/${img}`}

														alt={`${product.name} view ${i + 1}`}
														className='w-full h-full object-cover'
													/>
												</button>
											))}
										</div> */}
									</>
								);
							})()}
						</div>

						{/* Product Info */}
						<div className='flex flex-col justify-center'>
							<div className='mb-8'>
								<p className='text-xs font-bold tracking-widest text-primary uppercase mb-4'>
									{product.category?.name || product.category}
								</p>
								<h1 className='text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4'>
									{product.name}
								</h1>
								<div className='flex items-center gap-4 mb-6'>
									<div className='flex items-center gap-1'>
										{[1, 2, 3, 4, 5].map((s) => (
											<Star
												key={s}
												className='w-4 h-4 fill-primary text-primary'
											/>
										))}
									</div>
									<span className='text-sm text-gray-500'>(24 Reviews)</span>
								</div>
								<p className='text-2xl md:text-3xl font-medium text-primary mb-8'>
									₹{product.price}
								</p>
								<p className='text-gray-400 leading-relaxed mb-10'>
									{product.description ||
										'Immerse yourself in the world of luxury with this exquisite fragrance. Crafted with the finest ingredients to ensure a long-lasting and captivating scent experience.'}
								</p>
							</div>

							<div className='space-y-6 mb-12'>
								<button
									onClick={handleAddToCart}
									className='w-full py-5 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-lg shadow-primary/20'>
									<ShoppingBag className='w-5 h-5' /> Add to Bag
								</button>
							</div>

							{/* Features Grid */}
							<div className='grid grid-cols-3 gap-4 pt-10 border-t border-white/10'>
								<div className='flex flex-col items-center text-center gap-3'>
									<div className='w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary'>
										<Truck className='w-5 h-5' />
									</div>
									<span className='text-[10px] uppercase font-bold tracking-widest text-gray-400'>
										Free Shipping
									</span>
								</div>
								<div className='flex flex-col items-center text-center gap-3'>
									<div className='w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary'>
										<ShieldCheck className='w-5 h-5' />
									</div>
									<span className='text-[10px] uppercase font-bold tracking-widest text-gray-400'>
										Authentic
									</span>
								</div>
								<div className='flex flex-col items-center text-center gap-3'>
									<div className='w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary'>
										<RefreshCcw className='w-5 h-5' />
									</div>
									<span className='text-[10px] uppercase font-bold tracking-widest text-gray-400'>
										Easy Returns
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Customer Reviews Section */}
					<ReviewsSection productId={product._id} userId={user?._id} isAuthenticated={isAuthenticated} />
				</div>
			</div>
			<Footer />
		</>
	);
}

function ReviewsSection({ productId, userId, isAuthenticated }: { productId: string, userId?: string, isAuthenticated: boolean }) {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);



    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert('Please login to leave a review');
            return;
        }
        if (!comment.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch(`https://api.velorm.com/api/v1/rating/add-rating/${productId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    rating,
                    description: comment,
                    saveInfo: true
                })
            });
            const data = await res.json();
            if (data.baseResponse?.status === 1) {
                setComment('');
                setRating(5);
                alert('Review submitted successfully!');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-32 pt-20 border-t border-white/5">
            <div className="flex flex-col lg:flex-row gap-20">
                {/* Reviews List */}
                <div className="lg:w-2/3">
                    <h2 className="text-3xl font-serif text-white mb-12">Customer Reviews</h2>
                    
                    {loading ? (
                        <div className="space-y-8">
                            {[1, 2].map(i => (
                                <div key={i} className="h-40 bg-white/5 rounded-3xl animate-pulse" />
                            ))}
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="p-12 text-center bg-white/5 rounded-[2rem] border border-white/5">
                            <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {reviews.map((rev, i) => (
                                <motion.div 
                                    key={rev._id || i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                                {rev.user?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{rev.user?.name || 'Anonymous User'}</p>
                                                <p className="text-xs text-gray-500">{new Date(rev.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} className={`w-3.5 h-3.5 ${idx < rev.rating ? 'fill-primary text-primary' : 'text-gray-700'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed italic">&ldquo;{rev.description}&rdquo;</p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Write a Review Form */}
                <div className="lg:w-1/3">
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 sticky top-32">
                        <h3 className="text-2xl font-serif text-white mb-8">Write a Review</h3>
                        
                        {isAuthenticated ? (
                            <form onSubmit={handleSubmitReview} className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 block">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setRating(s)}
                                                className="hover:scale-110 transition-transform"
                                            >
                                                <Star className={`w-8 h-8 ${s <= rating ? 'fill-primary text-primary' : 'text-gray-700'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 block">Your Experience</label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Tell us what you think of this scent..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white focus:outline-none focus:border-primary transition-colors min-h-[150px] resize-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-4 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2"
                                >
                                    {submitting ? 'Sending...' : 'Post Review'}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-gray-400 mb-6">Please log in to share your review with the community.</p>
                                <Link href="/login" className="inline-block px-8 py-3 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
                                    Login to Review
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
