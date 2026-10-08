/* Booking page: nightly pricing, dates, validation, confirmation with PHP Backend connection */
(function () {
  "use strict";

  var form = document.getElementById("booking-form");
  if (!form) return;

  var fields = form.elements; // fullName, email, phone, roomType, rooms, checkin, checkout, message
  var $ = function (id) { return document.getElementById(id); };
  var errorBox = $("form-error");
  var confirmBtn = $("confirm-details");
  var summaryBtn = $("s-submit");
  var verifyModal = $("verify-modal");
  var successModal = $("success-modal");

  var DAY = 86400000;
  var money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
  var opener = null;
  var pending = null;   // details confirmed into the summary, waiting for Continue
  var confirmed = null; // finished booking

  /* ---------- dates (local time, no timezone drift) ---------- */
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parse(v) {
    if (!v) return null;
    var p = v.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function today() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }
  function show(d) {
    return d ? d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
  }
  function plural(n, word) { return n + " " + word + (n === 1 ? "" : "s"); }

  /* keep check-out at least one night after check-in */
  function syncDates() {
    var cin = parse(fields.checkin.value);
    if (!cin) return;
    var minOut = addDays(cin, 1);
    fields.checkout.min = iso(minOut);
    var cout = parse(fields.checkout.value);
    if (!cout || cout < minOut) fields.checkout.value = iso(minOut);
  }

  function setDefaults() {
    fields.checkin.min = iso(today());
    fields.checkin.value = iso(today());
    syncDates();
  }

  /* ---------- read form ---------- */
  function read() {
    var opt = fields.roomType.options[fields.roomType.selectedIndex];
    var cin = parse(fields.checkin.value);
    var cout = parse(fields.checkout.value);
    var nights = cin && cout ? Math.round((cout - cin) / DAY) : 0;
    var rate = +opt.dataset.rate;
    var rooms = +fields.rooms.value;
    return {
      name: fields.fullName.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      typeValue: fields.roomType.value,
      type: opt.dataset.name,
      rate: rate,
      rooms: rooms,
      cin: cin,
      cout: cout,
      nights: nights,
      message: fields.message ? fields.message.value.trim() : "",
      total: nights > 0 ? rate * rooms * nights : 0
    };
  }

  /* ---------- summary panel ---------- */
  function set(id, text) { $(id).textContent = text; }

  function fill(prefix, b) {
    var ok = b.nights > 0;
    set(prefix + "-type", b.type);
    set(prefix + "-rate", money.format(b.rate) + " / night");
    set(prefix + "-rooms", b.rooms);
    set(prefix + "-checkin", show(b.cin));
    set(prefix + "-checkout", show(b.cout));
    set(prefix + "-nights", ok ? b.nights : "—");
    set(prefix + "-total", ok ? money.format(b.total) : "—");
  }

  function renderSummary(b) {
    fill("s", b);
    set("s-guest", b.name);
    set("s-email", b.email);
    set("s-phone", b.phone);
    set("s-calc", money.format(b.rate) + " × " + plural(b.rooms, "room") + " × " + plural(b.nights, "night"));
  }

  function clearSummary() {
    pending = null;
    ["s-guest", "s-email", "s-phone", "s-type", "s-rate", "s-rooms",
     "s-checkin", "s-checkout", "s-nights", "s-total"].forEach(function (id) { set(id, "—"); });
    set("s-calc", "");
    set("s-note", "Fill in the form, then press Confirm Details to see your booking here.");
    summaryBtn.disabled = true;
  }

  /* ---------- locked / confirmed state ---------- */
  function lock(on) {
    Array.prototype.forEach.call(form.querySelectorAll("fieldset"), function (f) { f.disabled = on; });
    form.style.opacity = on ? ".5" : "";
    confirmBtn.disabled = on;
  }

  function showConfirmed(b, id) {
    confirmed = b;
    renderSummary(b);
    set("s-id", id);
    $("s-id-row").hidden = false;
    set("s-title", "Booking Confirmed");
    set("s-note", "Your booking is confirmed. Keep your booking ID for reference.");
    set("s-submit", "New Booking");
    summaryBtn.disabled = false;
    lock(true);
  }

  function resetAll() {
    confirmed = null;
    lock(false);
    form.reset();
    showError("");
    setDefaults();
    $("s-id-row").hidden = true;
    set("s-title", "Booking Summary");
    set("s-submit", "Continue");
    clearSummary();
    $("booking").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- validation ---------- */
  function validate(b) {
    if (b.name.length < 2) return "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) return "Please enter a valid email address.";
    if (!/^\d{10}$/.test(b.phone)) return "Please enter a 10-digit phone number.";
    if (!b.cin || !b.cout) return "Please choose your check-in and check-out dates.";
    if (b.cin < today()) return "Check-in can't be in the past.";
    if (b.nights < 1) return "Check-out must be at least one night after check-in.";
    return "";
  }

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = !msg;
    if (msg) errorBox.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  /* ---------- modals ---------- */
  function openModal(m) {
    if (!opener) opener = document.activeElement;
    m.hidden = false;
    document.body.style.overflow = "hidden";
    var btn = m.querySelector("button");
    if (btn) btn.focus();
  }

  function hide(m) { m.hidden = true; }

  function closeModal(m) {
    hide(m);
    if (verifyModal.hidden && successModal.hidden) {
      document.body.style.overflow = "";
      if (opener && opener.focus) opener.focus();
      opener = null;
    }
  }

  /* ---------- events ---------- */
  function onChange(e) {
    if (confirmed) return;
    if (e.target === fields.phone) fields.phone.value = fields.phone.value.replace(/\D/g, "");
    if (e.target === fields.checkin) syncDates();
    if (pending && e.target !== fields.message) clearSummary();
  }
  form.addEventListener("input", onChange);
  form.addEventListener("change", onChange);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (confirmed) return;
    var b = read();
    var msg = validate(b);
    showError(msg);
    if (msg) return;
    pending = b;
    renderSummary(b);
    set("s-note", "Check your details, then press Continue to finish booking.");
    summaryBtn.disabled = false;
    if (window.matchMedia("(max-width: 960px)").matches) {
      $("s-title").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  summaryBtn.addEventListener("click", function () {
    if (confirmed) { resetAll(); return; }
    if (!pending) return;
    set("v-name", pending.name);
    fill("v", pending);
    openModal(verifyModal);
  });

  $("verify-edit").addEventListener("click", function () { closeModal(verifyModal); });

  // BACKEND CONNECT: Confirm booking click ചെയ്യുമ്പോൾ PHP-യിലേക്ക് ഡാറ്റ അയക്കുന്നു
  $("verify-confirm").addEventListener("click", async function () {
    var btn = this;
    btn.disabled = true; // രണ്ട് തവണ ക്ലിക്ക് ആകുന്നത് തടയുന്നു

    var postData = {
      fullName: pending.name,
      email: pending.email,
      phone: pending.phone,
      roomType: pending.typeValue,
      rooms: pending.rooms,
      checkin: iso(pending.cin),
      checkout: iso(pending.cout),
      message: pending.message,
      totalAmount: pending.total
    };

    try {
      // Relative path: frontend/html/ യിൽ നിന്ന് backend/save_booking.php ലേക്ക്
      var response = await fetch("../../backend/save_booking.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
      });

      var result = await response.json();

      if (result.success) {
        hide(verifyModal);
        set("booking-id", result.booking_id);
        showConfirmed(pending, result.booking_id);
        openModal(successModal);
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error("Save booking failed:", err);
      alert("Unable to save booking. Please check your connection and try again.");
    } finally {
      btn.disabled = false;
    }
  });

  $("success-close").addEventListener("click", function () { closeModal(successModal); });

  verifyModal.addEventListener("click", function (e) {
    if (e.target === verifyModal) closeModal(verifyModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !verifyModal.hidden) closeModal(verifyModal);
  });

  /* ---------- init ---------- */
  var wanted = new URLSearchParams(window.location.search).get("room");
  if (wanted) {
    for (var i = 0; i < fields.roomType.options.length; i++) {
      if (fields.roomType.options[i].value === wanted) fields.roomType.selectedIndex = i;
    }
  }
  setDefaults();
  clearSummary();
})();