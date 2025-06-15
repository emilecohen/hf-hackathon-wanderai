
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Sparkles, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { SearchData } from '@/pages/Index';
import { useChat } from 'ai/react';

interface SearchInterfaceProps {
  onSearch: (data: SearchData) => void;
}

interface TravelParams {
  destination?: string;
  origin?: string;
  dates?: { start?: string; end?: string };
  budget?: number;
  travelers?: number;
  preferences?: string[];
}

const SYSTEM_PROMPT = `You are WanderAI, a friendly travel assistant. Your goal is to collect travel information through natural conversation.

Follow this flow:
1. Ask about travel destination/inspiration
2. Ask about origin location
3. Ask about travel dates
4. Ask about number of travelers
5. Ask about budget

Keep responses conversational and friendly. When you have all information, respond with "SEARCH_READY" followed by a summary.

Provide helpful suggestions and be encouraging about their travel plans.`;

export const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch }) => {
  const [travelParams, setTravelParams] = useState<TravelParams>({});
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: "Hi! I'm your AI travel assistant ✨ What's inspiring your next adventure?",
      },
    ],
    onFinish: (message) => {
      // Parse the AI response to extract travel parameters
      parseAIResponse(message.content);
      
      // Check if ready to search
      if (message.content.includes('SEARCH_READY')) {
        setTimeout(() => {
          const searchData: SearchData = {
            query: `${travelParams.destination} from ${travelParams.origin}`,
            destination: travelParams.destination || 'Tokyo',
            origin: travelParams.origin || 'New York',
            dates: {
              start: travelParams.dates?.start || '2024-12-20',
              end: travelParams.dates?.end || '2024-12-30'
            },
            budget: travelParams.budget || 3000,
            travelers: travelParams.travelers || 2
          };
          onSearch(searchData);
        }, 2000);
      }
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const parseAIResponse = (content: string) => {
    // Simple parsing logic - in a real app, you'd use more sophisticated NLP
    const newParams = { ...travelParams };
    
    // This is a simplified example - you'd implement more robust parsing
    if (content.toLowerCase().includes('destination') || content.toLowerCase().includes('where')) {
      // AI is asking about destination
    }
    
    setTravelParams(newParams);
  };

  const parseUserInput = (input: string) => {
    const newParams = { ...travelParams };
    const lowerInput = input.toLowerCase();
    
    // Simple keyword-based parsing
    if (lowerInput.includes('tokyo') || lowerInput.includes('japan')) {
      newParams.destination = 'Tokyo, Japan';
    }
    if (lowerInput.includes('new york') || lowerInput.includes('nyc')) {
      newParams.origin = 'New York';
    }
    if (lowerInput.match(/\$\d+/)) {
      const budgetMatch = input.match(/\$(\d+(?:,\d+)?)/);
      if (budgetMatch) {
        newParams.budget = parseInt(budgetMatch[1].replace(',', ''));
      }
    }
    if (lowerInput.includes('person') || lowerInput.includes('people') || lowerInput.includes('traveler')) {
      const numberMatch = input.match(/(\d+)/);
      if (numberMatch) {
        newParams.travelers = parseInt(numberMatch[1]);
      }
    }
    
    setTravelParams(newParams);
    return newParams;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    parseUserInput(input);
    handleSubmit(e);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleInputChange({ target: { value: suggestion } } as any);
  };

  const quickSuggestions = [
    'Just me', '2 people', '3-4 people', 'Family (5+)',
    'Under $1,000', '$1,000-$3,000', '$3,000-$5,000', 'Above $5,000',
    'This month', 'Next month', 'Summer 2025', 'I\'m flexible'
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-yellow-400 mr-2" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Wander<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI</span>
          </h1>
        </div>
        <p className="text-xl text-white/80 font-light">Your Intelligent Travel Companion</p>
      </div>

      {/* Travel Parameters Display */}
      {Object.keys(travelParams).length > 0 && (
        <div className="w-full max-w-4xl mb-6">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              Your Travel Plan
            </h3>
            <div className="flex flex-wrap gap-2">
              {travelParams.destination && (
                <div className="flex items-center bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  {travelParams.destination}
                </div>
              )}
              {travelParams.origin && (
                <div className="flex items-center bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  From {travelParams.origin}
                </div>
              )}
              {travelParams.travelers && (
                <div className="flex items-center bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm">
                  <Users className="w-3 h-3 mr-1" />
                  {travelParams.travelers} {travelParams.travelers === 1 ? 'traveler' : 'travelers'}
                </div>
              )}
              {travelParams.budget && (
                <div className="flex items-center bg-yellow-500/20 text-yellow-200 px-3 py-1 rounded-full text-sm">
                  <DollarSign className="w-3 h-3 mr-1" />
                  ${travelParams.budget.toLocaleString()}
                </div>
              )}
              {travelParams.dates && (
                <div className="flex items-center bg-orange-500/20 text-orange-200 px-3 py-1 rounded-full text-sm">
                  <Calendar className="w-3 h-3 mr-1" />
                  Dec 20-30
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div className="w-full max-w-4xl">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-white/10 text-white border border-white/20'
                }`}>
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-1">
                      <Sparkles className="w-3 h-3 mr-1 text-yellow-400" />
                      <span className="text-xs text-white/60">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-2xl">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-6 pb-4">
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.slice(0, 4).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={onSubmit} className="p-6 pt-0">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your response..."
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
