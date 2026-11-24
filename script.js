document.addEventListener('DOMContentLoaded', () => {
  // iOS Safari only applies :active on touch when a touch listener exists on the document.
  document.addEventListener('touchstart', () => {}, { passive: true });

  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    if (!menuBtn || !mobileMenu) return;
    mobileMenu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenu.hidden = isExpanded;
      menuBtn.setAttribute('aria-expanded', String(!isExpanded));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
        menuBtn.focus();
      }
    });
  }

  const faviconLink = document.getElementById('dynamic-favicon');
  if (faviconLink) {
    const img = new Image();
    img.src = 'logo.png';
    img.onload = () => {
      const favCanvas = document.createElement('canvas');
      favCanvas.width = 64;
      favCanvas.height = 64;
      const fCtx = favCanvas.getContext('2d');
      fCtx.beginPath();
      fCtx.arc(32, 32, 32, 0, Math.PI * 2);
      fCtx.closePath();
      fCtx.clip();
      fCtx.drawImage(img, 0, 0, 64, 64);
      faviconLink.href = favCanvas.toDataURL('image/png');
    };
  }
});
