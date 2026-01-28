import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import careersImg1 from "@/assets/images/careersImg1.jpg";
import careersImg2 from "@/assets/images/careersImg2.jpg";
import careersImg3 from "@/assets/images/careersImg3.jpg";

gsap.registerPlugin(ScrollTrigger);

const Careers = () => {
  const sectionRef = useRef(null);
  const mainTitleRef = useRef(null);
  const imgGroup1Ref = useRef(null);
  const imgGroup2Ref = useRef(null);
  const centerCardRef = useRef(null);

  useGSAP(() => {
    // Media query: Only run parallax on larger screens to save mobile CPU/Battery
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const createParallax = (target, speedY) => {
        if (!target) return;
        gsap.to(target, {
          y: speedY,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        });
      };

      createParallax(mainTitleRef.current, -30);
      createParallax(centerCardRef.current, -80);
      createParallax(imgGroup1Ref.current, -150);
      createParallax(imgGroup2Ref.current, -120);
    });
    
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id='careers' 
      className="w-full relative px-6 lg:px-14 min-h-screen lg:min-h-[120svh] bg-[var(--base-color)] overflow-hidden py-20 lg:py-0"
    >
      
      {/* --- MAIN TITLE --- */}
      <div 
        ref={mainTitleRef} 
        className="will-change-transform w-full relative z-[100] lg:top-40 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center"
      >
        <h1 className="text-black uppercase tracking-tighter text-[12vw] lg:text-[10rem] text-center leading-[0.85] lg:leading-[0.8] fontMontrealBold">
          Learn <br />
          <span className="text-[var(--primary-color)]"> Coding</span> Where <br /> 
          It actually <br /> 
          <span className="text-[var(--primary-color)]">Works!</span>
        </h1>
      </div>

      {/* --- FLOATING IMAGES --- */}
      {/* MOBILE: We use 'relative' and 'mx-auto' to stack them safely.
          DESKTOP: 'lg:absolute' restores your exact pixel-perfect positions.
      */}

      {/* Image 1 (Zuck) */}
      <div 
        ref={imgGroup1Ref} 
        className="relative mx-auto mt-10 rotate-3 h-[250px] w-fit
                   lg:absolute lg:mt-0 lg:z-[5] lg:top-[18%] lg:left-[88%] lg:-translate-x-1/2 lg:-rotate-10 lg:h-[13rem] 
                   bg-[var(--dark-primary-color)] px-4 pt-0 pb-8 will-change-transform shadow-xl"
      >
        <img className="h-full w-auto object-contain" src={careersImg1} alt="Coding Career" />
        <h2 className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[var(--secondary-color)] text-[1.1rem] lg:text-[1.35rem] fontRegular">
          Dare to Leap
        </h2>
      </div>

      {/* Image 2 (Jobs) */}
      <div 
        ref={imgGroup2Ref} 
        className="relative mx-auto mt-10 -rotate-6 h-[300px] w-fit
                   lg:absolute lg:mt-0 lg:z-[5] lg:top-[36%] lg:left-[10%] lg:-translate-x-1/2 lg:-rotate-20 lg:h-[35svh]
                   bg-[var(--dark-primary-color)] px-4 pt-4 pb-9 shadow-xl will-change-transform"
      >
        <img className="h-full w-auto object-contain" src={careersImg2} alt="Innovation" />
        <h2 className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[var(--secondary-color)] text-[1.3rem] lg:text-[1.6rem] fontRegular">
          Invent Relentlessly
        </h2>
      </div>

      {/* Image 3 (Elon / Center Card) */}
      <div 
        ref={centerCardRef} 
        className="relative mx-auto mt-10 rotate-2 w-[80%] max-w-[300px]
                   lg:absolute lg:mt-0 lg:z-[5] lg:top-[70%] lg:left-[70%] lg:-translate-x-1/2 lg:rotate-5 lg:h-[35svh] lg:w-[28svh]
                   bg-[var(--dark-primary-color)] px-4 py-6 flex flex-col justify-between items-center shadow-2xl will-change-transform"
      >
        <img className="h-[200px] lg:h-[25svh] w-auto object-contain" src={careersImg3} alt="Guidance" />
        <h3 className="text-[var(--secondary-color)] text-[0.9rem] lg:text-[1rem] mt-4 text-center leading-tight fontRegular">
          We focus on hands-on practice, <br className="hidden lg:block" /> and personal guidance. 
        </h3>
      </div>
      
    </section>
  );
};

export default Careers;