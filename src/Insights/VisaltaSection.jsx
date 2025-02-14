import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Trophy, Users, Code, Star } from 'lucide-react';

const featuresList = [
  {
    icon: <BookOpen className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "Expert-Led Learning",
    description: "Learn from industry professionals with years of experience"
  },
  {
    icon: <Calendar className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "Flexible Schedule",
    description: "Study at your own pace with 24/7 access to resources"
  },
  {
    icon: <Trophy className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "Practical Projects",
    description: "Build real-world applications with hands-on experience"
  },
  {
    icon: <Users className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "Community Support",
    description: "Join a thriving community of developers"
  },
  {
    icon: <Code className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "Live Coding",
    description: "Interactive coding sessions with real-time feedback"
  },
  {
    icon: <Star className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
    title: "Career Growth",
    description: "Get guidance for your professional development"
  }
];

const SlidingFeatures = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
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
            Visalta enhances campus life at NIT Warangal with curated guides to eateries, events, serene spots, and skill-building resources. From weekend getaways to technical prep, we make your college journey fun, easy, and enriching.
          </p>
          <button className="bg-[#1db954] hover:bg-green-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2 lg:px-8 lg:py-3 rounded-lg font-semibold transition-colors">
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

      {/* Venn Diagram Section */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-3xl mx-auto">
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
          <div className="absolute top-20 sm:top-24 md:top-28 left-1/2 transform -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-fuchsia-500/50 flex items-center justify-center mix-blend-screen transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="text-center translate-y-4 p-2 sm:p-3 md:p-4">
              <h3 className="font-bold text-black text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 md:mb-1">Enjoy</h3>
              <p className="text-black text-xs md:text-sm">Community</p>
            </div>
          </div>

          {/* Center intersection text */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <div className="p-2 md:p-4">
              <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-black">Visalta</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingFeatures;