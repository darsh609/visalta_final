import { motion } from 'framer-motion';
import React from 'react';

const Marquee = () => {
  return (
    <div className="w-full py-16 rounded-tl-3xl rounded-tr-3xl bg-[#f26668] mb-16">
      <div className="text border-t-2 border-b-2 border-zinc-300 flex overflow-hidden whitespace-nowrap tigh">
          <motion.h1 
           initial={{ translateX: 0 }}
           animate={{ translateX: "-100%" }}
           transition={{
             duration: 10,
             repeat: Infinity,
             ease: "linear",
           }}
          className='text-[24vw] text-[#F6F5F4] leading-none font-founders font-semibold -mt-[2vw] -mb-[2vw] pr-20 tracking-tighter'>
            NIT-WARANGAL
          </motion.h1>
          <motion.h1 
           initial={{ translateX: 0 }}
           animate={{ translateX: "-100%" }}
           transition={{
             duration: 10,
             repeat: Infinity,
             ease: "linear",
           }}
          className='text-[24vw] text-[#F6F5F4] leading-none font-founders font-semibold -mt-[2vw] -mb-[2vw] pr-20 tracking-tighter'>
            NIT-WARANGAL
          </motion.h1>
      </div>
    </div>
  );
};

export default Marquee;