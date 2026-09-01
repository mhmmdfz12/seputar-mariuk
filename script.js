/* ============================================
   SEPUTAR MARIUK - Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ===== Page Loader =====
  const pageLoader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
    }, 800);
  });

  // Fallback: hide loader after 3s max
  setTimeout(() => {
    pageLoader.classList.add('hidden');
  }, 3000);

  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('[data-nav]');

  function handleScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link based on section
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ===== Mobile Navigation =====
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('open')
      ? 'hidden'
      : '';
  }

  function closeNav() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', toggleNav);
  navOverlay.addEventListener('click', closeNav);

  // Close nav on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  // ===== Smooth Scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80;
        const targetPos =
          target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth',
        });
      }
    });
  });

  // ===== Back to Top Button =====
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== Reveal on Scroll Animation =====
  const revealElements = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = windowHeight * 0.88;

      if (elementTop < revealPoint) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // ===== Gallery Staggered Entrance Animation =====
  const galleryItems = document.querySelectorAll('.gallery-item[data-anim]');
  let galleryAnimated = false;

  function animateGallery() {
    const gallerySection = document.getElementById('gallery');
    if (!gallerySection || galleryAnimated) return;

    const rect = gallerySection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Trigger when gallery section is about 20% visible
    if (rect.top < windowHeight * 0.8) {
      galleryAnimated = true;

      galleryItems.forEach((item, index) => {
        // Stagger each item with increasing delay for a cascade effect
        const delay = index * 120; // 120ms between each item
        setTimeout(() => {
          item.classList.add('gallery-animated');
        }, delay);
      });
    }
  }

  window.addEventListener('scroll', animateGallery);
  animateGallery(); // Initial check

  // ===== Gallery Filter =====
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const allGalleryItems = document.querySelectorAll('.gallery-item');

  galleryTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Update active tab
      galleryTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      allGalleryItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        // Remove old animation classes
        item.classList.remove('filter-hide', 'filter-show');

        if (shouldShow) {
          item.style.display = '';
          item.style.position = '';
          item.style.visibility = '';

          // Stagger the reveal animation
          const delay = index * 80;
          setTimeout(() => {
            item.classList.add('filter-show');
          }, delay);
        } else {
          item.classList.add('filter-hide');
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ===== Lightbox =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;
  let visibleItems = [];

  function getVisibleItems() {
    return Array.from(allGalleryItems).filter(
      (item) => item.style.display !== 'none' && !item.classList.contains('filter-hide')
    );
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    currentIndex = index;

    const item = visibleItems[currentIndex];
    const src = item.getAttribute('data-src');
    const caption = item.getAttribute('data-caption');

    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 400);
  }

  function navigateLightbox(direction) {
    visibleItems = getVisibleItems();
    currentIndex =
      (currentIndex + direction + visibleItems.length) % visibleItems.length;

    const item = visibleItems[currentIndex];
    const src = item.getAttribute('data-src');
    const caption = item.getAttribute('data-caption');

    // Add transition animation
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.95)';

    setTimeout(() => {
      lightboxImg.src = src;
      lightboxCaption.textContent = caption;
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    }, 200);
  }

  // Set up lightbox image transitions
  lightboxImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  // Click gallery items to open lightbox
  allGalleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const visibles = getVisibleItems();
      const visibleIndex = visibles.indexOf(item);
      if (visibleIndex !== -1) {
        openLightbox(visibleIndex);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  lightboxNext.addEventListener('click', () => navigateLightbox(1));

  // Close lightbox on overlay click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // ===== Touch swipe for lightbox =====
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          navigateLightbox(1); // Swipe left = next
        } else {
          navigateLightbox(-1); // Swipe right = prev
        }
      }
    },
    { passive: true }
  );

  // ===== Parallax scroll effect =====
  const parallaxBg = document.querySelector('.parallax-bg img');

  if (parallaxBg) {
    window.addEventListener('scroll', () => {
      const section = document.querySelector('.parallax-section');
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolled = (windowHeight - rect.top) / (windowHeight + rect.height);
        const translateY = (scrolled - 0.5) * 60;
        parallaxBg.style.transform = `translateY(${translateY}px)`;
      }
    });
  }
});
