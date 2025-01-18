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
      <div className="w-full h-full p-6 bg-zinc-800 rounded-xl border-2 border-zinc-700 shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-opacity-80 transform-gpu">
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
    <div className=" bg-zinc-900 p-8">
      <motion.div 
        className="max-w-6xl mx-auto grid grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={cardVariants} className="col-span-1 row-span-2">
          <Card>
            <h2 className="text-xl font-bold mb-3 text-[#1db954]">Welcome to Visalta</h2>
            <p className="text-sm text-zinc-300">
            Welcome to Visalta, your ultimate guide to life at NIT Warangal. From the best food spots and shopping stops to serene holy places and academic guides, we’re here to help you explore, enjoy, and make the most of your campus journey. Let Visalta be your trusted companion in discovering everything that makes college life unforgettable!
            </p>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} className="col-span-3 row-span-1">
          <Card>
            <h2 className="text-2xl font-bold mb-4 text-[#1db954]">Our Mission</h2>
            <p className="text-zinc-300">
              To empower the students of NIT Warangal by providing a comprehensive guide to explore, experience, and enjoy their campus life to the fullest, blending convenience with community-driven insights.
            </p>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} className="col-span-2">
          <Card>
            <h2 className="text-xl font-bold mb-3 text-[#1db954]">Our Vision</h2>
            <p className="text-sm text-zinc-300">
            To be the go-to platform for every NIT Warangal student, offering curated recommendations, practical guidance, and seamless access to opportunities that enhance both their academic journey and personal growth.
            </p>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} className="col-span-1">
          <Card>
            <h2 className="text-xl font-bold mb-3 text-[#1db954]">Community</h2>
            <p className="text-sm text-zinc-300">
            Join NITW students to share experiences, build connections, and grow through cultural exchange.
            </p>
          </Card>
        </motion.div>

        {/* <motion.div variants={cardVariants} className="col-span-3">
          <Card>
            <h2 className="text-xl font-bold mb-3 text-zinc-100">Academic Journey</h2>
            <p className="text-sm text-zinc-300">
              Seamless access to opportunities that enhance both academic journey and personal growth.
            </p>
          </Card>
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default VisaltaCards;