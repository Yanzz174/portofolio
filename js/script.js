// Memperbarui tahun secara otomatis di bagian footer
document.getElementById('year').textContent = new Date().getFullYear();

// ANIMASI SCROLL REVEAL DUA ARAH (FADE IN & FADE OUT)
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();

        // Batas deteksi elemen saat masuk ke layar (atas dan bawah)
        const isInViewport = (rect.top < windowHeight * 0.85) && (rect.bottom > 100);

        if (isInViewport) {
            // Tambahkan class aktif jika elemen masuk ke layar
            el.classList.add('active');
        } else {
            // Hapus class aktif jika elemen keluar dari layar (scroll ke atas/bawah)
            el.classList.remove('active');
        }
    });
};

// NAVIGASI MOBILE (HAMBURGER MENU TOGGLE)
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');

        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-xmark');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            if (menuIcon) {
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-xmark');
            }
        });
    });
}

// Jalankan fungsi saat halaman dimuat dan saat di-scroll
window.addEventListener('DOMContentLoaded', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);
