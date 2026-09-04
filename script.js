/* ─────────────────────────────────────────────────────────────
   Portfolio interactions
   ───────────────────────────────────────────────────────────── */

(() => {
  /* ── Live clock ── */
  const timeEl = document.getElementById('liveTime');
  const yearEl = document.getElementById('liveYear');

  const tickTime = () => {
    if (!timeEl) return;
    const now = new Date();
    const t = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Berlin',
      hour12: false,
    }).format(now);
    timeEl.textContent = `${t} CET`;
  };
  tickTime();
  setInterval(tickTime, 30 * 1000);

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll(
    '.section-head, .stack-card, .featured-project, .project-card, .t-item, .contact-grid'
  );

  reveals.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ── Click to copy email ── */
  const copyEmail = document.getElementById('copyEmail');
  if (copyEmail) {
    copyEmail.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = 'brikendgjyliqi@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        copyEmail.classList.add('copied');
        const hint = copyEmail.querySelector('.copy-hint');
        const original = hint.textContent;
        hint.textContent = '';
        setTimeout(() => {
          copyEmail.classList.remove('copied');
          hint.textContent = original;
        }, 1800);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }
})();
/* ─────────────────────────────────────────────────────────────
   Case study screenshot slider
   ───────────────────────────────────────────────────────────── */

(() => {
  document.querySelectorAll('.case-slider').forEach((slider) => {
    const track = slider.querySelector('.slider-track');
    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    const prevBtn = slider.querySelector('.slider-btn--prev');
    const nextBtn = slider.querySelector('.slider-btn--next');
    const dotsWrap = slider.querySelector('.slider-dots');
    const caption = slider.querySelector('.slider-caption');
    let index = 0;

    // Build dots
    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => go(i));
      dotsWrap.appendChild(dot);
      return dot;
    });

    const go = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
      if (caption) {
        caption.textContent = slides[index].dataset.caption || '';
      }
    };

    prevBtn.addEventListener('click', () => go(index - 1));
    nextBtn.addEventListener('click', () => go(index + 1));

    // Keyboard
    slider.tabIndex = 0;
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'ArrowRight') go(index + 1);
    });

    // Touch swipe
    let startX = null;
    slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    go(0);
  });
})();
