/**
 * HELIOSUNTECH PLASTICS - SEARCHABLE PRODUCT & MATERIAL CATALOGUE
 * Transparent parameter placeholders & RFQ quote integration.
 */

const DEFAULT_CATALOGUE = [
  {
    id: "granule-pp-01",
    name: "Recycled Polypropylene (PP) Granules",
    category: "granules",
    polymer: "PP",
    grade: "Injection / Extrusion Grade",
    color: "Natural / Black / Custom",
    meltFlow: "Specification available on request",
    application: "Industrial moulding, crates, automotive components",
    packaging: "25 kg moisture-barrier bags / 500 kg jumbo bags",
    tdsAvailable: true
  },
  {
    id: "granule-hdpe-02",
    name: "Recycled High-Density Polyethylene (HDPE)",
    category: "granules",
    polymer: "HDPE",
    grade: "Blow Moulding & Extrusion",
    color: "Milky White / Blue / Black",
    meltFlow: "Specification available on request",
    application: "Drums, containers, pipes, industrial sheets",
    packaging: "25 kg bags / bulk dispatch",
    tdsAvailable: true
  },
  {
    id: "granule-ldpe-03",
    name: "Recycled Low-Density Polyethylene (LDPE)",
    category: "granules",
    polymer: "LDPE",
    grade: "Film & Extrusion Grade",
    color: "Natural Clear / Semi-Translucent",
    meltFlow: "Specification available on request",
    application: "Coating film substrate, packaging liners, sheets",
    packaging: "25 kg multi-wall bags",
    tdsAvailable: true
  },
  {
    id: "granule-lldpe-04",
    name: "Recycled Linear Low-Density Polyethylene (LLDPE)",
    category: "granules",
    polymer: "LLDPE",
    grade: "High Tensile Film Grade",
    color: "Natural / Off-White",
    meltFlow: "Specification available on request",
    application: "Stretch film compounding, industrial wrap, geomembranes",
    packaging: "25 kg sealed bags",
    tdsAvailable: true
  },
  {
    id: "film-coating-01",
    name: "Industrial Plastic Coating Film - Type CF-100",
    category: "films",
    polymer: "PE / PP Compound",
    filmType: "Industrial Protective Coating Film",
    thickness: "Specification available on request (Micron tailored)",
    width: "Custom slit width on request",
    application: "Surface lamination, metal & sheet protective coating",
    finish: "Corona treated / Smooth matte or gloss",
    packaging: "Standard roll reels with protective core wrapping",
    tdsAvailable: true
  },
  {
    id: "film-coating-02",
    name: "Substrate Barrier Coating Film - Type BF-200",
    category: "films",
    polymer: "Multi-layer Barrier Matrix",
    filmType: "Protective Barrier Film",
    thickness: "Specification available on request",
    width: "Industrial reel widths available",
    application: "Industrial packaging, moisture barrier coating, composite substrates",
    finish: "Engineered high-tack / non-residue release",
    packaging: "Export palletized industrial reels",
    tdsAvailable: true
  }
];

class CatalogueManager {
  constructor() {
    this.grid = document.getElementById('catalogueGrid');
    this.searchInput = document.getElementById('catalogueSearchInput');
    this.tabButtons = document.querySelectorAll('.catalogue-tabs .tab-btn');
    this.activeFilter = 'all';
    this.searchTerm = '';
    
    // Load persisted catalogue or default
    const saved = localStorage.getItem('heliosuntech_catalogue');
    this.items = saved ? JSON.parse(saved) : DEFAULT_CATALOGUE;

    this.init();
  }

  init() {
    if (!this.grid) return;

    // Filter tabs
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.dataset.filter;
        this.render();
      });
    });

    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    this.render();
  }

  getFilteredItems() {
    return this.items.filter(item => {
      const matchesCategory = (this.activeFilter === 'all') || (item.category === this.activeFilter);
      const searchBlob = `${item.name} ${item.polymer} ${item.grade || ''} ${item.filmType || ''} ${item.application}`.toLowerCase();
      const matchesSearch = !this.searchTerm || searchBlob.includes(this.searchTerm);
      return matchesCategory && matchesSearch;
    });
  }

  render() {
    const items = this.getFilteredItems();
    this.grid.innerHTML = '';

    if (items.length === 0) {
      this.grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-md);">
          <p style="color: var(--text-secondary); margin-bottom: 1rem;">No material matching "${this.searchTerm}" found.</p>
          <button class="btn btn-outline-accent btn-sm" onclick="document.getElementById('catalogueSearchInput').value=''; window.catalogueInst.searchTerm=''; window.catalogueInst.render();">Reset Search</button>
        </div>
      `;
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'catalogue-card';
      
      const isGranule = item.category === 'granules';

      card.innerHTML = `
        <div>
          <div class="catalogue-tag-row">
            <span class="polymer-badge">${item.polymer}</span>
            <span class="type-badge">${isGranule ? 'RECYCLED GRANULE' : 'COATING FILM'}</span>
          </div>
          <h4>${item.name}</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">${item.application}</p>

          <div class="catalogue-params">
            <div class="param-row">
              <span>${isGranule ? 'Grade' : 'Film Type'}</span>
              <span>${item.grade || item.filmType}</span>
            </div>
            <div class="param-row">
              <span>${isGranule ? 'Color Spectrum' : 'Finish'}</span>
              <span>${item.color || item.finish}</span>
            </div>
            <div class="param-row">
              <span>${isGranule ? 'Melt Flow Index' : 'Thickness Range'}</span>
              <span class="placeholder-pill">${item.meltFlow || item.thickness}</span>
            </div>
            <div class="param-row">
              <span>Packaging</span>
              <span>${item.packaging}</span>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
          <button class="btn btn-outline-accent btn-sm" style="flex: 1;" onclick="window.openTdsModal('${item.id}')">
            View TDS
          </button>
          <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="window.openRfqForProduct('${encodeURIComponent(item.name)}')">
            Request Quote
          </button>
        </div>
      `;

      this.grid.appendChild(card);
    });
  }
}

// Global hook
window.CatalogueManager = CatalogueManager;
