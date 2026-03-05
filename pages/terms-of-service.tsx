import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <>
      <SEO 
        title="Terms of Service | Velorm" 
        description="Our Terms of Service outline the rules and guidelines for using the Velorm website and our services." 
      />
      <Header />
      <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">Terms of Service</h1>
            
            <div className="space-y-8 text-gray-300 leading-relaxed font-light">
              <p className="font-medium text-white">Last updated: March 02, 2026</p>

              <section>
                <p>
                  These Terms and Conditions govern your use of this website and the purchase of products or services offered herein. By accessing or using this website, you agree to be bound by these terms. Please read them carefully.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">1. General Use</h2>
                <p>
                  By using this website, you confirm that you are at least 18 years old or are using the website under the supervision of a parent or legal guardian.
                </p>
                <p className="mt-4">
                  All content on this website is for informational purposes only and is subject to change without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">2. User Responsibilities</h2>
                <p>
                  Users agree not to misuse the website by knowingly introducing viruses, trojans, or other malicious material.
                </p>
                <p className="mt-4">
                  You must not attempt to gain unauthorized access to the server, database, or any part of the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">3. Product & Service Descriptions</h2>
                <p>
                  All efforts are made to ensure accuracy in product descriptions, images, pricing, and availability.
                </p>
                <p className="mt-4">
                  However, we do not warrant that product descriptions or other content are complete, current, or error-free.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">4. Order Acceptance & Cancellation</h2>
                <p>
                  Placing an order on this website does not constitute a confirmed order. We reserve the right to refuse or cancel any order for reasons including but not limited to product availability, pricing errors, or suspected fraud.
                </p>
                <p className="mt-4">
                  Once placed, orders may not be canceled or modified unless otherwise stated in the return policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">5. Pricing and Payment</h2>
                <p>
                  All prices are displayed in INR or the local currency and are inclusive or exclusive of taxes as indicated.
                </p>
                <p className="mt-4">
                  Payments must be made through secure and approved payment gateways. The website is not liable for any payment gateway errors.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">6. Intellectual Property</h2>
                <p>
                  All text, graphics, logos, images, and other materials on this website are the intellectual property of their respective owners and protected by copyright and trademark laws.
                </p>
                <p className="mt-4">
                  Unauthorized use or duplication of any materials is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">7. Limitation of Liability</h2>
                <p>
                  We are not responsible for any indirect or consequential damages that may arise from the use or inability to use the website or the products purchased through it.
                </p>
                <p className="mt-4">
                  Liability is limited to the value of the product purchased, if applicable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">8. Modifications to Terms</h2>
                <p>
                  These terms may be revised at any time without prior notice. Continued use of the site after changes implies acceptance of those changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">9. Governing Law</h2>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of India.
                </p>
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
