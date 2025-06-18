
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface StoreLocationMapProps {
  address?: string;
  className?: string;
}

const StoreLocationMap: React.FC<StoreLocationMapProps> = ({ 
  address = "Illinois, Chicago, USA",
  className = "h-72 rounded-lg"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the map when component mounts
    if (mapRef.current) {
      // Create iframe for Google Maps embed
      const iframe = document.createElement('iframe');
      iframe.style.border = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.borderRadius = '0.5rem';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      
      // Use Google Maps embed URL for Chicago, Illinois
      const encodedAddress = encodeURIComponent(address);
      iframe.src = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}&zoom=15`;
      
      // For demo purposes, use a static map image as fallback
      const mapContainer = mapRef.current;
      mapContainer.innerHTML = '';
      
      // Create a styled map placeholder with interactive feel
      const mapDiv = document.createElement('div');
      mapDiv.className = 'relative w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-all duration-300';
      mapDiv.innerHTML = `
        <div class="absolute inset-0 bg-gray-200 rounded-lg">
          <div class="w-full h-full flex items-center justify-center relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100 opacity-60"></div>
            <div class="relative z-10 text-center">
              <div class="bg-white p-4 rounded-lg shadow-lg border-2 border-brand-gold max-w-xs mx-auto">
                <div class="flex items-center justify-center mb-2">
                  <div class="bg-brand-gold p-2 rounded-full">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h3 class="font-serif font-medium text-gray-800 mb-1">LINGAM Aabharanam</h3>
                <p class="text-sm text-gray-600">${address}</p>
                <button class="mt-2 text-brand-gold text-sm hover:underline">
                  Click to view in Google Maps
                </button>
              </div>
            </div>
            <div class="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md">
              <div class="text-xs text-gray-600">Interactive Map</div>
            </div>
          </div>
        </div>
      `;
      
      // Add click handler to open Google Maps
      mapDiv.addEventListener('click', () => {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        window.open(mapsUrl, '_blank');
      });
      
      mapContainer.appendChild(mapDiv);
    }
  }, [address]);

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default StoreLocationMap;
