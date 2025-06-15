
import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  DollarSign, 
  Plane, 
  MapPin, 
  Users,
  Wifi,
  Car,
  Coffee,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Map
} from 'lucide-react';

interface TravelPackage {
  id: number;
  title: string;
  duration: string;
  price: number;
  confidence: number;
  image: string;
  budgetBreakdown: {
    flights: number;
    hotels: number;
    activities: number;
    food: number;
    misc: number;
  };
  flights: {
    outbound: string;
    return: string;
    airline: string;
    duration: string;
  };
  hotel: {
    name: string;
    rating: number;
    location: string;
    amenities: string[];
  };
  activities: string[];
}

interface TravelPackageCardProps {
  package: TravelPackage;
}

export const TravelPackageCard: React.FC<TravelPackageCardProps> = ({ 
  package: pkg 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const total = Object.values(pkg.budgetBreakdown).reduce((sum, val) => sum + val, 0);

  const handleBookFlight = () => {
    // In a real app, this would redirect to a flight booking service
    window.open(`https://www.google.com/flights#search;f=${pkg.flights.outbound.split(' → ')[0]};t=${pkg.flights.outbound.split(' → ')[1]};d=2024-12-20;r=2024-12-30`, '_blank');
  };

  const handleBookHotel = () => {
    // In a real app, this would redirect to a hotel booking service
    window.open(`https://www.booking.com/searchresults.html?ss=${pkg.hotel.location}&checkin=2024-12-20&checkout=2024-12-30`, '_blank');
  };

  const handleBookActivity = (activity: string) => {
    // In a real app, this would redirect to an activity booking service
    window.open(`https://www.viator.com/searchResults/all?text=${encodeURIComponent(activity)}`, '_blank');
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 group">
      {/* Header */}
      <div className="relative">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {pkg.confidence}% match
        </div>
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setShowMap(!showMap)}
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            title="View on map"
          >
            <Map className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{pkg.title}</h3>
          <p className="text-white/80 text-sm">{pkg.duration}</p>
        </div>
      </div>

      {/* Map View */}
      {showMap && (
        <div className="h-64 bg-gray-800 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/80">
              <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Interactive map coming soon</p>
              <p className="text-xs text-white/60">Location: {pkg.hotel.location}</p>
            </div>
          </div>
          <button
            onClick={() => setShowMap(false)}
            className="absolute top-2 right-2 bg-black/20 text-white p-1 rounded-full hover:bg-black/40 transition-colors"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-white">${pkg.price.toLocaleString()}</div>
            <div className="text-white/60 text-sm">for 2 travelers</div>
          </div>
          <div className="text-right">
            <div className="text-white/80 text-sm">${(pkg.price / 2).toLocaleString()}</div>
            <div className="text-white/60 text-xs">per person</div>
          </div>
        </div>

        {/* Quick Info with Booking Links */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <Plane className="w-4 h-4" />
              <span>{pkg.flights.outbound} • {pkg.flights.airline}</span>
            </div>
            <button
              onClick={handleBookFlight}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span className="text-xs">Book</span>
            </button>
          </div>
          <div className="flex items-center justify-between text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{pkg.hotel.name} • {pkg.hotel.location}</span>
              <div className="flex items-center ml-2">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs ml-1">{pkg.hotel.rating}</span>
              </div>
            </div>
            <button
              onClick={handleBookHotel}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span className="text-xs">Book</span>
            </button>
          </div>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center space-x-2 text-white/80 hover:text-white transition-colors py-2 border-t border-white/10"
        >
          <span>{expanded ? 'Less Details' : 'More Details'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-4 space-y-4 animate-in slide-in-from-top duration-300">
            {/* Budget Breakdown */}
            <div>
              <h4 className="text-white font-semibold mb-2">Budget Breakdown</h4>
              <div className="space-y-2">
                {Object.entries(pkg.budgetBreakdown).map(([category, amount]) => (
                  <div key={category} className="flex justify-between text-sm">
                    <span className="text-white/70 capitalize">{category}</span>
                    <span className="text-white">${amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities with Booking Links */}
            <div>
              <h4 className="text-white font-semibold mb-2">Included Activities</h4>
              <div className="space-y-2">
                {pkg.activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-white/70">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                      {activity}
                    </div>
                    <button
                      onClick={() => handleBookActivity(activity)}
                      className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="text-xs">Book</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Amenities */}
            <div>
              <h4 className="text-white font-semibold mb-2">Hotel Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {pkg.hotel.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold">
              Book This Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
