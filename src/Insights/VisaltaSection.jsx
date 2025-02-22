import React, { useState, useEffect } from 'react';
import { ShoppingBag, Bell, MapPin, Users, Shield, Heart } from 'lucide-react';
import ContactForm from './ContactForm';
import {useNavigate} from 'react-router-dom';

const featuresList = [
  {
    icon: <ShoppingBag className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "Campus Marketplace",
    description: "Buy and sell items easily within your college community"
  },
  {
    icon: <Bell className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "TAPs Updates",
    description: "Stay informed about campus events, club activities, and official announcements"
  },
  {
    icon: <MapPin className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "Local Discoveries",
    description: "Find perfect spots for celebrations, weekend getaways, and entertainment near campus"
  },
  {
    icon: <Users className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "Student Community",
    description: "Connect with fellow students through buying, selling, and campus activities"
  },
  {
    icon: <Shield className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "Secure Trading",
    description: "Safe and trusted platform for student-to-student transactions"
  },
  {
    icon: <Heart className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "Spiritual Spaces",
    description: "Discover peaceful temples and churches for reflection near your campus"
  }
];


const SlidingFeatures = () => {
  const handleScrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const itemHeight = {
    base: 80,    // Height for mobile
    sm: 90,      // Height for small tablets
    md: 100,     // Height for tablets
    lg: 120      // Height for desktop
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => {
        const nextPosition = prev + itemHeight.base;
        return nextPosition >= itemHeight.base * featuresList.length ? 0 : nextPosition;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full text-white p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center">
        {/* Left section */}
        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#1db954]">
            Who are We
          </h2>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
            Navigating,<br />
            Students life
          </h1>
          <p className="text-xs md:text-sm lg:text-lg text-gray-300">
            A one-stop platform for students to buy, sell, and stay updated. From our marketplace to TAPs (Timely Alerts & Posts) and curated event recommendations, we make campus life easier and more connected.
          </p>
          <button className="bg-[#1db954] hover:bg-green-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2 lg:px-8 lg:py-3 rounded-lg font-semibold transition-colors"
              onClick={handleScrollToForm}>
            Let's Connect
          </button>
        </div>

        {/* Right section - Scrolling features */}
        <div className="relative h-[200px] sm:h-[225px] md:h-[250px] lg:h-[300px] overflow-hidden">
          <div 
            className="absolute w-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateY(-${scrollPosition}px)`
            }}
          >
            {[...featuresList, ...featuresList].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-2 md:gap-3 lg:gap-4 p-2 md:p-3 lg:p-4 h-[80px] sm:h-[90px] md:h-[100px] lg:h-[120px]"
              >
                <div className="p-1 md:p-2 lg:p-3 text-[#1db954] rounded-full">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base lg:text-xl font-semibold mb-0.5 md:mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Venn Diagram Section - Hidden on mobile, visible from sm breakpoint up */}
      <div className="hidden sm:block p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-3xl mx-auto">
        <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full">
          {/* First circle - Experience */}
          <div className="absolute top-8 left-1/4 transform -translate-x-1/4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-blue-500/50 flex items-center justify-center mix-blend-screen transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="text-center -translate-x-2 p-2 sm:p-3 md:p-4">
              <h3 className="font-bold text-black text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 md:mb-1">Experience</h3>
              <p className="text-black text-xs md:text-sm">Campus Life</p>
            </div>
          </div>

          {/* Second circle - Explore */}
          <div className="absolute top-8 right-1/4 transform translate-x-1/4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-emerald-500/50 flex items-center justify-center mix-blend-screen transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="text-center translate-x-2 p-2 sm:p-3 md:p-4">
              <h3 className="font-bold text-black text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 md:mb-1">Explore</h3>
              <p className="text-black text-xs md:text-sm">Opportunities</p>
            </div>
          </div>

          {/* Third circle - Enjoy */}
          <div className="absolute top-24 sm:top-28 md:top-32 lg:top-40 left-1/2 transform -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-fuchsia-500/50 flex items-center justify-center mix-blend-screen transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="text-center translate-y-8 sm:translate-y-10 md:translate-y-12 lg:translate-y-16 p-2 sm:p-3 md:p-4">
              <h3 className="font-bold text-black text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 md:mb-1">Enjoy</h3>
              <p className="text-black text-xs md:text-sm">Community</p>
            </div>
          </div>

          {/* Center intersection text */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <div className="p-2 md:p-4">
              <h2 className="font-bold text-2xl sm:text-xl md:text-2xl lg:text-3xl text-[black]">Visalta</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingFeatures;