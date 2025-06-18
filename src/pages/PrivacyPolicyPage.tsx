
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStoreInfo } from '@/utils/storeInfo';

const PrivacyPolicyPage = () => {
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
          <h1 className="text-4xl font-serif font-medium text-brand-charcoal mb-8">Privacy Policy</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Lingam Aabharanam, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Information We Collect</h2>
            <h3 className="text-xl font-medium text-brand-charcoal mb-3">Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect personal information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Name and contact information (email address, phone number, postal address)</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Account credentials (username, password)</li>
              <li>Communication preferences</li>
              <li>Purchase history and preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and appointments</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Send you promotional materials and newsletters (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties, except:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>To trusted service providers who assist us in operating our website and conducting business</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Access and update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your personal information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-brand-charcoal mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
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

export default PrivacyPolicyPage;
