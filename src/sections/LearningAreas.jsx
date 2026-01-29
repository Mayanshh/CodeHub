import { memo, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import LearnMoreImg from "@/assets/images/LearnMoreImg.avif";
import FluidCursorFollower from "@/components/FluidCursorFollower";
import Button from "@/components/Button.jsx";

gsap.registerPlugin(ScrollTrigger);

const LearningInfos = [
  {
    title: "Programming Fundamentals",
    info: "Learn how code actually works — variables, data flow, control structures, and problem-solving patterns that apply to any programming language.",
    extendedInfo:
      "This module focuses on building a strong conceptual foundation in programming. Learners are introduced to core concepts such as variables, data types, memory allocation, and control flow. Emphasis is placed on understanding how programs execute, how logic is evaluated by the machine, and how different programming constructs influence performance."
  },
  {
    title: "Web Development Basics",
    info: "Understand how the web is built by learning HTML, CSS, and JavaScript, and how they work together to create real, responsive websites.",
    extendedInfo:
      "This module explains how the web works end-to-end. Learners understand document structure, styling systems, layout mechanics, browser rendering, responsiveness, and interactivity using modern best practices."
  },
  {
    title: "Logic Building",
    info: "Train your mind to think like a developer by breaking problems into clear steps, writing efficient logic, and improving algorithmic thinking.",
    extendedInfo:
      "Logic Building strengthens analytical reasoning. Learners practice problem decomposition, conditional thinking, loops, optimization, and structured decision-making essential for scalable software development."
  },
  {
    title: "Project-Based Learning",
    info: "Apply what you learn by building real projects that simulate real-world scenarios, helping you move from theory to practical execution.",
    extendedInfo:
      "This module emphasizes execution. Learners build real projects involving planning, architecture, debugging, iteration, and deployment to simulate professional workflows."
  },
  {
    title: "Career Preparation",
    info: "Get industry-ready with guidance on portfolios, interviews, real-world expectations, and how to transition from learning to working.",
    extendedInfo:
      "Career Preparation focuses on professional readiness. Learners build portfolios, understand hiring expectations, improve communication skills, and prepare confidently for interviews."
  }
];

const LearningAreas = () => {
  const containerRef = useRef(null);
  const heroTitleRef = useRef(null);
  const infoWrapperRef = useRef(null);
  const courseTitleRef = useRef(null);
  const descRef = useRef(null);
  const bgImgRef = useRef(null);

  const activeIndex = useRef(0);
  const exploreTL = useRef(null);
  const scrollTriggerRef = useRef(null);

  const [isExplored, setIsExplored] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  /* -------- Desktop check (once + resize safe) -------- */
  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* -------- Scroll-controlled content swap -------- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        scrub: true,
        onUpdate: self => {
          if (isExplored) return;

          const total = LearningInfos.length;
          const index = Math.min(
            total - 1,
            Math.floor(self.progress * total)
          );

          if (index !== activeIndex.current) {
            activeIndex.current = index;
            swapContent(index);
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isExplored]);

  const swapContent = contextSafe(index => {
    const data = LearningInfos[index];

    gsap.timeline()
      .to([courseTitleRef.current, descRef.current], {
        y: -20,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in"
      })
      .set(courseTitleRef.current, { textContent: data.title })
      .set(descRef.current, { textContent: data.info })
      .to([courseTitleRef.current, descRef.current], {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: "power2.out"
      });
  });

  /* -------- Explore / Go Back -------- */
  const handleToggle = contextSafe(() => {
    const data = LearningInfos[activeIndex.current];
    const isMobile = window.innerWidth < 768;

    const heroFontSize = isMobile ? "12vw" : "min(14vw, 10rem)";
    const normalFontSize = isMobile ? "2.25rem" : "6.5rem";

    exploreTL.current?.kill();
    exploreTL.current = gsap.timeline({ defaults: { ease: "expo.inOut" } });

    if (!isExplored) {
      setIsExplored(true);
      scrollTriggerRef.current?.disable();

      exploreTL.current
        .to(heroTitleRef.current, {
          y: -100,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.2,
          pointerEvents: "none"
        })
        .to(bgImgRef.current, {
          scale: 1.15,
          duration: 2
        }, "<")
        .to(infoWrapperRef.current, {
          y: "-30vh",
          duration: 1.5
        }, "<0.1")
        .to(courseTitleRef.current, {
          fontSize: heroFontSize,
          duration: 1.2
        }, "<")
        .to(descRef.current, {
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            descRef.current.textContent = data.extendedInfo;
          }
        }, "-=0.8")
        .to(descRef.current, {
          opacity: 1,
          duration: 0.8,
          color: "#E0E0E0"
        });
    } else {
      setIsExplored(false);

      exploreTL.current
        .to(descRef.current, {
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            descRef.current.textContent = data.info;
          }
        })
        .to(infoWrapperRef.current, {
          y: 0,
          duration: 1.2
        })
        .to(courseTitleRef.current, {
          fontSize: normalFontSize,
          duration: 1.2
        }, "<")
        .to(bgImgRef.current, {
          scale: 1,
          duration: 1.5
        }, "<")
        .to(heroTitleRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          pointerEvents: "auto",
          duration: 1.2
        }, "-=1.0")
        .to(descRef.current, {
          opacity: 1,
          color: "rgba(255,255,255,0.9)",
          duration: 0.5
        }, "-=0.4")
        .add(() => scrollTriggerRef.current?.enable());
    }
  });

  return (
    <section
    id='LearningAreas'
      ref={containerRef}
      className="relative w-full h-[300svh] lg:h-[300vh] bg-none"
    >
      {isDesktop && <FluidCursorFollower containerRef={containerRef} />}

      <div className="sticky top-0 w-full h-[100svh] lg:h-[100svh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            ref={bgImgRef}
            src={LearnMoreImg}
            alt="Background"
            className="w-full h-full object-cover brightness-[0.3]"
          />
        </div>

        <div className="relative z-20 w-full h-full flex flex-col justify-between py-4 items-center px-6 md:px-14 mix-blend-difference text-center tracking-tight fontMontreal">
          <h1
            ref={heroTitleRef}
            className="text-[12vw] lg:mb-5 mt-[12svh] md:text-[min(14vw,8rem)] md:mt-[15svh] leading-[0.80] tracking-tighter text-white font-bold uppercase"
          >
            Explore Our <br className="md:hidden" /> Learning Areas
          </h1>

          <div
            ref={infoWrapperRef}
            className="flex flex-col items-start text-left justify-between mb-[16svh] max-w-7xl w-full"
          >
            <h2
              ref={courseTitleRef}
              className="text-[2.25rem] lg:text-[4.6rem] tracking-tighter leading-[0.85] text-white uppercase font-bold"
            >
              {LearningInfos[0].title}
            </h2>
            
            <p
              ref={descRef}
              className="mt-3 lg:mt-4 indent-[2rem] lg:indent-[8rem] text-[1.25] lg:text-[2rem] tracking-tighter leading-[0.85] text-white"
            >
              {LearningInfos[0].info}
            </p>

            <div className="mt-0">
              <Button
                onClick={handleToggle}
                className="lg:mt-5 mt-4 lg:px-0 lg:py-0 border-none underline px-4 py-2"
                text={isExplored ? "Go Back" : "Know More"}
              />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(LearningAreas);
