document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    menuToggle.addEventListener('click', function () {
        mobileNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Mobile dropdown functionality
    const mobileDropdownTriggers = document.querySelectorAll('.mobile-nav .has-dropdown');
    const mobileSubDropdownTriggers = document.querySelectorAll('.mobile-nav .has-subdropdown');

    mobileDropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();

            // Close all other mobile dropdowns
            mobileDropdownTriggers.forEach(other => {
                if (other !== this) {
                    other.classList.remove('active');
                    const otherDropdown = other.nextElementSibling;
                    if (otherDropdown) otherDropdown.classList.remove('active');
                }
            });

            this.classList.toggle('active');
            const dropdown = this.nextElementSibling;
            if (dropdown) dropdown.classList.toggle('active');
        });
    });

    mobileSubDropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();

            // Close all other subdropdowns
            mobileSubDropdownTriggers.forEach(other => {
                if (other !== this) {
                    other.classList.remove('active');
                    const otherSub = other.nextElementSibling;
                    if (otherSub) otherSub.classList.remove('active');
                }
            });

            this.classList.toggle('active');
            const subdropdown = this.nextElementSibling;
            if (subdropdown) subdropdown.classList.toggle('active');
        });
    });

    // Desktop submenu (Destination > In Vizag / Around Vizag)


    // Close all dropdowns on outside click
document.addEventListener('click', function (e) {
  if (!e.target.closest('.custom-navbar')) {
    mobileNav.classList.remove('active');
    menuToggle.classList.remove('active');

    document.querySelectorAll('.mobile-dropdown, .mobile-subdropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });

    document.querySelectorAll('.has-dropdown, .has-subdropdown').forEach(item => {
        item.classList.remove('active');
    });

    // Also hide desktop submenus
    document.querySelectorAll('.dropdown-submenu').forEach(menu => {
        menu.style.display = 'none';
    });
  }
});

// Close mobile nav on window resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('active');

        document.querySelectorAll('.mobile-dropdown, .mobile-subdropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });

        document.querySelectorAll('.has-dropdown, .has-subdropdown').forEach(item => {
            item.classList.remove('active');
        });
    }
});
 const container = document.getElementById('scrollContainer');
  const cards = document.querySelectorAll('.scroll-card');

  let scrollTimeout;
  let autoScrollInterval;
  let userInteracted = false;
  let lastScrollLeft = container.scrollLeft;
  let scrollDirection = 1; // 1 = right, -1 = left

  function triggerTilt(direction) {
    const tiltValue = direction === 1 ? 'rotateZ(2deg)' : 'rotateZ(-2deg)';
    cards.forEach(card => {
      card.style.transform = tiltValue;
    });

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      cards.forEach(card => {
        card.style.transform = 'rotateZ(0deg)';
      });
    }, 15);
  }

  function autoScroll() {
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft >= maxScroll) {
      scrollDirection = -1;
    } else if (container.scrollLeft <= 0) {
      scrollDirection = 1;
    }

    container.scrollBy({ left: 350 * scrollDirection, behavior: 'smooth' });
    triggerTilt(scrollDirection);
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(autoScroll, 2000);
  }

  function pauseAutoScrollTemporarily() {
    clearInterval(autoScrollInterval);
    userInteracted = true;
    setTimeout(() => {
      userInteracted = false;
      startAutoScroll();
    }, 2000);
  }

  container.addEventListener('scroll', () => {
    const newScrollLeft = container.scrollLeft;
    const direction = newScrollLeft > lastScrollLeft ? 1 : -1;
    lastScrollLeft = newScrollLeft;

    scrollDirection = direction;
    triggerTilt(direction);

    if (!userInteracted) pauseAutoScrollTemporarily();
  });
  const carousel = document.querySelector('#mainCarousel');
  startAutoScroll();
});
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
      // Remove active class from all buttons
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      // Show all items if 'all' is selected
      if (filter === 'all') {
          document.querySelectorAll('.grid-item').forEach(item => {
              item.style.display = 'block';
          });
      } else {
          // Show only items with matching class
          document.querySelectorAll('.grid-item').forEach(item => {
              if (item.classList.contains(filter)) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      }
  });
});

/* Activity cards animation */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.grid-item').forEach(item => {
    observer.observe(item);
  });


document.addEventListener('DOMContentLoaded', function() {
  const accommodationGrid = document.getElementById('accommodation-grid');
  
  function checkScroll() {
      const gridPosition = accommodationGrid.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // When 100px of the grid is visible from the bottom
      if (gridPosition.top < windowHeight - 100) {
          accommodationGrid.classList.add('animate-cards');
          window.removeEventListener('scroll', checkScroll);
      }
  }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check in case already in view
});
document.addEventListener('DOMContentLoaded', function() {
  // Form validation
  const form = document.querySelector('form');
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
          alert('Please fill in all required fields');
          return;
      }
      
      // Simulate form submission
      console.log('Form submitted:', {
          name,
          email,
          subject: document.getElementById('subject').value,
          message,
          newsletter: document.getElementById('newsletter').checked
      });
      
      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
  });
});

// corousel
let currentSlide = 0;
let autoSlideInterval;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateCarouselPosition();
}

function updateCarouselPosition() {
    const container = document.querySelector('.carousel-container');
    const slideWidth = document.querySelector('.carousel-slide').clientWidth;
    container.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
}

// Automatically change slides every 3 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 3000); // 3000ms = 3 seconds
}

// Initialize the carousel and start auto-slide
document.addEventListener('DOMContentLoaded', () => {
    updateCarouselPosition();
    startAutoSlide();
});

