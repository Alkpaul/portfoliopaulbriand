// ===== GESTION DE LA NAVIGATION ACTIVE =====
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Navigation au clic
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ===== GESTION DES CAROUSELS D'IMAGES =====
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.media-carousel, .minecraft-carousel');

    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        
        let currentIndex = 0;

        // Créer dynamiquement les indicateurs en fonction du nombre d'images
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = '';
            images.forEach((_, index) => {
                const indicator = document.createElement('span');
                indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
                indicator.addEventListener('click', () => {
                    currentIndex = index;
                    showImage(currentIndex);
                });
                indicatorsContainer.appendChild(indicator);
            });
        }

        const indicators = carousel.querySelectorAll('.indicator');

        function showImage(index) {
            // Boucle
            if (index >= images.length) currentIndex = 0;
            if (index < 0) currentIndex = images.length - 1;

            images.forEach((img, i) => {
                img.classList.remove('active');
                if (indicators[i]) {
                    indicators[i].classList.remove('active');
                }
            });

            images[currentIndex].classList.add('active');
            if (indicators[currentIndex]) {
                indicators[currentIndex].classList.add('active');
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex--;
                showImage(currentIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex++;
                showImage(currentIndex);
            });
        }
    });
});

// ===== ANIMATIONS AU SCROLL =====
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les cartes et éléments
    document.querySelectorAll('.experience-card, .project-card, .country-card, .score-card, .gallery-item, .highlight-card').forEach(el => {
        observer.observe(el);
    });
});

// ===== SMOOTH SCROLL AMÉLIORÉ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== PARALLAX EFFECT SUBTIL =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero-visual');
    
    if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// ===== GESTION DU KEYBOARD =====
document.addEventListener('keydown', (e) => {
    const currentNav = document.querySelector('.nav-link.active');
    const allNavs = Array.from(document.querySelectorAll('.nav-link'));
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = allNavs.indexOf(currentNav);
        const nextIndex = (currentIndex + 1) % allNavs.length;
        allNavs[nextIndex].click();
    }
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = allNavs.indexOf(currentNav);
        const prevIndex = currentIndex === 0 ? allNavs.length - 1 : currentIndex - 1;
        allNavs[prevIndex].click();
    }
});

// ===== ANIMATIONS DE PAGE LOAD =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    const elements = document.querySelectorAll('h1, h2, .cta-buttons, .experience-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
        }, index * 50);
    });
});