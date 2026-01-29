import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextHoverEffect from "@/animations/TextHoverEffect";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const containerRef = useRef(null);
  const tl = useRef(null);

  //  Menu Animation
  useGSAP(() => {
    // 1. Setup the timeline (paused initially)
    tl.current = gsap.timeline({ paused: true })
      .to(menuRef.current, {
        yPercent: 100, // Slide down from top (-100% start)
        duration: 1,
        ease: "power4.inOut",
      })
      .fromTo(
        ".mobile-link",
        { y: "120%", opacity: 0, rotate: 5 },
        { y: "0%", opacity: 1, rotate: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6" // Overlap slightly for smoothness
      );
  }, { scope: containerRef });

  // 2. Trigger animation on state change
  useGSAP(() => {
    if (isMenuOpen) {
      tl.current.play();
      document.body.style.overflow = "hidden"; // Lock scroll
    } else {
      tl.current.reverse();
      document.body.style.overflow = ""; // Unlock scroll
    }
  }, [isMenuOpen]);

  return (
    <div ref={containerRef}>
      <nav className="fixed z-[99999] left-0 transform w-[100vw] h-[8svh] flex flex-row items-center justify-between mix-blend-difference px-6 lg:px-14 fontMontreal">
        <h2 className=" overflow-x-hidden text-white tracking-tight text-[1.2rem] lg:text-[1.4rem] w-auto lg:w-[7.5%] uppercase mix-blend-difference z-[99999]">
          <TextHoverEffect direction="up">CODEHUB</TextHoverEffect>
        </h2>
        <div className="hidden lg:flex fontMontrealThin w-[28%] h-[70%] mix-blend-difference text-white text-[0.8rem] flex-row items-center justify-between">
          {["Why?", "How?", "What?", "About us", "Say hello!"].map((text, i) => (
            <a key={i} href="/">
              <TextHoverEffect direction="up">{text}</TextHoverEffect>
            </a>
          ))}
        </div>

        {/* 3. RIGHT SIDE - Adapts for Mobile/Desktop */}
        <div className="flex items-center gap-6 mix-blend-difference z-[99999]">
          
          {/* Desktop: "Our courses" (Original) - Hidden on Mobile */}
          <h2 className="hidden lg:block fontMontreal tracking-tight text-white text-[1.2rem]">
            <TextHoverEffect direction="up">Our courses</TextHoverEffect>
          </h2>

          {/* Mobile Only: "COURSES" + "MENU" */}
          <div className="lg:hidden flex flex-row items-center gap-5 text-white text-[1.2rem] uppercase font-medium">
             <a href="/courses">Courses</a>
             <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="uppercase"
             >
                {isMenuOpen ? "Close" : "Menu"}
             </button>
          </div>

        </div>
      </nav>

      {/* --- FULL SCREEN MOBILE MENU OVERLAY --- */}
      <div 
        ref={menuRef}
        className="fixed inset-0 w-full h-[100svh] bg-[#0a0a0a] z-[99990] flex flex-col justify-center items-start px-4 -translate-y-full text-white"
      >
        <div className="flex flex-col items-start justify-start gap-6 text-left">
          {["Why?", "How?", "What?", "About us", "Say hello!", "Our Courses"].map((item, index) => (
            <div key={index} className="overflow-hidden">
              <a 
                href="/" 
                className="mobile-link block text-[3rem] leading-[1.1] uppercase tracking-tighter fontMontreal"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            </div>
          ))}
        </div>
        
        {/* Footer in Menu */}
        <div className="absolute bottom-10 text-sm opacity-50 fontMontrealThin">
            CodeHub Education &copy; 2024
        </div>
      </div>
    </div>
  );
};

export default Navbar;