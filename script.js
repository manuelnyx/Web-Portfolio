document.addEventListener('DOMContentLoaded', () => {
  // 1. Dinamis mengupdate tahun hak cipta di footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Kontrol Toggle Menu Navigasi Mobile
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const spans = menuBtn.querySelectorAll('span');
      if (spans.length === 3) {
        spans[0].classList.toggle('rotate-45');
        spans[0].classList.toggle('translate-y-2');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('-rotate-45');
        spans[2].classList.toggle('-translate-y-2.5');
      }
    });

    // Menutup menu mobile saat mengklik tautan navigasi
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const spans = menuBtn.querySelectorAll('span');
        if (spans.length === 3) {
          spans[0].classList.remove('rotate-45', 'translate-y-2');
          spans[1].classList.remove('opacity-0');
          spans[2].classList.remove('-rotate-45', '-translate-y-2.5');
        }
      });
    });
  }

  // 3. Efek Interaktif Latar Belakang Neural/Partikel (Plexus Canvas)
  const canvas = document.getElementById('neuralCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 65;
    const mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 0.8;
        // Warna partikel disesuaikan: biru langit/slate
        this.color = Math.random() > 0.5 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(14, 165, 233, 0.4)';
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * 1.5;
            this.y += (dy / distance) * force * 1.5;
          }
        }
        this.x += this.vx;
        this.y += this.vy;
        this.draw();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
      }
    }

    function connect() {
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            const opacity = (1 - (distance / maxDistance)) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
      connect();
      requestAnimationFrame(animate);
    }

    init();
    animate();
  }

  // 4. Submit form kontak
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Terima kasih! Pesan Anda telah terkirim (Simulasi).');
      contactForm.reset();
    });
  } // closing for if (contactForm)

  // 5. Dinamis Membuat Favicon Bulat dari logo.png
  const faviconLink = document.getElementById('dynamic-favicon');
  if (faviconLink) {
    const img = new Image();
    img.src = 'logo.png'; // Pastikan sesuai dengan nama file
    img.onload = () => {
      const favCanvas = document.createElement('canvas');
      favCanvas.width = 64;
      favCanvas.height = 64;
      const fCtx = favCanvas.getContext('2d');

      // Menggambar bentuk lingkaran (bulat)
      fCtx.beginPath();
      fCtx.arc(32, 32, 32, 0, Math.PI * 2);
      fCtx.closePath();
      fCtx.clip();

      // Mengisi lingkaran dengan gambar logo
      fCtx.drawImage(img, 0, 0, 64, 64);

      // Update favicon original dengan versi gambar (Base64) yang sudah bulat
      faviconLink.href = favCanvas.toDataURL('image/png');
    };
  }
});
