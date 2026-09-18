/**
 * HELIOSUNTECH PLASTICS - SIGNATURE POLYMER PARTICLE ENGINE
 * Lightweight, GPU-friendly Canvas 2D simulation depicting
 * molecular transformation: Waste Flakes -> Granules -> Coating Film.
 */

class PolymerParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 55;
    this.mouse = { x: null, y: null, radius: 130 };
    this.isRunning = true;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mouse interactive tracking
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
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
    this.width = this.canvas.parentElement.clientWidth;
    this.height = this.canvas.parentElement.clientHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Scale count based on screen width
    this.particleCount = this.width < 768 ? 28 : 55;
  }

  createParticles() {
    this.particles = [];
    const colors = ['#00E599', '#00B4D8', '#F8FAFC', '#94A3B8'];

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        radius: Math.random() * 2.8 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.25,
        // Particle shape type: 0 = granule circle, 1 = flake polygon
        type: Math.random() > 0.6 ? 1 : 0,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02
      });
    }
  }

  drawStatic() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particles.forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();
    });
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw particle links (Polymer chains)
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = '#00E599';
          this.ctx.globalAlpha = (1 - dist / 110) * 0.15;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }

    // Update and draw particles
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;

      // Bounce off boundaries
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse displacement
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x += (dx / dist) * force * 2.5;
          p.y += (dy / dist) * force * 2.5;
        }
      }

      // Draw particle (granule or flake)
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.angle);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;

      if (p.type === 1) {
        // Hexagonal Flake
        this.ctx.beginPath();
        const r = p.radius * 1.4;
        for (let a = 0; a < 6; a++) {
          const ang = (a * Math.PI) / 3;
          const px = Math.cos(ang) * r;
          const py = Math.sin(ang) * r;
          if (a === 0) this.ctx.moveTo(px, py);
          else this.ctx.lineTo(px, py);
        }
        this.ctx.closePath();
        this.ctx.fill();
      } else {
        // Spherical Granule with soft glow
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    });

    requestAnimationFrame(() => this.animate());
  }
}

window.PolymerParticleEngine = PolymerParticleEngine;
