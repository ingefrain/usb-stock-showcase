import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/**
 * Scroll reveals inside `scope`:
 *  [data-reveal]        fade + rise
 *  [data-reveal-img]    clip-path wipe of a photo frame
 *  [data-stagger]       children animate in sequence
 *  [data-parallax="n"]  subtle vertical drift (n = px)
 */
export function useScrollReveals(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      el.querySelectorAll<HTMLElement>("[data-reveal]:not([data-done])").forEach((n) => {
        n.dataset["done"] = "1";
        gsap.from(n, { y: 36, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: n, start: "top 88%", once: true } });
      });
      el.querySelectorAll<HTMLElement>("[data-reveal-img]:not([data-done])").forEach((n) => {
        n.dataset["done"] = "1";
        gsap.fromTo(n, { clipPath: "inset(12% 12% 12% 12% round 28px)", opacity: 0.4 }, { clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1, duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: n, start: "top 85%", once: true } });
      });
      el.querySelectorAll<HTMLElement>("[data-stagger]").forEach((n) => {
        const kids = Array.from(n.children).filter((c) => !(c as HTMLElement).dataset["done"]) as HTMLElement[];
        if (!kids.length) return;
        kids.forEach((k) => (k.dataset["done"] = "1"));
        gsap.from(kids, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.07, scrollTrigger: { trigger: kids[0]!, start: "top 92%", once: true } });
      });
      el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((n) => {
        const d = Number(n.dataset["parallax"] ?? 40);
        gsap.fromTo(n, { y: -d }, { y: d, ease: "none", scrollTrigger: { trigger: n, start: "top bottom", end: "bottom top", scrub: true } });
      });
      ScrollTrigger.refresh();
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
