// particles.js configuration for hero section
document.addEventListener('DOMContentLoaded', function() {
  // Initialize particles.js if available
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
  }

  // Add animation delay classes
  const animateElements = document.querySelectorAll('.animate-slide-up');
  animateElements.forEach((el, index) => {
    if (index > 0) {
      el.style.animationDelay = `${index * 0.2}s`;
    }
  });

  // Add hover effect to 3D team cards
  const teamCards = document.querySelectorAll('.preserve-3d');
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'rotateY(180deg)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'rotateY(0deg)';
    });
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const heroSection = document.querySelector('.relative.z-10');
    if (heroSection) {
      heroSection.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
  });
});