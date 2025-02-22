import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const Card = ({ className, children }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), {
    stiffness: 300,
    damping: 60
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), {
    stiffness: 300,
    damping: 60
  });

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
  className={`${className} relative cursor-pointer perspective-1000`}
  style={{
    transformStyle: "preserve-3d",
    rotateX,
    rotateY,
  }}
  whileHover={{ scale: 1.02 }}
  onMouseMove={handleMouse}
  onMouseLeave={handleMouseLeave}
>
  <div className="w-full h-full p-4 sm:p-6 md:p-8 bg-zinc-800 rounded-xl border-2 border-zinc-700 shadow-sm sm:shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-opacity-80 transform-gpu text-xs sm:text-sm">
    {children}
  </div>
  <div
    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    style={{ transform: "translateZ(-10px)" }}
  />
</motion.div>

  );
};

const VisaltaCards = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-zinc-900 p-8">
    <motion.div 
      className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Welcome Card */}
      <motion.div 
        variants={cardVariants} 
        className="col-span-1 sm:col-span-2 lg:col-span-1 lg:row-span-2"
      >
        <Card>
          <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#1db954]">
            Welcome to Visalta
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300">
          A platform for college students to buy, sell, and stay connected. Our marketplace simplifies trading, while TAPs (Timely Alerts & Posts) keep you updated on campus events. Need a venue or getaway? Explore our curated recommendations for resorts, entertainment, and peaceful retreats. We make college life simpler, smarter, and more engaging.
          </p>
        </Card>
      </motion.div>
  
      {/* Mission Card */}
      <motion.div 
        variants={cardVariants} 
        className="col-span-1 sm:col-span-2 lg:col-span-3 lg:row-span-1"
      >
        <Card>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#1db954]">
            Our Mission
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300">
          To simplify and enrich college life with a seamless marketplace, real-time updates via TAPs (Timely Alerts & Posts), and curated recommendations for events and getaways. We strive to make campus life more connected, convenient, and engaging.
          </p>
        </Card>
      </motion.div>
  
      {/* Vision Card */}
      <motion.div 
        variants={cardVariants} 
        className="col-span-1 sm:col-span-1 lg:col-span-2"
      >
        <Card>
          <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#1db954]">
            Our Vision
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300">
          To build a thriving student community where buying, selling, and staying informed is effortless. We envision a campus experience that is more connected, convenient, and engaging for every student.
          </p>
        </Card>
      </motion.div>
  
      {/* Community Card */}
      <motion.div 
        variants={cardVariants} 
        className="col-span-1"
      >
        <Card>
          <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#1db954]">
            Community
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300">
          A student-driven network to buy, sell, share updates, and engage in campus life.
          </p>
        </Card>
      </motion.div>
    </motion.div>
  </div>
  
  );
};

export default VisaltaCards;