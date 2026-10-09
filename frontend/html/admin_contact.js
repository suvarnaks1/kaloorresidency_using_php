/* ==========================================================
   Kaloor Residency – Contact Messages admin
   ========================================================== */

// ---------- 1. DATA SOURCE ----------
// backend/get_contacts.php എന്ന എൻഡ്‌പോയിന്റിലേക്ക് ലൊക്കേഷൻ മാറ്റിയിരിക്കുന്നു
const API_URL = '../../backend/get_contacts.php';

async function loadMessages() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to load messages (' + res.status + ')');
  
  const result = await res.json();
  
  if (result.success) {
    // PHP response-ൽ നിന്നുള്ള field name-കൾ JS Structure-ലേക്ക് മാപ്പ ചെയ്യുന്നു
    return result.data.map(m => ({
      id: '#' + m.id,
      fullName: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      createdAt: m.createdAt
    }));
  } else {
    throw new Error(result.message || 'Database error occurred');
  }
}

// ---------- 2. HELPERS ----------
const $ = (id) => document.getElementById(id);

function esc(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function fmtDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d)) return '—';
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ---------- 3. STATE + RENDER ----------
let allMessages = [];

function updateStats() {
  const weekAgo = Date.now() - 7 * 24 * 3600e3;
  $('stat-total').textContent = allMessages.length;
  $('stat-week').textContent = allMessages.filter((m) => new Date(m.createdAt).getTime() >= weekAgo).length;
  $('stat-senders').textContent = new Set(allMessages.map((m) => (m.email || '').toLowerCase())).size;
}

function getVisible() {
  const q = $('search-input').value.trim().toLowerCase();
  const order = $('sort-order').value;

  let list = allMessages.filter((m) =>
    !q || [m.id, m.fullName, m.email, m.subject, m.message].some((f) => String(f || '').toLowerCase().includes(q))
  );

  list.sort((a, b) => {
    const diff = new Date(a.createdAt) - new Date(b.createdAt);
    return order === 'newest' ? -diff : diff;
  });
  return list;
}

function render() {
  const list = getVisible();
  const body = $('contact-table-body');

  body.innerHTML = list.map((m) => `
    <tr>
      <td><span class="badge-id">${esc(m.id)}</span></td>
      <td>${esc(m.fullName)}</td>
      <td>${esc(m.email)}</td>
      <td>${esc(m.subject)}</td>
      <td>${fmtDate(m.createdAt)}</td>
      <td><button class="btn-action view-btn btn-view" data-id="${esc(m.id)}">View</button></td>
    </tr>
  `).join('');

  $('no-data-msg').hidden = list.length > 0;
}

// ---------- 4. MODAL ----------
function openModal(id) {
  const m = allMessages.find((x) => String(x.id) === String(id));
  if (!m) return;

  $('m-id').textContent = m.id;
  $('m-name').textContent = m.fullName;
  $('m-email').textContent = m.email;
  $('m-subject').textContent = m.subject;
  $('m-created').textContent = fmtDateTime(m.createdAt);$('m-message').textContent = m.message;
  $('m-reply').href = 'mailto:' + encodeURIComponent(m.email || '') +
    '?subject=' + encodeURIComponent('Re: ' + (m.subject || ''));

  $('details-modal').hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('details-modal').hidden = true;
  document.body.style.overflow = '';
}

// ---------- 5. EVENTS ----------
$('search-input').addEventListener('input', render);$('sort-order').addEventListener('change', render);

$('contact-table-body').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-view');
  if (btn) openModal(btn.dataset.id);
});

$('modal-close').addEventListener('click', closeModal);$('details-modal').addEventListener('click', (e) => { if (e.target.id === 'details-modal') closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Sidebar (mobile)
const sidebar = $('sidebar');
if ($('menu-toggle')) {$('menu-toggle').addEventListener('click', () => sidebar.classList.toggle('open'));
}
if ($('sidebar-backdrop')) {$('sidebar-backdrop').addEventListener('click', () => sidebar.classList.remove('open'));
}
sidebar.addEventListener('click', (e) => { if (e.target.closest('.nav-link')) sidebar.classList.remove('open'); });

// ---------- 6. INIT ----------
loadMessages()
  .then((data) => { allMessages = Array.isArray(data) ? data : []; updateStats(); render(); })
  .catch((err) => {
    console.error(err);
    $('no-data-msg').textContent = 'Could not load messages. Please try again.';
    $('no-data-msg').hidden = false;
  });