/* Contact page: form validation + backend integration.
   The hero entrance is handled by common.css. */
(function () {
  "use strict";

  var SUCCESS_VISIBLE_MS = 5000;
  var form = document.getElementById("contact-form");
  var success = document.getElementById("form-success");
  if (!form || !success) return;

  var hideTimer;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var formData = new FormData(form);

    try {
      var response = await fetch("../../backend/save_contact.php", {
        method: "POST",
        body: formData,
      });

      var result = await response.json();

      if (result.success) {
        form.reset();
        success.hidden = false;

        clearTimeout(hideTimer);
        hideTimer = setTimeout(function () {
          success.hidden = true;
        }, SUCCESS_VISIBLE_MS);
      } else {
        alert(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("An error occurred while sending your message. Please check your connection.");
    }
  });
})();