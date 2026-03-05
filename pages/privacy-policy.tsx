import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO 
        title="Privacy Policy | Velorm" 
        description="Our Privacy Policy outlines how Velorm collects, uses, and protects your personal information." 
      />
      <Header />
      <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">Privacy Policy</h1>
            
            <div className="space-y-8 text-gray-300 leading-relaxed font-light">
              <p className="font-medium text-white">Last updated: March 02, 2026</p>

              <section>
                <p>
                  This Privacy Policy outlines how personal information is collected, used, and safeguarded when you interact with this website. By accessing or using the website, you agree to the practices described below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">1. Information We Collect</h2>
                <p className="mb-4">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Information:</strong> Name, phone number, email address, billing/shipping address.</li>
                  <li><strong>Payment Information:</strong> Used to process orders securely through third-party payment gateways.</li>
                  <li><strong>Technical Information:</strong> IP address, browser type, device information, and usage data via cookies or similar technologies.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To process and deliver orders.</li>
                  <li>To send transactional communications such as order updates or shipping alerts.</li>
                  <li>To respond to customer inquiries or service requests.</li>
                  <li>To improve website functionality, services, and user experience.</li>
                  <li>For marketing purposes (only with your explicit consent).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">3. Data Sharing</h2>
                <p>We do not sell, rent, or trade your personal data.</p>
                <p className="mt-4">We may share necessary information with third-party service providers such as payment gateways, delivery partners, or IT service providers only to fulfill your order or maintain the website.</p>
                <p className="mt-4">Personal information may be disclosed if required by law or legal proceedings.</p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">4. Data Security</h2>
                <p>We implement reasonable security measures to protect your data from unauthorized access, alteration, or disclosure.</p>
                <p className="mt-4">However, no online transmission is 100% secure. You acknowledge this risk when using the site.</p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">5. Cookies and Tracking Technologies</h2>
                <p>Cookies are used to personalize your experience, analyze site traffic, and provide relevant ads.</p>
                <p className="mt-4">You can manage or disable cookies via your browser settings, although this may affect site functionality.</p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">6. Third-Party Links</h2>
                <p>This website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites.</p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">7. Your Rights</h2>
                <p>You may request access to or correction of your personal data.</p>
                <p className="mt-4">You may opt out of marketing communications at any time.</p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-white mb-4">8. Changes to This Policy</h2>
                <p>This privacy policy may be updated periodically. Continued use of the website after changes indicates acceptance of the revised policy.</p>
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
