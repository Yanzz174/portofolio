// Memperbarui tahun secara otomatis di bagian footer
document.getElementById('year').textContent = new Date().getFullYear();

// ANIMASI SCROLL REVEAL (OPTIMASI UNTUK MOBLIE & DESKTOP)
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();

        // Toleransi jarak pemicu disesuaikan agar stabil di layar HP yang pendek
        const isInViewport = (rect.top < windowHeight * 0.9) && (rect.bottom > 40);

        if (isInViewport) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
};

// NAVIGASI MOBILE (HAMBURGER MENU TOGGLE)
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('nav-active');

        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-xmark');
        }
    });

    // Otomatis tutup menu saat memilih tautan
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            if (menuIcon) {
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-xmark');
            }
        });
    });

    // Otomatis tutup menu jika pengguna mengklik area di luar menu
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('nav-active');
            if (menuIcon) {
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-xmark');
            }
        }
    });
}

// Jalankan saat dokumen dimuat dan di-scroll
window.addEventListener('DOMContentLoaded', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);
