window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('.terminal, .hero-name, .hero-roles, .hero-desc, .hero-cta, .hero-stats, .scroll-hint').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── Particle canvas ────────────────────────────────────────────────
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = Math.min(55, Math.floor(window.innerWidth / 22));

  class Dot {
    constructor() { this.init(); }
    init() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.r  = Math.random() * 1.4 + 0.4;
      this.vx = (Math.random() - .5) * .28;
      this.vy = (Math.random() - .5) * .28;
      this.a  = Math.random() * .35 + .08;
      this.c  = Math.random() > .5 ? '0,255,136' : '0,212,255';
    }
    step() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.c},${this.a})`;
      ctx.fill();
    }
  }

  const dots = Array.from({ length: PARTICLE_COUNT }, () => new Dot());

  const LINK_DIST = 110;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.length; i++) {
      dots[i].step();
      dots[i].draw();
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(0,255,136,${(1 - d / LINK_DIST) * .12})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();

  // ── Cursor glow ─────────────────────────────────────────────────────
  const glow = document.getElementById('cursorGlow');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let gx = mx, gy = my;

  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function trackGlow() {
    gx += (mx - gx) * .07;
    gy += (my - gy) * .07;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(trackGlow);
  })();

  // ── Terminal typing ─────────────────────────────────────────────────
  const LINES = [
    '> initializing system...',
    '> loading profile: tanmoy_kumar_saha',
    '> domains: full-stack · AI · security',
    '> status: AVAILABLE_FOR_HIRE ✓',
  ];

  const textEl   = document.getElementById('terminalText');
  const cursorEl = document.getElementById('tCursor');
  let lineIdx = 0, charIdx = 0, built = '';

  function type() {
    if (lineIdx >= LINES.length) {
      cursorEl.style.display = 'none';
      return;
    }
    const line = LINES[lineIdx];
    if (charIdx < line.length) {
      built += line[charIdx++];
      textEl.textContent = built;
      setTimeout(type, 32);
    } else {
      built += '\n';
      textEl.textContent = built;
      lineIdx++; charIdx = 0;
      setTimeout(type, 180);
    }
  }

  // ── Hero entrance ───────────────────────────────────────────────────
  gsap.timeline({ onComplete: type })
    .to('.terminal',   { opacity: 1, y: 0, duration: .6, ease: 'power2.out' })
    .to('.hero-name',  { opacity: 1, y: 0, duration: .5, ease: 'power2.out' }, '-=.1')
    .to('.hero-roles', { opacity: 1, y: 0, duration: .4, ease: 'power2.out' }, '-=.1')
    .to('.hero-desc',  { opacity: 1, y: 0, duration: .4, ease: 'power2.out' }, '-=.1')
    .to('.hero-cta',   { opacity: 1, y: 0, duration: .4, ease: 'power2.out' }, '-=.1')
    .to('.hero-stats', { opacity: 1, y: 0, duration: .4, ease: 'power2.out' }, '-=.1')
    .to('.scroll-hint',{ opacity: 1, duration: .4, ease: 'power2.out' }, '-=.05');

  // ── Stat counters ───────────────────────────────────────────────────
  function countUp(el, target, ms) {
    const start = performance.now();
    (function tick(now) {
      const p  = Math.min((now - start) / ms, 1);
      const ep = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ep * target);
      if (p < 1) requestAnimationFrame(t => tick(t));
      else el.textContent = target;
    })(start);
  }

  ScrollTrigger.create({
    trigger: '.hero-stats',
    start: 'top 82%',
    once: true,
    onEnter() {
      document.querySelectorAll('.stat-num').forEach(el => {
        countUp(el, parseInt(el.dataset.target), 1200);
      });
    }
  });

  // ── Navbar scroll state ─────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 70);
  }, { passive: true });

  // ── Active nav link via IntersectionObserver ────────────────────────
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));

  // ── Mobile menu ─────────────────────────────────────────────────────
  const mobileBtn  = document.getElementById('mobileBtn');
  const navLinksEl = document.getElementById('navLinks');

  mobileBtn.addEventListener('click', () => {
    const open = navLinksEl.classList.toggle('open');
    mobileBtn.classList.toggle('open', open);
    mobileBtn.setAttribute('aria-expanded', String(open));
  });

  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      mobileBtn.classList.remove('open');
      mobileBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Smooth scroll (offset for fixed nav) ───────────────────────────
  const NAV_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - NAV_H, behavior: 'smooth' });
    });
  });

  // ── Scroll reveal setup ─────────────────────────────────────────────
  // Mark elements with js- classes then animate
  const mark = (sel, cls) => document.querySelectorAll(sel).forEach(el => el.classList.add(cls));

  mark('.section-eyebrow, .section-title', 'js-reveal');
  mark('.about-text', 'js-reveal-left');
  mark('.about-cards', 'js-reveal-right');
  mark('.skill-cat', 'js-reveal');
  mark('.timeline-item, .edu-card', 'js-reveal-left');
  mark('.proj-card', 'js-reveal-scale');
  mark('.contact-desc, .contact-item', 'js-reveal');

  // Generic vertical reveal
  gsap.utils.toArray('.js-reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: .6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 87%', once: true }
    });
  });

  // Left reveal
  gsap.utils.toArray('.js-reveal-left').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: .65, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 87%', once: true }
    });
  });

  // Right reveal
  gsap.utils.toArray('.js-reveal-right').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: .65, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 87%', once: true }
    });
  });

  // Scale reveal — project cards stagger by grid column position
  gsap.utils.toArray('.js-reveal-scale').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, scale: 1, duration: .5, ease: 'power2.out',
      delay: (i % 3) * .07,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });

  // Skill tag bounce-in per category
  document.querySelectorAll('.skill-cat').forEach(cat => {
    ScrollTrigger.create({
      trigger: cat, start: 'top 82%', once: true,
      onEnter() {
        gsap.from(cat.querySelectorAll('.tag'), {
          opacity: 0, y: 8, scale: .88,
          duration: .28, stagger: .045, ease: 'back.out(1.6)'
        });
      }
    });
  });

  // Timeline line draw
  ScrollTrigger.create({
    trigger: '.timeline', start: 'top 74%', once: true,
    onEnter() {
      const line = document.getElementById('timelineLine');
      const full = line.parentElement.offsetHeight - 12;
      gsap.to(line, { height: full, duration: 1.1, ease: 'power2.inOut' });
    }
  });
});
