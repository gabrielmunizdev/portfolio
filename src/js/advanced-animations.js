/**
 * Advanced Animations - Gabriel Muniz Portfolio
 * Implementa animações avançadas inspiradas no site de referência
 */

(function() {
    'use strict';

    // ====== 1. TEXT SWAPPING ANIMATION (Typewriter Effect) ======
    class TextSwapper {
        constructor(element, words, typingSpeed = 100, deletingSpeed = 50, delayBetween = 2000) {
            this.element = element;
            this.words = words;
            this.typingSpeed = typingSpeed;
            this.deletingSpeed = deletingSpeed;
            this.delayBetween = delayBetween;
            this.currentWordIndex = 0;
            this.currentText = '';
            this.isDeleting = false;
            this.init();
        }

        init() {
            this.type();
        }

        type() {
            const currentWord = this.words[this.currentWordIndex];
            
            if (this.isDeleting) {
                this.currentText = currentWord.substring(0, this.currentText.length - 1);
            } else {
                this.currentText = currentWord.substring(0, this.currentText.length + 1);
            }

            this.element.textContent = this.currentText;
            this.element.classList.add('typing');

            let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

            if (!this.isDeleting && this.currentText === currentWord) {
                typeSpeed = this.delayBetween;
                this.isDeleting = true;
            } else if (this.isDeleting && this.currentText === '') {
                this.isDeleting = false;
                this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // ====== 2. MAGNETIC BUTTONS ======
    class MagneticButton {
        constructor(element, strength = 0.3) {
            this.element = element;
            this.strength = strength;
            this.boundingRect = null;
            this.init();
        }

        init() {
            this.element.addEventListener('mouseenter', () => {
                this.boundingRect = this.element.getBoundingClientRect();
            });

            this.element.addEventListener('mousemove', (e) => {
                if (!this.boundingRect) return;

                const x = e.clientX - this.boundingRect.left;
                const y = e.clientY - this.boundingRect.top;
                const centerX = this.boundingRect.width / 2;
                const centerY = this.boundingRect.height / 2;

                const deltaX = (x - centerX) * this.strength;
                const deltaY = (y - centerY) * this.strength;

                this.element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
            });

            this.element.addEventListener('mouseleave', () => {
                this.element.style.transform = 'translate(0, 0) scale(1)';
                this.boundingRect = null;
            });
        }
    }

    // ====== 3. PARALLAX ELEMENTS ======
    class ParallaxEffect {
        constructor(elements, speed = 0.5) {
            this.elements = elements;
            this.speed = speed;
            this.init();
        }

        init() {
            window.addEventListener('scroll', () => this.update(), { passive: true });
            this.update();
        }

        update() {
            const scrollY = window.scrollY;
            this.elements.forEach(element => {
                const speed = parseFloat(element.dataset.parallaxSpeed) || this.speed;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
    }

    // ====== 4. ANIMATED COUNTERS ======
    class AnimatedCounter {
        constructor(element, duration = 2000) {
            this.element = element;
            this.target = parseInt(element.dataset.number) || 0;
            this.duration = duration;
            this.hasAnimated = false;
            this.init();
        }

        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.animate();
                        this.hasAnimated = true;
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(this.element);
        }

        animate() {
            const startTime = performance.now();
            const startValue = 0;

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / this.duration, 1);
                
                // Easing function (easeOutExpo)
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                
                const currentValue = Math.floor(startValue + (this.target - startValue) * easeProgress);
                this.element.textContent = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    this.element.textContent = this.target;
                }
            };

            requestAnimationFrame(updateCounter);
        }
    }

    // ====== 5. SMOOTH SCROLL WITH OFFSET ======
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // ====== 6. CARD HOVER EFFECTS ======
    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.portfolio-item, .service-item, .testimonial-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ====== 7. FLOATING ELEMENTS ANIMATION ======
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.item-shape, .spotlight');
        
        floatingElements.forEach((element, index) => {
            const duration = 3 + (index % 3);
            const delay = index * 0.2;
            
            element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }

    // ====== 8. SCROLL PROGRESS INDICATOR ======
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #22d3ee, #6366f1);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }, { passive: true });
    }

    // ====== INITIALIZATION ======
    document.addEventListener('DOMContentLoaded', function() {
        // Text Swapping
        const swapElement = document.querySelector('.item-text.is-visible');
        if (swapElement) {
            const words = ['Engenheiro da Computação', 'Desenvolvedor Web', 'Especialista em IA'];
            new TextSwapper(swapElement, words);
        }

        // Magnetic Buttons
        document.querySelectorAll('.tf-btn, .btn-arrow').forEach(btn => {
            new MagneticButton(btn, 0.25);
        });

        // Parallax Elements
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (parallaxElements.length > 0) {
            new ParallaxEffect(parallaxElements);
        }

        // Animated Counters
        document.querySelectorAll('.odometer').forEach(counter => {
            new AnimatedCounter(counter);
        });

        // Initialize other effects
        initSmoothScroll();
        initCardHoverEffects();
        initFloatingElements();
        initScrollProgress();

        // Add floating animation keyframes
        if (!document.querySelector('#floating-keyframes')) {
            const style = document.createElement('style');
            style.id = 'floating-keyframes';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-10px) rotate(5deg); }
                    50% { transform: translateY(-20px) rotate(0deg); }
                    75% { transform: translateY(-10px) rotate(-5deg); }
                }
            `;
            document.head.appendChild(style);
        }
    });

})();
