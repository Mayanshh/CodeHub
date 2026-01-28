import { useEffect, useRef } from "react";

const lerp = (a, b, n) => a + (b - a) * n;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const FluidCursorFollower = ({
  containerRef,
  baseSize = 8,
  activeSize = 70,
  speed = 0.18,
}) => {
  const cursorRef = useRef(null);
  const rafRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const prev = useRef({ x: 0, y: 0 });

  const currentSize = useRef(baseSize);
  const targetSize = useRef(baseSize);

  useEffect(() => {
    const cursor = cursorRef.current;
    const container = containerRef?.current;
    if (!cursor || !container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onEnter = () => {
      targetSize.current = activeSize;
    };

    const onLeave = () => {
      targetSize.current = baseSize;
    };

    const animate = () => {
      // position inertia
      pos.current.x = lerp(pos.current.x, mouse.current.x, speed);
      pos.current.y = lerp(pos.current.y, mouse.current.y, speed);

      // velocity
      const vx = pos.current.x - prev.current.x;
      const vy = pos.current.y - prev.current.y;
      prev.current.x = pos.current.x;
      prev.current.y = pos.current.y;

      const velocity = Math.hypot(vx, vy);

      // elastic size
      currentSize.current = lerp(
        currentSize.current,
        targetSize.current,
        0.12
      );

      // fluid stretch
      const stretch = clamp(velocity / 14, 0, 0.35);
      const scaleX = 1 + stretch;
      const scaleY = 1 - stretch;

      cursor.style.width = `${currentSize.current}px`;
      cursor.style.height = `${currentSize.current}px`;

      cursor.style.transform = `
        translate3d(
          ${pos.current.x - currentSize.current / 2}px,
          ${pos.current.y - currentSize.current / 2}px,
          0
        )
        scale(${scaleX}, ${scaleY})
      `;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, baseSize, activeSize, speed]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999]
                 rounded-full bg-white
                 mix-blend-difference
                 will-change-transform"
      style={{
        width: baseSize,
        height: baseSize,
        filter: "blur(6px)",
      }}
    />
  );
};

export default FluidCursorFollower;
