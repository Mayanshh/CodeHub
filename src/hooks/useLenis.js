import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis with "Luxurious" settings
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5, // Light smoothing for mobile
      lerp: 0.1, // Smoothness intensity
    });

    lenisRef.current = lenis;

    // 2. Critical: Update ScrollTrigger on every scroll
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Sync GSAP ticker with Lenis
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0); // Prevents "jumps" after heavy CPU tasks

    // 4. Fix "Stuck at Bottom": Recalculate size on every DOM change
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo: (target, opts) => lenisRef.current?.scrollTo(target, { duration: 1.5, ...opts }),
  };
};

export default useLenis;