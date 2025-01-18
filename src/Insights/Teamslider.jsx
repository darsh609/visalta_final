import React, { useState } from 'react';
import DarshImage from '../assets/Darsh.png';
import AshishImage from '../assets/Ashish.png';
import VivekImage from '../assets/Vivek.png';
import LivoImage from '../assets/Livo.png';

const ProfileCards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNextCardAnimating, setIsNextCardAnimating] = useState(false);
  
  const profiles = [
    {
      name: 'DARSH KUMAR',
      role: 'Lead Developer',
      image: DarshImage
    },
    {
      name: 'ASHISH TYAGI',
      role: 'Frontend Developer',
      image: AshishImage
    },
    {
      name: 'VIVEK BOHRA',
      role: 'Data Architect',
      image: VivekImage
    },
    {
      name: 'LIVO RANJAN',
      role: 'Visual Designer',
      image: LivoImage
    }
  ];
  
  const handleCardClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsNextCardAnimating(true);
        setCurrentCard((prev) => (prev + 1) % profiles.length);
        setIsAnimating(false);
        setTimeout(() => {
          setIsNextCardAnimating(false);
        }, 400);
      }, 400);
    }
  };

  const currentProfile = profiles[currentCard];
    
  return (
    <div className="w-full max-w-[80%] h-[600px] relative p-8">
      <div className="relative w-full h-full">
        {/* Background cards */}
        <div className={`absolute top-3 left-5 w-full h-[calc(100%-24px)] bg-white/5 rounded-3xl ${
          isNextCardAnimating ? 'animate-stack-in' : ''
        }`} />
        <div className={`absolute top-1.5 left-2.5 w-full h-[calc(100%-12px)] bg-white/10 rounded-3xl ${
          isNextCardAnimating ? 'animate-stack-in' : ''
        }`} />
        <div className={`absolute top-0.75 left-0.125 w-full h-[calc(100%-12px)] bg-white/10 rounded-3xl ${
          isNextCardAnimating ? 'animate-stack-in' : ''
        }`} />
        
        {/* Main card */}
        <div 
          className={`relative w-full h-full bg-black rounded-3xl p-8  ${
            isAnimating ? 'animate-pluck-out' : ''
          } ${isNextCardAnimating ? 'animate-card-in' : ''}`}
          onClick={handleCardClick}
        >
          <div className="flex justify-between items-start h-full relative">
          {/* visaltaa */}
          <div className="mt-0">
              <div className="text-2xl font-bold tracking-tight text-[#1db954]">
                visalta
              </div>
            </div>
            {/* Name section */}
            <div className="absolute bottom-0">
              <h2 className="text-6xl font-bold tracking-tight text-white" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                {currentProfile.name}
              </h2>
            </div>
            
            {/* Image and role section */}
            <div className="w-80 relative">
              <img
                src={currentProfile.image}
                alt={currentProfile.name}
                className="rounded-lg w-full h-80 object-cover"
              />
              <div className="absolute -bottom-8 left-0">
                <p className="text-md text-white">
                  {currentProfile.role}
                </p>
              </div>
            </div>
          </div>
          
          {/* Card number */}
          <div className="absolute bottom-8 right-8">
            <span className="text-4xl font-bold text-white">
              {currentCard + 1}/4
            </span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pluckOut {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(100px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes cardIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes stackIn {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-pluck-out {
          animation: pluckOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: top center;
        }

        .animate-card-in {
          animation: cardIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: center center;
        }

        .animate-stack-in {
          animation: stackIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ProfileCards;