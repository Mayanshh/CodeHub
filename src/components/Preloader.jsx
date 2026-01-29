import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onTimelineComplete }) => {
  const comp = useRef(null);
  const numberRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  
  // Local state to unmount component after animation is fully done
  const [render, setRender] = useState(true);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
            setRender(false);
        }
      });

      // 1. Initial State
      gsap.set(bgRef.current, { scale: 1.4 }); // Start zoomed in
      gsap.set(textRef.current, { opacity: 1 });

      // 2. Main Sequence
      tl.to(numberRef.current, {
        innerText: 100,
        duration: 2.5,
        snap: { innerText: 1 },
        ease: "power2.inOut",
      })
      .to(bgRef.current, {
        scale: 1, // Scales back to normal size
        duration: 2.5,
        ease: "power2.inOut",
      }, 0) // Start at same time as number counter
      
      // 3. Fade out the Text
      .to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      })

      // 4. Signal App to fade in the real content
      .call(onTimelineComplete)

      // 5. Fade out the entire black overlay/wrapper to reveal the real Hero behind it
      .to(comp.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      });

    }, comp);

    return () => ctx.revert();
  }, [onTimelineComplete]);

  if (!render) return null;

  return (
    <div ref={comp} className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--primary-color)] overflow-hidden pointer-events-none">
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-[url(../assets/images/HeroRobot.avif)] bg-cover bg-center origin-center"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div ref={textRef} className="relative z-10 flex flex-row items-center justify-center gap-4">
        <h1 className="text-[var(--secondary-color)] text-4xl md:text-6xl font-bold tracking-widest uppercase">
          Code Hub
        </h1>
        <div className="flex items-end">
            <span ref={numberRef} className="text-[var(--secondary-color)] text-6xl md:text-8xl font-bold tracking-tighter tabular-nums leading-none">
            0
            </span>
            <span className="text-[var(--secondary-color)] text-2xl md:text-4xl font-bold mb-2">%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;