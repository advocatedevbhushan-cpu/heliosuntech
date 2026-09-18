/**
 * HELIOSUNTECH PLASTICS - MASTER APPLICATION COORDINATOR
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Particle Canvas
  const particleEngine = new window.PolymerParticleEngine('heroCanvas');

  // 2. Initialize Material Flow
  const flowManager = new window.MaterialFlowManager();

  // 3. Initialize Catalogue
  const catalogueManager = new window.CatalogueManager();
  window.catalogueInst = catalogueManager;

  // 4. Initialize Quality Dashboard
  const qualityDashboard = new window.QualityDashboard();

  // 5. Initialize RFQ System
  const rfqManager = new window.RfqManager();
  window.rfqInst = rfqManager;

  // 6. Initialize CMS Manager
  const cmsManager = new window.CmsManager();
  window.cmsInst = cmsManager;

  // 7. Navbar Scroll Transition
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Active link spy
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  });

  // 8. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile drawer when link clicked
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 9. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
});

/* Global Action Helpers */
window.showToast = function(message) {
  const toast = document.getElementById('globalToast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
};

window.openRfqForProduct = function(encodedName) {
  if (window.rfqInst) {
    window.rfqInst.open(encodedName, 'Plastic Granules');
  }
};

window.openTdsModal = function(productId) {
  const tdsModal = document.getElementById('tdsModal');
  const tdsContent = document.getElementById('tdsModalContent');
  if (!tdsModal || !tdsContent) return;

  const item = window.catalogueInst.items.find(i => i.id === productId);
  if (!item) return;

  tdsContent.innerHTML = `
    <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1.5rem;">
      <span class="polymer-badge">${item.polymer}</span>
      <h3 style="margin-top: 0.5rem;">${item.name}</h3>
      <p style="color: var(--text-secondary); font-size: 0.9rem;">Technical Specification &amp; Processing Parameters</p>
    </div>

    <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.25rem; margin-bottom: 1.5rem;">
      <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
        <tr style="border-bottom: 1px solid var(--border-subtle);">
          <td style="padding: 0.5rem 0; color: var(--text-muted);">Polymer Base:</td>
          <td style="font-weight: 600; color: var(--text-primary); text-align: right;">${item.polymer}</td>
        </tr>
        <tr style="border-bottom: 1px solid var(--border-subtle);">
          <td style="padding: 0.5rem 0; color: var(--text-muted);">Application Classification:</td>
          <td style="font-weight: 600; color: var(--text-primary); text-align: right;">${item.grade || item.filmType}</td>
        </tr>
        <tr style="border-bottom: 1px solid var(--border-subtle);">
          <td style="padding: 0.5rem 0; color: var(--text-muted);">MFI / Thickness:</td>
          <td style="font-weight: 600; color: var(--accent-amber); text-align: right; font-style: italic;">Specification available on request</td>
        </tr>
        <tr style="border-bottom: 1px solid var(--border-subtle);">
          <td style="padding: 0.5rem 0; color: var(--text-muted);">Packaging Standard:</td>
          <td style="font-weight: 600; color: var(--text-primary); text-align: right;">${item.packaging}</td>
        </tr>
        <tr>
          <td style="padding: 0.5rem 0; color: var(--text-muted);">Batch Certification:</td>
          <td style="font-weight: 600; color: var(--accent-green); text-align: right;">COA Issued per Batch</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.5;">
      * Detailed laboratory technical data sheets with customized melt-flow indexing, density tolerance curves, and ash-content testing are available for qualified B2B procurement partners upon application review.
    </p>

    <div style="display: flex; gap: 1rem;">
      <button class="btn btn-primary" style="flex: 1;" onclick="document.getElementById('tdsModal').classList.remove('open'); window.openRfqForProduct('${encodeURIComponent(item.name)}');">
        Request Official TDS &amp; Sample
      </button>
      <button class="btn btn-secondary" onclick="document.getElementById('tdsModal').classList.remove('open');">
        Close
      </button>
    </div>
  `;

  tdsModal.classList.add('open');
};

window.viewBatchDetails = function(batchNo) {
  const modal = document.getElementById('batchModal');
  const content = document.getElementById('batchModalContent');
  if (!modal || !content) return;

  const batch = window.QualityDashboard ? window.SAMPLE_BATCHES?.find(b => b.batchNo === batchNo) : null;
  const b = batch || {
    batchNo: batchNo,
    material: "Industrial Polymer Lot",
    grade: "Controlled Process",
    prodDate: "Recent",
    inspection: "Inline Optical & Moisture Analysis",
    result: "Calibrated & Process Checked",
    status: "PASSED",
    operator: "QA-Station"
  };

  content.innerHTML = `
    <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1.25rem;">
      <span class="status-badge passed">QC VERIFIED BATCH</span>
      <h3 style="margin-top: 0.5rem; font-family: monospace; color: var(--accent-cyan);">${b.batchNo}</h3>
      <p style="color: var(--text-secondary); font-size: 0.85rem;">Internal Production Traceability Record</p>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem; margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">Material / Matrix:</span>
        <span style="color: var(--text-primary); font-weight: 600;">${b.material}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">Inspection Scope:</span>
        <span style="color: var(--text-primary); font-weight: 600;">${b.inspection}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">Inspection Result:</span>
        <span style="color: var(--accent-green); font-weight: 600;">${b.result}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">Traceability Status:</span>
        <span style="color: var(--accent-green); font-weight: 600;">Retained Archival Sample On-Site</span>
      </div>
    </div>

    <button class="btn btn-secondary" style="width: 100%;" onclick="document.getElementById('batchModal').classList.remove('open');">
      Close Batch Inspector
    </button>
  `;

  modal.classList.add('open');
};
