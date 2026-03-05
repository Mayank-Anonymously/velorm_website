import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function ShippingPolicy() {
  return (
    <>
      <SEO 
        title="Shipping Policy | Velorm" 
        description="Learn about Velorm's shipping policy, delivery times, and rates. We strive to provide the best shipping experience for our customers." 
      />
      <Header />
      <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">Shipping Policy</h1>
            
            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section className="space-y-4">
                <ul className="list-disc pl-5 space-y-4 text-lg">
                  <li>Orders are typically processed within 1–3 business days.</li>
                  <li>
                    Delivery time:
                    <ul className="list-none pl-5 mt-2 space-y-2">
                      <li>Standard: 5–10 business days.</li>
                      <li>Express: 3–5 business days.</li>
                    </ul>
                  </li>
                  <li>Tracking details are shared once the order is shipped.</li>
                  <li>The business is not responsible for delays due to courier services or unforeseen circumstances.</li>
                </ul>
              </section>

              <section className="pt-8 border-t border-white/10 space-y-2 text-lg">
                <p><strong className="text-white font-medium">EMAIL ID:</strong> <a href="mailto:amangola82@gmail.com" className="text-primary hover:underline">amangola82@gmail.com</a></p>
                <p><strong className="text-white font-medium">PHONE NUMBER:</strong> <a href="tel:8920939064" className="text-primary hover:underline">8920939064</a></p>
                <p><strong className="text-white font-medium">MANAGED BY:</strong> AMAN || velorm</p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
