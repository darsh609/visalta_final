import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showLine, setShowLine] = useState(false);
  
  const textWidth = "isalta".length * 16;

  const handleHoverComplete = () => {
    if (isHovered) {
      setShowLine(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowLine(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <motion.div 
          className="flex items-center justify-center w-24 h-2 relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          initial={{ rotate: 45 }}
          animate={isHovered ? { rotate: 0 } : { rotate: 45 }}
          onAnimationComplete={handleHoverComplete}
          transition={{
            type: "spring",
            stiffness: 150,  // Reduced for smoother motion
            damping: 20,     // Increased for less oscillation
            mass: 1.2,       // Added mass for more fluid movement
            duration: 0.4    // Slightly longer duration
          }}
        >
          {/* Top inverted V */}
          <motion.div
            className="absolute text-4xl font-bold text-white"
            initial={{ y: -20 }}
            animate={isHovered ? {
              y: 20,
              rotateX: 180,
              opacity: 0
            } : {
              y: -20,
              rotateX: 0,
              opacity: 1
            }}
            transition={{
              type: "spring",
              stiffness: 200,  // Reduced for smoother motion
              damping: 25,     // Increased damping
              mass: 1,         // Added mass
              duration: 0.4,   // Consistent timing
              opacity: {
                duration: 0.2,
                delay: isHovered ? 0.1 : 0
              }
            }}
          >
            <div className="transform rotate-180">V</div>
          </motion.div>

          {/* Center container */}
          <motion.div className="absolute">
            {/* Horizontal line */}
            <motion.div
              className="absolute top-1 h-0.5 bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: showLine ? 1 : 0 }}
              style={{ width: textWidth }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.4,
                delay: showLine ? 0.2 : 0,
                ease: "easeInOut"
              }}
            />
            
            {/* Dot and arrow container */}
            <motion.div
              className="relative"
              animate={{
                x: showLine ? textWidth : 0
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.4,
                delay: showLine ? 0.2 : 0,
                ease: "easeInOut"
              }}
            >
              {/* Combined dot and arrow */}
              <motion.div 
                className="relative flex items-center justify-center"
                style={{ 
                  width: '12px',
                  height: '12px',
                }}
              >
                {/* Dot */}
                <motion.div
                  className="absolute bg-white rounded-full"
                  style={{
                    width: '6px',
                    height: '6px'
                  }}
                  animate={{
                    scale: showLine ? 0 : 1,
                    opacity: showLine ? 0 : 1
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Arrow */}
                <motion.div
                  className="absolute w-full h-full flex items-center justify-center top-[-0.1vh] left-[-0.72vw]"
                  animate={{
                    opacity: showLine ? 1 : 0,
                    scale: showLine ? 1 : 0.5
                  }}
                  transition={{
                    duration: 0.3,
                    delay: showLine ? 0.1 : 0,
                    ease: "easeInOut"
                  }}
                >
                  {/* Arrow head lines */}
                  <div 
                    className="absolute bg-white"
                    style={{
                      width: '10px',
                      height: '2px',
                      transform: 'rotate(-45deg)',
                      transformOrigin: '100% 50%',
                      right: '1px'
                    }}
                  />
                  <div 
                    className="absolute bg-white"
                    style={{
                      width: '10px',
                      height: '2px',
                      transform: 'rotate(45deg)',
                      transformOrigin: '100% 50%',
                      right: '1px'
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom V */}
          <motion.div
            className="absolute text-4xl font-bold text-[#49DE80]"
            initial={{ y: 20 }}
            animate={isHovered ? {
              y: 20,
              scale: 1.1
            } : {
              y: 20,
              scale: 1
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 1,
              duration: 0.4
            }}
          >
            V
          </motion.div>

          {/* Text "isalta" */}
          <motion.div
            className="absolute text-2xl font-bold text-white whitespace-nowrap top-3 left-16"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: showLine ? 1 : 0,
              y: showLine ? 0 : 10
            }}
            transition={{
              duration: 0.4,
              delay: showLine ? 0.4 : 0,
              ease: "easeInOut"
            }}
          >
            isalta
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedLogo;