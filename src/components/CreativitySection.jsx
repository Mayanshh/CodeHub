import React, { useState, useEffect } from 'react';
import SmoothReveal from "@/animations/SmoothReveal";
import SlingshotImage from "@/animations/SlingshotImage";

const CreativitySection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper to adjust position for mobile to avoid text overlap
  const getPos = (desktopPos, mobilePos) => (isMobile ? mobilePos : desktopPos);

  return (
    <section className="relative h-[100svh] w-full bg-[var(--base-color)] flex items-center justify-center overflow-hidden">
      
      {/* Central Text Content */}
      <div className="h-fit w-full px-6 lg:w-fit p-1 flex flex-col gap-8 lg:gap-[5rem] items-center justify-center z-[20]">
        <h1 className="fontRegular text-[1.5rem] lg:text-[2.5rem] font-[400] text-black text-center leading-[1.2]">
          <SmoothReveal text="All related to" />
        </h1>
        
        <SmoothReveal stagger={0.25}>
          <h1 className="fontRegular h-fit text-[2.2rem] md:text-[3rem] lg:text-[5.5rem] font-[400] text-black text-center leading-[1.1] lg:leading-[1]">
            Teaching programming,
            <span className="w-full h-fit leading-[1] text-center whitespace-nowrap flex flex-row items-center justify-center">
              Fundamentals,
            </span>
            and Skills.
          </h1>
        </SmoothReveal>
      </div>
      
      {/* SLINGSHOT IMAGES : Responsive */}
      
      <SlingshotImage 
        src="https://logowik.com/content/uploads/images/nodejs.jpg"
        width="auto"        
        height={isMobile ? "12vw" : "6vw"}
        toTop={getPos("70", "75")}
        toLeft={getPos("30", "80")}
        fromLeft={getPos("30", "80")}
        delay={0.2}
        rotation={-10}
      />

      <SlingshotImage 
        src="https://logowik.com/content/uploads/images/react.jpg"
        width="auto"        
        height={isMobile ? "12vw" : "6vw"}
        toTop={getPos("20", "10")}
        toLeft={getPos("35", "20")}
        fromLeft={35}
        delay={0.6}
        rotation={-10}
      />
      
      <SlingshotImage 
        src="https://logowik.com/content/uploads/images/nextjs2106.logowik.com.webp"
        width="auto"        
        height={isMobile ? "12vw" : "6vw"}
        toTop={getPos("23", "12")}
        toLeft={getPos("63", "80")}
        fromLeft={63}
        delay={0.4}
        rotation={-10}
      />

      <SlingshotImage 
        src="https://logowik.com/content/uploads/images/mongodb9740.logowik.com.webp"
        width="auto"        
        height={isMobile ? "12vw" : "6vw"}
        toTop={getPos("70", "50")}
        toLeft={getPos("70", "15")}
        fromLeft={getPos("70", "75")}
        delay={0.8}
        rotation={-10}
      />

      <SlingshotImage 
        src="https://logowik.com/content/uploads/images/css-icon5555.logowik.com.webp"
        width="auto"        
        height={isMobile ? "12vw" : "6vw"}
        toTop={getPos("6", "5")}
        toLeft={getPos("16", "50")}
        fromLeft={getPos("16", "50")}
        delay={0.9}
        rotation={-10}
      />

      <SlingshotImage 
        src="https://logowik.com/content/uploads/images/3799-javascript.jpg"
        width="auto"        
        height={isMobile ? "12vw" : "6vw"}
        toTop={getPos("75", "25")}
        toLeft={getPos("50", "10")}
        fromLeft={50}
        delay={0.1}
        rotation={-10}
      />

      <SlingshotImage 
        src="https://logowik.com/content/uploads/images/492_html5.jpg"
        width="auto"        
        height={isMobile ? "12vw" : "6vw"}
        toTop={getPos("52", "82")}
        toLeft={getPos("10", "10")}
        fromLeft={getPos("10", "10")}
        delay={0.7}
        rotation={-10}
      />

      <SlingshotImage 
        src="https://logowik.com/content/uploads/images/python4089.logowik.com.webp"
        width="auto"        
        height={isMobile ? "12vw" : "6vw"}
        toTop={getPos("6", "40")}
        toLeft={getPos("84", "90")}
        fromLeft={getPos("84", "90")}
        delay={0.1}
        rotation={-10}
      />

      <SlingshotImage 
        src="https://logowik.com/content/uploads/images/java1655.logowik.com.webp"
        width="auto"        
        height={isMobile ? "12vw" : "6vw"}
        toTop={getPos("52", "65")}
        toLeft={getPos("90", "88")}
        fromLeft={getPos("90", "88")}
        delay={0.9}
        rotation={-10}
      />
    </section>
  );
};

export default CreativitySection;