document.addEventListener("DOMContentLoaded", function () {
  let bookings = [];

  const tableBody = document.getElementById("booking-table-body");
  const noDataMsg = document.getElementById("no-data-msg");
  const searchInput = document.getElementById("search-input");
  const filterRoom = document.getElementById("filter-room");
  
  const modal = document.getElementById("details-modal");
  const modalClose = document.getElementById("modal-close");

  // Sidebar Toggle (Mobile)
  const menuBtn = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
  }

  // Calculate & Display Stats
  function updateStats(data) {
    const totalBookings = data.length;
    const totalRooms = data.reduce((sum, item) => sum + Number(item.rooms), 0);
    const totalRevenue = data.reduce((sum, item) => sum + Number(item.total), 0);

    document.getElementById("stat-total-bookings").textContent = totalBookings;
    document.getElementById("stat-total-rooms").textContent = totalRooms;
    document.getElementById("stat-total-revenue").textContent = "₹" + totalRevenue.toLocaleString("en-IN");
  }

  // Render Table Rows
  function renderTable(data) {
    tableBody.innerHTML = "";
    
    if (data.length === 0) {
      noDataMsg.hidden = false;
      return;
    }
    noDataMsg.hidden = true;

    data.forEach((b) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span class="badge-id">${b.id}</span></td>
        <td><strong>${b.name}</strong></td>
        <td>${b.phone}</td>
        <td>${b.roomTypeName}</td>
        <td>${b.checkin} to ${b.checkout}</td>
        <td><strong>₹${b.total.toLocaleString("en-IN")}</strong></td>
        <td><button class="btn-view" data-id="${b.id}">View</button></td>
      `;
      tableBody.appendChild(tr);
    });

    // Attach View Button Click Events
    document.querySelectorAll(".btn-view").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        const item = bookings.find((x) => x.id === id);
        if (item) openModal(item);
      });
    });
  }

  // Filter & Search Handler
  function filterData() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedRoom = filterRoom.value;

    const filtered = bookings.filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(query) ||
        b.id.toLowerCase().includes(query) ||
        b.phone.includes(query) ||
        b.email.toLowerCase().includes(query);

      const matchesRoom = selectedRoom === "all" || b.roomType === selectedRoom;

      return matchesSearch && matchesRoom;
    });

    renderTable(filtered);
  }

  searchInput.addEventListener("input", filterData);
  filterRoom.addEventListener("change", filterData);

  // Modal Control
  function openModal(b) {
    document.getElementById("m-id").textContent = b.id;
    document.getElementById("m-name").textContent = b.name;
    document.getElementById("m-email").textContent = b.email;
    document.getElementById("m-phone").textContent = b.phone;
    document.getElementById("m-room").textContent = b.roomTypeName;
    document.getElementById("m-rooms").textContent = b.rooms;
    document.getElementById("m-checkin").textContent = b.checkin;
    document.getElementById("m-checkout").textContent = b.checkout;
    document.getElementById("m-total").textContent = "₹" + b.total.toLocaleString("en-IN");
    document.getElementById("m-message").textContent = b.message || "None";
    document.getElementById("m-created").textContent = b.createdAt;

    modal.hidden = false;
  }

  modalClose.addEventListener("click", () => (modal.hidden = true));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.hidden = true;
  });

  // BACKEND FETCH DATA
  async function fetchBookings() {
    try {
      const response = await fetch("../../backend/get_bookings.php");
      const result = await response.json();

      if (result.success) {
        bookings = result.data;
        updateStats(bookings);
        renderTable(bookings);
      } else {
        alert("Failed to fetch bookings: " + result.message);
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  }

  // Init
  fetchBookings();
});