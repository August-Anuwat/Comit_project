/* ============================================================
   NEXUS WMS — script.js
   Warehouse Management System — Vanilla JS
   ============================================================
   Backend integration points:
     GET  /api/shipments          → shipments[]
     GET  /api/inventory          → inventory[]
     GET  /api/alerts             → alerts[]
     PUT  /api/shipments/:id      body: { status }
     PUT  /api/alerts/:id         body: { acknowledged: true }
============================================================ */

'use strict';

/* ================================================================
   MOCK DATA
================================================================ */

const shipments = [
  { id: 'SHP-8801', type: 'Inbound',  carrier: 'FedEx Freight',  origin: 'Chicago, IL',      dest: 'Warehouse A',     status: 'Transit',    eta: '2026-03-27', weight: '1,240 kg', pallets: 8  },
  { id: 'SHP-8802', type: 'Outbound', carrier: 'UPS Supply Chain',origin: 'Warehouse B',       dest: 'Dallas, TX',      status: 'Processing', eta: '2026-03-28', weight: '780 kg',   pallets: 5  },
  { id: 'SHP-8803', type: 'Inbound',  carrier: 'XPO Logistics',  origin: 'Seattle, WA',       dest: 'Warehouse A',     status: 'Delivered',  eta: '2026-03-25', weight: '2,100 kg', pallets: 14 },
  { id: 'SHP-8804', type: 'Outbound', carrier: 'Estes Express',  origin: 'Warehouse A',       dest: 'Miami, FL',       status: 'Delayed',    eta: '2026-03-26', weight: '450 kg',   pallets: 3  },
  { id: 'SHP-8805', type: 'Inbound',  carrier: 'Old Dominion',   origin: 'Portland, OR',      dest: 'Warehouse C',     status: 'Transit',    eta: '2026-03-29', weight: '3,600 kg', pallets: 22 },
  { id: 'SHP-8806', type: 'Outbound', carrier: 'FedEx Freight',  origin: 'Warehouse C',       dest: 'Boston, MA',      status: 'Delivered',  eta: '2026-03-24', weight: '920 kg',   pallets: 6  },
  { id: 'SHP-8807', type: 'Inbound',  carrier: 'ABF Freight',    origin: 'Houston, TX',       dest: 'Warehouse B',     status: 'Processing', eta: '2026-03-30', weight: '1,850 kg', pallets: 12 },
  { id: 'SHP-8808', type: 'Outbound', carrier: 'UPS Supply Chain',origin: 'Warehouse A',       dest: 'Phoenix, AZ',     status: 'Transit',    eta: '2026-03-28', weight: '640 kg',   pallets: 4  },
  { id: 'SHP-8809', type: 'Inbound',  carrier: 'XPO Logistics',  origin: 'Atlanta, GA',       dest: 'Warehouse B',     status: 'Delayed',    eta: '2026-03-26', weight: '2,800 kg', pallets: 18 },
  { id: 'SHP-8810', type: 'Outbound', carrier: 'Old Dominion',   origin: 'Warehouse C',       dest: 'Denver, CO',      status: 'Delivered',  eta: '2026-03-25', weight: '1,100 kg', pallets: 7  },
];

const inventory = [
  { sku: 'SKU-1042', name: 'Heavy Duty Drill Driver',   qty: 234, reorder: 50,  bin: 'A-12-03', warehouse: 'WH-A', status: 'ok' },
  { sku: 'SKU-1043', name: 'Impact Wrench 1/2"',        qty: 18,  reorder: 30,  bin: 'A-12-04', warehouse: 'WH-A', status: 'low' },
  { sku: 'SKU-1044', name: 'Circular Saw 7-1/4"',       qty: 95,  reorder: 20,  bin: 'B-03-11', warehouse: 'WH-B', status: 'ok' },
  { sku: 'SKU-1045', name: 'Rotary Hammer SDS+',        qty: 7,   reorder: 25,  bin: 'B-03-12', warehouse: 'WH-B', status: 'critical' },
  { sku: 'SKU-1046', name: 'Tape Measure Pro 25ft',     qty: 580, reorder: 100, bin: 'C-01-02', warehouse: 'WH-C', status: 'overstock' },
  { sku: 'SKU-1047', name: 'Safety Helmet Class E',     qty: 144, reorder: 60,  bin: 'A-08-05', warehouse: 'WH-A', status: 'ok' },
  { sku: 'SKU-1048', name: 'Concrete Mixer 9 cu.ft',    qty: 12,  reorder: 10,  bin: 'C-05-01', warehouse: 'WH-C', status: 'ok' },
  { sku: 'SKU-1049', name: 'Angle Grinder 4-1/2"',      qty: 22,  reorder: 30,  bin: 'B-07-08', warehouse: 'WH-B', status: 'low' },
  { sku: 'SKU-1050', name: 'Hydraulic Floor Jack 3T',   qty: 3,   reorder: 15,  bin: 'A-14-01', warehouse: 'WH-A', status: 'critical' },
  { sku: 'SKU-1051', name: 'Safety Gloves Cut-5',       qty: 312, reorder: 100, bin: 'C-02-07', warehouse: 'WH-C', status: 'ok' },
  { sku: 'SKU-1052', name: 'Portland Cement 50kg',      qty: 440, reorder: 200, bin: 'B-11-03', warehouse: 'WH-B', status: 'ok' },
  { sku: 'SKU-1053', name: 'Spirit Level 48"',          qty: 61,  reorder: 40,  bin: 'A-06-09', warehouse: 'WH-A', status: 'ok' },
];

const alerts = [
  { id: 1, severity: 'critical', title: 'Critical Stock: SKU-1050 — Hydraulic Floor Jack', detail: 'WH-A · Bin A-14-01 · 3 units remaining (reorder: 15)', time: '09:14', read: false },
  { id: 2, severity: 'critical', title: 'Critical Stock: SKU-1045 — Rotary Hammer SDS+',  detail: 'WH-B · Bin B-03-12 · 7 units remaining (reorder: 25)', time: '09:02', read: false },
  { id: 3, severity: 'warning',  title: 'Shipment SHP-8804 Delayed — Estes Express',       detail: 'Outbound to Miami, FL · ETA revised to 2026-03-28',     time: '08:47', read: false },
  { id: 4, severity: 'warning',  title: 'Dock Conflict: Bay 3 double-booked 14:00–16:00', detail: 'SHP-8801 (Inbound FedEx) vs SHP-8808 (Outbound UPS)',    time: '08:30', read: false },
  { id: 5, severity: 'warning',  title: 'Low Stock: SKU-1043 — Impact Wrench 1/2"',        detail: 'WH-A · 18 units remaining (reorder point: 30)',          time: '07:55', read: true  },
  { id: 6, severity: 'info',     title: 'Inbound SHP-8803 Delivered — XPO Logistics',      detail: '2,100 kg · 14 pallets received at WH-A',                time: '07:12', read: true  },
];

/* Shipment detail timeline (mock) */
const shipmentTimeline = {
  'SHP-8801': [
    { label: 'Order Created',    time: '2026-03-24 10:30', done: true,  active: false },
    { label: 'Picked Up',        time: '2026-03-25 07:00', done: true,  active: false },
    { label: 'In Transit',       time: '2026-03-26 14:22', done: false, active: true  },
    { label: 'Out for Delivery', time: 'ETA 2026-03-27',   done: false, active: false },
    { label: 'Delivered',        time: '—',                 done: false, active: false },
  ],
};

/* ================================================================
   STATE
================================================================ */
let activeShipmentId = null;
let pendingShipStatus = null;

/* ================================================================
   HELPERS
================================================================ */
const escHtml = str =>
  String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const statusBadge = status => {
  const map = {
    Inbound:    'badge-inbound',
    Outbound:   'badge-outbound',
    Transit:    'badge-transit',
    Delivered:  'badge-delivered',
    Delayed:    'badge-delayed',
    Processing: 'badge-processing',
  };
  return `<span class="badge ${map[status] || 'badge-processing'}">${status}</span>`;
};

const typeBadge = type => {
  const cls = type === 'Inbound' ? 'badge-inbound' : 'badge-outbound';
  return `<span class="badge ${cls}">${type}</span>`;
};

const severityIconPath = sev => {
  if (sev === 'critical') return '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>';
  if (sev === 'warning')  return '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>';
  return '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>';
};

const stockBarClass = status => {
  if (status === 'critical') return 'crit';
  if (status === 'low')      return 'low';
  return 'ok';
};

const stockPct = (qty, reorder) => {
  if (qty === 0) return 0;
  const pct = Math.round((qty / Math.max(reorder * 4, qty)) * 100);
  return Math.min(pct, 100);
};

const invBadgeClass = status => ({
  ok:        'badge-ok',
  low:       'badge-low',
  critical:  'badge-critical-stock',
  overstock: 'badge-overstock',
}[status] || 'badge-ok');

const invBadgeLabel = status => ({
  ok:        'In Stock',
  low:       'Low Stock',
  critical:  'Critical',
  overstock: 'Overstock',
}[status] || status);

/* ================================================================
   SIDEBAR COLLAPSE
================================================================ */
function toggleSidebar() {
  document.getElementById('shell').classList.toggle('collapsed');
}

/* ================================================================
   SHARED: update notification badge & dot
================================================================ */
function updateNotifState() {
  const unread = alerts.filter(a => !a.read).length;
  const badge = document.getElementById('sidebarBadge');
  if (badge) {
    badge.textContent = unread || '';
    badge.style.display = unread ? 'inline-flex' : 'none';
  }
  const dot = document.getElementById('notifDot');
  if (dot) dot.style.display = unread ? 'block' : 'none';
}

/* ================================================================
   RENDER: DASHBOARD  (index.html)
================================================================ */
function renderDashboard() {
  const today     = '2026-03-26';
  const todayShip = shipments.filter(s => s.eta === today || s.status === 'Processing');
  const inbound   = todayShip.filter(s => s.type === 'Inbound').length;
  const outbound  = todayShip.filter(s => s.type === 'Outbound').length;
  const unreadAlerts = alerts.filter(a => !a.read).length;

  // Capacity mock
  const capacityPct = 73;

  const el = id => document.getElementById(id);
  if (el('statShipmentsToday')) el('statShipmentsToday').textContent = todayShip.length;
  if (el('statShipIn'))         el('statShipIn').textContent  = inbound;
  if (el('statShipOut'))        el('statShipOut').textContent = outbound;
  if (el('statActiveAlerts'))   el('statActiveAlerts').textContent = unreadAlerts;
  if (el('statAlertsTotal'))    el('statAlertsTotal').textContent  = alerts.length;
  if (el('statCapacityPct'))    el('statCapacityPct').textContent  = capacityPct + '%';
  if (el('statCapacityFill')) {
    const fill = el('statCapacityFill');
    fill.style.width = capacityPct + '%';
    fill.className = 'capacity-bar-fill' + (capacityPct >= 90 ? ' crit' : capacityPct >= 75 ? ' warn' : '');
  }

  // Live date
  const d = new Date();
  if (el('dashDate')) {
    el('dashDate').textContent =
      d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Recent shipments (latest 5)
  const recent = [...shipments].slice(0, 5);
  const tbody = el('dashShipBody');
  if (tbody) {
    tbody.innerHTML = recent.map(s => `
      <tr>
        <td class="cell-mono">${escHtml(s.id)}</td>
        <td>${typeBadge(s.type)}</td>
        <td class="cell-muted">${escHtml(s.carrier)}</td>
        <td>${statusBadge(s.status)}</td>
      </tr>`).join('');
  }

  // System alerts panel
  const alertPanel = el('dashAlertList');
  if (alertPanel) {
    const topAlerts = alerts.slice(0, 6);
    alertPanel.innerHTML = topAlerts.map(a => `
      <div class="alert-item ${a.read ? '' : 'unread'}" onclick="openAlert(${a.id})">
        <div class="alert-icon alert-icon--${a.severity}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            ${severityIconPath(a.severity)}
          </svg>
        </div>
        <div class="alert-body">
          <div class="alert-title">${escHtml(a.title)}</div>
          <div class="alert-meta">${escHtml(a.detail)}</div>
        </div>
        <div class="alert-time">${a.time}</div>
      </div>`).join('');
  }
}

/* ================================================================
   RENDER: SHIPMENTS TABLE  (shipments.html)
================================================================ */
function renderShipments() {
  const search = (document.getElementById('shipSearch')?.value || '').toLowerCase();
  const status = document.getElementById('shipStatusFilter')?.value || '';
  const type   = document.getElementById('shipTypeFilter')?.value   || '';
  const carrier = document.getElementById('shipCarrierFilter')?.value || '';

  const list = shipments.filter(s => {
    const matchSearch  = !search  || s.id.toLowerCase().includes(search) || s.carrier.toLowerCase().includes(search) || s.dest.toLowerCase().includes(search);
    const matchStatus  = !status  || s.status  === status;
    const matchType    = !type    || s.type    === type;
    const matchCarrier = !carrier || s.carrier === carrier;
    return matchSearch && matchStatus && matchType && matchCarrier;
  });

  const label = document.getElementById('shipCountLabel');
  if (label) label.textContent = `Showing ${list.length} of ${shipments.length} shipments`;

  const tbody = document.getElementById('shipmentsBody');
  if (!tbody) return;

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="8">
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <p>No shipments match your filters.</p>
      </div></td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(s => `
    <tr>
      <td class="cell-mono">${escHtml(s.id)}</td>
      <td>${typeBadge(s.type)}</td>
      <td class="cell-bold">${escHtml(s.carrier)}</td>
      <td class="cell-muted">${escHtml(s.origin)}</td>
      <td class="cell-muted">${escHtml(s.dest)}</td>
      <td class="cell-mono" style="font-size:11px">${s.eta}</td>
      <td>${statusBadge(s.status)}</td>
      <td>
        <button class="btn btn-ghost" onclick="openShipment('${escHtml(s.id)}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:11px;height:11px">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          View
        </button>
      </td>
    </tr>`).join('');
}

/* ================================================================
   RENDER: INVENTORY  (inventory.html)
================================================================ */
function renderInventory() {
  const search = (document.getElementById('invSearch')?.value || '').toLowerCase();
  const wh     = document.getElementById('invWhFilter')?.value || '';
  const status = document.getElementById('invStatusFilter')?.value || '';

  const list = inventory.filter(i => {
    const matchSearch = !search || i.sku.toLowerCase().includes(search) || i.name.toLowerCase().includes(search) || i.bin.toLowerCase().includes(search);
    const matchWh     = !wh     || i.warehouse === wh;
    const matchStatus = !status || i.status    === status;
    return matchSearch && matchWh && matchStatus;
  });

  const label = document.getElementById('invCountLabel');
  if (label) label.textContent = `${list.length} of ${inventory.length} SKUs`;

  // Table render
  const tbody = document.getElementById('inventoryBody');
  if (tbody) {
    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="7">
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
          </svg>
          <p>No inventory items match your filters.</p>
        </div></td></tr>`;
      return;
    }
    tbody.innerHTML = list.map(i => {
      const pct = stockPct(i.qty, i.reorder);
      return `
      <tr>
        <td class="cell-mono">${escHtml(i.sku)}</td>
        <td class="cell-bold">${escHtml(i.name)}</td>
        <td>
          <div style="font-family:var(--font-display);font-size:18px;font-weight:700;line-height:1">${i.qty}</div>
          <div class="stock-bar-wrap">
            <div class="stock-bar-track">
              <div class="stock-bar-fill ${stockBarClass(i.status)}" style="width:${pct}%"></div>
            </div>
            <span class="stock-bar-label">${pct}%</span>
          </div>
        </td>
        <td class="cell-mono">${i.reorder}</td>
        <td class="cell-mono">${escHtml(i.bin)}</td>
        <td class="cell-muted">${i.warehouse}</td>
        <td><span class="badge ${invBadgeClass(i.status)}">${invBadgeLabel(i.status)}</span></td>
      </tr>`;
    }).join('');
  }

  // Card grid (if exists)
  const grid = document.getElementById('inventoryGrid');
  if (grid) {
    grid.innerHTML = list.map((i, idx) => {
      const pct = stockPct(i.qty, i.reorder);
      return `
      <div class="inv-card" style="animation-delay:${idx * 0.03}s">
        <div class="inv-card-sku">${escHtml(i.sku)}</div>
        <div class="inv-card-name">${escHtml(i.name)}</div>
        <div class="inv-card-meta">
          <div class="inv-card-qty">${i.qty}</div>
          <div class="inv-card-bin">Bin<span>${escHtml(i.bin)}</span></div>
        </div>
        <div class="stock-bar-wrap" style="margin-bottom:8px">
          <div class="stock-bar-track" style="max-width:none;flex:1">
            <div class="stock-bar-fill ${stockBarClass(i.status)}" style="width:${pct}%"></div>
          </div>
          <span class="stock-bar-label">${pct}%</span>
        </div>
        <span class="badge ${invBadgeClass(i.status)}">${invBadgeLabel(i.status)}</span>
      </div>`;
    }).join('');
  }
}

/* ================================================================
   SHIPMENT DETAIL MODAL
================================================================ */
function openShipment(shipId) {
  const s = shipments.find(x => x.id === shipId);
  if (!s) return;
  activeShipmentId = shipId;

  document.getElementById('shipModalTitle').textContent = shipId;
  document.getElementById('shipModalSub').textContent   = `${s.type} · ${s.carrier}`;

  const timeline = shipmentTimeline[shipId] || [
    { label: 'Order Created', time: 'Confirmed', done: true,  active: false },
    { label: 'In Transit',    time: 'En Route',  done: false, active: true  },
    { label: 'Delivered',     time: '—',          done: false, active: false },
  ];

  document.getElementById('shipModalBody').innerHTML = `
    <div class="detail-grid">
      <div>
        <div class="detail-key">Tracking ID</div>
        <div class="detail-val" style="font-family:var(--font-mono)">${escHtml(s.id)}</div>
      </div>
      <div>
        <div class="detail-key">Type</div>
        <div class="detail-val">${typeBadge(s.type)}</div>
      </div>
      <div>
        <div class="detail-key">Carrier</div>
        <div class="detail-val">${escHtml(s.carrier)}</div>
      </div>
      <div>
        <div class="detail-key">Status</div>
        <div class="detail-val">${statusBadge(s.status)}</div>
      </div>
      <div>
        <div class="detail-key">Origin</div>
        <div class="detail-val">${escHtml(s.origin)}</div>
      </div>
      <div>
        <div class="detail-key">Destination</div>
        <div class="detail-val">${escHtml(s.dest)}</div>
      </div>
      <div>
        <div class="detail-key">Weight</div>
        <div class="detail-val">${escHtml(s.weight)}</div>
      </div>
      <div>
        <div class="detail-key">Pallets</div>
        <div class="detail-val">${s.pallets}</div>
      </div>
      <div class="detail-full">
        <div class="detail-key">ETA</div>
        <div class="detail-val" style="font-family:var(--font-mono)">${s.eta}</div>
      </div>
    </div>
    <div class="detail-key" style="margin-bottom:10px">Tracking Timeline</div>
    <div class="shipment-timeline">
      ${timeline.map(step => `
        <div class="timeline-step">
          <div class="timeline-dot ${step.done ? 'done' : step.active ? 'active' : ''}">
            ${step.done ? `<svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` :
              step.active ? `<svg viewBox="0 0 24 24" fill="none" stroke="var(--orange)" stroke-width="3"><circle cx="12" cy="12" r="4" fill="var(--orange)"/></svg>` : ''}
          </div>
          <div class="timeline-text">
            <div class="timeline-label">${escHtml(step.label)}</div>
            <div class="timeline-time">${escHtml(step.time)}</div>
          </div>
        </div>`).join('')}
    </div>`;

  openModal('shipModal');
}

/* ================================================================
   ALERT DETAIL MODAL
================================================================ */
function openAlert(alertId) {
  const a = alerts.find(x => x.id === alertId);
  if (!a) return;

  if (!a.read) {
    a.read = true;
    updateNotifState();
    if (typeof renderDashboard === 'function') renderDashboard();
  }

  document.getElementById('alertModalTitle').textContent = `Alert — ${a.severity.toUpperCase()}`;
  document.getElementById('alertModalSub').textContent   = a.time;
  document.getElementById('alertModalBody').innerHTML = `
    <div class="detail-grid" style="margin-bottom:0">
      <div class="detail-full">
        <div class="detail-key">Issue</div>
        <div class="detail-val" style="font-size:14px">${escHtml(a.title)}</div>
      </div>
      <div class="detail-full" style="margin-top:4px">
        <div class="detail-key">Detail</div>
        <div class="detail-val" style="font-weight:400;color:var(--text-secondary)">${escHtml(a.detail)}</div>
      </div>
      <div>
        <div class="detail-key">Severity</div>
        <div class="detail-val"><span class="badge badge-${a.severity}">${a.severity}</span></div>
      </div>
      <div>
        <div class="detail-key">Time</div>
        <div class="detail-val" style="font-family:var(--font-mono);font-weight:400">${a.time}</div>
      </div>
    </div>`;

  openModal('alertModal');
}

/* ================================================================
   MODAL OPEN / CLOSE
================================================================ */
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', e => {
  document.querySelectorAll('.modal-overlay.open').forEach(overlay => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

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
  if (!tc) return;

  const t = document.createElement('div');
  t.className = `toast toast-${type}`;

  const icons = {
    success: '<polyline points="20 6 9 17 4 12"/>',
    error:   '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    warning: '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    info:    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  };

  t.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      ${icons[type] || icons.info}
    </svg>
    <span>${escHtml(msg)}</span>`;

  tc.appendChild(t);
  setTimeout(() => {
    t.style.transition = 'all 0.22s ease';
    t.style.opacity    = '0';
    t.style.transform  = 'translateX(14px)';
    setTimeout(() => t.remove(), 240);
  }, 3800);
}

/* ================================================================
   INITIALISE — detect page by DOM element presence
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  updateNotifState();

  if (document.getElementById('dashShipBody'))  renderDashboard();
  if (document.getElementById('shipmentsBody')) renderShipments();
  if (document.getElementById('inventoryBody') || document.getElementById('inventoryGrid')) renderInventory();
});
