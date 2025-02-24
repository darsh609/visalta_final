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
      className="flex items-center justify-center relative cursor-pointer"
      // Original size for desktop, smaller for mobile
      style={{
        width: 'var(--logo-width, 64px)',
        height: 'var(--logo-height, 8px)'
      }}
      // Only apply hover animations on desktop
      onMouseEnter={() => window.innerWidth >= 768 && setIsHovered(true)}
      onMouseLeave={() => window.innerWidth >= 768 && handleMouseLeave()}
      initial={{ rotate: 45 }}
      animate={window.innerWidth >= 768 && isHovered ? { rotate: 0 } : { rotate: 45 }}
      onAnimationComplete={() => window.innerWidth >= 768 && handleHoverComplete()}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 1.2,
        duration: 0.4
      }}
    >
      {/* Top inverted V - small on mobile, original on desktop */}
      <motion.div
        className="absolute font-bold text-white"
        style={{
          fontSize: 'var(--v-size, 1.5rem)'
        }}
        initial={{ y: 'var(--v-position-neg, -12px)' }}
        animate={window.innerWidth >= 768 && isHovered ? {
          y: 'var(--v-position, 12px)',
          rotateX: 180,
          opacity: 0
        } : {
          y: 'var(--v-position-neg, -12px)',
          rotateX: 0,
          opacity: 1
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 1,
          duration: 0.4,
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
          className="absolute top-1 bg-white origin-left"
          style={{ 
            height: 'var(--line-height, 1px)',
            width: textWidth 
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: window.innerWidth >= 768 && showLine ? 1 : 0 }}
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
            x: window.innerWidth >= 768 && showLine ? textWidth : 0
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
              width: 'var(--dot-size, 8px)',
              height: 'var(--dot-size, 8px)'
            }}
          >
            {/* Dot */}
            <motion.div
              className="absolute bg-white rounded-full"
              style={{
                width: 'var(--inner-dot-size, 4px)',
                height: 'var(--inner-dot-size, 4px)'
              }}
              animate={{
                scale: window.innerWidth >= 768 && showLine ? 0 : 1,
                opacity: window.innerWidth >= 768 && showLine ? 0 : 1
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            />
            
            {/* Arrow */}
            <motion.div
              className="absolute w-full h-full flex items-center justify-center"
              style={{
                top: 'var(--arrow-top-offset, 0px)',
                left: 'var(--arrow-left-offset, -3px)'
              }}
              animate={{
                opacity: window.innerWidth >= 768 && showLine ? 1 : 0,
                scale: window.innerWidth >= 768 && showLine ? 1 : 0.5
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
                  width: 'var(--arrow-width, 6px)',
                  height: 'var(--arrow-height, 1px)',
                  transform: 'rotate(-45deg)',
                  transformOrigin: '100% 50%',
                  right: '1px'
                }}
              />
              <div 
                className="absolute bg-white"
                style={{
                  width: 'var(--arrow-width, 6px)',
                  height: 'var(--arrow-height, 1px)',
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
        className="absolute font-bold text-[#49DE80]"
        style={{
          fontSize: 'var(--v-size, 1.5rem)'
        }}
        initial={{ y: 'var(--v-position, 12px)' }}
        animate={window.innerWidth >= 768 && isHovered ? {
          y: 'var(--v-position, 12px)',
          scale: 1.1
        } : {
          y: 'var(--v-position, 12px)',
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

      {/* Text "isalta" - visibility controlled by CSS */}
      <motion.div
        className="absolute font-bold text-white whitespace-nowrap"
        style={{
          fontSize: 'var(--text-size, 1rem)',
          top: 'var(--text-top, 8px)',
          left: 'var(--text-left, 40px)',
          display: 'var(--text-display, none)'
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: window.innerWidth >= 768 && showLine ? 1 : 0,
          y: window.innerWidth >= 768 && showLine ? 0 : 10
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
  
  {/* CSS variables for responsive design */}
  <style jsx>{`
    /* Mobile styles by default */
    :root {
      --logo-width: 64px;
      --logo-height: 8px;
      --v-size: 1.5rem;
      --v-position: 12px; 
      --v-position-neg: -12px;
      --line-height: 1px;
      --dot-size: 8px;
      --inner-dot-size: 4px;
      --arrow-width: 6px;
      --arrow-height: 1px;
      --arrow-top-offset: 0px;
      --arrow-left-offset: -3px;
      --text-size: 1rem;
      --text-top: 8px;
      --text-left: 40px;
      --text-display: none;
    }
    
    /* Desktop styles */
    @media (min-width: 768px) {
      :root {
        --logo-width: 96px;
        --logo-height: 16px;
        --v-size: 2.25rem;
        --v-position: 20px;
        --v-position-neg: -20px;
        --line-height: 2px;
        --dot-size: 12px;
        --inner-dot-size: 6px;
        --arrow-width: 10px;
        --arrow-height: 2px;
        --arrow-top-offset: -0.1vh;
        --arrow-left-offset: -0.72vw;
        --text-size: 1.5rem;
        --text-top: 12px;
        --text-left: 64px;
        --text-display: block;
      }
    }
  `}</style>
</div>
  );
};

export default AnimatedLogo;