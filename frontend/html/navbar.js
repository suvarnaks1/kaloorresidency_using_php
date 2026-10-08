/* ==========================================================================
   SHARED NAVBAR — edit links here and every page updates.
   Include as the FIRST element inside <body>:  <script src="js/nav.js"></script>
   ========================================================================== */
(function () {
  var BRAND = "Kaloor Garden Residency";

  var LINKS = [
    { label: "Home", href: "index.html" },
    { label: "Services", href: "services.html" },
    { label: "Contact", href: "contact.html" },
    { label: "Book Now", href: "booking.html", cta: true },
  ];

  /* Which page are we on? (treat "/" and "" as index.html) */
  var current = location.pathname.split("/").pop() || "index.html";

  var linksHtml = LINKS.map(function (l) {
    var cls = l.cta ? ' class="gr-nav-book"' : "";
    var aria = l.href === current ? ' aria-current="page"' : "";
    return '<a href="' + l.href + '"' + cls + aria + ">" + l.label + "</a>";
  }).join("");

  var nav = document.createElement("header");
  nav.className = "gr-nav";
  nav.id = "gr-nav";
  nav.innerHTML =
    '<div class="gr-nav-inner">' +
    '<a class="gr-nav-brand" href="index.html">' + BRAND + "</a>" +
    '<button type="button" class="gr-nav-toggle" aria-label="Toggle menu" ' +
    'aria-expanded="false" aria-controls="gr-nav-links"><span></span></button>' +
    '<nav class="gr-nav-links" id="gr-nav-links" aria-label="Main">' + linksHtml + "</nav>" +
    "</div>";

  document.body.insertBefore(nav, document.body.firstChild);

  var toggle = nav.querySelector(".gr-nav-toggle");

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll(".gr-nav-links a").forEach(function (a) {
    a.addEventListener("click", function () { setOpen(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 820) setOpen(false);
  });

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();