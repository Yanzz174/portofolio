// Memperbarui tahun secara otomatis di bagian footer
document.getElementById('year').textContent = new Date().getFullYear();

// ANIMASI SCROLL REVEAL (FADE IN & FADE OUT)
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInViewport = (rect.top < windowHeight * 0.88) && (rect.bottom > 40);

        if (isInViewport) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
};

// LOGIKA PENGGANTIAN TEMA (DARK / LIGHT MODE)
const themeToggleBtns = document.querySelectorAll('.theme-toggle');

function updateThemeUI(isLight) {
    themeToggleBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        const span = btn.querySelector('span');

        if (icon) {
            if (isLight) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }

        if (span) {
            span.textContent = isLight ? 'Mode Gelap' : 'Mode Terang';
        }
    });
}

// Cek preferensi tema yang tersimpan di localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    updateThemeUI(true);
}

themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        updateThemeUI(isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
});

// NAVIGASI MOBILE & BLUR OVERLAY LOGIC
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const menuOverlay = document.getElementById('menu-overlay');
const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

function openMenu() {
    navLinks.classList.add('nav-active');
    if (menuOverlay) menuOverlay.classList.add('active');
    if (menuIcon) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
    }
}

function closeMenu() {
    navLinks.classList.remove('nav-active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    if (menuIcon) {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navLinks.classList.contains('nav-active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('scroll', () => {
        if (navLinks.classList.contains('nav-active')) {
            closeMenu();
        }
        revealOnScroll();
    }, { passive: true });
}

// Jalankan saat dokumen dimuat
window.addEventListener('DOMContentLoaded', revealOnScroll);
