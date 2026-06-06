// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    // Prevent body scroll when menu open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !burger.contains(e.target)) {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// Fleet carousel
const track = document.getElementById('fleetTrack');
const prevBtn = document.getElementById('fleetPrev');
const nextBtn = document.getElementById('fleetNext');

if (track && prevBtn && nextBtn) {
  let current = 0;
  const cards = track.querySelectorAll('.fleet-card');
  const total = cards.length;

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-advance
  setInterval(() => goTo(current + 1), 5000);
}

// Contact form Web3Forms
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Šaljem...';
    btn.disabled = true;

    const data = new FormData(form);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      if (json.success) {
        btn.textContent = 'Upit poslan!';
        btn.style.background = '#28a745';
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Pošalji upit';
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      btn.textContent = 'Greška — pokušajte ponovo';
      btn.style.background = '#dc3545';
      setTimeout(() => {
        btn.textContent = 'Pošalji upit';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  });
}


// Vehicle galleries
document.querySelectorAll('.vehicle-thumb').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const targetId = thumb.dataset.target;
    const full = thumb.dataset.full;
    const target = document.getElementById(targetId);
    if (!target || !full) return;

    target.src = full;
    target.alt = thumb.querySelector('img')?.alt || target.alt;

    const group = thumb.parentElement;
    if (group) {
      group.querySelectorAll('.vehicle-thumb').forEach((item) => item.classList.remove('is-active'));
    }
    thumb.classList.add('is-active');
  });
});
