// import React, { useState } from 'react'
// import Eatables_Card from "../assets/Eatables_Card.png";
// import Travel_Card from "../assets/Travel_Card.png";
// import { motion, useAnimation } from 'framer-motion';
// import Buy_Card from "../assets/Buy_Card.png";
// import { Power4 } from 'gsap/all';
// import { useNavigate } from 'react-router-dom';

// const FeatureCard = () => {
    
//     const navigate = useNavigate();
        
//        const cards = [useAnimation() , useAnimation(), useAnimation(), useAnimation()];

//        const handleHover = (index)=>{
//         cards[index].start({y: "0"})
//        }

//        const handleHoverEnd = (index)=>{
//         cards[index].start({y: "100%"})
//        }

      
    
    
//   return (
//     <div className='w-full py-20 bg-[#005b41] rounded-tl-3xl rounded-tr-3xl text-black'>
//         <div className='w-full px-20 border-b-[1px] border-[#fff] pb-20'>
//             <h1 className="text-7xl text-[3vw] leading-[3.5vw] font-normal">
//             Featured Project
//             </h1>
//         </div> 

//       <div className='px-20'>
//       <div className="cards w-full flex gap-10 mt-10">
//             <motion.div 
//             onClick={()=> navigate("/food")}
//             onHoverStart = {()=> handleHover(0)} 
//             onHoverEnd = {()=> handleHoverEnd(0)} 
//             className="cardcontainer  relative w-1/2 h-[60vh]">
//                <h1 className='absolute flex overflow-hidden right-0 translate-x-1/2 top-1/2 -translate-y-1/2 text-[#F9F7E7] z-[10] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
//                     {"venue".split('').map((item, index)=> (
//                     <motion.span 
//                     initial={{y:"100%"}} 
//                     animate={cards[0]}
//                     transition={{ease: [0.22, 1, 0.36, 1], delay: index*.05}} 
//                     className='inline-block'>
//                         {item}
//                     </motion.span>
//                     ))}
//                     </h1>

//                     <div className='card w-full h-full rounded-xl card overflow-hidden'>
//                         <img className='w-full h-full bg-cover' src={Eatables_Card} alt=""  />
//                     </div>
//                 </motion.div>

//                 <motion.div
//                 onClick={()=> navigate("/travel")} 
//                 onHoverStart = {()=> handleHover(1)} 
//                 onHoverEnd = {()=> handleHoverEnd(1)} 

//                 className="cardcontainer relative w-1/2 h-[60vh]">
//                 <h1 className='absolute flex overflow-hidden right-full translate-x-1/2 top-1/2 -translate-y-1/2 text-[#F9F7E7] z-[10] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
//                     {"visit".split('').map((item, index)=> (
//                      <motion.span 
//                      initial={{y:"100% "}} 
//                      animate={cards[1]}
//                      transition={{ease: [0.22, 1, 0.36, 1], delay: index*.05, scale: 5}} 
//                      className='inline-block'>
//                          {item}
//                      </motion.span>
//                      ))}
//                 </h1>
//                     <div className='card w-full h-full rounded-xl overflow-hidden'>
//                         <img className='w-full h-full bg-cover' src={Travel_Card} alt="" />
//                     </div>
//                 </motion.div>
//             </div>

//  {/* BUY & SELL */}
//             <div className="cards w-full flex gap-10 mt-10">
//             <motion.div 
//             onClick={()=> navigate("/buy")}
//             onHoverStart = {()=> handleHover(2)} 
//             onHoverEnd = {()=> handleHoverEnd(2)} 
//             className="cardcontainer  relative w-1/2 h-[60vh]">
//                <h1 className='absolute flex overflow-hidden right-0 translate-x-1/2 top-1/2 -translate-y-1/2 text-[#F9F7E7] z-[10] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
//                     {"buy".split('').map((item, index)=> (
//                     <motion.span 
//                     initial={{y:"100%"}} 
//                     animate={cards[2]}
//                     transition={{ease: [0.22, 1, 0.36, 1], delay: index*.05, scale: 5}} 
//                     className='inline-block'>
//                         {item}
//                     </motion.span>
//                     ))}
//                     </h1>

//                     <div className='card w-full h-full rounded-xl card overflow-hidden'>
//                         <img className='w-full h-full bg-cover' src={Buy_Card} alt=""  />
//                     </div>
//                 </motion.div>

//                 <motion.div 
//                 onClick={()=> navigate("/sell")}
//                 onHoverStart = {()=> handleHover(3)} 
//                 onHoverEnd = {()=> handleHoverEnd(3)} 

//                 className="cardcontainer relative w-1/2 h-[60vh]">
//                 <h1 className='absolute flex overflow-hidden right-full translate-x-1/2 top-1/2 -translate-y-1/2 text-[#F9F7E7] z-[10] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
//                     {"sell".split('').map((item, index)=> (
//                      <motion.span 
//                      initial={{y:"100% "}} 
//                      animate={cards[3]}
//                      transition={{ease: [0.22, 1, 0.36, 1], delay: index*.05, scale: 5}} 
//                      className='inline-block'>
//                          {item}
//                      </motion.span>
//                      ))}
//                 </h1>
//                     <div className='card w-full h-full rounded-xl overflow-hidden'>
//                         <img className='w-full h-full bg-cover' src={Travel_Card} alt="" />
//                     </div>
//                 </motion.div>
//             </div>
//       </div>
       
//   </div>
//   )
// }

// export default FeatureCard









import React, { useState } from 'react'
import Eatables_Card from "../assets/Eatables_Card.png";
import Travel_Card from "../assets/Travel_Card.png";
import { motion, useAnimation } from 'framer-motion';
import Buy_Card from "../assets/Buy_Card.png";
import { Power4 } from 'gsap/all';
import { useNavigate } from 'react-router-dom';

const FeatureCard = () => {
    const navigate = useNavigate();
    const cards = [useAnimation(), useAnimation(), useAnimation(), useAnimation()];

    const handleHover = (index) => {
        cards[index].start({ y: "0" });
    }

    const handleHoverEnd = (index) => {
        cards[index].start({ y: "100%" });
    }

    const CardWrapper = ({ children }) => (
        <div className="relative">
            {children}
        </div>
    );

    return (
        <div className='w-full py-20 bg-[#005b41] rounded-tl-3xl rounded-tr-3xl text-black'>
            <div className='w-full px-20 border-b-[1px] border-[#fff] pb-20'>
                <h1 className="text-7xl text-[3vw] leading-[3.5vw] font-normal text-white">
                    Featured Project
                </h1>
            </div>

            <div className='px-20'>
                <div className="cards w-full flex gap-10 mt-10">
                    <div className="w-1/2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-white text-lg font-light">CARDBOARD SPACESHIP</span>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-4">
                            {["BRANDED TEMPLATE", "SALES DECK", "SOCIAL MEDIA TEMPLATES"].map((tag, idx) => (
                                <span key={idx} className="px-4 py-1 bg-white/10 text-white rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <CardWrapper>
                            <motion.div
                                onClick={() => navigate("/food")}
                                onHoverStart={() => handleHover(0)}
                                onHoverEnd={() => handleHoverEnd(0)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="cardcontainer relative h-[60vh]"
                                style={{ position: 'relative', zIndex: 1 }}>
                                <div className='absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none'>
                                    <h1 className='flex overflow-hidden text-[#F9F7E7] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
                                        {"venue".split('').map((item, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ y: "100%" }}
                                                animate={cards[0]}
                                                transition={{ ease: [0.22, 1, 0.36, 1], delay: index * .05 }}
                                                className='inline-block'>
                                                {item}
                                            </motion.span>
                                        ))}
                                    </h1>
                                </div>
                                <div className='card w-full h-full rounded-xl overflow-hidden'>
                                    <img className='w-full h-full bg-cover' src={Eatables_Card} alt="" />
                                </div>
                            </motion.div>
                        </CardWrapper>
                    </div>

                    {/* Repeat the same pattern for other cards */}
                    {/* Second card */}
                    <div className="w-1/2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-white text-lg font-light">AH2 & MATT HORN</span>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-4">
                            <span className="px-4 py-1 bg-white/10 text-white rounded-full text-sm">
                                PITCH DECK
                            </span>
                        </div>
                        
                        <CardWrapper>
                            <motion.div
                                onClick={() => navigate("/expeditions")}
                                onHoverStart={() => handleHover(1)}
                                onHoverEnd={() => handleHoverEnd(1)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="cardcontainer relative h-[60vh]"
                                style={{ position: 'relative', zIndex: 1 }}>
                                <div className='absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none'>
                                    <h1 className='flex overflow-hidden text-[#F9F7E7] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
                                        {"visit".split('').map((item, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ y: "100%" }}
                                                animate={cards[1]}
                                                transition={{ ease: [0.22, 1, 0.36, 1], delay: index * .05 }}
                                                className='inline-block'>
                                                {item}
                                            </motion.span>
                                        ))}
                                    </h1>
                                </div>
                                <div className='card w-full h-full rounded-xl overflow-hidden'>
                                    <img className='w-full h-full bg-cover' src={Travel_Card} alt="" />
                                </div>
                            </motion.div>
                        </CardWrapper>
                    </div>
                </div>

                {/* Bottom row cards */}
                <div className="cards w-full flex gap-10 mt-10">
                    <div className="w-1/2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-white text-lg font-light">CARDBOARD SPACESHIP</span>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-4">
                            {["BRANDED TEMPLATE", "SALES DECK", "SOCIAL MEDIA TEMPLATES"].map((tag, idx) => (
                                <span key={idx} className="px-4 py-1 bg-white/10 text-white rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <CardWrapper>
                            <motion.div
                                onClick={() => navigate("/buy")}
                                onHoverStart={() => handleHover(2)}
                                onHoverEnd={() => handleHoverEnd(2)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="cardcontainer relative h-[60vh]"
                                style={{ position: 'relative', zIndex: 1 }}>
                                <div className='absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none'>
                                    <h1 className='flex overflow-hidden text-[#F9F7E7] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
                                        {"buy".split('').map((item, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ y: "100%" }}
                                                animate={cards[2]}
                                                transition={{ ease: [0.22, 1, 0.36, 1], delay: index * .05 }}
                                                className='inline-block'>
                                                {item}
                                            </motion.span>
                                        ))}
                                    </h1>
                                </div>
                                <div className='card w-full h-full rounded-xl overflow-hidden'>
                                    <img className='w-full h-full bg-cover' src={Buy_Card} alt="" />
                                </div>
                            </motion.div>
                        </CardWrapper>
                    </div>

                    <div className="w-1/2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-white text-lg font-light">AH2 & MATT HORN</span>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-4">
                            <span className="px-4 py-1 bg-white/10 text-white rounded-full text-sm">
                                PITCH DECK
                            </span>
                        </div>
                        
                        <CardWrapper>
                            <motion.div
                                onClick={() => navigate("/sell")}
                                onHoverStart={() => handleHover(3)}
                                onHoverEnd={() => handleHoverEnd(3)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="cardcontainer relative h-[60vh]"
                                style={{ position: 'relative', zIndex: 1 }}>
                                <div className='absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none'>
                                    <h1 className='flex overflow-hidden text-[#F9F7E7] font-["Founders_Grotesk_Condensed"] font-bold text-8xl leading-none tracking-tight uppercase'>
                                        {"sell".split('').map((item, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ y: "100%" }}
                                                animate={cards[3]}
                                                transition={{ ease: [0.22, 1, 0.36, 1], delay: index * .05 }}
                                                className='inline-block'>
                                                {item}
                                            </motion.span>
                                        ))}
                                    </h1>
                                </div>
                                <div className='card w-full h-full rounded-xl overflow-hidden'>
                                    <img className='w-full h-full bg-cover' src={Travel_Card} alt="" />
                                </div>
                            </motion.div>
                        </CardWrapper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureCard