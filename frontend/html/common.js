/* Kaloor Garden Residency: shared hero setup
   Home and Services already have a masked two-line title (.ho-hero-mask / .sv-title-mask).
   Contact and Booking have a plain <h1>, so wrap it in the same kind of mask here.
   The slide-up itself is pure CSS in common.css. */
(function () {
  function wrapTitles() {
    document.querySelectorAll('.ct-hero h1, .bk-hero h1').forEach(function (h) {
      if (h.querySelector('.site-mask')) return;
      var mask = document.createElement('span');
      var line = document.createElement('span');
      mask.className = 'site-mask';
      line.className = 'site-line';
      while (h.firstChild) line.appendChild(h.firstChild);
      mask.appendChild(line);
      h.appendChild(mask);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrapTitles);
  } else {
    wrapTitles();
  }
})();