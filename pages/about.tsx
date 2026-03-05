import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      <SEO 
        title="About Us | Velorm" 
        description="Learn more about Velorm, our story, and our mission to elevate the daily routine of modern gentlemen with nature-inspired premium care." 
      />
      <Header />
      <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-8 text-center">About Velorm</h1>
            
            <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
              <section>
                <h2 className="text-2xl font-serif text-white mb-4">Our Story</h2>
                <p>
                  Velorm was born out of a simple realization: the modern gentleman&apos;s grooming routine was lacking a connection to nature. We saw shelves filled with synthetic products in practical but uninspiring packaging. We wanted to create something different—a line of care products that elevates the daily routine from a mundane task to a moment of grounding and rejuvenation.
                </p>
                <p className="mt-4">
                  We started with our signature Humbling Forest cologne, meticulously blending natural extracts to capture the essence of a serene woodland morning. From there, we expanded our collection to include face care, body care, and beard serums, always staying true to our core philosophy: nature-inspired premium care that works.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">Our Philosophy</h2>
                <p>
                  We believe that taking care of yourself shouldn&apos;t be an afterthought. It should be a deliberate act of self-respect. Our products are designed to blend care, confidence, and community in every moment. We use high-quality, nature-inspired ingredients that are gentle on your skin but effective in their results.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">Sustainability Commitment</h2>
                <p>
                  We are deeply committed to protecting the natural environments that inspire our products. Our packaging is designed with minimal environmental impact in mind, utilizing recyclable materials wherever possible. We are continuously working to reduce our carbon footprint and ensure our sourcing practices are ethical and sustainable.
                </p>
              </section>

              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center mt-12">
                <h3 className="text-xl font-serif text-white mb-4">Join Our Journey</h3>
                <p className="text-sm text-gray-400 mb-6">Experience the Velorm difference and elevate your daily routine.</p>
                <a href="/shop" className="inline-block px-8 py-3 bg-primary text-black font-medium rounded-full hover:bg-[#8B9E92] transition-colors">
                  Explore Our Collection
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
