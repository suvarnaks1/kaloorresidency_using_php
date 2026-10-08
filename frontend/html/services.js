/* Services page: hero parallax + price bars drawing in.
   The hero entrance is handled by common.css. */
(function () {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);

  /* Hero parallax */
  const hero = { trigger: ".sv-hero", start: "top top", end: "bottom top", scrub: true };
  gsap.to(".sv-hero-bg", { yPercent: 12, ease: "none", scrollTrigger: hero });
  gsap.to(".sv-hero-inner", { yPercent: -8, opacity: 0, ease: "none", scrollTrigger: hero });

  /* Price bars draw across when the board scrolls into view */
  gsap.from(".sv-rate-bar", {
    scaleX: 0,
    duration: 1.2,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: ".sv-board", start: "top 75%" },
  });
})();