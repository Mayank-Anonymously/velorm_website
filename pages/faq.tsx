import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function FAQ() {
  const faqs = [
    {
      question: "Are Velorm products suitable for sensitive skin?",
      answer: "Yes, our products are formulated with natural ingredients and are free from harsh chemicals, making them suitable for most skin types, including sensitive skin. However, we always recommend doing a patch test before using any new product extensively."
    },
    {
      question: "Are your products cruelty-free?",
      answer: "Absolutely. We are committed to ethical practices and do not test our products on animals."
    },
    {
      question: "How long will a bottle of Humbling Forest cologne last?",
      answer: "A 35ml bottle of our Eau de Toilette typically lasts between 2 to 3 months with daily use, as a little goes a long way."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to select international destinations. Please check our Shipping Policy page or during checkout to see if we deliver to your country."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in their original packaging. Please refer to our Refund Policy for complete details and instructions on how to initiate a return."
    },
    {
      question: "Where are your products manufactured?",
      answer: "Our products are formulated and manufactured in facilities that adhere to the highest quality standards, using globally sourced, premium natural ingredients."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has shipped, you will receive an email confirmation with a tracking number that you can use to track the progress of your delivery."
    }
  ];

  return (
    <>
      <SEO 
        title="FAQ | Velorm" 
        description="Frequently asked questions about Velorm products, shipping, returns, and more." 
      />
      <Header />
      <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 text-center">Frequently Asked Questions</h1>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, and return policies. If you can&apos;t find what you&apos;re looking for, feel free to contact us.
            </p>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                  <h3 className="text-lg font-medium text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400 leading-relaxed font-light">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-gray-400 mb-4">Still have questions?</p>
              <a href="/contact" className="inline-block px-8 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors">
                Contact Customer Support
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
