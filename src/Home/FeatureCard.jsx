import React, { useState } from 'react'
import Eatables_Card from "../assets/Eatables_Card.png";
import Travel_Card from "../assets/Travel_Card.png";
import { motion, useAnimation } from 'framer-motion';
import Buy_Card from "../assets/Buy_Card.png";
import Sell_Card from "../assets/Sell_Card.png";
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
        <div className='w-full py-8 sm:py-12 md:py-20 bg-[#005b41] rounded-tl-3xl rounded-tr-3xl text-black'>
            <div className='w-full px-4 sm:px-8 md:px-20 border-b-[1px] border-[#fff] pb-8 sm:pb-12 md:pb-20'>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[3vw] leading-tight md:leading-[3.5vw] font-normal text-white">
                    Featured Project
                </h1>
            </div>

            <div className='px-4 sm:px-8 md:px-20'>
                <div className="cards w-full flex flex-col md:flex-row gap-6 md:gap-10 mt-6 md:mt-10">
                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-white text-base md:text-lg font-light">EXPLORE RESTRAUNTS</span>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-4">
                            {["EATERIES", "FEAST", "CUISINE"].map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/10 text-white rounded-full text-xs sm:text-sm mb-1 mr-1">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <CardWrapper>
                            <motion.div
                                onClick={() => navigate("/dine")}
                                onHoverStart={() => handleHover(0)}
                                onHoverEnd={() => handleHoverEnd(0)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="cardcontainer relative h-[40vh] sm:h-[50vh] md:h-[60vh]"
                                style={{ position: 'relative', zIndex: 1 }}>
                                <div className='absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none'>
                                    <h1 className='flex overflow-hidden text-[#F9F7E7] font-["Founders_Grotesk_Condensed"] font-bold text-5xl sm:text-6xl md:text-8xl leading-none tracking-tight uppercase'>
                                        {"Dine".split('').map((item, index) => (
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
                                    <img className='w-full h-full  object-cover' src={Eatables_Card} alt="" />
                                </div>
                            </motion.div>
                        </CardWrapper>
                    </div>

                    {/* Second card */}
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-white text-base md:text-lg font-light">CHART YOUR NEXT EXPEDITIONS</span>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-4">
                            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs sm:text-sm">
                                VENTURE
                            </span>
                            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs sm:text-sm">
                                PILGRIMAGE
                            </span>
                            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs sm:text-sm">
                                DAY TRIP
                            </span>
                        </div>
                        
                        <CardWrapper>
                            <motion.div
                                onClick={() => navigate("/traverse")}
                                onHoverStart={() => handleHover(1)}
                                onHoverEnd={() => handleHoverEnd(1)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="cardcontainer relative h-[40vh] sm:h-[50vh] md:h-[60vh]"
                                style={{ position: 'relative', zIndex: 1 }}>
                                <div className='absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none'>
                                    <h1 className='flex overflow-hidden text-[#F9F7E7] font-["Founders_Grotesk_Condensed"] font-bold text-5xl sm:text-6xl md:text-8xl leading-none tracking-tight uppercase'>

                                        {"traverse".split('').map((item, index) => (
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
                                    <img className='w-full h-full object-cover' src={Travel_Card} alt="" />
                                </div>
                            </motion.div>
                        </CardWrapper>
                    </div>
                </div>

                {/* Bottom row cards */}
                <div className="cards w-full flex flex-col md:flex-row gap-6 md:gap-10 mt-6 md:mt-10">
                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-white text-base md:text-lg font-light">GET PRODUCT INQUIRY</span>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-4">
                            {["THRIFT STORE", "FINDS"].map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/10 text-white rounded-full text-xs sm:text-sm mb-1 mr-1">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <CardWrapper>
                            <motion.div
                                onClick={() => navigate("/purchase")}
                                onHoverStart={() => handleHover(2)}
                                onHoverEnd={() => handleHoverEnd(2)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="cardcontainer relative h-[40vh] sm:h-[50vh] md:h-[60vh]"
                                style={{ position: 'relative', zIndex: 1 }}>
                                <div className='absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none'>
                                    <h1 className='flex overflow-hidden text-[#4b4b50] font-["Founders_Grotesk_Condensed"] font-bold text-5xl sm:text-6xl md:text-8xl leading-none tracking-tight uppercase'>
                                        {"catalog".split('').map((item, index) => (
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
                                    <img className='w-full h-full object-cover' src={Buy_Card} alt="" />
                                </div>
                            </motion.div>
                        </CardWrapper>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-white text-base md:text-lg font-light">LIST PRODUCTS</span>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-4">
                            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs sm:text-sm">
                                TRADE
                            </span>
                            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs sm:text-sm">
                                OFFER
                            </span>
                        </div>
                        
                        <CardWrapper>
                            <motion.div
                                onClick={() => navigate("/sell")}
                                onHoverStart={() => handleHover(3)}
                                onHoverEnd={() => handleHoverEnd(3)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="cardcontainer relative h-[40vh] sm:h-[50vh] md:h-[60vh]"
                                style={{ position: 'relative', zIndex: 1 }}>
                                <div className='absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none'>
                                    <h1 className='flex overflow-hidden text-[#4b4b50]  font-["Founders_Grotesk_Condensed"] font-bold text-5xl sm:text-6xl md:text-8xl leading-none tracking-tight uppercase'>
                                        {"list&sell".split('').map((item, index) => (
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
                                    <img className='w-full h-full object-cover' src={Sell_Card} alt="" />
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