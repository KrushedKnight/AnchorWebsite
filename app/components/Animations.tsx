"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Animations() {
  useEffect(() => {
    // Hero entrance
    const heroTl = gsap.timeline({ delay: 0.3 });
    heroTl
      .fromTo(".hero-badge", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0)
      .fromTo(".hero-headline", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.12)
      .fromTo(".hero-sub", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.24)
      .fromTo(".hero-buttons", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.36)
      .fromTo(".hero-note", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.48)
      .fromTo(
        ".mock-app",
        { opacity: 0, rotateX: 8, scale: 0.95 },
        { opacity: 1, rotateX: 0, scale: 1, duration: 1, ease: "power3.out" },
        0.6
      );

    // Hero parallax
    gsap.to(".hero-headline", {
      yPercent: -15,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero-sub", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".mock-app", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    // Feature cards
    gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: (i % 3) * 0.1,
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    });

    // Screenshot rows
    document.querySelectorAll(".screenshot-row").forEach((row) => {
      const isReverse = row.classList.contains("reverse");
      const text = row.querySelector(".screenshot-text");
      const frame = row.querySelector(".screenshot-frame");

      if (text) {
        gsap.fromTo(
          text,
          { opacity: 0, x: isReverse ? 60 : -60 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
      if (frame) {
        gsap.fromTo(
          frame,
          { opacity: 0, x: isReverse ? -60 : 60 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.15,
            scrollTrigger: { trigger: row, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
    });

    // How it Works steps & lines
    gsap.utils.toArray<HTMLElement>(".step").forEach((step, i) => {
      gsap.fromTo(
        step,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: i * 0.2,
          scrollTrigger: { trigger: ".steps", start: "top 80%", toggleActions: "play none none none" },
        }
      );
    });

    gsap.utils.toArray<HTMLElement>(".step-line").forEach((line, i) => {
      gsap.to(line, {
        scaleX: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.3 + i * 0.2,
        scrollTrigger: { trigger: ".steps", start: "top 80%", toggleActions: "play none none none" },
      });
    });

    // Download section
    gsap.fromTo(
      ".download-content",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".download", start: "top 80%", toggleActions: "play none none none" },
      }
    );

    // Nav scroll behavior
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "80% top",
      onLeave: () => document.querySelector(".nav")?.classList.add("scrolled"),
      onEnterBack: () => document.querySelector(".nav")?.classList.remove("scrolled"),
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}