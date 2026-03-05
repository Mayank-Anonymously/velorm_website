import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function RefundPolicy() {
  return (
    <>
      <SEO 
        title="Refund Policy | Velorm" 
        description="Learn about our refund, return, and exchange policies for Velorm products." 
      />
      <Header />
      <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">Refund Policy</h1>
            
            <div className="space-y-8 text-gray-300 leading-relaxed font-light">
              <p className="font-medium text-white">Last updated: March 02, 2026</p>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">Return Policy</h2>
                <ul className="list-disc pl-5 space-y-4 text-lg">
                  <li>Returns are accepted within 7 days of delivery for damaged or defective items.</li>
                  <li>Items must be unused and returned in original packaging.</li>
                  <li>Proof of damage (photo/video) may be required.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">Refund Policy</h2>
                <ul className="list-disc pl-5 space-y-4 text-lg">
                  <li>Approved Refunds will be credited to the original mode of payment within 7 working days after the returned item is received and inspected.</li>
                  <li>Shipping charges are non-refundable.</li>
                </ul>
              </section>

              <section className="pt-8 border-t border-white/10 space-y-2 text-lg">
                <p className="mb-4">Feel free to get in touch if you have any questions or need assistance:</p>
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
