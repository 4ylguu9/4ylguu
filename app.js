// app.js — small interaction helpers: reveal-on-scroll and mobile nav toggle
(function(){
  'use strict';

  // Reveal on scroll using IntersectionObserver
  const revealSelector = ['.hero','.card','.tips','main','section','.features'].join(',');
  const elems = Array.from(document.querySelectorAll(revealSelector));

  elems.forEach(el => el.classList.add('reveal'));

  const ioOptions = { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 };
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        // once visible, unobserve to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, ioOptions);

  elems.forEach(el => io.observe(el));

  // Mobile nav toggle: add handler for button .menu-toggle
  const toggle = document.querySelector('.menu-toggle');
  if(toggle){
    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('nav-open');
      // toggle aria-expanded
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // Close mobile nav when clicking a link
  document.addEventListener('click', (e) => {
    if(e.target.matches('.nav a') && document.documentElement.classList.contains('nav-open')){
      document.documentElement.classList.remove('nav-open');
      const btn = document.querySelector('.menu-toggle'); if(btn) btn.setAttribute('aria-expanded','false');
    }
  });

  // Small keyboard accessibility: close nav on Escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && document.documentElement.classList.contains('nav-open')){
      document.documentElement.classList.remove('nav-open');
      const btn = document.querySelector('.menu-toggle'); if(btn) btn.setAttribute('aria-expanded','false');
    }
  });

})();
