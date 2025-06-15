
import React, { useState, useEffect } from 'react';

const destinations = [
  {
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1920&h=1080&fit=crop',
    name: 'Paris'
  },
  {
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&h=1080&fit=crop',
    name: 'Tokyo'
  },
  {
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1920&h=1080&fit=crop',
    name: 'Bali'
  },
  {
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&h=1080&fit=crop',
    name: 'New York'
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    name: 'Santorini'
  }
];

export const BackgroundCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {destinations.map((destination, index) => (
        <div
          key={destination.name}
          className={`absolute inset-0 transition-opacity duration-2000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center transform scale-105 animate-slow-zoom"
            style={{
              backgroundImage: `url(${destination.image})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/40 to-indigo-900/60" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}
    </div>
  );
};
