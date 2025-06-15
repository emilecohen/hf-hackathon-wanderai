
import React, { useState } from 'react';
import { Mic, Search, Sparkles } from 'lucide-react';
import { SearchData } from '@/pages/Index';

interface SearchInterfaceProps {
  onSearch: (data: SearchData) => void;
}

export const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Parse natural language query (simplified for demo)
    const mockSearchData: SearchData = {
      query,
      destination: 'Tokyo',
      origin: 'New York',
      dates: {
        start: '2024-12-20',
        end: '2024-12-30'
      },
      budget: 3000,
      travelers: 2
    };

    onSearch(mockSearchData);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input implementation would go here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      {/* Logo */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-yellow-400 mr-2" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Wander<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI</span>
          </h1>
        </div>
        <p className="text-xl text-white/80 font-light">Your Intelligent Travel Companion</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tell me about your dream trip... (e.g., 'Tokyo from NYC, Dec 20-30, $3000 budget, 2 people')"
                  className="w-full bg-transparent text-white placeholder-white/60 text-lg px-6 py-6 focus:outline-none"
                />
              </div>
              
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Mic className="w-6 h-6" />
              </button>
              
              <button
                type="submit"
                disabled={!query.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Quick Suggestions */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          'Weekend in Paris',
          'Tokyo adventure for 2',
          'Budget trip to Bali',
          'European summer tour'
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setQuery(suggestion)}
            className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
