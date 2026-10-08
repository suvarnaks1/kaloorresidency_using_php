/* ================= Distance rings ================= */
const WHY_MAX_KM = 3, WHY_R = 180;
const whyRadius = (km) => Math.sqrt(km / WHY_MAX_KM) * WHY_R;
const whyRings = [
  { km: 0.25, label: "250 m" }, { km: 0.75, label: "750 m" },
  { km: 1.5, label: "1.5 km" }, { km: 3, label: "3 km" },
];
const whyStops = [
  { icon: "fa-solid fa-train-subway", dist: "0.225", plotKm: 0.225, angle: -55, title: "Prime Connectivity",
    text: "2 minutes from Kaloor Metro Station with excellent access to Kakkanad, InfoPark & MG Road." },
  { icon: "fa-solid fa-person-running", dist: "0.75", plotKm: 0.75, angle: 22, title: "Walkable Distance",
    text: "A short stroll away from Jawaharlal Nehru International Stadium and local hubs." },
  { icon: "fa-solid fa-hospital", dist: "0.75", plotKm: 0.75, angle: 140, title: "Healthcare Priority",
    text: "Unmatched proximity to top-tier facilities like PVS Memorial & Lisie Hospitals." },
  { icon: "fa-solid fa-graduation-cap", dist: "1–3", plotKm: 2, angle: 222, title: "Education Hubs",
    text: "Surrounded by premium schools, institutes, and accessible city campuses." },
].map((s) => {
  const r = whyRadius(s.plotKm), rad = (s.angle * Math.PI) / 180;
  return { ...s, x: 200 + r * Math.cos(rad), y: 200 + r * Math.sin(rad) };
});

function initWhy() {
  const svg = document.getElementById("rings");
  const radar = document.getElementById("radar");
  const list = document.getElementById("why-list");

  svg.innerHTML =
    [...whyRings].reverse().map((r) => `<circle class="ho-ring" cx="200" cy="200" r="${whyRadius(r.km)}"/>`).join("") +
    whyRings.map((r) => `<text class="ho-ring-label" x="200" y="${200 + whyRadius(r.km) + 3.5}">${r.label}</text>`).join("") +
    `<line class="ho-ray" x1="200" y1="200" x2="${whyStops[0].x}" y2="${whyStops[0].y}"/>`;
  const ray = svg.querySelector(".ho-ray");

  const dots = whyStops.map((s) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "ho-dot";
    b.style.left = s.x / 4 + "%";
    b.style.top = s.y / 4 + "%";
    b.setAttribute("aria-label", `${s.title}, ${s.dist} km`);
    b.innerHTML = `<i class="${s.icon}" aria-hidden="true"></i><span class="ho-dot-tag">${s.dist} km</span>`;
    radar.appendChild(b);
    return b;
  });

  const items = whyStops.map((s) => {
    const li = document.createElement("li");
    li.innerHTML = `<button type="button" class="ho-why-item">
      <span class="ho-why-icon" aria-hidden="true"><i class="${s.icon}"></i></span>
      <span class="ho-why-main"><span class="ho-why-title">${s.title}</span><span class="ho-why-text">${s.text}</span></span>
      <span class="ho-why-dist">${s.dist}<small>km</small></span></button>`;
    list.appendChild(li);
    return li.firstElementChild;
  });

  function setActive(i) {
    ray.setAttribute("x2", whyStops[i].x);
    ray.setAttribute("y2", whyStops[i].y);
    [dots, items].forEach((group) =>
      group.forEach((el, k) => {
        el.classList.toggle("active", k === i);
        el.setAttribute("aria-pressed", k === i);
      })
    );
  }
  [...dots, ...items].forEach((el, n) => {
    const i = n % whyStops.length;
    ["mouseenter", "focus", "click"].forEach((ev) => el.addEventListener(ev, () => setActive(i)));
  });
  setActive(0);
}

/* ================= FAQ ================= */
const faqData = [
  ["What is included in the monthly rent?", "The rent includes fully furnished accommodation, high-speed Wi-Fi, daily housekeeping, water, and access to all recreational common areas."],
  ["Is there a security deposit?", "Yes, a fully refundable security deposit equivalent to one month's rent is collected at the time of onboarding."],
  ["Are visitors allowed inside the premises?", "Visitors are welcome in our reception lobby and common recreation zones during authorized visiting hours (9:00 AM to 8:00 PM)."],
  ["Is there a curfew or lockout time?", "To ensure student safety while respecting professional work schedules, we have a soft curfew at 10:30 PM. However, residents with night shifts or late-night academic requirements can request 24/7 access tags upon submitting verification."],
  ["How do food subscriptions work, and can I opt out?", "We serve nutritious, home-style breakfast, lunch, and dinner. While our standard packages bundle accommodation with meals, we do offer flexible 'room-only' plans if you prefer cooking in our community kitchen or ordering out."],
  ["What is the minimum lock-in period for a stay?", "To maintain a stable and cohesive community environment, we require a minimum stay of 3 months. For shorter durations, please contact our management team directly to check for fluid availability."],
  ["How are utility expenses (like electricity) calculated?", "Water and common area electricity are fully covered in your monthly rent. For individual rooms (especially premium AC rooms), sub-meters are installed so you only pay for the exact power your unit consumes."],
  ["Is parking available on the premises?", "Yes, we have dedicated, secure parking spaces for two-wheelers free of charge. Four-wheeler parking slots are limited and can be reserved on a first-come, first-served basis for a nominal monthly fee."],
  ["What should I do if something in my room needs repair?", "We have a hassle-free maintenance app system. Simply raise a ticket through our resident portal, and our in-house plumbing, electrical, or carpentry teams will resolve the issue within 24 to 48 hours."],
];

function initFAQ() {
  const list = document.getElementById("faq-list");
  faqData.forEach(([q, a], i) => {
    const item = document.createElement("div");
    item.className = "ho-faq-item";
    item.innerHTML = `<button type="button" class="ho-faq-q" aria-expanded="false" aria-controls="faq-panel-${i}">
        <h3>${q}</h3><span class="ho-faq-icon" aria-hidden="true"></span></button>
      <div class="ho-faq-a" id="faq-panel-${i}" role="region"><div><p>${a}</p></div></div>`;
    list.appendChild(item);
  });
  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".ho-faq-q");
    if (!btn) return;
    const item = btn.parentElement;
    const willOpen = !item.classList.contains("open");
    list.querySelectorAll(".ho-faq-item").forEach((el) => {
      el.classList.remove("open");
      el.querySelector(".ho-faq-q").setAttribute("aria-expanded", "false");
    });
    if (willOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
}

/* ================= Location carousel ================= */
function initCarousel(mount, items) {
  const GAP = 20, SWIPE_DISTANCE = 50, SWIPE_VELOCITY = 0.5, MAX_TILT = 38;
  const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
  const clamp = (n, min, max) => Math.max(min, Math.min(n, max));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!Array.isArray(items) || !items.length) {
    mount.innerHTML = '<p style="text-align:center">Location data could not be loaded.</p>';
    return;
  }
  const last = items.length - 1;
  let width = 0, position = 0, dragX = 0, dragging = false, ready = false, gesture = null, justDragged = false;

  mount.innerHTML = `<div class="loc-carousel">
    <div class="loc-tabs"></div>
    <div class="loc-viewport" tabindex="0" role="group" aria-roledescription="carousel" aria-label="Places near Kaloor Garden Residency">
      <div class="loc-track"></div></div>
    <div class="loc-controls">
      <button type="button" class="loc-arrow" aria-label="Previous category">‹</button>
      <span class="loc-counter" aria-live="polite"></span>
      <button type="button" class="loc-arrow" aria-label="Next category">›</button></div></div>`;
  const $ = (s) => mount.querySelector(s);
  const tabs = $(".loc-tabs"), viewport = $(".loc-viewport"), track = $(".loc-track");
  const [prev, next] = mount.querySelectorAll(".loc-arrow");
  const counter = $(".loc-counter");
  track.style.gap = GAP + "px";

  const tabEls = items.map((item, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "loc-tab";
    b.style.setProperty("--accent", item.color);
    b.innerHTML = `<i class="${item.icon}" aria-hidden="true"></i>${item.title}`;
    b.addEventListener("click", () => goTo(i));
    tabs.appendChild(b);
    return b;
  });

  const cards = items.map((item, i) => {
    const c = document.createElement("article");
    c.className = "loc-card";
    c.setAttribute("aria-label", `${item.title}, ${i + 1} of ${items.length}`);
    c.style.setProperty("--accent", item.color);
    c.innerHTML = `<header class="loc-card-head">
        <span class="loc-card-icon" aria-hidden="true"><i class="${item.icon}"></i></span>
        <div><h3 class="loc-card-title">${item.title}</h3>
        <span class="loc-card-count">${item.items.length} places nearby</span></div></header>
      <ul class="loc-list">${item.items
        .map(([n, d]) => `<li><span class="loc-name">${n}</span><span class="loc-dist">${d}</span></li>`)
        .join("")}</ul>`;
    c.addEventListener("click", () => {
      if (!justDragged && i !== position) goTo(i);
    });
    track.appendChild(c);
    return c;
  });

  function render() {
    const itemWidth = clamp(width - 56, 240, 400);
    const offset = itemWidth + GAP;
    const center = (width - itemWidth) / 2;
    const animated = ready && !dragging && !reduceMotion;
    track.style.transform = `translate3d(${center - position * offset + dragX}px,0,0)`;
    track.style.transition = animated ? `transform 0.55s ${EASE}` : "none";

    cards.forEach((c, i) => {
      const t = ((i - position) * offset + dragX) / offset;
      const away = Math.min(Math.abs(t), 1);
      const tilt = reduceMotion ? 0 : -clamp(t, -1, 1) * MAX_TILT;
      c.style.width = itemWidth + "px";
      c.style.opacity = 1 - 0.45 * away;
      c.style.transform = `perspective(900px) rotateY(${tilt}deg) scale(${1 - 0.1 * away})`;
      c.style.transition = animated ? `transform 0.55s ${EASE}, opacity 0.55s ${EASE}` : "none";
    });
    tabEls.forEach((b, i) => {
      b.classList.toggle("active", i === position);
      b.setAttribute("aria-pressed", i === position);
    });
    prev.disabled = position === 0;
    next.disabled = position === last;
    counter.textContent = `${position + 1} / ${items.length}`;
  }

  function goTo(i) {
    position = clamp(i, 0, last);
    const btn = tabEls[position];
    tabs.scrollTo({
      left: btn.offsetLeft - (tabs.clientWidth - btn.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    render();
  }

  prev.addEventListener("click", () => goTo(position - 1));
  next.addEventListener("click", () => goTo(position + 1));

  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(position + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); goTo(position - 1); }
  });

  viewport.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    gesture = { id: e.pointerId, startX: e.clientX, startY: e.clientY, startT: performance.now(), moved: false, dx: 0 };
  });
  viewport.addEventListener("pointermove", (e) => {
    const g = gesture;
    if (!g || g.id !== e.pointerId) return;
    const dx = e.clientX - g.startX;
    if (!g.moved) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(e.clientY - g.startY)) return;
      g.moved = true;
      try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
      dragging = true;
      viewport.classList.add("dragging");
    }
    g.dx = dx;
    const pastEdge = (position === 0 && dx > 0) || (position === last && dx < 0);
    dragX = pastEdge ? dx * 0.25 : dx;
    render();
  });
  const endGesture = () => {
    const g = gesture;
    gesture = null;
    if (!g || !g.moved) return;
    const velocity = g.dx / Math.max(performance.now() - g.startT, 1);
    let n = position;
    if (g.dx < -SWIPE_DISTANCE || velocity < -SWIPE_VELOCITY) n += 1;
    else if (g.dx > SWIPE_DISTANCE || velocity > SWIPE_VELOCITY) n -= 1;
    justDragged = true;
    setTimeout(() => (justDragged = false), 0);
    dragging = false;
    dragX = 0;
    viewport.classList.remove("dragging");
    goTo(n);
  };
  viewport.addEventListener("pointerup", endGesture);
  viewport.addEventListener("pointercancel", endGesture);

  const measure = () => { width = viewport.clientWidth; render(); };
  measure();
  if (window.ResizeObserver) new ResizeObserver(measure).observe(viewport);
  else window.addEventListener("resize", measure);
  requestAnimationFrame(() => { ready = true; render(); });
}

/* ================= Radar entrance (hero animation lives in common.css) ================= */
function initAnimations() {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({ scrollTrigger: { trigger: ".ho-radar", start: "top 80%", once: true } })
    .from(".ho-ring", { scale: 0.2, opacity: 0, svgOrigin: "200 200", stagger: 0.12, duration: 0.9, ease: "power3.out" })
    .from(".ho-ring-label", { opacity: 0, duration: 0.5 }, "-=0.5")
    .from(".ho-center, .ho-dot", { scale: 0, opacity: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.5");
}

/* ================= Init ================= */
document.addEventListener("DOMContentLoaded", () => {
  initWhy();
  initFAQ();
  initCarousel(document.getElementById("location-carousel"), typeof locationData !== "undefined" ? locationData : []);
  initAnimations();
});