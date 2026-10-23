// Initialize Lucide icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
  /* ============================
     TYPED.JS INITIALIZATION
  ============================ */
  if (document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: [
        'AI Developer',
        'Full Stack Developer',
        'Machine Learning Enthusiast'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    });
  }

  /* ============================
     AOS INITIALIZATION
  ============================ */
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 50
  });

  /* ============================
     SMOOTH SCROLLING UPDATE ACTIVE LINK
  ============================ */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `index.html#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ============================
     ANIMATED COUNTERS
  ============================ */
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const animateStats = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute('data-target'), 10);
          
          let startValue = 0;
          const duration = 2000;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // easeOutQuad
            const easeProgress = progress * (2 - progress);
            
            const currentValue = Math.floor(easeProgress * endValue);
            target.textContent = currentValue + "+";

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = endValue + "+";
            }
          };

          requestAnimationFrame(updateCounter);
          observer.unobserve(target); // Only animate once
        }
      });
    };

    const statsObserver = new IntersectionObserver(animateStats, {
      threshold: 0.5
    });

    statNumbers.forEach(stat => {
      statsObserver.observe(stat);
    });
  }
});
