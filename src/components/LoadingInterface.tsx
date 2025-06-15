
import React, { useState, useEffect } from 'react';
import { Sparkles, Plane, MapPin, Calendar } from 'lucide-react';
import { SearchData } from '@/pages/Index';

interface LoadingInterfaceProps {
  searchData: SearchData;
}

const loadingMessages = [
  "Finding the perfect destinations for you...",
  "Analyzing flight options...",
  "Curating unique experiences...",
  "Optimizing your itinerary...",
  "Almost ready to show your dream trip..."
];

const destinationFacts = [
  "Tokyo has more Michelin-starred restaurants than any other city in the world",
  "The best time to visit Tokyo is during spring (March-May) for cherry blossoms",
  "Tokyo's Shibuya Crossing sees over 2.4 million pedestrians daily",
  "Tokyo has 13 subway lines and over 280 stations",
  "Tsukiji Fish Market handles over 2,000 tons of seafood daily"
];

export const LoadingInterface: React.FC<LoadingInterfaceProps> = ({ searchData }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 80);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 800);

    const factInterval = setInterval(() => {
      setFactIndex(prev => (prev + 1) % destinationFacts.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(factInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="text-center max-w-2xl">
        {/* AI Thinking Animation */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20" />
              <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-purple-600 animate-spin" />
              </div>
            </div>
          </div>
        </div>

        {/* Trip Summary */}
        <div className="mb-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Planning Your Journey</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-white/80">
              <MapPin className="w-4 h-4" />
              <span>{searchData.origin} → {searchData.destination}</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Calendar className="w-4 h-4" />
              <span>{searchData.dates.start} to {searchData.dates.end}</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Plane className="w-4 h-4" />
              <span>{searchData.travelers} travelers</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <span className="text-yellow-400">$</span>
              <span>${searchData.budget.toLocaleString()} budget</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/90 mt-3 text-lg font-medium">
            {loadingMessages[messageIndex]}
          </p>
        </div>

        {/* Destination Fact */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center justify-center">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            Did you know?
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            {destinationFacts[factIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};
