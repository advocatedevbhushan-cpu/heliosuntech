/**
 * HELIOSUNTECH PLASTICS - INTERACTIVE MATERIAL FLOW (WASTE TO MATERIAL)
 * 6-Stage Timeline: 01 COLLECT -> 02 SORT -> 03 PROCESS -> 04 GRANULATE -> 05 MANUFACTURE -> 06 REUSE
 * Light Professional Theme: Crisp White, Soft Mint (#F4FAF6), Emerald (#146B44), Lime (#52B216)
 */

const MATERIAL_STAGES = [
  {
    id: 1,
    num: "01",
    name: "COLLECT",
    title: "Post-Industrial & Stream Feedstock Recovery",
    description: "Systematic collection and intake of clean post-industrial plastic waste and selected post-consumer streams, preventing landfill disposal and preserving polymer intrinsic value.",
    inputState: "Mixed scrap / rejected mouldings / off-cuts",
    outputState: "Segregated polymer baled inventory",
    controlPoint: "Feedstock contamination verification",
    diagramSvg: `
      <svg viewBox="0 0 320 220" fill="none" class="w-full h-auto">
        <rect width="320" height="220" rx="8" fill="#F4FAF6"/>
        <path d="M40 180 L120 70 L200 180 Z" fill="#EAF4EE" stroke="#146B44" stroke-width="2"/>
        <polygon points="90,130 110,120 120,135 100,145" fill="#52B216" opacity="0.9"/>
        <polygon points="130,140 150,130 145,155 125,150" fill="#146B44" opacity="0.85"/>
        <polygon points="105,155 125,150 120,170 100,168" fill="#3B584C" opacity="0.6"/>
        <text x="120" y="55" fill="#146B44" font-family="'Space Grotesk', monospace" font-size="11" font-weight="700" text-anchor="middle">RECOVERY INLET</text>
        <circle cx="120" cy="180" r="16" fill="#FFFFFF" stroke="#52B216" stroke-width="2"/>
        <path d="M120 172 V188 M112 180 H128" stroke="#52B216" stroke-width="2"/>
        <text x="240" y="110" fill="#146B44" font-family="'Space Grotesk', monospace" font-size="12" font-weight="700">STAGE 01</text>
        <text x="240" y="128" fill="#3B584C" font-size="10" font-weight="600">Feedstock Intake</text>
      </svg>
    `
  },
  {
    id: 2,
    num: "02",
    name: "SORT",
    title: "Optical & Density Material Segregation",
    description: "High-precision physical separation by polymer classification (PP, HDPE, LDPE, LLDPE) and color gradation, ensuring strict homogeneity before mechanical processing.",
    inputState: "Baled raw polymers",
    outputState: "Monolithic polymer fractions",
    controlPoint: "Near-Infrared (NIR) spectrum verification",
    diagramSvg: `
      <svg viewBox="0 0 320 220" fill="none">
        <rect width="320" height="220" rx="8" fill="#F4FAF6"/>
        <line x1="60" y1="40" x2="260" y2="40" stroke="#DCECE2" stroke-width="3"/>
        <rect x="130" y="30" width="60" height="20" rx="4" fill="#52B216"/>
        <text x="160" y="44" fill="#FFFFFF" font-family="'Space Grotesk', monospace" font-size="9" font-weight="700" text-anchor="middle">OPTICAL NIR</text>
        <path d="M140 50 L110 110 M160 50 L160 110 M180 50 L210 110" stroke="#52B216" stroke-dasharray="2 3"/>
        <rect x="80" y="120" width="60" height="50" rx="6" fill="#FFFFFF" stroke="#146B44"/>
        <text x="110" y="150" fill="#146B44" font-family="'Space Grotesk', monospace" font-size="10" font-weight="700" text-anchor="middle">PP / HDPE</text>
        <rect x="180" y="120" width="60" height="50" rx="6" fill="#FFFFFF" stroke="#52B216"/>
        <text x="210" y="150" fill="#52B216" font-family="'Space Grotesk', monospace" font-size="10" font-weight="700" text-anchor="middle">LDPE / LLDPE</text>
      </svg>
    `
  },
  {
    id: 3,
    num: "03",
    name: "PROCESS",
    title: "Mechanical Shredding, Washing & Flake Drying",
    description: "Multi-stage wet-grinding into uniform flakes followed by multi-chamber friction washing, hot rinsing, and centrifugal spin-drying to remove labels, adhesives, and surface contaminants.",
    inputState: "Segregated whole plastics",
    outputState: "Decontaminated clean polymer flakes",
    controlPoint: "Moisture content < 0.2% & purity inspection",
    diagramSvg: `
      <svg viewBox="0 0 320 220" fill="none">
        <rect width="320" height="220" rx="8" fill="#F4FAF6"/>
        <circle cx="110" cy="110" r="45" fill="#EAF4EE" stroke="#146B44" stroke-width="2"/>
        <line x1="85" y1="85" x2="135" y2="135" stroke="#52B216" stroke-width="3"/>
        <line x1="135" y1="85" x2="85" y2="135" stroke="#52B216" stroke-width="3"/>
        <circle cx="110" cy="110" r="15" fill="#FFFFFF" stroke="#146B44" stroke-width="2"/>
        <text x="110" y="180" fill="#3B584C" font-family="'Space Grotesk', monospace" font-size="10" text-anchor="middle">FRICTION ROTOR</text>
        <g transform="translate(190, 80)">
          <polygon points="10,10 25,5 20,22 8,20" fill="#52B216"/>
          <polygon points="40,15 55,10 50,28 35,25" fill="#146B44"/>
          <polygon points="20,40 35,35 30,52 15,50" fill="#3B584C"/>
          <polygon points="50,45 65,40 60,58 45,55" fill="#52B216"/>
        </g>
        <text x="230" y="165" fill="#146B44" font-family="'Space Grotesk', monospace" font-size="10" font-weight="700" text-anchor="middle">PURE FLAKES</text>
      </svg>
    `
  },
  {
    id: 4,
    num: "04",
    name: "GRANULATE",
    title: "Thermal Homogenization & Strand Pelletizing",
    description: "Extrusion under controlled thermal profiles with continuous double-vacuum degassing to extract volatiles, followed by micro-filtration and strand/underwater cutting into consistent granules.",
    inputState: "Dry polymer flakes",
    outputState: "Uniform cylindrical / spherical granules",
    controlPoint: "Melt Flow Index (MFI) & density calibration",
    diagramSvg: `
      <svg viewBox="0 0 320 220" fill="none">
        <rect width="320" height="220" rx="8" fill="#F4FAF6"/>
        <rect x="40" y="85" width="160" height="40" rx="4" fill="#EAF4EE" stroke="#146B44" stroke-width="2"/>
        <path d="M45 105 Q65 95 85 105 T125 105 T165 105 T195 105" stroke="#52B216" stroke-width="3" fill="none"/>
        <polygon points="200,92 225,98 225,112 200,118" fill="#146B44"/>
        <g transform="translate(240, 85)">
          <circle cx="10" cy="10" r="5" fill="#52B216"/>
          <circle cx="25" cy="8" r="5" fill="#146B44"/>
          <circle cx="40" cy="12" r="5" fill="#52B216"/>
          <circle cx="18" cy="25" r="5" fill="#3B584C"/>
          <circle cx="34" cy="24" r="5" fill="#52B216"/>
        </g>
        <text x="120" y="155" fill="#3B584C" font-family="'Space Grotesk', monospace" font-size="10" text-anchor="middle">TWIN-SCREW EXTRUSION</text>
        <text x="265" y="145" fill="#146B44" font-family="'Space Grotesk', monospace" font-size="10" font-weight="700" text-anchor="middle">GRANULES</text>
      </svg>
    `
  },
  {
    id: 5,
    num: "05",
    name: "MANUFACTURE",
    title: "Precision Plastic Coating Film Extrusion",
    description: "Converting manufactured granules and formulated polymer compounds into plastic coating films via high-precision chill-roll casting or blown film extrusion with corona surface treatment.",
    inputState: "Engineered plastic granules",
    outputState: "Wound plastic coating film rolls",
    controlPoint: "Micron thickness uniformity & surface tension",
    diagramSvg: `
      <svg viewBox="0 0 320 220" fill="none">
        <rect width="320" height="220" rx="8" fill="#F4FAF6"/>
        <circle cx="80" cy="110" r="28" fill="#EAF4EE" stroke="#146B44" stroke-width="2"/>
        <circle cx="140" cy="80" r="18" fill="#EAF4EE" stroke="#52B216" stroke-width="2"/>
        <circle cx="200" cy="130" r="20" fill="#EAF4EE" stroke="#146B44" stroke-width="2"/>
        <path d="M80 82 C110 82, 120 62, 140 62 S180 110, 200 110 L260 110" stroke="#52B216" stroke-width="4" fill="none"/>
        <circle cx="260" cy="110" r="26" fill="#FFFFFF" stroke="#146B44" stroke-width="2"/>
        <text x="160" y="185" fill="#0A221A" font-family="'Space Grotesk', monospace" font-size="10" text-anchor="middle">CALENDER &amp; CHILL ROLLERS</text>
      </svg>
    `
  },
  {
    id: 6,
    num: "06",
    name: "REUSE",
    title: "Closed-Loop Industrial Downstream Utilization",
    description: "The manufactured films, protective barriers, and granule materials enter downstream industrial supply chains across manufacturing, packaging, and coating sectors, completing the circular cycle.",
    inputState: "Finished industrial materials",
    outputState: "Industrial components & engineered goods",
    controlPoint: "End-of-life recyclability validation",
    diagramSvg: `
      <svg viewBox="0 0 320 220" fill="none">
        <rect width="320" height="220" rx="8" fill="#F4FAF6"/>
        <circle cx="160" cy="105" r="55" stroke="#DCECE2" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
        <path d="M160 50 A55 55 0 0 1 215 105" stroke="#52B216" stroke-width="3" fill="none"/>
        <path d="M215 105 A55 55 0 0 1 160 160" stroke="#146B44" stroke-width="3" fill="none"/>
        <path d="M160 160 A55 55 0 0 1 105 105" stroke="#52B216" stroke-width="3" fill="none"/>
        <polygon points="160,85 180,97 180,121 160,133 140,121 140,97" fill="#FFFFFF" stroke="#146B44" stroke-width="1.8"/>
        <text x="160" y="112" fill="#146B44" font-family="'Space Grotesk', monospace" font-size="9" font-weight="700" text-anchor="middle">CIRCULAR</text>
        <text x="160" y="190" fill="#3B584C" font-family="'Space Grotesk', monospace" font-size="10" text-anchor="middle">CONTINUOUS MATERIAL CYCLE</text>
      </svg>
    `
  }
];

class MaterialFlowManager {
  constructor() {
    this.navContainer = document.getElementById('flowNavContainer');
    this.displayCard = document.getElementById('flowDisplayCard');
    this.currentStageIndex = 0;
    if (this.navContainer && this.displayCard) {
      this.renderNav();
      this.showStage(0);
    }
  }

  renderNav() {
    this.navContainer.innerHTML = '';
    MATERIAL_STAGES.forEach((stage, idx) => {
      const btn = document.createElement('button');
      btn.className = `flow-step-btn ${idx === 0 ? 'active' : ''} ${stage.id === 5 ? 'flagship-step-btn' : ''}`;
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', `Stage ${stage.num}: ${stage.name}`);
      btn.innerHTML = `
        <div class="flow-step-num">${stage.num}</div>
        <div class="flow-step-name">${stage.name} ${stage.id === 5 ? '<span style="color: #146B44; font-weight: 800;">★</span>' : ''}</div>
      `;
      btn.addEventListener('click', () => this.showStage(idx));
      this.navContainer.appendChild(btn);
    });
  }

  showStage(index) {
    this.currentStageIndex = index;
    const stage = MATERIAL_STAGES[index];

    // Update active nav button
    const buttons = this.navContainer.querySelectorAll('.flow-step-btn');
    buttons.forEach((b, idx) => {
      b.classList.toggle('active', idx === index);
    });

    // Update display card content
    const isFilmFlagship = (stage.id === 5);
    this.displayCard.innerHTML = `
      <div class="flow-display-preview">
        ${stage.diagramSvg}
      </div>
      <div class="flow-display-content">
        <div class="section-tag">${isFilmFlagship ? '★ STAGE 05 — FLAGSHIP COATING FILM CONVERSION' : `${stage.num} — CIRCULAR PIPELINE`}</div>
        <h3>${stage.title}</h3>
        ${isFilmFlagship ? '<p style="color: var(--accent-emerald); font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">Core Manufacturing Culmination: Transforming Calibrated Granules into High-Barrier Protective Webs.</p>' : ''}
        <p>${stage.description}</p>
        <div class="flow-specs-list">
          <div class="flow-spec-row">
            <span>Input Material</span>
            <span>${stage.inputState}</span>
          </div>
          <div class="flow-spec-row">
            <span>Processed Output</span>
            <span>${stage.outputState}</span>
          </div>
          <div class="flow-spec-row">
            <span>Quality Control Point</span>
            <span>${stage.controlPoint}</span>
          </div>
        </div>
        ${isFilmFlagship ? `
          <div style="margin-top: 1.5rem;">
            <a href="#film-showcase" class="btn btn-primary btn-sm">View Technical Coating Film Specs &rarr;</a>
          </div>
        ` : ''}
      </div>
    `;
  }
}

window.MaterialFlowManager = MaterialFlowManager;
