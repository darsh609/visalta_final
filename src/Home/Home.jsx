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
import InfiniteMenu from './Infinitemenu';

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

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const navigate = useNavigate();
  const gsapRef = useRef();
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const featureCardRef = useRef(null);
  const feedbackSliderRef = useRef(null);
  const ratingFormRef = useRef(null);
  const ballpitRef = useRef(null);
  const infiniteMenuRef = useRef(null);
  const footerRef = useRef(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const createParallax = (ref, startY, endY, scrubAmount = 1) => {
        gsap.fromTo(ref.current,
          { y: startY },
          {
            y: endY,
            ease: "power1.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: scrubAmount,
              markers: false,
            }
          }
        );
      };

      // Apply parallax with sequential timing
      createParallax(marqueeRef, -100, -300, 1.5);
      createParallax(featureCardRef, -340, -400, 1);
      createParallax(infiniteMenuRef, -500, -390, 1.2);
      createParallax(feedbackSliderRef, -400, -450, 1);
      createParallax(ratingFormRef, -400, -200, 1);
      createParallax(ballpitRef, -400, -150, 0.8);
      createParallax(footerRef, -200, -150, 0.8);

      // Fade animations
      const sections = [
        marqueeRef, 
        featureCardRef, 
        infiniteMenuRef, 
        feedbackSliderRef, 
        ratingFormRef, 
        ballpitRef
      ];

      sections.forEach(ref => {
        if (ref.current) {
          gsap.from(ref.current, {
            opacity: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ref.current,
              start: "top center+=200",
              end: "top center-=200",
              scrub: false,
              toggleActions: "play none none reverse"
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className='relative w-full min-h-screen text-white bg-white overflow-x-hidden'>
      <Navbar/>
      
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
          {["",""].map((item, index) => (
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

      <div className="sections-container relative" style={{ marginTop: '-1px' }}>
        <div ref={marqueeRef} className='relative' style={{ marginBottom: '-1px' }}>
          <Marquee />
        </div>

        <div ref={featureCardRef} className='relative' style={{ marginBottom: '-1px' }}>
          <FeatureCard />
        </div>
          
        <div ref={infiniteMenuRef} className='relative' style={{ 
          height: '1000px',
          marginBottom: '-1px'
        }}>
          <InfiniteMenu items={items} />
        </div>

        <div ref={feedbackSliderRef} className='relative' style={{ marginBottom: '-1px' }}>
          <FeedbackSlider />
        </div>

        <div ref={ratingFormRef} className='relative' style={{ marginBottom: '-1px' }}>
          <RatingReviewForm />
        </div>

        <div ref={ballpitRef} className='relative' style={{
          overflow: 'hidden',
          minHeight: '500px',
          maxHeight: '600px',
          width: '100%',
          marginBottom: '-1px'
        }}>
          <Ballpit
            count={150}
            gravity={1}
            friction={0.8}
            wallBounce={0.8}
            followCursor={true}
          />
        </div>

        <div  ref={footerRef} className='relative' >
        <Footer />
        </div>
      </div>
    </div>
  );
};