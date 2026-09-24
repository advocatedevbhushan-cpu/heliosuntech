/**
 * HELIOSUNTECH PLASTICS - INTERACTIVE HERO HUB & SUSTAINABILITY CALCULATOR
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroHub();
  initCarbonCalculator();
});

function initHeroHub() {
  const hubCard = document.querySelector('.hero-interactive-hub');
  const tabs = document.querySelectorAll('.hub-tab-btn');
  const badgeEl = document.getElementById('hubDivisionBadge');
  const titleEl = document.getElementById('hubDivisionTitle');
  const descEl = document.getElementById('hubDivisionDesc');
  const specAVal = document.getElementById('hubSpecAVal');
  const specALbl = document.getElementById('hubSpecALbl');
  const specBVal = document.getElementById('hubSpecBVal');
  const specBLbl = document.getElementById('hubSpecBLbl');
  const specCVal = document.getElementById('hubSpecCVal');
  const specCLbl = document.getElementById('hubSpecCLbl');
  const telemetryEl = document.getElementById('hubTelemetryText');
  const ctaBtn = document.getElementById('hubCtaBtn');
  const visualWrapper = document.getElementById('hubVisualGraphic');
  const detailsBody = document.getElementById('hubDetailsBody');

  if (!tabs.length || !titleEl) return;

  const hubData = {
    flakes: {
      badge: 'INTEGRATED RECYCLING • CLOSED-LOOP FEEDSTOCK',
      title: 'Integrated Polymer Recovery & Flakes',
      desc: 'In-house automated optical sorting, granulating, and hot-friction decontamination providing clean sustainable feedstock for our granule production.',
      specA: { val: '99.8%', lbl: 'Polymer Purity' },
      specB: { val: '< 0.05%', lbl: 'Moisture Residual' },
      specC: { val: '100%', lbl: 'Traceable Origin' },
      telemetry: 'In-House Circular Recovery: ACTIVE | Optical Sorter: ONLINE | Cross-Contamination: 0.00%',
      link: 'solutions.html#recycling',
      btnText: 'Explore Recycling Division →',
      graphicSvg: `
        <svg viewBox="0 0 280 200" fill="none" class="hub-svg-diagram">
          <defs>
            <style>
              @keyframes hub-orbit {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes hub-flake-drop-a {
                0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
                30% { opacity: 1; }
                80% { opacity: 1; }
                100% { transform: translateY(45px) rotate(35deg); opacity: 0; }
              }
              @keyframes hub-flake-drop-b {
                0% { transform: translateY(-25px) rotate(0deg); opacity: 0; }
                25% { opacity: 1; }
                75% { opacity: 1; }
                100% { transform: translateY(50px) rotate(-45deg); opacity: 0; }
              }
              @keyframes hub-nir-beam {
                0%, 100% { opacity: 0.35; stroke: #52B216; }
                50% { opacity: 1; stroke: #88DE3D; filter: drop-shadow(0 0 4px #52B216); }
              }
              .hub-orbit-group {
                transform-origin: 140px 100px;
                animation: hub-orbit 10s linear infinite;
              }
              .hub-drop-flake-1 {
                animation: hub-flake-drop-a 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              }
              .hub-drop-flake-2 {
                animation: hub-flake-drop-b 1.7s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.4s;
              }
              .hub-drop-flake-3 {
                animation: hub-flake-drop-a 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.8s;
              }
              .hub-nir-active {
                animation: hub-nir-beam 0.7s infinite alternate ease-in-out;
              }
            </style>
          </defs>

          <!-- Outer Guide Orbit -->
          <circle cx="140" cy="100" r="70" stroke="rgba(20,107,68,0.18)" stroke-width="2" stroke-dasharray="4 4" />
          <circle cx="140" cy="100" r="50" stroke="rgba(82,178,22,0.3)" stroke-width="2.5" />

          <!-- Orbiting Particles -->
          <g class="hub-orbit-group">
            <circle cx="140" cy="30" r="8" fill="#52B216" />
            <circle cx="210" cy="100" r="8" fill="#146B44" />
            <circle cx="140" cy="170" r="8" fill="#68C924" />
            <circle cx="70" cy="100" r="8" fill="#1A8253" />
          </g>

          <!-- Sorting Chute & NIR Field -->
          <polygon points="105,45 175,45 160,82 120,82" fill="#F4FAF6" stroke="#146B44" stroke-width="1.5" />
          <g class="hub-nir-active">
            <line x1="120" y1="84" x2="110" y2="120" stroke="#52B216" stroke-width="2" stroke-dasharray="3 2" />
            <line x1="140" y1="84" x2="140" y2="120" stroke="#88DE3D" stroke-width="2.5" stroke-dasharray="3 2" />
            <line x1="160" y1="84" x2="170" y2="120" stroke="#52B216" stroke-width="2" stroke-dasharray="3 2" />
          </g>

          <!-- Cascading Polymer Flakes -->
          <g class="hub-drop-flake-1">
            <polygon points="135,52 145,47 148,58 138,62" fill="#52B216" />
          </g>
          <g class="hub-drop-flake-2">
            <polygon points="125,65 138,60 135,74 122,72" fill="#146B44" />
          </g>
          <g class="hub-drop-flake-3">
            <polygon points="144,70 155,66 152,78 140,76" fill="#68C924" />
          </g>

          <!-- Center Flake Recovery Shield -->
          <rect x="118" y="98" width="44" height="44" rx="10" fill="#FFFFFF" stroke="#146B44" stroke-width="2" />
          <path d="M128 116 L140 106 L152 116 L147 132 L133 132 Z" fill="#52B216" />
          <path d="M136 114 L142 120 L134 126" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
        </svg>
      `
    },
    granules: {
      badge: 'CORE PRODUCTION • PRECISION COMPOUNDING',
      title: 'Precision Plastic Granules',
      desc: 'Advanced twin-screw compounding and underwater strand pelletizing producing uniform, high-performance LDPE, HDPE, PP & LLDPE granules.',
      specA: { val: '2.1 ±0.2', lbl: 'MFI (g/10min ASTM D1238)' },
      specB: { val: '0.923', lbl: 'Density (g/cm³ ASTM D792)' },
      specC: { val: 'Grade-A', lbl: 'Homogeneity Rating' },
      telemetry: 'Twin-Screw Extruder Zone 4: 215°C | Vacuum Degassing: -0.92 Bar | Pelletizer Speed: 1,420 RPM',
      link: 'products.html?filter=granules',
      btnText: 'Explore Plastic Granules →',
      graphicSvg: `
        <svg viewBox="0 0 280 200" fill="none" class="hub-svg-diagram">
          <defs>
            <style>
              @keyframes hub-cutter-spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes hub-screw-flow {
                0% { stroke-dashoffset: 32; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes hub-pellet-eject {
                0% { transform: translateY(-12px) translateX(-5px); opacity: 0; }
                30% { opacity: 1; }
                100% { transform: translateY(28px) translateX(8px); opacity: 0; }
              }
              @keyframes hub-heat-pulse {
                0%, 100% { fill: #D97706; opacity: 0.6; }
                50% { fill: #F59E0B; opacity: 1; filter: drop-shadow(0 0 3px #F59E0B); }
              }
              .hub-cutter-group {
                transform-origin: 215px 100px;
                animation: hub-cutter-spin 1.2s linear infinite;
              }
              .hub-screw-stream-a {
                stroke-dasharray: 14 8;
                animation: hub-screw-flow 1.2s linear infinite;
              }
              .hub-screw-stream-b {
                stroke-dasharray: 14 8;
                animation: hub-screw-flow 1.2s linear infinite 0.4s;
              }
              .hub-pellet-1 {
                animation: hub-pellet-eject 0.9s linear infinite;
              }
              .hub-pellet-2 {
                animation: hub-pellet-eject 1.1s linear infinite 0.3s;
              }
              .hub-pellet-3 {
                animation: hub-pellet-eject 1.0s linear infinite 0.6s;
              }
              .hub-heat-band {
                animation: hub-heat-pulse 1s infinite alternate ease-in-out;
              }
            </style>
          </defs>

          <!-- Extruder Barrel Body -->
          <rect x="35" y="85" width="155" height="30" rx="12" fill="#EAF6EE" stroke="#146B44" stroke-width="2"/>
          
          <!-- Heat Bands -->
          <rect x="60" y="74" width="20" height="6" rx="2" class="hub-heat-band"/>
          <rect x="95" y="74" width="20" height="6" rx="2" class="hub-heat-band" style="animation-delay: 0.3s;"/>
          <rect x="130" y="74" width="20" height="6" rx="2" class="hub-heat-band" style="animation-delay: 0.6s;"/>

          <!-- Continuous Helical Conveying Screw (Animated Flow) -->
          <path d="M45 100 L185 100" stroke="#52B216" stroke-width="4.5" stroke-linecap="round" class="hub-screw-stream-a"/>
          <path d="M45 100 L185 100" stroke="#146B44" stroke-width="2.5" stroke-linecap="round" class="hub-screw-stream-b"/>

          <!-- Die Head Lip -->
          <polygon points="190,92 205,96 205,104 190,108" fill="#F4FAF6" stroke="#146B44" stroke-width="1.8"/>

          <!-- Rotary Strand Pelletizer Cutter (Spinning) -->
          <g class="hub-cutter-group">
            <circle cx="215" cy="100" r="16" fill="#FFFFFF" stroke="#146B44" stroke-width="2"/>
            <line x1="215" y1="86" x2="215" y2="114" stroke="#146B44" stroke-width="2" stroke-linecap="round"/>
            <line x1="201" y1="100" x2="229" y2="100" stroke="#146B44" stroke-width="2" stroke-linecap="round"/>
            <circle cx="215" cy="100" r="5" fill="#52B216"/>
            <circle cx="215" cy="90" r="2.5" fill="#52B216"/>
          </g>

          <!-- Cut Pellets Ejected into Stream (Animated Dropping) -->
          <g class="hub-pellet-1">
            <circle cx="240" cy="100" r="5" fill="#52B216"/>
          </g>
          <g class="hub-pellet-2">
            <circle cx="248" cy="108" r="5.5" fill="#146B44"/>
          </g>
          <g class="hub-pellet-3">
            <circle cx="236" cy="115" r="5" fill="#68C924"/>
          </g>

          <!-- Granule Sieve / Collection Box -->
          <rect x="230" y="125" width="40" height="30" rx="6" fill="#F4FAF6" stroke="#146B44" stroke-width="1.2"/>
          <circle cx="242" cy="138" r="3.5" fill="#52B216"/>
          <circle cx="254" cy="142" r="3.5" fill="#146B44"/>
          <circle cx="246" cy="148" r="3.5" fill="#68C924"/>
        </svg>
      `
    },
    film: {
      badge: 'CORE PRODUCTION • TECHNICAL FILM EXTRUSION',
      title: 'Precision Plastic Coating Film',
      desc: 'Advanced cast & blown extrusion lines yielding uniform micron thickness, pinhole-free barrier protection, and high dart drop impact.',
      specA: { val: '25-120 μm', lbl: 'Gauge Caliber' },
      specB: { val: '> 180 g', lbl: 'Dart Drop Impact' },
      specC: { val: '42 Dynes', lbl: 'Corona Treatment' },
      telemetry: 'Line 01 Velocity: 48 m/min | Chill Roller Temp: 22°C | Gauge Uniformity: ±1.2 μm',
      link: 'products.html?filter=films',
      btnText: 'Explore Coating Films →',
      graphicSvg: `
        <svg viewBox="0 0 280 200" fill="none" class="hub-svg-diagram">
          <defs>
            <style>
              @keyframes hub-roller-cw {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes hub-roller-ccw {
                from { transform: rotate(0deg); }
                to { transform: rotate(-360deg); }
              }
              @keyframes hub-film-stream {
                from { stroke-dashoffset: 40; }
                to { stroke-dashoffset: 0; }
              }
              @keyframes hub-corona-spark {
                0% { opacity: 0.3; stroke: #52B216; }
                100% { opacity: 1; stroke: #88DE3D; filter: drop-shadow(0 0 4px #52B216); }
              }
              .hub-roller-chill {
                transform-origin: 85px 85px;
                animation: hub-roller-cw 3s linear infinite;
              }
              .hub-roller-nip {
                transform-origin: 150px 115px;
                animation: hub-roller-ccw 2.5s linear infinite;
              }
              .hub-roller-tension {
                transform-origin: 210px 80px;
                animation: hub-roller-cw 2.8s linear infinite;
              }
              .hub-roller-winder {
                transform-origin: 250px 135px;
                animation: hub-roller-cw 3.5s linear infinite;
              }
              .hub-film-line-active {
                stroke-dasharray: 14 6;
                animation: hub-film-stream 0.9s linear infinite;
              }
              .hub-film-glow-active {
                stroke-dasharray: 8 20;
                animation: hub-film-stream 0.6s linear infinite;
              }
              .hub-corona-active {
                animation: hub-corona-spark 0.35s ease-in-out infinite alternate;
              }
            </style>
          </defs>

          <!-- T-Die Extrusion Lip -->
          <polygon points="25,45 55,45 50,68 30,68" fill="#F4FAF6" stroke="#146B44" stroke-width="1.8"/>
          <rect x="35" y="68" width="10" height="4" fill="#52B216"/>

          <!-- Primary Chill Roller (Spinning CW) -->
          <g class="hub-roller-chill">
            <circle cx="85" cy="85" r="26" fill="#EAF6EE" stroke="#146B44" stroke-width="2.5"/>
            <line x1="85" y1="60" x2="85" y2="110" stroke="#146B44" stroke-width="1.5"/>
            <line x1="60" y1="85" x2="110" y2="85" stroke="#146B44" stroke-width="1.5"/>
            <circle cx="85" cy="85" r="8" fill="#FFFFFF" stroke="#52B216" stroke-width="1.5"/>
            <circle cx="85" cy="68" r="2.5" fill="#52B216"/>
          </g>

          <!-- Nip Roller (Spinning CCW) -->
          <g class="hub-roller-nip">
            <circle cx="150" cy="115" r="22" fill="#EAF6EE" stroke="#146B44" stroke-width="2"/>
            <line x1="150" y1="94" x2="150" y2="136" stroke="#146B44" stroke-width="1.5"/>
            <line x1="129" y1="115" x2="171" y2="115" stroke="#146B44" stroke-width="1.5"/>
            <circle cx="150" cy="115" r="7" fill="#FFFFFF" stroke="#52B216" stroke-width="1.5"/>
            <circle cx="150" cy="100" r="2.5" fill="#52B216"/>
          </g>

          <!-- Tension Roller (Spinning CW) -->
          <g class="hub-roller-tension">
            <circle cx="210" cy="80" r="18" fill="#EAF6EE" stroke="#146B44" stroke-width="2"/>
            <line x1="210" y1="63" x2="210" y2="97" stroke="#146B44" stroke-width="1.5"/>
            <circle cx="210" cy="80" r="6" fill="#FFFFFF" stroke="#52B216" stroke-width="1.5"/>
          </g>

          <!-- Take-up Winder Roll (Spinning CW) -->
          <g class="hub-roller-winder">
            <circle cx="250" cy="135" r="22" fill="#F4FAF6" stroke="#146B44" stroke-width="2"/>
            <circle cx="250" cy="135" r="16" stroke="#52B216" stroke-width="1.5" stroke-dasharray="4 2"/>
            <line x1="250" y1="115" x2="250" y2="155" stroke="#146B44" stroke-width="1.5"/>
            <circle cx="250" cy="135" r="6" fill="#FFFFFF"/>
          </g>

          <!-- Film Web Guide (Base Path) -->
          <path d="M40 72 L65 72 A26 26 0 0 0 108 98 L130 102 A22 22 0 0 1 170 125 L195 90 A18 18 0 0 0 225 72 L250 115" stroke="rgba(20,107,68,0.2)" stroke-width="5" stroke-linecap="round"/>

          <!-- Animated Flowing Film Stream (High Velocity) -->
          <path d="M40 72 L65 72 A26 26 0 0 0 108 98 L130 102 A22 22 0 0 1 170 125 L195 90 A18 18 0 0 0 225 72 L250 115" stroke="#52B216" stroke-width="3.5" stroke-linecap="round" class="hub-film-line-active"/>

          <!-- Glowing Film Highlights -->
          <path d="M40 72 L65 72 A26 26 0 0 0 108 98 L130 102 A22 22 0 0 1 170 125 L195 90 A18 18 0 0 0 225 72 L250 115" stroke="#88DE3D" stroke-width="2" stroke-linecap="round" class="hub-film-glow-active"/>

          <!-- Corona Surface Treater (Pulsing Sparks) -->
          <rect x="180" y="45" width="26" height="12" rx="3" fill="#0A221A" stroke="#52B216" stroke-width="1"/>
          <g class="hub-corona-active">
            <line x1="186" y1="57" x2="186" y2="70" stroke="#88DE3D" stroke-width="2" stroke-linecap="round"/>
            <line x1="193" y1="57" x2="193" y2="72" stroke="#52B216" stroke-width="2" stroke-linecap="round"/>
            <line x1="200" y1="57" x2="200" y2="70" stroke="#88DE3D" stroke-width="2" stroke-linecap="round"/>
          </g>
        </svg>
      `
    }
  };

  const DIVISIONS = ['film', 'granules', 'flakes'];
  const CYCLE_MS = 5000;
  let currentIndex = 0;
  let timerId = null;

  function updateHub(key, immediate = false) {
    const data = hubData[key];
    if (!data) return;

    currentIndex = DIVISIONS.indexOf(key);

    // 1. Update tab active state and reset progress indicators
    tabs.forEach(t => {
      const isActive = (t.dataset.division === key);
      t.classList.toggle('active', isActive);
      const prog = t.querySelector('.hub-tab-progress');
      if (prog) {
        prog.style.transition = 'none';
        prog.style.width = '0%';
      }
    });

    // 2. Animate progress bar on active tab over CYCLE_MS
    const activeTab = document.querySelector(`.hub-tab-btn[data-division="${key}"]`);
    const activeProg = activeTab ? activeTab.querySelector('.hub-tab-progress') : null;
    if (activeProg) {
      void activeProg.offsetWidth; // Force CSS reflow
      activeProg.style.transition = `width ${CYCLE_MS}ms linear`;
      activeProg.style.width = '100%';
    }

    // 3. Render content
    function renderContent() {
      badgeEl.textContent = data.badge;
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      specAVal.textContent = data.specA.val;
      specALbl.textContent = data.specA.lbl;
      specBVal.textContent = data.specB.val;
      specBLbl.textContent = data.specB.lbl;
      specCVal.textContent = data.specC.val;
      specCLbl.textContent = data.specC.lbl;
      telemetryEl.textContent = data.telemetry;
      ctaBtn.href = data.link;
      ctaBtn.textContent = data.btnText;

      if (visualWrapper) {
        visualWrapper.innerHTML = data.graphicSvg;
      }
    }

    if (immediate) {
      renderContent();
    } else {
      if (visualWrapper) visualWrapper.classList.add('hub-shifting');
      if (detailsBody) detailsBody.classList.add('hub-shifting');

      setTimeout(() => {
        renderContent();
        if (visualWrapper) visualWrapper.classList.remove('hub-shifting');
        if (detailsBody) detailsBody.classList.remove('hub-shifting');
      }, 180);
    }
  }

  function startAutoCycle() {
    stopAutoCycle();
    timerId = setInterval(() => {
      currentIndex = (currentIndex + 1) % DIVISIONS.length;
      updateHub(DIVISIONS[currentIndex]);
    }, CYCLE_MS);
  }

  function stopAutoCycle() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function restartAutoCycle() {
    stopAutoCycle();
    startAutoCycle();
  }

  // Interactive tab click
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.division;
      if (key === DIVISIONS[currentIndex]) return;
      updateHub(key);
      restartAutoCycle();
    });
  });

  // Pause on hover, resume on mouse leave
  if (hubCard) {
    hubCard.addEventListener('mouseenter', () => {
      stopAutoCycle();
      const activeProg = hubCard.querySelector('.hub-tab-btn.active .hub-tab-progress');
      if (activeProg) {
        const computedWidth = window.getComputedStyle(activeProg).width;
        activeProg.style.transition = 'none';
        activeProg.style.width = computedWidth;
      }
    });

    hubCard.addEventListener('mouseleave', () => {
      restartAutoCycle();
      const activeTab = hubCard.querySelector('.hub-tab-btn.active');
      const activeProg = activeTab ? activeTab.querySelector('.hub-tab-progress') : null;
      if (activeProg) {
        activeProg.style.transition = 'none';
        activeProg.style.width = '0%';
        void activeProg.offsetWidth;
        activeProg.style.transition = `width ${CYCLE_MS}ms linear`;
        activeProg.style.width = '100%';
      }
    });
  }

  // Start with Division 01 Plastic Coating Film (Flagship Core Manufacturing)
  updateHub('film', true);
  startAutoCycle();
}

function initCarbonCalculator() {
  const slider = document.getElementById('carbonVolumeSlider');
  const volumeDisplay = document.getElementById('calcVolumeDisplay');
  const co2Display = document.getElementById('calcCo2Display');
  const landfillDisplay = document.getElementById('calcLandfillDisplay');
  const oilDisplay = document.getElementById('calcOilDisplay');
  const ctaBtn = document.getElementById('calcCtaBtn');

  if (!slider) return;

  function calculate() {
    const val = parseInt(slider.value, 10);
    if (volumeDisplay) volumeDisplay.textContent = `${val} MT / month`;

    // 1 MT recycled plastic offsets ~1,800 kg CO2e compared to virgin fossil polymer
    const co2Savings = Math.round(val * 1.8 * 10) / 10;
    if (co2Display) co2Display.textContent = `${co2Savings.toLocaleString()} Tons`;

    // 1 MT plastic = 1,000 kg diverted from landfill/incineration
    const landfillSaved = val * 1000;
    if (landfillDisplay) landfillDisplay.textContent = `${landfillSaved.toLocaleString()} kg`;

    // 1 MT recycled plastic conserves ~16 barrels of virgin crude oil equivalent
    const oilSaved = Math.round(val * 16.3);
    if (oilDisplay) oilDisplay.textContent = `${oilSaved.toLocaleString()} Barrels`;

    if (ctaBtn) {
      ctaBtn.href = `contact.html?volume=${val}&unit=MT`;
      ctaBtn.textContent = `Reserve ${val} MT/Mo Capacity Allocation →`;
    }
  }

  slider.addEventListener('input', calculate);
  calculate();
}
