import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SlingshotImage = ({
  src,
  alt = "Slingshot Effect",
  width = "auto",
  height = "6vw",
  toLeft = 50,
  toTop = 30,
  fromLeft = 50,
  duration = 0.8,
  delay = 0,
  tension = 3,
  rotation = -5,
  className = "",
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    // Check if on mobile screen to adjust the "pop" intensity
    const isMobile = window.innerWidth < 768;

    gsap.set(imageRef.current, {
      top: "120%", // Start further down for a better slingshot
      left: `${fromLeft}%`,
      xPercent: -50,
      rotation: rotation,
      opacity: 0,
      scale: isMobile ? 0.5 : 0.8,
      filter: "blur(10px)",
    });

    gsap.to(imageRef.current, {
      top: `${toTop}%`,
      left: `${toLeft}%`,
      rotation: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: duration,
      delay: isMobile ? delay * 0.5 : delay, // Faster sequence on mobile
      ease: `back.out(${isMobile ? tension * 0.7 : tension})`,
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", 
        toggleActions: "play none none none",
        once: true,
      }
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 10 }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="absolute shadow-xl rounded-lg lg:rounded-xl" 
        style={{ 
          // Responsive logic
          height: `max(45px, ${height})`, 
          width: width,
          objectFit: "cover",
          willChange: "transform, opacity, top"
        }}
      />
    </div>
  );
};

export default SlingshotImage;