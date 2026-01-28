import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import useLenis from '@/hooks/useLenis';
import Hero from '@/sections/Hero';
import Careers from '@/sections/Careers';
import LearningAreas from '@/sections/LearningAreas';
import Button from '@/components/Button';
import CreativitySection from '@/components/CreativitySection';
import Discover from '@/sections/Discover';
import TeachingMethods from '@/sections/TeachingMethods';
import AboutUs from '@/sections/AboutUs';
import Contact from '@/sections/Contact';
import LoadingImg from '@/assets/images/HeroRobot.avif'

// --- Preloader Component ---
const Preloader = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const imageRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const wordRef = useRef(null); 
  const [percentage, setPercentage] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      // 1. Initial State
      // Origin updated to center 30% as requested
      gsap.set(imageRef.current, { 
        scale: isMobile ? 1 : 2, 
        transformOrigin: "center 45%", 
        opacity: 1 
      });
      
      gsap.set(wordRef.current, { opacity: 1 });
      gsap.set(progressRef.current, { opacity: 1 });

      const loaderValue = { val: 0 };

      // 2. Sequence (Total strictly 4 seconds)
      tl.to(loaderValue, {
        val: 100,
        duration: 2, 
        ease: "power1.inOut",
        onUpdate: () => {
          setPercentage(Math.floor(loaderValue.val));
        },
      })
      .to(wordRef.current, {
        opacity: 1,
        duration: 0.2, 
        ease: "power2.out"
      })
      .to([wordRef.current, progressRef.current], {
        opacity: 0,
        duration: 0.3, 
        ease: "power2.in"
      })
      .to(imageRef.current, {
        scale: 1,
        duration: isMobile ? 0 : 1.5, 
        ease: "expo.inOut"
      })
      // 3. Final Exit: The OVERLAY fades out to reveal content
      .to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration:  0.5, 
        ease: "none"
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--primary-color)] overflow-hidden"
    >
      <div className="relative flex flex-col items-center w-full h-full">
        <img 
          ref={imageRef}
          src={LoadingImg} 
          alt="Loading..."
          className="h-[100svh] w-auto lg:w-[100svw] lg:h-auto object-cover !object-[center_20%]"
        />
        
        <div ref={textRef} className="absolute top-[42%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999] fontMontreal flex items-center justify-between w-full max-w-[80vw] lg:max-w-[40vw] text-white font-medium tracking-tighter font-bold uppercase text-lg lg:text-4xl pointer-events-none">
          <span ref={wordRef}>CODE HUB</span>
          <span ref={progressRef} className="tabular-nums">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollTo } = useLenis();

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <main className={`relative w-full flex flex-col bg-[var(--primary-color)] selection:bg-white selection:text-black transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        <Hero />
        <Careers />
        <CreativitySection />
        <LearningAreas />
        <Discover />
        <TeachingMethods />
        <AboutUs />
        <Contact />

        <nav className="fixed bottom-0 left-0 w-full h-[12svh] z-[999] pointer-events-none mix-blend-difference">
          <div className="flex flex-row justify-between items-center px-6 md:px-14 h-full w-full mix-blend-difference">
            <div className="pointer-events-auto">
              <Button text='Start Here' className='lg:px-8 lg:py-3 px-4 py-2' onClick={() => scrollTo('#hero', { offset: -50 })}/>
            </div>
            <div className="pointer-events-auto">
              <Button text='Take the Quiz' className='lg:px-8 lg:py-3 px-4 py-2' onClick={() => scrollTo('#quiz')} />
            </div>
          </div>
        </nav>
      </main>
    </>
  );
};

export default App;