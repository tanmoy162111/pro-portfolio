document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Cursor glow effect
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursorGlow, {
            x: mouseX,
            y: mouseY,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Hero animations
    const heroTl = gsap.timeline({ delay: 0.3 });
    
    heroTl
        .to('.hero-gradient-orb', {
            scale: 1.2,
            opacity: 0.8,
            duration: 2,
            ease: 'power2.inOut'
        })
        .to('.hero-badge', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, '-=1.5')
        .to('.hero-name', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=1')
        .to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.hero-description', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.hero-stats', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 0.8
        }, '-=0.3');

    // Hero gradient orbs continuous animation
    gsap.utils.toArray('.hero-gradient-orb').forEach((orb, i) => {
        gsap.to(orb, {
            x: `random(-50, 50)`,
            y: `random(-50, 50)`,
            scale: `random(0.8, 1.3)`,
            duration: `random(4, 6)`,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: i * 0.5
        });
    });

    // Scroll indicator hide on scroll
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        onLeave: () => {
            gsap.to('.scroll-indicator', { opacity: 0, duration: 0.3 });
        },
        onEnterBack: () => {
            gsap.to('.scroll-indicator', { opacity: 1, duration: 0.3 });
        }
    });

    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        const tag = header.querySelector('.section-tag');
        const title = header.querySelector('.section-title');
        const line = header.querySelector('.section-line');
        
        gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        })
        .fromTo(tag, 
            { opacity: 0, scale: 0.5, rotation: -180 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
        )
        .fromTo(title,
            { opacity: 0, y: 30, x: -20 },
            { opacity: 1, y: 0, x: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.3'
        )
        .fromTo(line,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1, ease: 'power3.out' },
            '-=0.5'
        );
    });

    // About section animations
    gsap.utils.toArray('.about-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 40, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: i * 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    gsap.fromTo('.about-info-grid',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.about-visual',
        { opacity: 0, x: 50, scale: 0.9 },
        {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Tech constellation animation
    gsap.utils.toArray('.tech-node').forEach((node, i) => {
        gsap.fromTo(node,
            { opacity: 0, scale: 0, rotation: -180 },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                delay: 0.5 + i * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.about-visual',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Constellation lines animation
    gsap.utils.toArray('.constellation-line').forEach((line, i) => {
        gsap.fromTo(line,
            { scaleX: 0, opacity: 0 },
            {
                scaleX: 1,
                opacity: 0.3,
                duration: 1,
                delay: 0.8 + i * 0.1,
                ease: 'power3.out',
                transformOrigin: 'left center',
                scrollTrigger: {
                    trigger: '.about-visual',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Skills section animation
    gsap.utils.toArray('.skill-category').forEach((cat, i) => {
        gsap.fromTo(cat,
            { opacity: 0, y: 50, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.skills-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Timeline animations
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.fromTo(item,
            { opacity: 0, x: -50, scale: 0.95 },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1,
                delay: i * 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Timeline line animation
    gsap.fromTo('.timeline-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
            scaleY: 1,
            duration: 2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 1
            }
        }
    );

    // Project cards animation
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, rotationX: 15 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                delay: i * 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.projects-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Contact section animations
    gsap.utils.toArray('.contact-info p, .contact-links').forEach((el, i) => {
        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    gsap.fromTo('.contact-form',
        { opacity: 0, x: 50, scale: 0.95 },
        {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Message Sent!</span>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });

    // Parallax effect on mesh background
    gsap.to('.mesh-bg', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5
        }
    });

    // Skill tags hover animation
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            gsap.to(tag, { 
                scale: 1.15, 
                duration: 0.3, 
                ease: 'back.out(1.7)',
                backgroundColor: 'rgba(99, 102, 241, 0.3)'
            });
        });
        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, { 
                scale: 1, 
                duration: 0.3, 
                ease: 'power3.out',
                backgroundColor: 'rgba(99, 102, 241, 0.1)'
            });
        });
    });

    // Project cards tilt and glow effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power3.out'
            });
        });
    });

    // Stat number counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const finalText = stat.textContent;
        const hasInfinity = finalText.includes('∞');
        
        if (!hasInfinity) {
            const number = parseInt(finalText);
            gsap.fromTo(stat,
                { textContent: 0 },
                {
                    textContent: number,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    onUpdate: function() {
                        stat.textContent = Math.floor(this.targets()[0].textContent) + (finalText.includes('+') ? '+' : '');
                    }
                }
            );
        }
    });

    // Info items staggered animation
    gsap.utils.toArray('.info-item').forEach((item, i) => {
        gsap.fromTo(item,
            { opacity: 0, y: 20, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.about-info-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Contact links animation
    gsap.utils.toArray('.contact-link').forEach((link, i) => {
        gsap.fromTo(link,
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-links',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Page load animation
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
});
