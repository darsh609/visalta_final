// import React, { useRef } from 'react'
// import { FaArrowUpLong } from "react-icons/fa6";
// import maskerImg from "../assets/masker.png";
// import { Navigate, useNavigate } from 'react-router-dom';
// import gsap from 'gsap'
// import { useGSAP } from '@gsap/react'
// import Marquee from './Marquee';
// import FeatureCard from './FeatureCard';
// import { motion } from 'framer-motion';
// import { useEffect} from 'react';
// import RatingReviewForm from './RatingReviewForm'; 
// import FeedbackSlider from './FeedbackSlider';
// import Footer from './Footer';
// import Ballpit from '../blocks/Backgrounds/Ballpit/Ballpit';
// import Navbar from './Navbar';


// export const Home = () => {
//   const scrollRef = useRef(null);
  
//   const navigate = useNavigate();

//   const gsapRef = useRef();

//   useGSAP(()=>{
//     var tl = gsap.timeline()
//     tl.from(gsapRef.current, {
//      opacity:0,
//      duration:0.3,
//      delay:0.2
//     })

//     tl.from(gsapRef.current, {
//       transform:"scaleX(0.7) scaleY(0.2)",
//       borderRadius:"50px",
//       duration:2,
//       ease:"expo.out"
//     })
  
//     tl.from(".Navbar", {
//     opacity:0
//     })

//     tl.from(" .LandingPage h1, .LandingPage p, .LandingPage span, .LandingPage .start, .LandingPage .image",  {
//       opacity:0,
//       duration: 0.4,
//       stagger:0.2
//       })
   
//  })

//   return (
//       <div className='w-full h-screen text-white'>
//       <Navbar/>
//       <div ref ={gsapRef} className='LandingPage w-full h-screen bg-zinc-900 pt-1'>
//         <div className='textstructure mt-40 px-20'>
            
//                 {["Navigating", "Student's", "life" ].map((item,index)=>{
//                     return <div className='masker'>
//                     <div className='w-fit flex items-end overflow-hidden'>
//                         {index === 1 && (
//                         <motion.div initial={{width:0}} animate={{width:"9vw"}} transition={{ease : [0.76, 0, 0.24, 1], duration:1}} className='image mr-[1vw] w-[8vw] rounded-md h-[5.7vw] relative -top-[0.1vw] mt-3'>
//                             <img src={maskerImg} alt="" />
//                         </motion.div>
//                         )}
//                     <h1 className='flex items-center uppercase text-[9vw] h-full leading-[7vw] font-founders font-bold'>
//                         {item}
//                     </h1>
//                     </div>
                    
//             </div>
                    
//                 })}
               
            

//         </div>
//         <div className='border-t-2 border-zinc-800 mt-20 flex justify-between items-center py-5 px-20'>
//             {["forxxxxxxx","xxxxxxxx"].map((item,index)=>(
//             <p className='text-md font-light'>{item}</p>))}
//            <div className='start flex items-center gap-2'>
//     <div 
//         onClick={() => navigate("sell")} 
//         className='px-5 py-2 border-[1px] border-zinc-400 rounded-full font-lighter text-md uppercase tracking-tighter hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group cursor-pointer'
//     >
//         sell items
//         <div className='w-2 h-2 bg-white rounded-full group-hover:w-5 group-hover:h-5 group-hover:rotate-[50deg] transition-all duration-500 flex items-center justify-center'>
//             <FaArrowUpLong className='opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
//         </div>
//     </div>
// </div>
//       </div>
//   </div>
    
//   <Marquee/>
   
//   <FeatureCard/>


//    {/* <Footer/> */}
//    {/* bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 */}


//    <div className= ' bg-slate-600'>
//    <FeedbackSlider/>
//    <div  className='  -z-10'>
//    <RatingReviewForm/>
//    </div>
   
   
//   <div className=' z-10' style={{position: 'relative', overflow: 'hidden', maxHeight: '400px', width: '100%'}}>
//     <Ballpit
//     count={80}
//     gravity={2}
//     friction={0.8}
//     wallBounce={0.6}
//     followCursor={true}
//     />
//      </div>

//    </div>   
//   <Footer/>
// </div>
//   )
// }






// import React, { useRef, useEffect } from 'react';
// import { FaArrowUpLong } from "react-icons/fa6";
// import maskerImg from "../assets/masker.png";
// import { useNavigate } from 'react-router-dom';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGSAP } from '@gsap/react';
// import Marquee from './Marquee';
// import FeatureCard from './FeatureCard';
// import RatingReviewForm from './RatingReviewForm';
// import FeedbackSlider from './FeedbackSlider';
// import Footer from './Footer';
// import Ballpit from '../blocks/Backgrounds/Ballpit/Ballpit';
// import Navbar from './Navbar';
// import { motion } from 'framer-motion';
// import Squares from './Squares';

// // Register ScrollTrigger
// gsap.registerPlugin(ScrollTrigger);

// export const Home = () => {
//   const navigate = useNavigate();
//   const gsapRef = useRef();
  
//   // Container refs for parallax sections
//   const containerRef = useRef(null);
//   const marqueeRef = useRef(null);
//   const featureCardRef = useRef(null);
//   const feedbackSliderRef = useRef(null);
//   const ratingFormRef = useRef(null);
//   const ballpitRef = useRef(null);

//   // Initial landing page animation
//   useGSAP(() => {
//     const tl = gsap.timeline();
    
//     tl.from(gsapRef.current, {
//       opacity: 0,
//       duration: 0.3,
//       delay: 0.2
//     })
//     .from(gsapRef.current, {
//       transform: "scaleX(0.7) scaleY(0.2)",
//       borderRadius: "50px",
//       duration: 2,
//       ease: "expo.out"
//     })
//     .from(".Navbar", {
//       opacity: 0
//     })
//     .from(".LandingPage h1, .LandingPage p, .LandingPage span, .LandingPage .start, .LandingPage .image", {
//       opacity: 0,
//       duration: 0.4,
//       stagger: 0.2
//     });
//   });

//   // Parallax effects setup
//   useEffect(() => {
//     // Create context to batch scrolltrigger
//     const ctx = gsap.context(() => {
//       // Marquee parallax
//       gsap.fromTo(marqueeRef.current,
//         { y: 0 },
//         {
//           y: -80,
//           ease: "none",
//           scrollTrigger: {
//             trigger: marqueeRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 2,
//             markers: false
//           }
//         }
//       );

//       // FeatureCard parallax
//       gsap.fromTo(featureCardRef.current,
//         { y: -80 },
//         {
//           y: -150,
//           ease: "none",
//           scrollTrigger: {
//             trigger: featureCardRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 4.5,
//             markers: false
//           }
//         }
//       );

//       // FeedbackSlider parallax
//       gsap.fromTo(feedbackSliderRef.current,
//         { y: 0 },
//         {
//           y: -60,
//           ease: "none",
//           scrollTrigger: {
//             trigger: feedbackSliderRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 1,
//             markers: false
//           }
//         }
//       );

//       // RatingReviewForm parallax
//       gsap.fromTo(ratingFormRef.current,
//         { y: 0 },
//         {
//           y: -40,
//           ease: "none",
//           scrollTrigger: {
//             trigger: ratingFormRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 0.5,
//             markers: false
//           }
//         }
//       );

//       // Ballpit parallax
      
//     }, containerRef);

//     // Cleanup
//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={containerRef} className='relative w-full min-h-screen text-white overflow-x-hidden'>
//       <Navbar/>
      
//       {/* Landing Page */}
//       <div ref={gsapRef} className='LandingPage w-full h-screen bg-zinc-900 pt-1'>
//       {/* <Squares
//         speed={0.5} 
//         squareSize={40}
//         direction='diagonal' // up, down, left, right, diagonal
//         borderColor='#fff'
//       /> */}
//         <div className='textstructure mt-40 px-20'>
//           {["Navigating", "Student's", "life"].map((item, index) => (
//             <div key={index} className='masker'>
//               <div className='w-fit flex items-end overflow-hidden'>
//                 {index === 1 && (
//                   <motion.div 
//                     initial={{width:0}} 
//                     animate={{width:"9vw"}} 
//                     transition={{ease:[0.76, 0, 0.24, 1], duration:1}} 
//                     className='image mr-[1vw] w-[8vw] rounded-md h-[5.7vw] relative -top-[0.1vw] mt-3'
//                   >
//                     <img src={maskerImg} alt="" />
//                   </motion.div>
//                 )}
//                 <h1 className='flex items-center uppercase text-[9vw] h-full leading-[7vw] font-founders font-bold'>
//                   {item}
//                 </h1>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className='border-t-2 border-zinc-800 mt-20 flex justify-between items-center py-5 px-20'>
//           {["forxxxxxxx","xxxxxxxx"].map((item, index) => (
//             <p key={index} className='text-md font-light'>{item}</p>
//           ))}
//           <div className='start flex items-center gap-2'>
//             <div
//               onClick={() => navigate("sell")}
//               className='px-5 py-2 border-[1px] border-zinc-400 rounded-full font-lighter text-md uppercase tracking-tighter hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group cursor-pointer'
//             >
//               sell items
//               <div className='w-2 h-2 bg-white rounded-full group-hover:w-5 group-hover:h-5 group-hover:rotate-[50deg] transition-all duration-500 flex items-center justify-center'>
//                 <FaArrowUpLong className='opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Parallax Sections */}
//       <div className='relative z-10 bg-zinc-900'>
//         <div ref={marqueeRef} className='relative'>
//           <Marquee />
//         </div>

//         <div ref={featureCardRef} className='relative'>
//           <FeatureCard />
//         </div>

//         <div className='relative bg-white'>
//           <div ref={feedbackSliderRef} className='relative'>
//             <FeedbackSlider />
//           </div>

//           <div ref={ratingFormRef} className='relative'>
//             <RatingReviewForm />
//           </div>

//           <div  className='relative'  style={{overflow: 'hidden', minHeight: '500px', maxHeight: '600px', width: '100%'}}>
//             <Ballpit
//               count={150}
//               gravity={1}
//               friction={0.8}
//               wallBounce={0.8}
//               followCursor={true}
//             />
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };








import React, { useRef, useEffect } from 'react';
import { FaArrowUpLong } from "react-icons/fa6";
import maskerImg from "../assets/masker.png";
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Marquee from './Marquee';
import FeatureCard from './FeatureCard';
import RatingReviewForm from './RatingReviewForm';
import FeedbackSlider from './FeedbackSlider';
import Footer from './Footer';
import Ballpit from '../blocks/Backgrounds/Ballpit/Ballpit';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import TiltedCard from './TiltedCard';
import InfiniteMenu from './Infinitemenu'

const items = [
  {
    image: 'https://imgs.search.brave.com/qWLiGtYPIpP047O41-MVHFudMz5Q1FY4_jZvS_go3H4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8x/LzE1L05pdHdfbWFp/bl9nYXRlLkpQRw',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: 'https://google.com/',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  }
];



// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const navigate = useNavigate();
  const gsapRef = useRef();
  
  // Container refs for parallax sections
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const featureCardRef = useRef(null);
  const feedbackSliderRef = useRef(null);
  const ratingFormRef = useRef(null);
  const ballpitRef = useRef(null);

  // Initial landing page animation
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(gsapRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.2
    })
    .from(gsapRef.current, {
      transform: "scaleX(0.7) scaleY(0.2)",
      borderRadius: "50px",
      duration: 2,
      ease: "expo.out"
    })
    .from(".Navbar", {
      opacity: 0
    })
    .from(".LandingPage h1, .LandingPage p, .LandingPage span, .LandingPage .start, .LandingPage .image", {
      opacity: 0,
      duration: 0.4,
      stagger: 0.2
    });
  });

  // Enhanced parallax effects setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee parallax - increased movement range and faster response
      gsap.fromTo(marqueeRef.current,
        { y: 0 }, // Start from below
        {
          y: -300, // Move more dramatically upward
          ease: "power1.out", // Changed ease for smoother motion
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top bottom", 
            end: "bottom top",
            scrub: 1, // Reduced scrub for more immediate response
            markers: false
          }
        }
      );

      // FeatureCard parallax - increased range
      gsap.fromTo(featureCardRef.current,
        { y: -200 }, // Start from below
        {
          y: -1050, // More dramatic upward movement
          ease: "power1.out",
          scrollTrigger: {
            trigger: featureCardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5, // Slightly delayed response
            markers: false
          }
        }
      );

      // FeedbackSlider parallax - more dramatic movement
      gsap.fromTo(feedbackSliderRef.current,
        { y: 180 }, // Start from below
        {
          y: -180, // Equal movement in opposite direction
          ease: "power1.out",
          scrollTrigger: {
            trigger: feedbackSliderRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2, // Balanced response time
            markers: false
          }
        }
      );

      // RatingReviewForm parallax - enhanced movement
      gsap.fromTo(ratingFormRef.current,
        { y: 150 }, // Start from below
        {
          y: -150, // Balanced movement range
          ease: "power1.out",
          scrollTrigger: {
            trigger: ratingFormRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Quick response
            markers: false
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className='relative w-full min-h-screen text-white bg-white overflow-x-hidden'>
      <Navbar/>
      
      {/* Landing Page */}
      <div ref={gsapRef} className='LandingPage w-full h-screen bg-zinc-900 pt-1'>
        <div className='textstructure mt-40 px-20'>
          {["Navigating", "Student's", "life"].map((item, index) => (
            <div key={index} className='masker'>
              <div className='w-fit flex items-end overflow-hidden'>
                {index === 1 && (
                  <motion.div 
                    initial={{width:0}} 
                    animate={{width:"9vw"}} 
                    transition={{ease:[0.76, 0, 0.24, 1], duration:1}} 
                    className='image mr-[1vw] w-[8vw] rounded-md h-[5.7vw] relative -top-[0.1vw] mt-3'
                  >
                    <img src={maskerImg} alt="" />
                  </motion.div>
                )}
                <h1 className='flex items-center uppercase text-[9vw] h-full leading-[7vw] font-founders font-bold'>
                  {item}
                </h1>
              </div>
            </div>
          ))}
        </div>

        <div className='border-t-2 border-zinc-800 mt-20 flex justify-between items-center py-5 px-20'>
          {["forxxxxxxx","xxxxxxxx"].map((item, index) => (
            <p key={index} className='text-md font-light'>{item}</p>
          ))}
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

      {/* Parallax Sections */}

        <div ref={marqueeRef} className='relative'>
          <Marquee />
        </div>

        <div ref={featureCardRef} className='relative'>
          <FeatureCard />
        </div>

          {/* <div  className='relative'>
          <TiltedCard
          imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
          altText="Kendrick Lamar - GNX Album Cover"
          captionText="Kendrick Lamar - GNX"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <p className="tilted-card-demo-text">
              Kendrick Lamar - GNX
            </p>
          }
        />
          </div> */}
          
<div style={{ height: '1000px', position: 'relative' }}>
  <InfiniteMenu items={items}/>
</div>

          <div ref={feedbackSliderRef} className='relative'>
            <FeedbackSlider />
          </div>

          <div ref={ratingFormRef} className='relative'>
            <RatingReviewForm />
          </div>

          <div className='relative' style={{overflow: 'hidden', minHeight: '500px', maxHeight: '600px', width: '100%'}}>
            <Ballpit
              count={150}
              gravity={1}
              friction={0.8}
              wallBounce={0.8}
              followCursor={true}
            />
          </div>
        

      <Footer />
    </div>
  );
};



