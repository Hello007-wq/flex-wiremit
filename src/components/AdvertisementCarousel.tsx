import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { advertisements } from '../data/advertisements';

export const AdvertisementCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(current => (current + 1) % advertisements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(current => 
      current === 0 ? advertisements.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(current => (current + 1) % advertisements.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentAd = advertisements[currentIndex];

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
      <div className="p-6 border-b border-slate-100/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Special Offers</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Exclusive deals just for you</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            HOT
          </div>
        </div>
      </div>

      <div 
        className="relative"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Ad Content */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={currentAd.imageUrl}
            alt={currentAd.title}
            className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h4 className="text-white font-bold text-xl mb-3">
              {currentAd.title}
            </h4>
            <p className="text-white/90 text-base mb-4 leading-relaxed">
              {currentAd.description}
            </p>
            <button className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              {currentAd.actionText}
              <ExternalLink className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2.5 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
          aria-label="Previous advertisement"
        >
          <ChevronLeft className="h-5 w-5 text-slate-800" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2.5 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
          aria-label="Next advertisement"
        >
          <ChevronRight className="h-5 w-5 text-slate-800" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {advertisements.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/60 hover:bg-white/80 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};