
import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Search } from 'lucide-react';
import { SearchData } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SearchInterfaceProps {
  onSearch: (data: SearchData) => void;
}

export const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(3000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchData: SearchData = {
      query: `${destination} from ${origin}`,
      destination: destination || 'Tokyo',
      origin: origin || 'New York',
      dates: {
        start: startDate || '2024-12-20',
        end: endDate || '2024-12-30'
      },
      budget,
      travelers
    };
    
    onSearch(searchData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8 text-yellow-400 mr-2" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Wander<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI</span>
          </h1>
        </div>
        <p className="text-xl text-white/80 font-light">Your Intelligent Travel Companion</p>
      </div>

      {/* Search Form */}
      <div className="w-full max-w-4xl">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination and Origin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-white font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-white/60 focus:border-blue-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="origin" className="text-white font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-green-400" />
                  From
                </Label>
                <Input
                  id="origin"
                  type="text"
                  placeholder="Where are you traveling from?"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-white/60 focus:border-green-400"
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-white font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                  Departure Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white/5 border-white/20 text-white focus:border-orange-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-white font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                  Return Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white/5 border-white/20 text-white focus:border-orange-400"
                  required
                />
              </div>
            </div>

            {/* Travelers and Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="travelers" className="text-white font-medium flex items-center">
                  <Users className="w-4 h-4 mr-2 text-purple-400" />
                  Number of Travelers
                </Label>
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  max="20"
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value))}
                  className="bg-white/5 border-white/20 text-white focus:border-purple-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-white font-medium flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-yellow-400" />
                  Budget (USD)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  min="100"
                  step="100"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="bg-white/5 border-white/20 text-white focus:border-yellow-400"
                  required
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Travel Options
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
