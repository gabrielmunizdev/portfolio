/**
 * Particle Background Animation
 * Cria um efeito de partículas animadas no background
 */

(function() {
    'use strict';

    class ParticleBackground {
        constructor(containerId, options = {}) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;

            this.options = {
                particleCount: options.particleCount || 50,
                particleColor: options.particleColor || 'rgba(34, 211, 238, 0.3)',
                lineColor: options.lineColor || 'rgba(34, 211, 238, 0.1)',
                particleSize: options.particleSize || 2,
                lineDistance: options.lineDistance || 150,
                speed: options.speed || 0.5,
                interactive: options.interactive !== false
            };

            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.mouse = { x: null, y: null, radius: 150 };
            
            this.init();
        }

        init() {
            this.canvas.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.container.style.position = 'relative';
            this.container.appendChild(this.canvas);

            this.resize();
            this.createParticles();
            
            window.addEventListener('resize', () => this.resize());
            
            if (this.options.interactive) {
                window.addEventListener('mousemove', (e) => {
                    const rect = this.container.getBoundingClientRect();
                    this.mouse.x = e.clientX - rect.left;
                    this.mouse.y = e.clientY - rect.top;
                });

                window.addEventListener('mouseout', () => {
                    this.mouse.x = null;
                    this.mouse.y = null;
                });
            }

            this.animate();
        }

        resize() {
            this.canvas.width = this.container.offsetWidth;
            this.canvas.height = this.container.offsetHeight;
        }

        createParticles() {
            this.particles = [];
            for (let i = 0; i < this.options.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * this.options.speed,
                    vy: (Math.random() - 0.5) * this.options.speed,
                    size: Math.random() * this.options.particleSize + 1
                });
            }
        }

        drawParticle(particle) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.options.particleColor;
            this.ctx.fill();
        }

        drawLine(p1, p2, distance) {
            const opacity = 1 - (distance / this.options.lineDistance);
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.options.lineColor.replace(/[\d.]+\)$/g, opacity + ')');
            this.ctx.lineWidth = 0.5;
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
        }

        updateParticle(particle) {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }

            // Mouse interaction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.vx -= Math.cos(angle) * force * 0.1;
                    particle.vy -= Math.sin(angle) * force * 0.1;
                }
            }

            // Limit velocity
            const maxSpeed = this.options.speed * 2;
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > maxSpeed) {
                particle.vx = (particle.vx / speed) * maxSpeed;
                particle.vy = (particle.vy / speed) * maxSpeed;
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Update and draw particles
            this.particles.forEach(particle => {
                this.updateParticle(particle);
                this.drawParticle(particle);
            });

            // Draw lines between close particles
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.options.lineDistance) {
                        this.drawLine(this.particles[i], this.particles[j], distance);
                    }
                }
            }

            requestAnimationFrame(() => this.animate());
        }
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        // Add particle background to hero section
        const heroSection = document.querySelector('#about');
        if (heroSection && window.matchMedia('(min-width: 768px)').matches) {
            new ParticleBackground('about', {
                particleCount: 40,
                particleColor: 'rgba(34, 211, 238, 0.4)',
                lineColor: 'rgba(34, 211, 238, 0.15)',
                particleSize: 2,
                lineDistance: 120,
                speed: 0.3,
                interactive: true
            });
        }
    });

    // Export for global use
    window.ParticleBackground = ParticleBackground;

})();
