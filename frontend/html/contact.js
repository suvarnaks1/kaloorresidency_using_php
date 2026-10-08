/* Contact page: form validation + confirmation (front end only).
   The hero entrance is handled by common.css. */
(function () {
  "use strict";

  var SUCCESS_VISIBLE_MS = 5000;
  var form = document.getElementById("contact-form");
  var success = document.getElementById("form-success");
  if (!form || !success) return;

  var hideTimer;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.reset();
    success.hidden = false;

    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      success.hidden = true;
    }, SUCCESS_VISIBLE_MS);
  });
})();