
import React from 'react';
import { ArrowLeft, Star, MapPin, Clock, Users, DollarSign } from 'lucide-react';
import { SearchData } from '@/pages/Index';
import { TravelPackageCard } from '@/components/TravelPackageCard';

interface ResultsInterfaceProps {
  searchData: SearchData;
  onNewSearch: () => void;
}

const mockPackages = [
  {
    id: 1,
    title: "Tokyo Lights & Culture",
    duration: "10 days",
    price: 2850,
    confidence: 95,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    budgetBreakdown: {
      flights: 1200,
      hotels: 800,
      activities: 500,
      food: 250,
      misc: 100
    },
    flights: {
      outbound: "NYC → NRT",
      return: "NRT → NYC",
      airline: "ANA",
      duration: "14h 25m"
    },
    hotel: {
      name: "Park Hyatt Tokyo",
      rating: 4.8,
      location: "Shinjuku",
      amenities: ["Spa", "Pool", "City View"]
    },
    activities: [
      "Senso-ji Temple Tour",
      "Tsukiji Fish Market",
      "Mount Fuji Day Trip",
      "Traditional Tea Ceremony"
    ]
  },
  {
    id: 2,
    title: "Tokyo Explorer Premium",
    duration: "10 days",
    price: 3200,
    confidence: 88,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    budgetBreakdown: {
      flights: 1400,
      hotels: 1000,
      activities: 600,
      food: 150,
      misc: 50
    },
    flights: {
      outbound: "NYC → HND",
      return: "HND → NYC",
      airline: "JAL",
      duration: "13h 50m"
    },
    hotel: {
      name: "The Ritz-Carlton Tokyo",
      rating: 4.9,
      location: "Roppongi",
      amenities: ["Luxury Spa", "Club Lounge", "City View"]
    },
    activities: [
      "Private City Tour",
      "Kyoto Day Trip",
      "Sumo Wrestling Experience",
      "Michelin Restaurant Tour"
    ]
  },
  {
    id: 3,
    title: "Tokyo Budget Adventure",
    duration: "10 days",
    price: 2200,
    confidence: 82,
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop",
    budgetBreakdown: {
      flights: 1000,
      hotels: 600,
      activities: 400,
      food: 150,
      misc: 50
    },
    flights: {
      outbound: "NYC → NRT",
      return: "NRT → NYC",
      airline: "United",
      duration: "14h 10m"
    },
    hotel: {
      name: "Shibuya Excel Hotel",
      rating: 4.2,
      location: "Shibuya",
      amenities: ["Free WiFi", "Central Location", "Breakfast"]
    },
    activities: [
      "Self-guided Walking Tours",
      "Public Bath Experience",
      "Street Food Adventure",
      "Anime & Manga Districts"
    ]
  }
];

export const ResultsInterface: React.FC<ResultsInterfaceProps> = ({ 
  searchData, 
  onNewSearch 
}) => {
  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={onNewSearch}
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-6 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Search</span>
        </button>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-white mb-4">
            Perfect Trips to {searchData.destination}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{searchData.origin} → {searchData.destination}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{searchData.dates.start} to {searchData.dates.end}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{searchData.travelers} travelers</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>${searchData.budget.toLocaleString()} budget</span>
            </div>
          </div>
        </div>
      </div>

      {/* Package Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockPackages.map((packageData) => (
            <TravelPackageCard key={packageData.id} package={packageData} />
          ))}
        </div>
      </div>
    </div>
  );
};
