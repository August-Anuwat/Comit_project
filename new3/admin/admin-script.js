/* ============================================================
   IRONFORGE Admin — admin-script.js
   Multi-page version (SPA navigate() removed)
   ============================================================
   Backend integration points:
     GET  /api/orders        → replace orders[]
     GET  /api/messages      → replace messages[]
     PUT  /api/orders/:id    body: { status }
     PUT  /api/messages/:id  body: { read: true }
============================================================ */

'use strict';

/* ================================================================
   MOCK DATA
================================================================ */
const TODAY = '2026-03-26';

const orders = [
  { id: 'ORD-1001', customer: 'James Carter',  email: 'james.carter@acme.com',       items: 'Heavy Duty Drill Driver ×2',          total: 578,  status: 'Completed',  date: '2026-03-25' },
  { id: 'ORD-1002', customer: 'Maria Lopez',   email: 'maria.l@mlbuilds.com',         items: 'Circular Saw 7-1/4"',                 total: 199,  status: 'Processing', date: '2026-03-25' },
  { id: 'ORD-1003', customer: 'Tom Nguyen',    email: 'tom@tnconstruct.com',          items: 'Concrete Mixer 9 cu.ft',              total: 1249, status: 'Pending',    date: '2026-03-26' },
  { id: 'ORD-1004', customer: 'Sandra Kim',    email: 'sandra@safeguardco.com',       items: 'Safety Helmet ×4, Safety Gloves ×4',  total: 304,  status: 'Completed',  date: '2026-03-24' },
  { id: 'ORD-1005', customer: 'Derek Walsh',   email: 'd.walsh@walsheng.com',         items: 'Impact Wrench 1/2"',                  total: 449,  status: 'Processing', date: '2026-03-26' },
  { id: 'ORD-1006', customer: 'Priya Sharma',  email: 'priya@buildco.in',             items: 'Rotary Hammer SDS+',                  total: 379,  status: 'Pending',    date: '2026-03-26' },
  { id: 'ORD-1007', customer: 'Luis Ortega',   email: 'l.ortega@ortegalabs.com',      items: 'Portland Cement ×12',                 total: 264,  status: 'Completed',  date: '2026-03-23' },
  { id: 'ORD-1008', customer: 'Fiona Bell',    email: 'fiona.bell@bell-proj.com',     items: 'Hydraulic Floor Jack 3T',             total: 189,  status: 'Pending',    date: '2026-03-26' },
  { id: 'ORD-1009', customer: 'Kevin Park',    email: 'kpark@parkconstruction.us',    items: 'Angle Grinder 4-1/2" ×3',            total: 387,  status: 'Completed',  date: '2026-03-22' },
  { id: 'ORD-1010', customer: 'Rachel Adams',  email: 'r.adams@adamsbuild.io',        items: 'Spirit Level 48" ×2',                 total: 134,  status: 'Processing', date: '2026-03-25' },
];

const messages = [
  {
    id: 1, from: 'James Carter', email: 'james.carter@acme.com',
    subject: 'Bulk Pricing', date: '2026-03-26', read: false,
    body: 'Hi, we\'re looking to order 50+ units of the Heavy Duty Drill Driver for a large commercial site in Portland. Could you provide a quote for bulk pricing, volume discounts, and estimated delivery lead times? We\'d also like to know if on-site delivery to the job site is available.'
  },
  {
    id: 2, from: 'Priya Sharma', email: 'priya@buildco.in',
    subject: 'Product Inquiry', date: '2026-03-26', read: false,
    body: 'Could you confirm whether the Rotary Hammer SDS+ (Bosch) is compatible with SDS Max chisels? We need it for breaking reinforced concrete columns on a commercial project. Also, is there a rental option available for heavy machinery?'
  },
  {
    id: 3, from: 'Tom Nguyen', email: 'tom@tnconstruct.com',
    subject: 'Delivery Question', date: '2026-03-25', read: false,
    body: 'My order ORD-1003 (Concrete Mixer 9 cu.ft) is showing Pending status on your website. Could you confirm whether next-day delivery is available to the Portland metro area? We have a pour scheduled for Monday morning and need the mixer on-site by Sunday afternoon.'
  },
  {
    id: 4, from: 'Sandra Kim', email: 'sandra@safeguardco.com',
    subject: 'Technical Support', date: '2026-03-24', read: true,
    body: 'Two of the Safety Helmets from order ORD-1004 arrived with cracked brims — looks like a packaging issue during transit. Please advise on the return and replacement process. I\'ve attached photos to this email. We need replacements urgently as our site safety audit is next week.'
  },
  {
    id: 5, from: 'Luis Ortega', email: 'l.ortega@ortegalabs.com',
    subject: 'Product Inquiry', date: '2026-03-23', read: true,
    body: 'Do you carry Type III Portland cement, or only Type I/II? We have a coastal infrastructure project that requires high sulfate resistance and are trying to avoid using admixtures. If Type III isn\'t available, which of your current cement products would you recommend as an alternative?'
  },
  {
    id: 6, from: 'Maria Lopez', email: 'maria.l@mlbuilds.com',
    subject: 'Other', date: '2026-03-22', read: true,
    body: 'I\'d like to open a trade account for ongoing orders from ML Builds LLC. What are the requirements and credit terms? We typically run 3–5 orders per month with an average order value around $800. Do you offer a loyalty discount or contractor rate after a certain volume threshold?'
  },
];

/* ================================================================
   STATE
================================================================ */
let activeOrderId = null;  // ID of order open in modal
let pendingStatus = null;  // Selected status in order modal

/* ================================================================
   HELPERS
================================================================ */
const fmt = n => '$' + n.toLocaleString('en-US');

const statusBadge = status => {
  const map = { Pending: 'badge-pending', Processing: 'badge-processing', Completed: 'badge-completed' };
  return `<span class="badge ${map[status] || ''}">${status}</span>`;
};

const initials = name =>
  name.split(' ').slice(0, 2).map(w => w[0].toUpperCase()).join('');

const escHtml = str =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* ================================================================
   SIDEBAR COLLAPSE
================================================================ */
function toggleSidebar() {
  document.getElementById('shell').classList.toggle('collapsed');
}

/* ================================================================
   SHARED: update notification badge & dot (runs on every page)
================================================================ */
function updateNotifState() {
  const unreadCount = messages.filter(m => !m.read).length;

  const badge = document.getElementById('sidebarBadge');
  if (badge) {
    badge.textContent = unreadCount || '';
    badge.style.display = unreadCount ? 'inline-flex' : 'none';
  }

  const dot = document.getElementById('notifDot');
  if (dot) dot.style.display = unreadCount ? 'block' : 'none';
}

/* ================================================================
   RENDER: DASHBOARD (dashboard.html)
================================================================ */
function renderDashboard() {
  const todayOrders  = orders.filter(o => o.date === TODAY);
  const unreadMsgs   = messages.filter(m => !m.read);
  const completedRev = orders.filter(o => o.status === 'Completed').reduce((s, o) => s + o.total, 0);
  const pendingRev   = orders.filter(o => o.status === 'Pending').reduce((s, o) => s + o.total, 0);

  document.getElementById('statOrdersToday').textContent = todayOrders.length;
  document.getElementById('statOrdersAll').textContent   = `${orders.length} total`;
  document.getElementById('statMsgsUnread').textContent  = unreadMsgs.length;
  document.getElementById('statMsgsAll').textContent     = `${messages.length} total`;
  document.getElementById('statRevenue').textContent     = fmt(completedRev);
  document.getElementById('statPending').textContent     = fmt(pendingRev);

  // Live date
  const d = new Date();
  document.getElementById('dashDate').textContent =
    d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Recent orders — latest 5
  const recent = [...orders].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  document.getElementById('dashRecentBody').innerHTML = recent.map(o => `
    <tr>
      <td class="cell-mono">${escHtml(o.id)}</td>
      <td class="cell-bold">${escHtml(o.customer)}</td>
      <td class="cell-bold">${fmt(o.total)}</td>
      <td>${statusBadge(o.status)}</td>
    </tr>`).join('');

  // Unread message preview panel
  const unread    = messages.filter(m => !m.read).slice(0, 5);
  const previewEl = document.getElementById('dashMsgPreview');

  if (!unread.length) {
    previewEl.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <p>All messages read — inbox clear</p>
      </div>`;
    return;
  }

  previewEl.innerHTML = unread.map(m => `
    <div class="msg-preview-item unread" onclick="openMessage(${m.id})">
      <div class="msg-avatar">${initials(m.from)}</div>
      <div class="msg-preview-body">
        <div class="msg-preview-from">${escHtml(m.from)}</div>
        <div class="msg-preview-subject">${escHtml(m.subject)}</div>
      </div>
      <div class="msg-preview-meta">
        <span class="msg-preview-date">${m.date}</span>
        <span class="unread-dot"></span>
      </div>
    </div>`).join('');
}

/* ================================================================
   RENDER: ORDERS TABLE (orders.html)
================================================================ */
function renderOrders() {
  const search = (document.getElementById('orderSearch')?.value || '').toLowerCase();
  const filter = document.getElementById('orderStatusFilter')?.value || '';

  const list = orders.filter(o => {
    const matchSearch = !search ||
      o.id.toLowerCase().includes(search) ||
      o.customer.toLowerCase().includes(search) ||
      o.items.toLowerCase().includes(search);
    const matchStatus = !filter || o.status === filter;
    return matchSearch && matchStatus;
  });

  document.getElementById('ordersCountLabel').textContent =
    `Showing ${list.length} of ${orders.length} orders`;

  const tbody = document.getElementById('ordersBody');
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="7">
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <p>No orders match your filters.</p>
      </div></td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(o => `
    <tr>
      <td class="cell-mono">${escHtml(o.id)}</td>
      <td>
        <div class="cell-bold">${escHtml(o.customer)}</div>
        <div class="cell-muted">${escHtml(o.email)}</div>
      </td>
      <td class="cell-muted">${escHtml(o.items)}</td>
      <td class="cell-bold">${fmt(o.total)}</td>
      <td>${statusBadge(o.status)}</td>
      <td class="cell-muted">${o.date}</td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn btn-ghost" onclick="openOrder('${escHtml(o.id)}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            View
          </button>
          <button class="btn btn-ghost" onclick="openOrder('${escHtml(o.id)}')">Edit</button>
        </div>
      </td>
    </tr>`).join('');
}

/* ================================================================
   RENDER: MESSAGES TABLE (messages.html)
================================================================ */
function renderMessages() {
  const search = (document.getElementById('msgSearch')?.value || '').toLowerCase();
  const filter = document.getElementById('msgReadFilter')?.value || '';

  const list = messages.filter(m => {
    const matchSearch = !search ||
      m.from.toLowerCase().includes(search) ||
      m.email.toLowerCase().includes(search) ||
      m.subject.toLowerCase().includes(search);
    const matchRead =
      filter === 'unread' ? !m.read :
      filter === 'read'   ?  m.read : true;
    return matchSearch && matchRead;
  });

  const unreadCount = messages.filter(m => !m.read).length;
  document.getElementById('msgsCountLabel').textContent =
    `${list.length} message${list.length !== 1 ? 's' : ''} · ${unreadCount} unread`;

  updateNotifState();

  const tbody = document.getElementById('messagesBody');
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6">
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
        <p>No messages found.</p>
      </div></td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(m => `
    <tr class="${m.read ? '' : 'row-unread'}">
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="msg-avatar" style="width:28px;height:28px;font-size:11px;flex-shrink:0">${initials(m.from)}</div>
          <span class="sender-name" style="font-size:13px">${escHtml(m.from)}</span>
        </div>
      </td>
      <td class="cell-muted">${escHtml(m.email)}</td>
      <td style="font-weight:${m.read ? 400 : 600}">${escHtml(m.subject)}</td>
      <td class="cell-mono" style="font-size:11.5px">${m.date}</td>
      <td><span class="badge ${m.read ? 'badge-read' : 'badge-unread'}">${m.read ? 'Read' : 'Unread'}</span></td>
      <td>
        <button class="btn btn-ghost" onclick="openMessage(${m.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Open
        </button>
      </td>
    </tr>`).join('');
}

/* ================================================================
   ORDER MODAL
================================================================ */
function openOrder(orderId) {
  const o = orders.find(x => x.id === orderId);
  if (!o) return;

  activeOrderId = orderId;
  pendingStatus = o.status;

  document.getElementById('orderModalTitle').textContent = orderId;
  document.getElementById('orderModalSub').textContent   = `Placed on ${o.date} · ${o.customer}`;

  document.getElementById('orderModalBody').innerHTML = `
    <div class="detail-grid">
      <div class="detail-item">
        <div class="detail-key">Customer</div>
        <div class="detail-val">${escHtml(o.customer)}</div>
      </div>
      <div class="detail-item">
        <div class="detail-key">Email</div>
        <div class="detail-val" style="font-size:12.5px">${escHtml(o.email)}</div>
      </div>
      <div class="detail-item detail-full">
        <div class="detail-key">Items Ordered</div>
        <div class="detail-val">${escHtml(o.items)}</div>
      </div>
      <div class="detail-item">
        <div class="detail-key">Order Total</div>
        <div class="detail-val" style="font-size:20px;font-family:var(--font-display);color:var(--green)">${fmt(o.total)}</div>
      </div>
      <div class="detail-item">
        <div class="detail-key">Order Date</div>
        <div class="detail-val">${o.date}</div>
      </div>
      <div class="detail-item detail-full" style="margin-top:4px">
        <div class="detail-key">Update Status</div>
        <div class="status-selector" id="statusSelector">
          ${['Pending', 'Processing', 'Completed'].map(s => `
            <div class="status-opt ${o.status === s ? 'sel-' + s.toLowerCase() : ''}"
                 onclick="selectStatus('${s}', this)">${s}</div>
          `).join('')}
        </div>
      </div>
    </div>`;

  openModal('orderModal');
}

function selectStatus(status, el) {
  pendingStatus = status;
  document.querySelectorAll('#statusSelector .status-opt').forEach(opt => {
    opt.className = 'status-opt';
  });
  el.classList.add('sel-' + status.toLowerCase());
}

function saveOrderStatus() {
  if (!activeOrderId || !pendingStatus) return;
  const o = orders.find(x => x.id === activeOrderId);
  if (!o) return;

  o.status = pendingStatus;

  // Optimistic UI — replace with: PUT /api/orders/:id  body: { status: pendingStatus }
  if (typeof renderOrders === 'function')   renderOrders();
  if (typeof renderDashboard === 'function') renderDashboard();

  closeModal('orderModal');
  showToast(`${activeOrderId} status updated to ${pendingStatus}.`, 'success');

  activeOrderId = null;
  pendingStatus = null;
}

/* ================================================================
   MESSAGE MODAL
================================================================ */
function openMessage(msgId) {
  const m = messages.find(x => x.id === msgId);
  if (!m) return;

  // Mark as read — replace with: PUT /api/messages/:id  body: { read: true }
  if (!m.read) {
    m.read = true;
    if (typeof renderMessages  === 'function') renderMessages();
    if (typeof renderDashboard === 'function') renderDashboard();
  }

  document.getElementById('msgModalTitle').textContent = escHtml(m.subject);
  document.getElementById('msgModalSub').textContent   = `From ${m.from} · ${m.date}`;

  document.getElementById('msgModalBody').innerHTML = `
    <div class="msg-meta-row">
      <span class="msg-meta-label">From</span>
      <span class="msg-meta-val">${escHtml(m.from)}</span>
    </div>
    <div class="msg-meta-row">
      <span class="msg-meta-label">Email</span>
      <span class="msg-meta-val" style="font-weight:400;color:var(--text-secondary)">${escHtml(m.email)}</span>
    </div>
    <div class="msg-meta-row">
      <span class="msg-meta-label">Subject</span>
      <span class="msg-meta-val">${escHtml(m.subject)}</span>
    </div>
    <div class="msg-meta-row">
      <span class="msg-meta-label">Date</span>
      <span class="msg-meta-val" style="font-weight:400;font-family:var(--font-mono);font-size:12px">${m.date}</span>
    </div>
    <div class="msg-body-wrap" style="margin-top:14px">${escHtml(m.body)}</div>`;

  openModal('msgModal');
}

/* ================================================================
   MODAL OPEN / CLOSE
================================================================ */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

// Close on overlay background click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});

/* ================================================================
   TOAST NOTIFICATIONS
================================================================ */
function showToast(msg, type = 'info') {
  const tc = document.getElementById('toastContainer');
  const t  = document.createElement('div');
  t.className = `toast toast-${type}`;

  const icons = {
    success: '<polyline points="20 6 9 17 4 12"/>',
    error:   '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    info:    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  };

  t.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      ${icons[type] || icons.info}
    </svg>
    ${escHtml(msg)}`;

  tc.appendChild(t);
  setTimeout(() => {
    t.style.animation  = 'none';
    t.style.opacity    = '0';
    t.style.transform  = 'translateX(20px)';
    t.style.transition = 'all 0.25s ease';
    setTimeout(() => t.remove(), 260);
  }, 3500);
}

/* ================================================================
   INITIALISE — auto-detect which page is loaded and run the
   appropriate render function(s).
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Always update the notification indicator on every page
  updateNotifState();

  // Page-specific initialisation based on which elements exist in the DOM
  if (document.getElementById('dashRecentBody'))  renderDashboard();
  if (document.getElementById('ordersBody'))       renderOrders();
  if (document.getElementById('messagesBody'))     renderMessages();
});
