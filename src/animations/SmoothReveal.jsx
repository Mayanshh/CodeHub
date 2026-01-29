import React, { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SmoothReveal = ({ children, className = "", stagger = 0.02 }) => {
  const container = useRef();

  // Recursive function to wrap text nodes
  const wrapText = (nodes) => {
    return React.Children.map(nodes, (child) => {
      // Handle raw string text
      if (typeof child === "string") {
        return child.split(/(\s+)/).map((part, i) => {
          if (part.match(/\s+/)) return part;
          
          return (
            <span 
              key={i} 
              className="inline-block overflow-hidden align-bottom"
            >
              <span className="word-inner my-1 inline-block will-change-transform">
                {part}
              </span>
            </span>
          );
        });
      }

      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          children: wrapText(child.props.children),
        });
      }
      return child;
    });
  };

  const processedContent = useMemo(() => wrapText(children), [children]);

  useGSAP(() => {
    // target .word-inner specifically within this container
    const words = container.current.querySelectorAll(".word-inner");

    if (words.length > 0) {
      gsap.fromTo(words, 
        { 
          y: "100%", 
          opacity: 0 
        },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: stagger,
          scrollTrigger: {
            trigger: container.current,
            // "top 95%" ensures it triggers even if the element is already on screen
            start: "top 95%", 
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: container, dependencies: [children] });

  return (
    <div ref={container} className={className}>
      {processedContent}
    </div>
  );
};

export default SmoothReveal;