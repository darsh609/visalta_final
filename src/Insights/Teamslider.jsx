// import React, { useState } from 'react';
// import DarshImage from '../assets/Darsh.png';
// import AshishImage from '../assets/Ashish.png';
// import VivekImage from '../assets/Vivek.png';
// import LivoImage from '../assets/Livo.png';

// const ProfileCards = () => {
//   const [currentCard, setCurrentCard] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [isNextCardAnimating, setIsNextCardAnimating] = useState(false);
  
//   const profiles = [
//     {
//       name: 'DARSH KUMAR',
//       role: 'Lead Developer',
//       image: DarshImage
//     },
//     {
//       name: 'ASHISH TYAGI',
//       role: 'Frontend Developer',
//       image: AshishImage
//     },
//     {
//       name: 'VIVEK BOHRA',
//       role: 'Data Architect',
//       image: VivekImage
//     },
//     {
//       name: 'LIVO RANJAN',
//       role: 'Visual Designer',
//       image: LivoImage
//     }
//   ];
  
//   const handleCardClick = () => {
//     if (!isAnimating) {
//       setIsAnimating(true);
//       setTimeout(() => {
//         setIsNextCardAnimating(true);
//         setCurrentCard((prev) => (prev + 1) % profiles.length);
//         setIsAnimating(false);
//         setTimeout(() => {
//           setIsNextCardAnimating(false);
//         }, 400);
//       }, 400);
//     }
//   };

//   const currentProfile = profiles[currentCard];
    
//   return (
//     <div className="w-full max-w-[80%] h-[500px] sm:h-[600px] relative p-4 sm:p-8">
//       <div className="relative w-full h-full">
//         {/* Background cards */}
//         <div className={`absolute top-3 left-5 w-full h-[calc(100%-24px)] bg-white/5 rounded-3xl ${
//           isNextCardAnimating ? 'animate-stack-in' : ''
//         }`} />
//         <div className={`absolute top-1.5 left-2.5 w-full h-[calc(100%-12px)] bg-white/10 rounded-3xl ${
//           isNextCardAnimating ? 'animate-stack-in' : ''
//         }`} />
//         <div className={`absolute top-0.75 left-0.125 w-full h-[calc(100%-12px)] bg-white/10 rounded-3xl ${
//           isNextCardAnimating ? 'animate-stack-in' : ''
//         }`} />
        
//         {/* Main card */}
//         <div 
//           className={`relative w-full h-full bg-black rounded-3xl p-4 sm:p-8  ${
//             isAnimating ? 'animate-pluck-out' : ''
//           } ${isNextCardAnimating ? 'animate-card-in' : ''}`}
//           onClick={handleCardClick}
//         >
//           <div className="flex justify-between items-start h-full relative">
//             {/* visaltaa */}
//             <div className="mt-0">
//               <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#1db954]">
//                 visalta
//               </div>
//             </div>
//             {/* Name section */}
//             <div className="absolute bottom-0">
//               <h2 
//                 className="text-4xl sm:text-6xl font-bold tracking-tight text-white" 
//                 style={{ fontFamily: 'Arial Black, sans-serif' }}
//               >
//                 {currentProfile.name}
//               </h2>
//             </div>
//             {/* Image and role section */}
//             <div className="w-60 sm:w-80 relative">
//               <img
//                 src={currentProfile.image}
//                 alt={currentProfile.name}
//                 className="rounded-lg w-full h-60 sm:h-80 object-cover"
//               />
//               <div className="absolute -bottom-8 left-0">
//                 <p className="text-sm sm:text-md text-white">
//                   {currentProfile.role}
//                 </p>
//               </div>
//             </div>
//           </div>
//           {/* Card number */}
//           <div className="absolute bottom-8 right-8">
//             <span className="text-2xl sm:text-4xl font-bold text-white">
//               {currentCard + 1}/4
//             </span>
//           </div>
//         </div>
//       </div>
      
//       <style jsx>{`
//         @keyframes pluckOut {
//           0% {
//             transform: translateY(0) scale(1);
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(100px) scale(0.8);
//             opacity: 0;
//           }
//         }

//         @keyframes cardIn {
//           0% {
//             transform: scale(0.8);
//             opacity: 0;
//           }
//           100% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }

//         @keyframes stackIn {
//           0% {
//             transform: scale(0.9);
//             opacity: 0;
//           }
//           100% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }

//         .animate-pluck-out {
//           animation: pluckOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
//           transform-origin: top center;
//         }

//         .animate-card-in {
//           animation: cardIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
//           transform-origin: center center;
//         }

//         .animate-stack-in {
//           animation: stackIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProfileCards;


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
    // {
    //   name: 'VIVEK BOHRA',
    //   role: 'Data Architect',
    //   image: VivekImage
    // },
    // {
    //   name: 'LIVO RANJAN',
    //   role: 'Visual Designer',
    //   image: LivoImage
    // }
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
    <div className="w-full max-w-[90%] md:max-w-[85%] lg:max-w-[80%] h-[400px] sm:h-[500px] lg:h-[600px] relative p-3 sm:p-6 lg:p-8">
      <div className="relative w-full h-full">
        {/* Background cards */}
        <div className={`absolute top-2 sm:top-3 left-3 sm:left-5 w-full h-[calc(100%-18px)] sm:h-[calc(100%-24px)] bg-white/5 rounded-2xl sm:rounded-3xl ${
          isNextCardAnimating ? 'animate-stack-in' : ''
        }`} />
        <div className={`absolute top-1 sm:top-1.5 left-1.5 sm:left-2.5 w-full h-[calc(100%-9px)] sm:h-[calc(100%-12px)] bg-white/10 rounded-2xl sm:rounded-3xl ${
          isNextCardAnimating ? 'animate-stack-in' : ''
        }`} />
        <div className={`absolute top-0.5 sm:top-0.75 left-0.75 sm:left-1.25 w-full h-[calc(100%-9px)] sm:h-[calc(100%-12px)] bg-white/10 rounded-2xl sm:rounded-3xl ${
          isNextCardAnimating ? 'animate-stack-in' : ''
        }`} />
        
        {/* Main card */}
        <div 
          className={`relative w-full h-full bg-black rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 ${
            isAnimating ? 'animate-pluck-out' : ''
          } ${isNextCardAnimating ? 'animate-card-in' : ''}`}
          onClick={handleCardClick}
        >
          <div className="h-full relative">
            {/* Top section with logo */}
            <div className="mb-2">
              <div className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-[#1db954]">
                visalta
              </div>
            </div>
            
            {/* Main content container */}
            <div className="flex justify-between items-start h-[calc(100%-60px)]">
              {/* Left side - Name section */}
              <div className="flex flex-col justify-end h-full w-1/2">
                <h2 
                  className="text-xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white break-words"
                  style={{ fontFamily: 'Arial Black, sans-serif' }}
                >
                  {currentProfile.name}
                </h2>
                <p className="text-xs sm:text-sm lg:text-md text-white mt-1">
                  {currentProfile.role}
                </p>
              </div>
              
              {/* Right side - Image section */}
              <div className="w-32 sm:w-52 lg:w-80">
                <img
                  src={currentProfile.image}
                  alt={currentProfile.name}
                  className="rounded-lg w-full h-32 sm:h-52 lg:h-80 object-cover"
                />
              </div>
            </div>
            
            {/* Card number */}
            <div className="absolute bottom-0 right-0">
              <span className="text-lg sm:text-2xl lg:text-4xl font-bold text-white">
                {currentCard + 1}/2
              </span>
            </div>
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