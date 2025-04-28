// Smooth Scroll Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Product Button Click - (Bisa dipakai buat redirect ke form isi ID / form pembelian)
const buyButtons = document.querySelectorAll('.btn-secondary');
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Silahkan isi data ID di form pembelian, lalu klik "Checkout"!');
        window.scrollTo({
            top: document.querySelector('.form-section').offsetTop,
            behavior: 'smooth'
        });
    });
});

// Form Submit Action
const form = document.getElementById('checkoutForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih sudah melakukan order! Kami akan segera memproses pesanan Anda.');
        form.reset();
    });
}

// Animasi Product muncul saat scroll (Simple AOS Manual)
const productCards = document.querySelectorAll('.product-card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.3
});

productCards.forEach(card => {
    observer.observe(card);
});

// Particles Background (Optional kalau mau tambah efek bintang-bintang)
document.addEventListener('DOMContentLoaded', () => {
    const particles = document.createElement('div');
    particles.classList.add('particles');
    document.body.appendChild(particles);

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = Math.random() * window.innerHeight + 'px';
        particles.appendChild(star);
    }
});