/* ============================================================
   SCRIPT.JS - Complete functionality
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ============================================================
  // 1. LOADING SCREEN
  // ============================================================
  const loader = document.getElementById('loader');
  window.addEventListener('load', function() {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  });

  // ============================================================
  // 2. DARK / LIGHT MODE
  // ============================================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', function() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
  });

  // ============================================================
  // 3. TYPING ANIMATION
  // ============================================================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const phrases = [
      'BCA Final Year Student',
      'Full-Stack Developer',
      'UI/UX Enthusiast',
      'Problem Solver',
      'Tech Explorer'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 60;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1800;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }
      setTimeout(typeEffect, typingSpeed);
    }
    setTimeout(typeEffect, 800);
  }

  // ============================================================
  // 4. SCROLL PROGRESS BAR
  // ============================================================
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', Math.round(progress));
  });

  // ============================================================
  // 5. SCROLL TO TOP BUTTON
  // ============================================================
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================================
  // 6. ACTIVE NAVIGATION
  // ============================================================
  const navLinks = document.querySelectorAll('.nav-menu a:not(.theme-toggle)');
  
  // Determine current page from URL
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // For section-based highlighting on index.html
  if (currentPage === 'index.html' || currentPage === '') {
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
      let current = '';
      const scrollPos = window.scrollY + 100;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', updateActiveNav);
    setTimeout(updateActiveNav, 100);
  }

  // ============================================================
  // 7. SMOOTH SCROLLING
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          const toggle = document.getElementById('mobileToggle');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // ============================================================
  // 8. MOBILE MENU TOGGLE
  // ============================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  mobileToggle.addEventListener('click', function() {
    const isOpen = navMenu.classList.toggle('open');
    this.setAttribute('aria-expanded', isOpen);
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar')) {
      navMenu.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      const icon = mobileToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
  });

  // ============================================================
  // 9. SCROLL REVEAL ANIMATION
  // ============================================================
  const revealElements = document.querySelectorAll(
    '.project-card, .skill-badge, .hero-text, .hero-image, .cta-box, .section-header, .glass, .about-intro, .project-item, .contact-info-card, .contact-form-card'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal-hidden');
    revealObserver.observe(el);
  });

  // ============================================================
  // 10. ANIMATED SKILL BARS (for skills page)
  // ============================================================
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width') || '80%';
          bar.style.width = width;
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  // ============================================================
  // 11. CIRCULAR PROGRESS ANIMATION
  // ============================================================
  const circles = document.querySelectorAll('.circle-progress');
  if (circles.length) {
    const circularObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          const target = parseInt(circle.getAttribute('data-target'));
          const circumference = 2 * Math.PI * 50;
          const offset = circumference - (target / 100) * circumference;
          circle.style.strokeDashoffset = offset;
          circularObserver.unobserve(circle);
        }
      });
    }, { threshold: 0.3 });
    circles.forEach(circle => {
      circle.style.strokeDashoffset = 314.159;
      circularObserver.observe(circle);
    });
  }

  // ============================================================
  // 12. PROJECT FILTERING (for projects page)
  // ============================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (filterButtons.length && projectItems.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        projectItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ============================================================
  // 13. CONTACT FORM VALIDATION
  // ============================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';

      if (name && name.value.trim().length < 2) {
        if (nameError) nameError.textContent = 'Name must be at least 2 characters.';
        isValid = false;
      }
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          if (emailError) emailError.textContent = 'Please enter a valid email address.';
          isValid = false;
        }
      }
      if (message && message.value.trim().length < 10) {
        if (messageError) messageError.textContent = 'Message must be at least 10 characters.';
        isValid = false;
      }

      if (isValid) {
        const successMsg = document.getElementById('successMessage');
        if (successMsg) {
          successMsg.style.display = 'block';
          contactForm.reset();
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 4000);
        } else {
          alert('Message sent successfully! (Demo)');
          contactForm.reset();
        }
      }
    });
  }

  // ============================================================
  // 14. MODAL POPUP (for projects page)
  // ============================================================
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  if (modalTriggers.length && modalOverlay) {
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('data-modal-target'));
        if (target) {
          const title = target.querySelector('.project-title')?.textContent || 'Project';
          const desc = target.querySelector('.project-desc')?.textContent || '';
          const tech = target.querySelector('.project-tech')?.textContent || '';
          document.getElementById('modalTitle').textContent = title;
          document.getElementById('modalDesc').textContent = desc;
          document.getElementById('modalTech').innerHTML = tech.split('·').map(t => `<span>${t.trim()}</span>`).join('');
          modalOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeModal() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
      });
    }
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  console.log('🚀 Pranjali Yadav Portfolio — fully loaded!');
});