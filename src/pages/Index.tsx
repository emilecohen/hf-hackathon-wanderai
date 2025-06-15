
import React, { useState, useEffect } from 'react';
import { SearchInterface } from '@/components/SearchInterface';
import { LoadingInterface } from '@/components/LoadingInterface';
import { ResultsInterface } from '@/components/ResultsInterface';
import { BackgroundCarousel } from '@/components/BackgroundCarousel';

export type SearchState = 'searching' | 'loading' | 'results';

export interface SearchData {
  query: string;
  destination: string;
  origin: string;
  dates: {
    start: string;
    end: string;
  };
  budget: number;
  travelers: number;
}

const Index = () => {
  const [searchState, setSearchState] = useState<SearchState>('searching');
  const [searchData, setSearchData] = useState<SearchData | null>(null);

  const handleSearch = (data: SearchData) => {
    setSearchData(data);
    setSearchState('loading');
    
    // Simulate AI processing time
    setTimeout(() => {
      setSearchState('results');
    }, 4000);
  };

  const handleNewSearch = () => {
    setSearchState('searching');
    setSearchData(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundCarousel />
      
      <div className="relative z-10 min-h-screen">
        {searchState === 'searching' && (
          <SearchInterface onSearch={handleSearch} />
        )}
        
        {searchState === 'loading' && searchData && (
          <LoadingInterface searchData={searchData} />
        )}
        
        {searchState === 'results' && searchData && (
          <ResultsInterface searchData={searchData} onNewSearch={handleNewSearch} />
        )}
      </div>
    </div>
  );
};

export default Index;
