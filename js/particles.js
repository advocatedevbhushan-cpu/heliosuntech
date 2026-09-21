/**
 * HELIOSUNTECH PLASTICS - FLUID POLYMER & RESIN PELLET SIMULATION
 * Dynamic, GPU-accelerated canvas simulating floating recycled polymer granules,
 * translucent flakes, and gentle flowing resin streamlines on a clean eco-backdrop.
 */

class PolymerParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 42;
    this.mouse = { x: -1000, y: -1000, radius: 180 };
    this.isRunning = true;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.time = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mouse tracking for fluid deflection
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    if (!this.reducedMotion) {
      this.createParticles();
      this.animate();
    } else {
      this.createParticles();
      this.drawStatic();
    }
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    this.width = parent.clientWidth;
    this.height = parent.clientHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    this.particleCount = this.width < 768 ? 20 : 36;
  }

  createParticles() {
    this.particles = [];
    // Brand Colors: Emerald, Recycling Lime, Pale Eco-Mint, Slate Forest
    const colors = [
      { fill: 'rgba(20, 107, 68, 0.35)', stroke: 'rgba(20, 107, 68, 0.65)' },
      { fill: 'rgba(82, 178, 22, 0.40)', stroke: 'rgba(82, 178, 22, 0.75)' },
      { fill: 'rgba(104, 201, 36, 0.30)', stroke: 'rgba(104, 201, 36, 0.60)' },
      { fill: 'rgba(26, 130, 83, 0.25)', stroke: 'rgba(26, 130, 83, 0.50)' }
    ];

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        originX: Math.random() * this.width,
        originY: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 5 + 3.5, // 3.5px to 8.5px circular resin pellet
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.35 ? 'pellet' : 'flake', // circular pellet or faceted flake
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  drawPellet(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);

    // Glowing drop aura
    const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius * 2);
    gradient.addColorStop(0, p.color.fill);
    gradient.addColorStop(1, 'transparent');
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, p.radius * 2, 0, Math.PI * 2);
    this.ctx.fill();

    // Core Polymer Pellet Sphere
    this.ctx.beginPath();
    this.ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = p.color.fill;
    this.ctx.fill();
    this.ctx.strokeStyle = p.color.stroke;
    this.ctx.lineWidth = 1.2;
    this.ctx.stroke();

    // Specular Highlight (Simulating 3D translucent plastic resin bead)
    this.ctx.beginPath();
    this.ctx.arc(-p.radius * 0.35, -p.radius * 0.35, p.radius * 0.3, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    this.ctx.fill();

    this.ctx.restore();
  }

  drawFlake(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.angle);

    // Faceted polygon for shredded recycled plastic flake
    const r = p.radius * 1.3;
    this.ctx.beginPath();
    this.ctx.moveTo(r * 0.8, -r * 0.5);
    this.ctx.lineTo(r * 0.4, r * 0.9);
    this.ctx.lineTo(-r * 0.7, r * 0.6);
    this.ctx.lineTo(-r * 0.9, -r * 0.4);
    this.ctx.lineTo(-r * 0.2, -r * 0.9);
    this.ctx.closePath();

    this.ctx.fillStyle = p.color.fill;
    this.ctx.fill();
    this.ctx.strokeStyle = p.color.stroke;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawStatic() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particles.forEach((p) => {
      if (p.type === 'pellet') this.drawPellet(p);
      else this.drawFlake(p);
    });
  }

  animate() {
    if (!this.isRunning) return;

    this.time += 0.01;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Subtle gentle fluid stream connections between near pellets
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          // Curved polymer flow streamline
          const mx = (this.particles[i].x + this.particles[j].x) / 2 + Math.sin(this.time + i) * 6;
          const my = (this.particles[i].y + this.particles[j].y) / 2 + Math.cos(this.time + j) * 6;
          this.ctx.quadraticCurveTo(mx, my, this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = 'rgba(20, 107, 68, 0.15)';
          this.ctx.lineWidth = (1 - dist / 100) * 1.5;
          this.ctx.stroke();
        }
      }
    }

    // Update & draw particles
    this.particles.forEach((p) => {
      // Gentle floating physics
      p.x += p.vx + Math.sin(this.time + p.pulseOffset) * 0.2;
      p.y += p.vy + Math.cos(this.time + p.pulseOffset) * 0.2;
      p.angle += p.rotationSpeed;

      // Mouse gentle repulsion
      const mdx = p.x - this.mouse.x;
      const mdy = p.y - this.mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < this.mouse.radius && mdist > 0) {
        const force = (1 - mdist / this.mouse.radius) * 1.5;
        p.x += (mdx / mdist) * force;
        p.y += (mdy / mdist) * force;
      }

      // Wrap around edges
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;
      if (p.y < -20) p.y = this.height + 20;
      if (p.y > this.height + 20) p.y = -20;

      if (p.type === 'pellet') this.drawPellet(p);
      else this.drawFlake(p);
    });

    requestAnimationFrame(() => this.animate());
  }
}

window.PolymerParticleEngine = PolymerParticleEngine;
