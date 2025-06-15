import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Sparkles, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { SearchData } from '@/pages/Index';

interface SearchInterfaceProps {
  onSearch: (data: SearchData) => void;
}

interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface TravelParams {
  destination?: string;
  origin?: string;
  dates?: { start?: string; end?: string };
  budget?: number;
  travelers?: number;
  preferences?: string[];
}

const CONVERSATION_FLOW = [
  {
    key: 'greeting',
    message: "Hi! I'm your AI travel assistant ✨ What's inspiring your next adventure?",
    expectsInput: true
  },
  {
    key: 'origin',
    message: "That sounds amazing! Where are you planning to travel from?",
    expectsInput: true
  },
  {
    key: 'dates',
    message: "Perfect! Do you have specific dates in mind, or are you flexible with timing?",
    expectsInput: true
  },
  {
    key: 'travelers',
    message: "Great! How many travelers will be joining this adventure?",
    expectsInput: true,
    suggestions: ['Just me', '2 people', '3-4 people', 'Family (5+)', 'Large group']
  },
  {
    key: 'budget',
    message: "What's your ideal budget range for this trip?",
    expectsInput: true,
    suggestions: ['Under $1,000', '$1,000-$3,000', '$3,000-$5,000', 'Above $5,000', 'Money is no object']
  }
];

export const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const [travelParams, setTravelParams] = useState<TravelParams>({});
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start with greeting
    setTimeout(() => {
      addAIMessage(CONVERSATION_FLOW[0].message);
    }, 1000);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addAIMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const parseUserInput = (input: string, step: number) => {
    const newParams = { ...travelParams };
    
    switch (step) {
      case 0: // Initial destination/inspiration
        newParams.destination = input;
        break;
      case 1: // Origin
        newParams.origin = input;
        break;
      case 2: // Dates
        // Simple date parsing - could be enhanced
        newParams.dates = { start: '2024-12-20', end: '2024-12-30' };
        break;
      case 3: // Travelers
        const travelerNum = parseInt(input) || (input.toLowerCase().includes('just') ? 1 : 2);
        newParams.travelers = travelerNum;
        break;
      case 4: // Budget
        const budgetMatch = input.match(/\$?(\d+(?:,\d+)?)/);
        newParams.budget = budgetMatch ? parseInt(budgetMatch[1].replace(',', '')) : 3000;
        break;
    }
    
    setTravelParams(newParams);
    return newParams;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    addUserMessage(currentInput);
    const updatedParams = parseUserInput(currentInput, conversationStep);
    
    const nextStep = conversationStep + 1;
    
    if (nextStep < CONVERSATION_FLOW.length) {
      setConversationStep(nextStep);
      setTimeout(() => {
        addAIMessage(CONVERSATION_FLOW[nextStep].message);
      }, 1500);
    } else {
      // All parameters collected, generate search
      setTimeout(() => {
        addAIMessage("Perfect! I have everything I need. Let me find the best travel options for you...");
        setTimeout(() => {
          const searchData: SearchData = {
            query: `${updatedParams.destination} from ${updatedParams.origin}`,
            destination: updatedParams.destination || 'Tokyo',
            origin: updatedParams.origin || 'New York',
            dates: {
              start: updatedParams.dates?.start || '2024-12-20',
              end: updatedParams.dates?.end || '2024-12-30'
            },
            budget: updatedParams.budget || 3000,
            travelers: updatedParams.travelers || 2
          };
          onSearch(searchData);
        }, 2000);
      }, 1000);
    }
    
    setCurrentInput('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentInput(suggestion);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
  };

  const currentStep = CONVERSATION_FLOW[conversationStep];

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
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-white/10 text-white border border-white/20'
                }`}>
                  {message.type === 'ai' && (
                    <div className="flex items-center mb-1">
                      <Sparkles className="w-3 h-3 mr-1 text-yellow-400" />
                      <span className="text-xs text-white/60">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
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

          {/* Suggestions */}
          {currentStep?.suggestions && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {currentStep.suggestions.map((suggestion) => (
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
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-6 pt-0">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
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
                disabled={!currentInput.trim()}
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
