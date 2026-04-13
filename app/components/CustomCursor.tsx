"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let curX = 0, curY = 0;
    let targetX = 0, targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    let animId: number;
    function update() {
      curX = lerp(curX, targetX, 0.15);
      curY = lerp(curY, targetY, 0.15);
      if (cursor) {
        cursor.style.transform = `translate(${curX - 10}px, ${curY - 10}px)`;
      }
      animId = requestAnimationFrame(update);
    }
    update();

    const hoverTargets = document.querySelectorAll("a, button, .btn, .feature-card");
    const enterHandler = () => cursor?.classList.add("hovering");
    const leaveHandler = () => cursor?.classList.remove("hovering");

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouseMove);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", enterHandler);
        el.removeEventListener("mouseleave", leaveHandler);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}