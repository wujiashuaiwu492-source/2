/* ============================================================
   NovaMind AI — Shared JavaScript
   ============================================================ */
(function(){
  // ---- Navbar scroll ----
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      const s = window.scrollY > 40;
      nav.classList.toggle('scrolled', s);
    });
  }

  // ---- Mobile hamburger ----
  const burger = document.getElementById('hamburger');
  const mobile = document.getElementById('mobileMenu');
  if (burger && mobile) {
    let open = false;
    burger.addEventListener('click', () => {
      open = !open;
      burger.classList.toggle('open', open);
      mobile.style.maxHeight = open ? mobile.scrollHeight + 'px' : '0';
    });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      open = false;
      burger.classList.remove('open');
      mobile.style.maxHeight = '0';
    }));
    window.addEventListener('resize', () => {
      if (open) mobile.style.maxHeight = mobile.scrollHeight + 'px';
    });
  }

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));
  new MutationObserver(() => {
    document.querySelectorAll('.reveal:not([data-reveal])').forEach(el => {
      el.setAttribute('data-reveal', '1');
      observer.observe(el);
    });
  }).observe(document.body, { childList: true, subtree: true });

  // ---- Counter animation ----
  const counters = document.querySelectorAll('.stat-num');
  const counterObs = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target; counterObs.unobserve(el);
      const target = parseInt(el.dataset.target);
      const hp = el.classList.contains('plus');
      let cur = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const ti = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(ti); }
        el.textContent = cur + (hp ? '+' : '');
      }, 25);
    }
  }, { threshold: 0.5 });
  counters.forEach(el => counterObs.observe(el));

  // ---- Toast ----
  window.showToast = function(msg, isError) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'toast show' + (isError ? ' error' : '');
    clearTimeout(t._tid);
    t._tid = setTimeout(() => t.classList.remove('show'), 2800);
  };

  // ---- Modal open/close ----
  document.querySelectorAll('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => {
      if (e.target === ov) ov.classList.remove('open');
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });

  // ---- Copy buttons ----
  document.addEventListener('click', e => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    navigator.clipboard.writeText(btn.dataset.copy).then(
      () => showToast('✓ 已复制: ' + btn.dataset.copy),
      () => showToast('复制失败，请手动复制', true)
    );
  });

  // ---- Smooth anchor scroll (offset for fixed nav) ----
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href') === '#') return;
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });

})();
