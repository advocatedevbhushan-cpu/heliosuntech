/**
 * HELIOSUNTECH PLASTICS - INTERACTIVE MULTI-LAYER FILM CO-EXTRUSION EXPLORER
 * Provides interactive 3D exploded view and engineering layer diagnostics for coating films.
 */

const FILM_LAYERS_DATA = {
  1: {
    id: 1,
    num: "01",
    name: "Surface Corona & Anti-Block Skin",
    subtitle: "High-Energy Print & Protective Contact Interface",
    ratioPercent: 20,
    polymerBase: "mPE / LDPE + Specialty Slip & Silica Anti-Block",
    surfaceEnergy: "38 – 44+ Dynes/cm (ASTM D2578)",
    cofRating: "0.22 – 0.28 (Kinetic COF per ASTM D1894)",
    opticalHaze: "< 4.5% (High Clarity per ASTM D1003)",
    description: "The exterior skin layer is modified with precise corona discharge and micro-dispersed organic slip additives. It delivers elevated surface energy for direct ink anchoring, extrusion coating lamination, and adhesive tape bonding, while preventing roll blocking during high-speed unwind.",
    keyAdvantages: [
      "Continuous 42+ Dynes corona treatment ensures long-term dyne retention",
      "Calibrated slip agent bloom prevents roll jamming on automatic slitters",
      "Pinhole-free surface skin protects aesthetic metal and composite finishes",
      "Available with UV-inhibitor stabilizers for outdoor substrate exposure"
    ],
    astmStandards: ["ASTM D2578 (Wetting Tension)", "ASTM D1894 (Static/Kinetic Friction)", "ASTM D1003 (Haze & Transmittance)"]
  },
  2: {
    id: 2,
    num: "02",
    name: "High-Tensile Polyolefin Core Matrix",
    subtitle: "Mechanical Skeleton & Puncture Defense Backbone",
    ratioPercent: 60,
    polymerBase: "High-Caliber LLDPE / Circular Copolymer Compound",
    tensileStrength: "MD > 28 MPa / TD > 24 MPa (ASTM D882)",
    dartImpact: "> 220 g (ASTM D1709 Method A)",
    elongation: "MD > 480% / TD > 560% (ASTM D882)",
    description: "Forming 60% of the film's structural cross-section, the core layer incorporates linear low-density polymer chains with narrow molecular weight distribution. This layer absorbs dynamic kinetic shocks, resists puncture from sharp industrial corners, and prevents web snap under high machine tension.",
    keyAdvantages: [
      "High dart impact resistance resists tearing across pallet corners",
      "Biaxial stretch memory retains load-containment integrity",
      "Virgin-grade tensile modulus formulated from calibrated circular feedstock",
      "Eliminates gauge variations through continuous closed-loop bubble stabilization"
    ],
    astmStandards: ["ASTM D882 (Tensile Properties)", "ASTM D1709 (Dart Drop Impact)", "ASTM D1922 (Elmendorf Tear Resistance)"]
  },
  3: {
    id: 3,
    num: "03",
    name: "Substrate Tie & Heat-Seal Barrier",
    subtitle: "Hermetic Moisture Seal & Thermal Lamination Web",
    ratioPercent: 20,
    polymerBase: "Plastomer Polyolefin / Low-SIT C4/C6 Terpolymer",
    sealTemp: "95°C – 110°C (Low Seal Initiation Temp)",
    sealStrength: "> 3.2 N/mm (ASTM F88)",
    waterVaporRate: "< 4.8 g/m²/24h (ASTM E96 at 38°C, 90% RH)",
    description: "The innermost sealant substrate is engineered for rapid thermal activation and hermetic fusion. It exhibits a low seal initiation temperature (SIT) and broad hot-tack plateau, creating an impenetrable moisture and vapor barrier that fuses seamlessly with paper, woven polyolefin, or secondary plastic layers.",
    keyAdvantages: [
      "Hermetic barrier stops vapor, chemical mist, and atmospheric moisture ingress",
      "Wide sealing temperature window optimizes high-speed packaging machines",
      "Compatible with extrusion coating tie-layers onto woven HDPE sacks",
      "Zero pinholes certified via 100% optical in-line defect detection"
    ],
    astmStandards: ["ASTM F88 (Seal Strength)", "ASTM E96 (Water Vapor Transmission)", "ASTM F1249 (Moisture Permeation)"]
  }
};

class FilmLayerExplorer {
  constructor() {
    this.activeLayer = 1;
    this.isExploded = true;
    this.totalGauge = 50; // Microns default

    // DOM Elements
    this.container = document.getElementById('filmExplorerApp');
    if (!this.container) return;

    this.navBtns = this.container.querySelectorAll('.layer-nav-tab');
    this.explodeToggle = document.getElementById('filmExplodeToggle');
    this.gaugeBtns = this.container.querySelectorAll('.gauge-preset-btn');

    this.panelNum = document.getElementById('layerPanelNum');
    this.panelTitle = document.getElementById('layerPanelTitle');
    this.panelSubtitle = document.getElementById('layerPanelSubtitle');
    this.panelDesc = document.getElementById('layerPanelDesc');
    this.calcGaugeEl = document.getElementById('layerCalcGauge');
    this.paramGrid = document.getElementById('layerParamsGrid');
    this.benefitsList = document.getElementById('layerBenefitsList');
    this.astmList = document.getElementById('layerAstmTags');

    // Graphic Elements
    this.layerSvg1 = document.getElementById('svgLayer1');
    this.layerSvg2 = document.getElementById('svgLayer2');
    this.layerSvg3 = document.getElementById('svgLayer3');

    this.init();
  }

  init() {
    // 1. Layer navigation clicks
    this.navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const layerId = parseInt(btn.dataset.layer, 10);
        this.selectLayer(layerId);
      });
    });

    // 2. Explode / Compact view toggle
    if (this.explodeToggle) {
      this.explodeToggle.addEventListener('click', () => {
        this.isExploded = !this.isExploded;
        this.updateExplodeState();
      });
    }

    // 3. Gauge preset selector
    this.gaugeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.gaugeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.totalGauge = parseInt(btn.dataset.gauge, 10);
        this.renderDiagnostics();
      });
    });

    // 4. SVG click interactivity
    const layers = [
      { el: this.layerSvg1, id: 1 },
      { el: this.layerSvg2, id: 2 },
      { el: this.layerSvg3, id: 3 }
    ];

    layers.forEach(({ el, id }) => {
      if (el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => this.selectLayer(id));
        el.addEventListener('mouseenter', () => this.previewLayer(id));
      }
    });

    // Initial render
    this.selectLayer(1);
    this.updateExplodeState();
  }

  selectLayer(layerId) {
    this.activeLayer = layerId;

    // Update navigation tabs
    this.navBtns.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.layer, 10) === layerId);
    });

    // Update visual layers highlight
    [1, 2, 3].forEach(id => {
      const svgEl = document.getElementById(`svgLayer${id}`);
      if (svgEl) {
        if (id === layerId) {
          svgEl.classList.add('layer-active');
          svgEl.style.filter = 'drop-shadow(0 0 12px rgba(20, 107, 68, 0.4))';
        } else {
          svgEl.classList.remove('layer-active');
          svgEl.style.filter = 'none';
        }
      }
    });

    this.renderDiagnostics();
  }

  previewLayer(layerId) {
    [1, 2, 3].forEach(id => {
      const svgEl = document.getElementById(`svgLayer${id}`);
      if (svgEl && id !== this.activeLayer) {
        svgEl.style.opacity = (id === layerId) ? '1' : (this.isExploded ? '0.75' : '0.9');
      }
    });
  }

  updateExplodeState() {
    if (this.explodeToggle) {
      this.explodeToggle.classList.toggle('active', this.isExploded);
      this.explodeToggle.innerHTML = this.isExploded
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/></svg> Exploded View`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg> Compact Stack`;
    }

    const svgWrapper = document.getElementById('filmLayerSvgWrapper');
    if (svgWrapper) {
      svgWrapper.classList.toggle('exploded-mode', this.isExploded);
      svgWrapper.classList.toggle('compact-mode', !this.isExploded);
    }
  }

  renderDiagnostics() {
    const data = FILM_LAYERS_DATA[this.activeLayer];
    if (!data) return;

    // Calculate exact thickness for this layer based on active gauge
    const layerThickness = ((this.totalGauge * data.ratioPercent) / 100).toFixed(1);

    if (this.panelNum) this.panelNum.textContent = `LAYER ${data.num} / 03`;
    if (this.panelTitle) this.panelTitle.textContent = data.name;
    if (this.panelSubtitle) this.panelSubtitle.textContent = data.subtitle;
    if (this.panelDesc) this.panelDesc.textContent = data.description;

    if (this.calcGaugeEl) {
      this.calcGaugeEl.innerHTML = `
        <span class="calc-val">${layerThickness} µm</span>
        <span class="calc-ratio">(${data.ratioPercent}% of ${this.totalGauge} µm Web)</span>
      `;
    }

    // Parameters grid
    if (this.paramGrid) {
      let paramsHtml = `
        <div class="layer-param-item">
          <div class="param-lbl">Base Formulation</div>
          <div class="param-val">${data.polymerBase}</div>
        </div>
      `;

      if (this.activeLayer === 1) {
        paramsHtml += `
          <div class="layer-param-item">
            <div class="param-lbl">Surface Energy</div>
            <div class="param-val" style="color: var(--accent-emerald); font-weight:800;">${data.surfaceEnergy}</div>
          </div>
          <div class="layer-param-item">
            <div class="param-lbl">Kinetic COF</div>
            <div class="param-val">${data.cofRating}</div>
          </div>
          <div class="layer-param-item">
            <div class="param-lbl">Optical Clarity</div>
            <div class="param-val">${data.opticalHaze}</div>
          </div>
        `;
      } else if (this.activeLayer === 2) {
        paramsHtml += `
          <div class="layer-param-item">
            <div class="param-lbl">Tensile Strength</div>
            <div class="param-val" style="color: var(--accent-emerald); font-weight:800;">${data.tensileStrength}</div>
          </div>
          <div class="layer-param-item">
            <div class="param-lbl">Dart Drop Resistance</div>
            <div class="param-val">${data.dartImpact}</div>
          </div>
          <div class="layer-param-item">
            <div class="param-lbl">Rupture Elongation</div>
            <div class="param-val">${data.elongation}</div>
          </div>
        `;
      } else if (this.activeLayer === 3) {
        paramsHtml += `
          <div class="layer-param-item">
            <div class="param-lbl">Seal Temp Range (SIT)</div>
            <div class="param-val" style="color: var(--accent-emerald); font-weight:800;">${data.sealTemp}</div>
          </div>
          <div class="layer-param-item">
            <div class="param-lbl">Hermetic Seal Strength</div>
            <div class="param-val">${data.sealStrength}</div>
          </div>
          <div class="layer-param-item">
            <div class="param-lbl">Water Vapor Barrier (WVTR)</div>
            <div class="param-val">${data.waterVaporRate}</div>
          </div>
        `;
      }

      this.paramGrid.innerHTML = paramsHtml;
    }

    // Key advantages
    if (this.benefitsList) {
      this.benefitsList.innerHTML = data.keyAdvantages.map(adv => `
        <li style="display: flex; gap: 0.6rem; align-items: flex-start; margin-bottom: 0.6rem; font-size: 0.88rem; color: var(--text-secondary);">
          <span style="color: var(--accent-emerald); font-weight: 800; line-height: 1;">✓</span>
          <span>${adv}</span>
        </li>
      `).join('');
    }

    // ASTM standards tags
    if (this.astmList) {
      this.astmList.innerHTML = data.astmStandards.map(std => `
        <span class="astm-tag">${std}</span>
      `).join('');
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.filmExplorerInst = new FilmLayerExplorer();
});
