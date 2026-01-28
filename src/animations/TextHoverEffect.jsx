import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const TextHoverEffect = ({ children, direction = "up", className = "" }) => {
  const container = useRef();
  
  // Scoped GSAP context for better performance
  const { contextSafe } = useGSAP({ scope: container });

  const isUp = direction === "up";
  const moveValue = isUp ? "-100%" : "100%";
  const initialValue = isUp ? "100%" : "-100%";

  const onEnter = contextSafe(() => {
    const l1 = container.current.querySelectorAll(".layer-1 span");
    const l2 = container.current.querySelectorAll(".layer-2 span");

    // Luxury animations use a longer duration (0.8s - 1.2s)
    // and a higher stagger delay for a "wave" effect
    gsap.to(l1, {
      y: moveValue,
      duration: 1, 
      ease: "power4.out",
      stagger: 0.04,
      overwrite: true, // Smoother than killTweens for mid-animation interruptions
    });

    gsap.to(l2, {
      y: "0%",
      duration: 1,
      ease: "power4.out",
      stagger: 0.04,
      overwrite: true,
    });
  });

  const onLeave = contextSafe(() => {
    const l1 = container.current.querySelectorAll(".layer-1 span");
    const l2 = container.current.querySelectorAll(".layer-2 span");

    gsap.to(l1, {
      y: "0%",
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.02,
      overwrite: true,
    });

    gsap.to(l2, {
      y: initialValue,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.02,
      overwrite: true,
    });
  });

  const splitLetters = (text, layerClass, initialY) => (
    <div 
      className={`${layerClass} flex flex-nowrap`} 
      aria-hidden={layerClass === "layer-2"}
    >
      {text.toString().split("").map((char, i) => (
        <span
          key={i}
          className="inline-block whitespace-pre will-change-transform"
          style={{ 
            transform: initialY ? `translateY(${initialY})` : "translateY(0%)" 
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={container}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden cursor-pointer inline-flex items-center ${className}`}
    >
      {splitLetters(children, "layer-1")}
      <div className="absolute inset-0 flex items-center">
        {splitLetters(children, "layer-2", initialValue)}
      </div>
    </div>
  );
};

export default TextHoverEffect;