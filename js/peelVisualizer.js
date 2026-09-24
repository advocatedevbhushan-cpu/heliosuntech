/**
 * HELIOSUNTECH PLASTICS - INTERACTIVE SURFACE PROTECTION PEEL & SCRATCH VISUALIZER
 * Demonstrates real-world protection against industrial abrasions, transit scratches,
 * and adhesive residue.
 */

(function () {
  'use strict';

  const SUBSTRATES = {
    steel: {
      name: "Brushed Stainless Steel & Coils",
      grade: "Coating Film Grade CF-100",
      unprotectedIssues: [
        "Severe transit scuffs & tool gouges (-22% aesthetic yield)",
        "Micro-pitting and moisture-induced oxidation spots",
        "Costly post-fabrication repolishing & scrap rates"
      ],
      protectedBenefits: [
        "100% pristine Ra < 0.05 µm mirror surface preservation",
        "Zero adhesive ghosting or residue on high-speed mechanical peel",
        "Withstands deep drawing and bending pressures without tearing"
      ],
      adhesion: "0.22 N / cm (ASTM D3330)",
      peelTack: "Low-Medium Controlled Tack",
      thickness: "50 µm Heavy-Duty",
      uvRating: "Indoor / 90 Days Transit"
    },
    aluminum: {
      name: "Architectural Aluminum & ACP Panels",
      grade: "Exterior Barrier Film BF-200",
      unprotectedIssues: [
        "Extrusion die lines, handling abrasions, and swirl blemishes",
        "UV degradation, weather staining, and jobsite mortar burns",
        "Client rejection during architectural façade installations"
      ],
      protectedBenefits: [
        "UV-stabilized outdoor resistance up to 6 months without brittleness",
        "Clean, silent peel without fiber tear or sticky transfer",
        "High elongation (>520%) prevents puncture over sharp panel profiles"
      ],
      adhesion: "0.18 N / cm (ASTM D3330)",
      peelTack: "Ultra-Low Controlled Release",
      thickness: "60 µm UV-Stabilized",
      uvRating: "Outdoor 180 Days UV Stable"
    },
    plastics: {
      name: "High-Gloss Acrylic & Polycarbonate Sheets",
      grade: "Optical Clarity Film TC-300",
      unprotectedIssues: [
        "Electrostatic dust attraction and micro-marring in transit",
        "Solvent haze, adhesive ghosting, and optical distortion",
        "Thermal warping and micro-crazing under warehouse humidity"
      ],
      protectedBenefits: [
        "Optical haze retained under 2.2% with crystal clarity",
        "Static-dissipative formulation prevents dust agglomeration",
        "Hermetic barrier protects against volatile organic solvents"
      ],
      adhesion: "0.12 N / cm (ASTM D3330)",
      peelTack: "Clean Static / Low Tack",
      thickness: "35 µm High-Clarity",
      uvRating: "Anti-Static / Clean Room"
    }
  };

  class SurfaceVisualizer {
    constructor() {
      this.container = document.getElementById('surfacePeelVisualizer');
      if (!this.container) return;

      this.sliderTrack = document.getElementById('peelSliderTrack');
      this.clipOverlay = document.getElementById('peelClipOverlay');
      this.handle = document.getElementById('peelHandle');
      this.rangeInput = document.getElementById('peelRangeInput');

      this.currentPercent = 50;
      this.isDragging = false;
      this.currentSubstrate = 'steel';

      this.init();
    }

    init() {
      this.bindEvents();
      this.updateSlider(50);
      this.renderSubstrateData('steel');
    }

    bindEvents() {
      // 1. Range input (accessible & instant)
      if (this.rangeInput) {
        this.rangeInput.addEventListener('input', (e) => {
          this.updateSlider(parseFloat(e.target.value));
        });
      }

      // 2. Direct Pointer / Drag on Slider Track
      if (this.sliderTrack) {
        const onPointerMove = (e) => {
          if (!this.isDragging) return;
          this.handlePointerPosition(e);
        };

        const onPointerUp = () => {
          this.isDragging = false;
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
        };

        this.sliderTrack.addEventListener('pointerdown', (e) => {
          this.isDragging = true;
          this.handlePointerPosition(e);
          window.addEventListener('pointermove', onPointerMove);
          window.addEventListener('pointerup', onPointerUp);
        });
      }

      // 3. Preset View Buttons (0%, 50%, 100%)
      const presetBtns = this.container.querySelectorAll('.peel-preset-btn');
      presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          presetBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const target = parseFloat(btn.dataset.percent);
          this.animateSliderTo(target);
        });
      });

      // 4. Substrate Selector Buttons
      const substrateBtns = this.container.querySelectorAll('.peel-substrate-btn');
      substrateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          substrateBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const substrateKey = btn.dataset.substrate;
          if (substrateKey && SUBSTRATES[substrateKey]) {
            this.currentSubstrate = substrateKey;
            this.renderSubstrateData(substrateKey);
          }
        });
      });

      // 5. Simulate Clean Peel Button
      const peelSimBtn = document.getElementById('btnSimulatePeel');
      if (peelSimBtn) {
        peelSimBtn.addEventListener('click', () => {
          this.runPeelSimulation();
        });
      }
    }

    handlePointerPosition(e) {
      if (!this.sliderTrack) return;
      const rect = this.sliderTrack.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      let percent = ((clientX - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));
      this.updateSlider(percent);
      if (this.rangeInput) this.rangeInput.value = percent;
    }

    updateSlider(percent) {
      this.currentPercent = percent;
      const rounded = Math.round(percent);

      if (this.clipOverlay) {
        // Distortion-free clip-path: reveals from left (0) to percent
        this.clipOverlay.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        this.clipOverlay.style.webkitClipPath = `inset(0 ${100 - percent}% 0 0)`;
      }

      if (this.handle) {
        this.handle.style.left = `${percent}%`;
      }

      const readout = document.getElementById('peelSplitPercent');
      if (readout) {
        readout.textContent = `${rounded}%`;
      }

      // Update comparison labels visibility / opacity
      const unprotLabel = document.getElementById('unprotectedBadge');
      const protLabel = document.getElementById('protectedBadge');

      if (unprotLabel) {
        unprotLabel.style.opacity = percent < 15 ? '0.3' : '1';
      }
      if (protLabel) {
        protLabel.style.opacity = percent > 85 ? '0.3' : '1';
      }
    }

    animateSliderTo(targetPercent, duration = 350) {
      const startPercent = this.currentPercent;
      const diff = targetPercent - startPercent;
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Ease-out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const nextVal = startPercent + diff * ease;
        this.updateSlider(nextVal);
        if (this.rangeInput) this.rangeInput.value = nextVal;

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }

    runPeelSimulation() {
      // Animate from 100% (fully covered) down to 25% (peeled back to show mirror finish)
      this.updateSlider(100);
      if (this.rangeInput) this.rangeInput.value = 100;

      setTimeout(() => {
        this.animateSliderTo(25, 950);
      }, 150);
    }

    renderSubstrateData(key) {
      const data = SUBSTRATES[key];
      if (!data) return;

      const titleEl = document.getElementById('peelSubstrateTitle');
      const gradeEl = document.getElementById('peelGradeBadge');
      const adhesionEl = document.getElementById('peelAdhesionVal');
      const tackEl = document.getElementById('peelTackVal');
      const gaugeEl = document.getElementById('peelGaugeVal');
      const uvEl = document.getElementById('peelUvVal');

      if (titleEl) titleEl.textContent = data.name;
      if (gradeEl) gradeEl.textContent = data.grade;
      if (adhesionEl) adhesionEl.textContent = data.adhesion;
      if (tackEl) tackEl.textContent = data.peelTack;
      if (gaugeEl) gaugeEl.textContent = data.thickness;
      if (uvEl) uvEl.textContent = data.uvRating;

      // Populate issues list
      const issuesList = document.getElementById('peelIssuesList');
      if (issuesList) {
        issuesList.innerHTML = data.unprotectedIssues.map(issue => `
          <li style="display: flex; gap: 0.65rem; align-items: flex-start; margin-bottom: 0.55rem; font-size: 0.88rem; color: #DC2626; line-height: 1.45;">
            <span style="font-weight: 800; font-size: 1rem; line-height: 1;">✕</span>
            <span>${issue}</span>
          </li>
        `).join('');
      }

      // Populate benefits list
      const benefitsList = document.getElementById('peelBenefitsList');
      if (benefitsList) {
        benefitsList.innerHTML = data.protectedBenefits.map(benefit => `
          <li style="display: flex; gap: 0.65rem; align-items: flex-start; margin-bottom: 0.55rem; font-size: 0.88rem; color: #146B44; line-height: 1.45;">
            <span style="font-weight: 800; font-size: 1rem; line-height: 1; color: #52B216;">✓</span>
            <span>${benefit}</span>
          </li>
        `).join('');
      }
    }
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    window.surfaceVisualizerInst = new SurfaceVisualizer();
  });
})();
