
import { Users, Award, History, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';


const AboutPage = () => {
  return (
    <div className="section-container">
      <h1 className="page-title">About Lingam Aabharanam</h1>
      <p className="section-subtitle max-w-3xl">
        Discover the story behind our dedication to crafting exquisite silver jewelry and idols.
      </p>

      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-medium">Our Heritage</h2>
          <p className="text-gray-700">
          Established in 2022 by Netra and Anil Lingam, Lingam Aabharanam is dedicated to creating high-quality silver articles and jewelry that blend timeless tradition with modern design. We specialize in 925 and 999 certified silver products—from pooja items and god idols to designer jewelry and customized gifts.
          </p>
          <p className="text-gray-700">
          Our journey began with a small, curated collection, and today, we've successfully fulfilled over 1000+ orders across the U.S, Canada and India. Our loyal customer base values the uniqueness, authenticity, and craftsmanship we bring to every piece.
          </p>
          <p className="text-gray-700">
            We believe in offering more than just products—we create heirlooms. With customization at the heart of our service, we make silver personal, meaningful, and elegant.Join us as we continue to expand, innovate, and bring tradition to life—one silver piece at a time.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-gold/20 rounded-full -z-10"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-red/10 rounded-full -z-10"></div>
          <img
            src="/lingam-uploads/64ae6ed7-c2d3-46dd-95c8-c92f30ba61a8.png" 
            alt="Silver craftsmanship" 
            className="w-full h-full rounded-lg object-cover shadow-xl"
          />
        </div>
      </div>
      
      {/* Core Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-serif font-medium mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-brand-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Award className="text-brand-gold h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2">Quality Craftsmanship</h3>
            <p className="text-gray-700">
              We believe in creating pieces that stand the test of time, both in design and durability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-brand-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <History className="text-brand-gold h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2">Cultural Heritage</h3>
            <p className="text-gray-700">
              Preserving traditional designs and techniques while bringing them into the modern context.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-brand-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="text-brand-gold h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2">Authenticity</h3>
            <p className="text-gray-700">
              Using only genuine materials and providing certification for all our silver products.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-brand-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Users className="text-brand-gold h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2">Community Support</h3>
            <p className="text-gray-700">
              Empowering local artisans and supporting their families through fair wages and training.
            </p>
          </div>
        </div>
      </div>
      
      {/* Craftsmanship Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-serif font-medium mb-4">Our Craftsmanship</h2>
        <p className="text-gray-700 mb-8 max-w-3xl">
          At Lingam Aabharanam, each piece undergoes a meticulous creation process that combines traditional techniques with modern precision.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="rounded-lg overflow-hidden h-48">
              <img
                src="/lingam-uploads/14a3cd40-436a-4be8-bd3f-d107b983d67f.png"
                alt="Design Process" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-lg font-medium">Design</h3>
            <p className="text-gray-700 text-sm">
              Our design process begins with hand-drawn sketches inspired by classical motifs and contemporary trends.
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg overflow-hidden h-48">
              <img
                src="/lingam-uploads/842ac224-e6c2-4c00-b8f7-a947c66c3538.png" 
                alt="Crafting Process" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-lg font-medium">Crafting</h3>
            <p className="text-gray-700 text-sm">
              Skilled artisans transform raw silver into intricate pieces using techniques like filigree, engraving, and stone-setting.
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg overflow-hidden h-48">
              <img
                src="/lingam-uploads/0f5aa9c6-e226-4e60-a880-3569944b29ca.png" 
                alt="Quality Control" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-lg font-medium">Quality Control</h3>
            <p className="text-gray-700 text-sm">
              Each piece undergoes rigorous inspection to ensure it meets our high standards of craftsmanship and durability.
            </p>
          </div>
        </div>
      </div>
      
      <Separator className="my-12" />
      
      {/* Team Section */}
      <div>
        <h2 className="text-2xl font-serif font-medium mb-4">Meet Our Team</h2>
        <p className="text-gray-700 mb-8 max-w-3xl">
          The person behind Lingam Aabharanam are passionate about preserving traditional silversmithing while embracing innovation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="rounded-full overflow-hidden h-40 w-40 mx-auto mb-4">
              <img
                src="/lingam-uploads/ac44df99-e7f9-449f-932f-c6dc36257a2a.png"
                alt="Netra Lingam" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-lg font-medium">Netra Lingam</h3>
            <p className="text-brand-gold">Founder & CEO</p>
            <p className="text-gray-700 mt-2">
              With over 3 years of experience in silver craftsmanship, Netra leads our creative vision and design philosophy.
            </p>
          </div>
          
          <div className="text-center"></div>
          <div className="text-center"></div>
          <div className="text-center"></div>
          <div className="text-center"></div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
