/**
 * HELIOSUNTECH PLASTICS - SEARCHABLE PRODUCT & MATERIAL CATALOGUE
 * Transparent parameter placeholders & RFQ quote integration.
 */

const DEFAULT_CATALOGUE = [
  {
    id: "film-coating-01",
    name: "Industrial Plastic Coating Film - Type CF-100",
    category: "films",
    polymer: "PE / PP Compound",
    filmType: "★ Flagship Protective Coating Film",
    thickness: "25 – 90 µm (Micron tailored to spec)",
    width: "100 mm – 1,800 mm (Custom slit reels)",
    application: "Surface lamination, stainless steel, glass & architectural sheet protection",
    finish: "Corona treated (38–44 Dynes) / Residue-free release",
    packaging: "Standard roll reels with protective core wrapping",
    tdsAvailable: true
  },
  {
    id: "film-coating-02",
    name: "Substrate Barrier Coating Film - Type BF-200",
    category: "films",
    polymer: "Multi-layer Barrier Matrix",
    filmType: "★ Protective Barrier Film",
    thickness: "30 – 120 µm (Gauge controlled ±1.5 µm)",
    width: "Industrial reel widths up to 1,800 mm",
    application: "Moisture barrier coating, industrial packaging, composite substrates",
    finish: "High puncture resistance / Engineered hot-tack",
    packaging: "Export palletized industrial reels",
    tdsAvailable: true
  },
  {
    id: "film-coating-03",
    name: "Extrusion Coating & Tie-Layer Film - Type TC-300",
    category: "films",
    polymer: "Modified Polyolefin Blend",
    filmType: "★ Extrusion Lamination Film",
    thickness: "15 – 60 µm",
    width: "Reel widths tailored to converter lines",
    application: "Thermal extrusion coating over woven HDPE/PP fabrics and paperboard",
    finish: "High melt strength / Corona treated 42+ Dynes",
    packaging: "Heavy-duty tension wound industrial reels",
    tdsAvailable: true
  },
  {
    id: "film-coating-04",
    name: "Heavy-Duty Industrial Liner Film - Type LF-400",
    category: "films",
    polymer: "Co-extruded LLDPE/HDPE",
    filmType: "★ High-Barrier Liner Film",
    thickness: "50 – 150 µm",
    width: "Gusseted or flat slit rolls",
    application: "Chemical drums, FIBC bulk bags, fertilizer liners, and moisture barriers",
    finish: "High dart impact (>220g) / Pin-hole free seal",
    packaging: "Protective palletized reels",
    tdsAvailable: true
  },
  {
    id: "film-shrink-01",
    name: "Industrial LDPE Heat Shrink Collation Film - Type SF-500",
    category: "films",
    polymer: "Engineered Polyolefin / LDPE",
    filmType: "★ Industrial Heat Shrink Film",
    thickness: "40 – 120 µm",
    width: "Single wound or centerfolded up to 1,600 mm",
    application: "Beverage bottling collation, canned goods packaging, and secondary unit bundling",
    finish: "Biaxial Shrink (MD 65% / TD 20%) / High Puncture Resistance",
    packaging: "Palletized industrial rolls with moisture stretch wrap",
    tdsAvailable: true
  },
  {
    id: "film-shrink-02",
    name: "Cross-Linked POF Polyolefin Shrink Film - Type POF-600",
    category: "films",
    polymer: "5-Layer Multi-Layer Polyolefin",
    filmType: "★ High-Clarity POF Shrink Film",
    thickness: "12 – 25 µm Ultra-High Yield",
    width: "Centerfold 200 mm – 800 mm",
    application: "Consumer display packaging, pharmaceuticals, cosmetics & food boxes",
    finish: "High Gloss (Haze < 2.0%) / Balanced Biaxial Shrink (MD 60% / TD 60%)",
    packaging: "Standard carton reels on 3-inch cores",
    tdsAvailable: true
  },
  {
    id: "film-shrink-03",
    name: "Heavy-Duty Pallet Shrink Hood Film - Type SH-700",
    category: "films",
    polymer: "EVA / Enhanced LLDPE Blend",
    filmType: "★ Pallet Protection Shrink Hood",
    thickness: "80 – 180 µm Heavy Gauge",
    width: "Gusseted tubing up to 2,400 mm perimeter",
    application: "Heavy brick pallets, chemical sacks, appliances & export weatherproofing",
    finish: "UV Stabilized / 5-sided all-weather hermetic containment",
    packaging: "Perforated rolls on heavy steel cores",
    tdsAvailable: true
  },
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
      let matchesCategory = true;
      if (this.activeFilter === 'all') {
        matchesCategory = true;
      } else if (this.activeFilter === 'films') {
        matchesCategory = item.category === 'films' && !item.id.includes('shrink');
      } else if (this.activeFilter === 'shrink') {
        matchesCategory = item.id.includes('shrink');
      } else if (this.activeFilter === 'granules') {
        matchesCategory = item.category === 'granules';
      }
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
      const isShrink = item.id.includes('shrink');
      let typeBadgeLabel = '★ COATING FILM';
      if (isGranule) {
        typeBadgeLabel = 'RECYCLED GRANULE';
      } else if (isShrink) {
        typeBadgeLabel = '★ HEAT SHRINK FILM';
      }

      card.innerHTML = `
        <div>
          <div class="catalogue-tag-row">
            <span class="polymer-badge">${item.polymer}</span>
            <span class="type-badge" style="${isGranule ? '' : 'background: rgba(20, 107, 68, 0.12); color: var(--accent-emerald); font-weight: 800; border: 1px solid rgba(20, 107, 68, 0.25);'}">${typeBadgeLabel}</span>
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
