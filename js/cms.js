/**
 * HELIOSUNTECH PLASTICS - IN-BROWSER CMS & DATA MANAGER
 * Allows live editing of sustainability metrics, product catalogue,
 * and review of submitted customer RFQ inquiries without touching code.
 */

class CmsManager {
  constructor() {
    this.modal = document.getElementById('cmsModal');
    this.init();
  }

  init() {
    // Load sustainability metrics into DOM
    this.loadMetrics();
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.renderInquiries();
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  loadMetrics() {
    const saved = localStorage.getItem('heliosuntech_metrics');
    const metrics = saved ? JSON.parse(saved) : {
      recovered: "[XX] MT",
      output: "[XX] MT",
      grades: "[XX]"
    };

    const recEl = document.getElementById('metricRecovered');
    const outEl = document.getElementById('metricOutput');
    const grdEl = document.getElementById('metricGrades');

    if (recEl) recEl.textContent = metrics.recovered;
    if (outEl) outEl.textContent = metrics.output;
    if (grdEl) grdEl.textContent = metrics.grades;

    // Set input values in CMS modal if open
    const inRec = document.getElementById('cmsMetricRecovered');
    const inOut = document.getElementById('cmsMetricOutput');
    const inGrd = document.getElementById('cmsMetricGrades');
    if (inRec) inRec.value = metrics.recovered;
    if (inOut) inOut.value = metrics.output;
    if (inGrd) inGrd.value = metrics.grades;
  }

  saveMetrics() {
    const inRec = document.getElementById('cmsMetricRecovered').value || "[XX] MT";
    const inOut = document.getElementById('cmsMetricOutput').value || "[XX] MT";
    const inGrd = document.getElementById('cmsMetricGrades').value || "[XX]";

    localStorage.setItem('heliosuntech_metrics', JSON.stringify({
      recovered: inRec,
      output: inOut,
      grades: inGrd
    }));

    this.loadMetrics();
    window.showToast('Sustainability metrics updated successfully.');
  }

  renderInquiries() {
    const list = document.getElementById('cmsInquiriesList');
    if (!list) return;

    const inquiries = JSON.parse(localStorage.getItem('heliosuntech_inquiries') || '[]');
    if (inquiries.length === 0) {
      list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No RFQs received yet. Test by submitting an enquiry form.</p>`;
      return;
    }

    list.innerHTML = inquiries.map(q => `
      <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--accent-green); margin-bottom: 0.35rem;">
          <span>${q.id}</span>
          <span>${new Date(q.timestamp).toLocaleDateString()}</span>
        </div>
        <strong style="color: var(--text-primary); font-size: 0.95rem;">${q.name} (${q.company || 'Private'})</strong>
        <div style="font-size: 0.85rem; color: var(--text-secondary); margin: 0.25rem 0;">
          ${q.email} | ${q.phone}
        </div>
        <div style="font-size: 0.85rem; color: var(--accent-cyan);">
          Req: ${q.requirementType || 'General'} | Material: ${q.product || 'N/A'} | Qty: ${q.quantity || 'N/A'}
        </div>
        ${q.message ? `<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem; font-style: italic;">"${q.message}"</p>` : ''}
      </div>
    `).join('');
  }

  clearInquiries() {
    if (confirm('Clear all stored inquiries?')) {
      localStorage.removeItem('heliosuntech_inquiries');
      this.renderInquiries();
      window.showToast('Inquiries cleared.');
    }
  }

  exportData() {
    const data = {
      catalogue: JSON.parse(localStorage.getItem('heliosuntech_catalogue') || '[]'),
      metrics: JSON.parse(localStorage.getItem('heliosuntech_metrics') || '{}'),
      inquiries: JSON.parse(localStorage.getItem('heliosuntech_inquiries') || '[]')
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heliosuntech_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

window.CmsManager = CmsManager;
