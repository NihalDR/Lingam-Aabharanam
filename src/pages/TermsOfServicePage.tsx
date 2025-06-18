
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStoreInfo } from '@/utils/storeInfo';

const TermsOfServicePage = () => {
  const navigate = useNavigate();
  const storeInfo = getStoreInfo();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => navigate(-1)}
          variant="ghost" 
          className="mb-6 p-0 h-auto text-brand-gold hover:text-brand-gold-dark"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-serif font-medium text-brand-charcoal mb-8">Terms of Service</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using the Lingam Aabharanam website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Products and Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lingam Aabharanam specializes in handcrafted silver jewelry and religious idols. All products are made with genuine silver and crafted with traditional techniques.
            </p>
            <h3 className="text-xl font-medium text-brand-charcoal mb-3">Product Information</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>We strive to display accurate product images and descriptions</li>
              <li>Colors may vary slightly due to screen display differences</li>
              <li>Product availability is subject to change</li>
              <li>All weights and measurements are approximate</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Pricing and Payment</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All prices are listed in USD and are subject to change without notice. Payment is required at the time of purchase through our secure payment processing system.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Prices include applicable taxes where required</li>
              <li>Payment methods accepted: Credit cards, debit cards, and other specified methods</li>
              <li>All transactions are processed securely</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Appointments</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our store operates by appointment only to provide personalized service:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Appointments must be booked in advance through our website or phone</li>
              <li>Please arrive on time for your scheduled appointment</li>
              <li>Cancellations should be made at least 24 hours in advance</li>
              <li>We reserve the right to reschedule appointments if necessary</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Returns and Exchanges</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We want you to be completely satisfied with your purchase:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Returns accepted within 30 days of purchase</li>
              <li>Items must be in original condition with all packaging</li>
              <li>Custom or personalized items are not eligible for return</li>
              <li>Return shipping costs are the responsibility of the customer</li>
              <li>Refunds will be processed within 5-7 business days</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content on this website, including but not limited to text, graphics, logos, images, and designs, is the property of Lingam Aabharanam and is protected by copyright and trademark laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lingam Aabharanam shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Lingam Aabharanam</strong><br />
                Email: <a href={`mailto:${storeInfo.email}`} className="text-brand-gold hover:underline">{storeInfo.email}</a><br />
                Phone: <a href={`tel:${storeInfo.phone}`} className="text-brand-gold hover:underline">{storeInfo.phone}</a><br />
                Address: {storeInfo.address}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
