import React, { useState } from 'react'
import Eatables_Card from "../assets/Eatables_Card.png";
import Travel_Card from "../assets/Travel_Card.png";
import { motion, useAnimation } from 'framer-motion';
import Sellimg from "../assets/sellimg.png";
import { Power4 } from 'gsap/all';


const FeatureCard = () => {
    
       const cards = [useAnimation() , useAnimation(), useAnimation(), useAnimation()];

       const handleHover = (index)=>{
        cards[index].start({y: "0"})
       }

       const handleHoverEnd = (index)=>{
        cards[index].start({y: "100%"})
       }

      
    
    
  return (
    <div className='w-full py-20 bg-[#3b1ca1d6] rounded-tl-3xl rounded-tr-3xl text-black'>
        <div className='w-full px-20 border-b-[1px] border-[#a1b562] pb-20'>
            <h1 className="text-7xl text-[3vw] leading-[3.5vw] ">
            Featured Project
            </h1>
        </div> 

      <div className='px-20'>
      <div className="cards w-full flex gap-10 mt-10">
            <motion.div 
            onHoverStart = {()=> handleHover(0)} 
            onHoverEnd = {()=> handleHoverEnd(0)} 
            className="cardcontainer  relative w-1/2 h-[75vh]">
               <h1 className='absolute flex overflow-hidden right-0 translate-x-1/2 top-1/2 -translate-y-1/2 text-[#1db954] z-[10] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
                    {"venue".split('').map((item, index)=> (
                    <motion.span 
                    initial={{y:"100%"}} 
                    animate={cards[0]}
                    transition={{ease: [0.22, 1, 0.36, 1], delay: index*.05}} 
                    className='inline-block'>
                        {item}
                    </motion.span>
                    ))}
                    </h1>

                    <div className='card w-full h-full rounded-xl card overflow-hidden'>
                        <img className='w-full h-full bg-cover' src={Eatables_Card} alt=""  />
                    </div>
                </motion.div>

                <motion.div 

                onHoverStart = {()=> handleHover(1)} 
                onHoverEnd = {()=> handleHoverEnd(1)} 

                className="cardcontainer relative w-1/2 h-[75vh]">
                <h1 className='absolute flex overflow-hidden right-full translate-x-1/2 top-1/2 -translate-y-1/2 text-[#1db954] z-[10] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
                    {"visit".split('').map((item, index)=> (
                     <motion.span 
                     initial={{y:"100% "}} 
                     animate={cards[1]}
                     transition={{ease: [0.22, 1, 0.36, 1], delay: index*.05, scale: 5}} 
                     className='inline-block'>
                         {item}
                     </motion.span>
                     ))}
                </h1>
                    <div className='card w-full h-full rounded-xl overflow-hidden'>
                        <img className='w-full h-full bg-cover' src={Travel_Card} alt="" />
                    </div>
                </motion.div>
            </div>

 {/* BUY & SELL */}
            <div className="cards w-full flex gap-10 mt-10">
            <motion.div 
            onHoverStart = {()=> handleHover(2)} 
            onHoverEnd = {()=> handleHoverEnd(2)} 
            className="cardcontainer  relative w-1/2 h-[75vh]">
               <h1 className='absolute flex overflow-hidden right-0 translate-x-1/2 top-1/2 -translate-y-1/2 text-[#1db954] z-[10] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
                    {"buy".split('').map((item, index)=> (
                    <motion.span 
                    initial={{y:"100%"}} 
                    animate={cards[2]}
                    transition={{ease: [0.22, 1, 0.36, 1], delay: index*.05, scale: 5}} 
                    className='inline-block'>
                        {item}
                    </motion.span>
                    ))}
                    </h1>

                    <div className='card w-full h-full rounded-xl card overflow-hidden'>
                        <img className='w-full h-full bg-cover' src={Sellimg} alt=""  />
                    </div>
                </motion.div>

                <motion.div 

                onHoverStart = {()=> handleHover(3)} 
                onHoverEnd = {()=> handleHoverEnd(3)} 

                className="cardcontainer relative w-1/2 h-[75vh]">
                <h1 className='absolute flex overflow-hidden right-full translate-x-1/2 top-1/2 -translate-y-1/2 text-[#1db954] z-[10] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
                    {"sell".split('').map((item, index)=> (
                     <motion.span 
                     initial={{y:"100% "}} 
                     animate={cards[3]}
                     transition={{ease: [0.22, 1, 0.36, 1], delay: index*.05, scale: 5}} 
                     className='inline-block'>
                         {item}
                     </motion.span>
                     ))}
                </h1>
                    <div className='card w-full h-full rounded-xl overflow-hidden'>
                        <img className='w-full h-full bg-cover' src={Travel_Card} alt="" />
                    </div>
                </motion.div>
            </div>
      </div>
       
  </div>
  )
}

export default FeatureCard