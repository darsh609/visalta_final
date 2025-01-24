import React, { useRef } from 'react'
import { FaArrowUpLong } from "react-icons/fa6";
import maskerImg from "../assets/masker.png";
import { Navigate, useNavigate } from 'react-router-dom';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Marquee from './Marquee';
import FeatureCard from './FeatureCard';
import { motion } from 'framer-motion';
import { useEffect} from 'react';
import RatingReviewForm from './RatingReviewForm'; 
import FeedbackSlider from './FeedbackSlider';
import Footer from './Footer';
import Ballpit from '../blocks/Backgrounds/Ballpit/Ballpit';
import Navbar from './Navbar';


export const Home = () => {
  const scrollRef = useRef(null);
  
  const navigate = useNavigate();

  const gsapRef = useRef();

  useGSAP(()=>{
    var tl = gsap.timeline()
    tl.from(gsapRef.current, {
     opacity:0,
     duration:0.3,
     delay:0.2
    })

    tl.from(gsapRef.current, {
      transform:"scaleX(0.7) scaleY(0.2)",
      borderRadius:"50px",
      duration:2,
      ease:"expo.out"
    })
  
    tl.from(".Navbar", {
    opacity:0
    })

    tl.from(" .LandingPage h1, .LandingPage p, .LandingPage span, .LandingPage .start, .LandingPage .image",  {
      opacity:0,
      duration: 0.4,
      stagger:0.2
      })
   
 })

  return (
      <div className='w-full h-screen text-white'>
      <Navbar/>
      <div  ref ={gsapRef} className='LandingPage w-full h-screen bg-zinc-900 pt-1'>
        <div className='textstructure mt-40 px-20'>
            
                {["Navigating", "Student's", "life" ].map((item,index)=>{
                    return <div className='masker'>
                    <div className='w-fit flex items-end overflow-hidden'>
                        {index === 1 && (
                        <motion.div initial={{width:0}} animate={{width:"9vw"}} transition={{ease : [0.76, 0, 0.24, 1], duration:1}} className='image mr-[1vw] w-[8vw] rounded-md h-[5.7vw] relative -top-[0.1vw] mt-3'>
                            <img src={maskerImg} alt="" />
                        </motion.div>
                        )}
                    <h1 className='flex items-center uppercase text-[9vw] h-full leading-[7vw] font-["Founders_Grotesk_Condensed"] font-bold'>
                        {item}
                    </h1>
                    </div>
                    
            </div>
                    
                })}
               
            

        </div>
        <div className='border-t-2 border-zinc-800 mt-20 flex justify-between items-center py-5 px-20'>
            {["forxxxxxxx","xxxxxxxx"].map((item,index)=>(
            <p className='text-md font-light'>{item}</p>))}
           <div className='start flex items-center gap-2'>
    <div 
        onClick={() => navigate("sell")} 
        className='px-5 py-2 border-[1px] border-zinc-400 rounded-full font-lighter text-md uppercase tracking-tighter hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group cursor-pointer'
    >
        sell items
        <div className='w-2 h-2 bg-white rounded-full group-hover:w-5 group-hover:h-5 group-hover:rotate-[50deg] transition-all duration-500 flex items-center justify-center'>
            <FaArrowUpLong className='opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        </div>
    </div>
</div>
      </div>
  </div>
    
  <Marquee/>
   
  <FeatureCard/>


   {/* <Footer/> */}
   {/* bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 */}


   <div className= ' bg-slate-600'>
   <FeedbackSlider/>
   <div  className='  -z-10'>
   <RatingReviewForm/>
   </div>
   
   
  <div className=' z-10' style={{position: 'relative', overflow: 'hidden', maxHeight: '400px', width: '100%'}}>
    <Ballpit
    count={80}
    gravity={2}
    friction={0.8}
    wallBounce={0.6}
    followCursor={true}
    />
     </div>

   </div>   
  <Footer/>
</div>
  )
}



