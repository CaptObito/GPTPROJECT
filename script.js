// Smooth scroll to top
const scrollTopBtn = document.createElement('button');
scrollTopBtn.textContent = '↑';
scrollTopBtn.classList.add('scroll-top');
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Confirm before "buy"
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product a').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const productName = btn.closest('.product').querySelector('h3').textContent;
      const confirmed = confirm(`Apakah kamu yakin ingin membeli ${productName}?`);
      if (confirmed) {
        window.location.href = `https://wa.me/6282276742515?text=Halo%20Saya%20ingin%20topup%20${encodeURIComponent(productName)}`;
      }
    });
  });
});

// Dark-Light Toggle (Optional)
const modeToggle = document.createElement('button');
modeToggle.textContent = 'Mode Gelap / Terang';
modeToggle.style.position = 'fixed';
modeToggle.style.bottom = '20px';
modeToggle.style.right = '20px';
modeToggle.style.padding = '10px 15px';
modeToggle.style.background = '#6a00f4';
modeToggle.style.color = '#fff';
modeToggle.style.border = 'none';
modeToggle.style.borderRadius = '10px';
modeToggle.style.cursor = 'pointer';
document.body.appendChild(modeToggle);

let dark = true;
modeToggle.addEventListener('click', () => {
  document.body.style.background = dark ? '#fff' : '#0f011a';
  document.body.style.color = dark ? '#000' : '#fff';
  dark = !dark;
});

// Extra: Add little glow to buttons on hover
document.querySelectorAll('.product a').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.boxShadow = '0 0 15px #8e2de2';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.boxShadow = 'none';
  });
});