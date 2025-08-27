// Active nav
const sections = Array.from(document.querySelectorAll("section[id]"));
const navLinks = Array.from(document.querySelectorAll(".js-nav-link"));
function setActiveNav() {
  let scroll = window.scrollY + 85;
  let currentSection = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= scroll) currentSection = section;
  }
  navLinks.forEach(link => {
    link.classList.remove("active-nav");
    if (link.getAttribute("href") === "#" + currentSection.id) {
      link.classList.add("active-nav");
    }
  });
}
window.addEventListener("scroll", setActiveNav);
window.addEventListener("DOMContentLoaded", setActiveNav);

// Navbar scroll background toggle
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
});
class NextLevelLoader {
  constructor() {
    this.loader = document.getElementById('loader');
    this.progressFill = document.querySelector('.progress-fill');
    this.progressGlow = document.querySelector('.progress-glow');
    this.progressPercentage = document.querySelector('.progress-percentage');
    this.messages = document.querySelectorAll('.message');
    this.statValues = document.querySelectorAll('.stat-value[data-target]');

    this.currentProgress = 0;
    this.currentMessageIndex = 0;
    this.loadingDuration = 4000; // 4 seconds
    this.startTime = Date.now();

    this.init();
  }

  init() {
    this.startLoading();
    this.animateStats();
    this.cycleMessages();
  }

  startLoading() {
    const updateProgress = () => {
      const elapsed = Date.now() - this.startTime;
      const progress = Math.min((elapsed / this.loadingDuration) * 100, 100);

      this.updateProgress(progress);

      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        this.completeLoading();
      }
    };

    requestAnimationFrame(updateProgress);
  }

  updateProgress(progress) {
    this.currentProgress = progress;

    // Update progress bar
    this.progressFill.style.width = `${progress}%`;
    this.progressGlow.style.width = `${progress}%`;

    // Update percentage with easing
    const displayProgress = Math.floor(progress);
    this.progressPercentage.textContent = `${displayProgress}%`;

    // Add some randomness for realism
    if (progress < 95) {
      const randomDelay = Math.random() * 100;
      setTimeout(() => {
        // Small pause for realism
      }, randomDelay);
    }
  }

  cycleMessages() {
    const messageDuration = this.loadingDuration / this.messages.length;

    const showNextMessage = () => {
      // Hide current message
      if (this.currentMessageIndex > 0) {
        this.messages[this.currentMessageIndex - 1].classList.remove('active');
      }

      // Show next message
      if (this.currentMessageIndex < this.messages.length) {
        this.messages[this.currentMessageIndex].classList.add('active');
        this.typeMessage(this.currentMessageIndex);
        this.currentMessageIndex++;

        if (this.currentMessageIndex < this.messages.length) {
          setTimeout(showNextMessage, messageDuration);
        }
      }
    };

    // Start with first message
    setTimeout(showNextMessage, 1000);
  }

  typeMessage(index) {
    const message = this.messages[index];
    const messageText = message.querySelector('.message-text');
    const originalText = message.dataset.message;

    messageText.textContent = '';

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      messageText.textContent = originalText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex >= originalText.length) {
        clearInterval(typeInterval);
      }
    }, 50);
  }

  animateStats() {
    const animateValue = (element, target, duration) => {
      const start = 0;
      const startTime = Date.now();

      const updateValue = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + (target - start) * easeOutQuart);

        element.textContent = currentValue.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateValue);
        } else {
          element.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(updateValue);
    };

    // Start stat animations with staggered delays
    this.statValues.forEach((stat, index) => {
      const target = parseInt(stat.dataset.target);
      setTimeout(() => {
        animateValue(stat, target, 2000);
      }, 2500 + (index * 300));
    });
  }

  completeLoading() {
    // Add completion effects
    this.addCompletionEffects();

    // Wait a moment then fade out
    setTimeout(() => {
      this.fadeOut();
    }, 500);
  }

  addCompletionEffects() {
    // Add success glow to logo
    const logoIcon = document.querySelector('.logo-icon');
    logoIcon.style.boxShadow = '0 0 80px rgba(0, 255, 0, 0.6)';
    logoIcon.style.transform = 'scale(1.1)';

    // Flash progress bar green
    this.progressFill.style.background = 'linear-gradient(90deg, #00ff00, #00ff88)';
    this.progressGlow.style.background = 'rgba(0, 255, 0, 0.8)';

    // Show completion message
    const lastMessage = this.messages[this.messages.length - 1];
    lastMessage.classList.add('active');
    lastMessage.style.color = '#00ff00';
  }

  fadeOut() {
    this.loader.classList.add('fade-out');

    setTimeout(() => {
      if (this.loader.parentNode) {
        this.loader.parentNode.removeChild(this.loader);
      }

      // Enable page interactions
      document.body.style.overflow = '';

      // Trigger any page entry animations
      this.triggerPageAnimations();
    }, 800);
  }

  triggerPageAnimations() {
    // Trigger reveal animations for page content
    document.querySelectorAll('.reveal').forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('in');
      }, index * 100);
    });
  }
}

// Initialize Next-Level Loader when page loads
window.addEventListener('load', () => {
  new NextLevelLoader();
});

// Fallback: Remove loader after 6 seconds maximum
setTimeout(() => {
  const loader = document.getElementById('loader');
  if (loader && loader.parentNode) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.parentNode.removeChild(loader);
    }, 500);
  }
}, 6000);









// Update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Next-Level Mobile Menu JavaScript - Replace existing mobile menu code

class NextLevelMobileMenu {
  constructor() {
    this.menuButton = document.getElementById('mobile-menu-button');
    this.menuOverlay = document.getElementById('mobile-menu-overlay');
    this.menuLinks = document.querySelectorAll('.menu-link');
    this.isOpen = false;

    this.init();
  }

  init() {
    this.bindEvents();
    this.setupMenuLinks();
  }

  bindEvents() {
    // Menu toggle
    this.menuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Close menu when clicking overlay
    this.menuOverlay.addEventListener('click', (e) => {
      if (e.target === this.menuOverlay) {
        this.closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  setupMenuLinks() {
    this.menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');

        // Add ripple effect
        this.createRippleEffect(link, e);

        // Close menu with delay
        setTimeout(() => {
          this.closeMenu();
          // Navigate after menu closes
          setTimeout(() => {
            if (href.startsWith('#')) {
              const target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            } else {
              window.location.href = href;
            }
          }, 300);
        }, 200);
      });

      // Add hover sound effect (optional)
      link.addEventListener('mouseenter', () => {
        this.playHoverSound();
      });
    });
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    this.menuButton.classList.add('active');
    this.menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Add entrance animation with stagger
    this.animateMenuEntrance();

    // Play open sound
    this.playMenuSound('open');
  }

  closeMenu() {
    this.isOpen = false;
    this.menuButton.classList.remove('active');

    // Animate menu exit
    this.animateMenuExit();

    setTimeout(() => {
      this.menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }, 300);

    // Play close sound
    this.playMenuSound('close');
  }

  animateMenuEntrance() {
    // Reset all animations
    this.menuLinks.forEach(link => {
      link.style.opacity = '0';
      link.style.transform = 'translateX(-50px)';
    });

    // Animate links with stagger
    this.menuLinks.forEach((link, index) => {
      setTimeout(() => {
        link.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        link.style.opacity = '1';
        link.style.transform = 'translateX(0)';
      }, index * 100 + 300);
    });
  }

  animateMenuExit() {
    // Animate links out in reverse order
    const reversedLinks = [...this.menuLinks].reverse();

    reversedLinks.forEach((link, index) => {
      setTimeout(() => {
        link.style.transition = 'all 0.3s ease';
        link.style.opacity = '0';
        link.style.transform = 'translateX(-30px)';
      }, index * 50);
    });
  }

  createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = 100;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 211, 78, 0.3);
      transform: scale(0);
      animation: ripple-effect 0.6s ease-out;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  playMenuSound(type) {
    // Optional: Add subtle UI sounds
    if (typeof Audio !== 'undefined') {
      const frequency = type === 'open' ? 800 : 400;
      // You can implement Web Audio API sounds here
    }
  }

  playHoverSound() {
    // Optional: Add hover sound effects
  }
}

// Add ripple effect CSS
const rippleCSS = `
  @keyframes ripple-effect {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleCSS;
document.head.appendChild(styleSheet);

// Initialize Next-Level Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
  new NextLevelMobileMenu();
});


// IntersectionObserver for reveal anims
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Smooth scroll + close menu
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    if (id.length > 1) {
      e.preventDefault();
      const el = document.querySelector(id);
      if (el)
        window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute("aria-hidden", "true");
    }
  });
});

// Simple About Section JavaScript - Add this to your existing script

class SimpleAboutSection {
  constructor() {
    this.statsAnimated = false;
    this.init();
  }

  init() {
    this.initIntersectionObserver();
  }

  initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');

          // Animate stats when visible
          if (entry.target.querySelector('.stats-row') && !this.statsAnimated) {
            this.animateStats();
            this.statsAnimated = true;
          }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    statNumbers.forEach((stat, index) => {
      const target = parseInt(stat.dataset.target);
      const duration = 1500;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;

        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
          stat.classList.add('counting');
        }
      };

      // Staggered animation
      setTimeout(updateCounter, index * 200);
    });
  }
}

// Initialize Simple About Section
document.addEventListener('DOMContentLoaded', () => {
  new SimpleAboutSection();
});







class IndividualTeamCards {
  constructor() {
    // Flatten all team members into individual entries
    this.allMembers = [
      {
        name: "Prof. S.R. Sagare",
        role: "Mentor",
        department: "Faculty",
        icon: "fa-solid fa-graduation-cap",
        photo: "path/to/photo.jpg"
      },
      {
        name: "Mr. Mahaveer Daga",
        role: "President",
        department: "Executive",
        icon: "fa-solid fa-crown",
        photo: "path/to/photo.jpg"
      },
      {
        name: "Ms. Pramila Patil",
        role: "Vice President",
        department: "Executive",
        icon: "fa-solid fa-user-tie"
      },
      {
        name: "Mr. Ashish Andhale",
        role: "Vice President",
        department: "Executive",
        icon: "fa-solid fa-user-tie"
      },
      {
        name: "Ms. Devyani Patil",
        role: "Treasurer",
        department: "Finance",
        icon: "fa-solid fa-coins"
      },
      {
        name: "Mr. Mehbub Mulla",
        role: "Treasurer",
        department: "Finance",
        icon: "fa-solid fa-coins"
      },
      {
        name: "Ms. Archita Jalan",
        role: "Secretary",
        department: "Administration",
        icon: "fa-solid fa-file-pen"
      },
      {
        name: "Mr. Yash Kanire",
        role: "Secretary",
        department: "Administration",
        icon: "fa-solid fa-file-pen"
      },
      {
        name: "Ms. Samruddhi Patil",
        role: "Secretary",
        department: "Administration",
        icon: "fa-solid fa-file-pen"
      },
      {
        name: "Mr. Parshv Athane",
        role: "Technical Head",
        department: "Technical",
        icon: "fa-solid fa-code",
        photo: "https://media.licdn.com/dms/image/v2/D4D03AQFgWj2klKbAhQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729779732871?e=1755734400&v=beta&t=h7trhQ0-zgZaIJMp6MIqeaLSnqfiGaTtoEhnbgMDsos"
      },
      {
        name: "Ms. Payal Shahapure",
        role: "Technical Head",
        department: "Technical",
        icon: "fa-solid fa-code"
      },
      {
        name: "Ms. Mrudula Waichal",
        role: "Technical Head",
        department: "Technical",
        icon: "fa-solid fa-code"
      },
      {
        name: "Ms. Sejal Mali",
        role: "Technical Head",
        department: "Technical",
        icon: "fa-solid fa-code"
      },
      {
        name: "Ms. Sakshi Kamble",
        role: "Technical Head",
        department: "Technical",
        icon: "fa-solid fa-code"
      },
      {
        name: "Mr. Mrudul Deshmukh",
        role: "Event Head",
        department: "Events",
        icon: "fa-solid fa-calendar-plus"
      },
      {
        name: "Mr. Samarth Navale",
        role: "Event Head",
        department: "Events",
        icon: "fa-solid fa-calendar-plus"
      },
      {
        name: "Mr. Yash Vasagadekar",
        role: "Event Head",
        department: "Events",
        icon: "fa-solid fa-calendar-plus"
      },
      {
        name: "Mr. Viraj Kadam",
        role: "Event Head",
        department: "Events",
        icon: "fa-solid fa-calendar-plus"
      },
      {
        name: "Mr. Rajvardhan Kadam",
        role: "Social Media Manager",
        department: "Marketing",
        icon: "fa-solid fa-bullhorn"
      },
      {
        name: "Mr. Shrutik Khurape",
        role: "Marketing Head",
        department: "Marketing",
        icon: "fa-solid fa-bullhorn"
      },
      {
        name: "Mr. Sammed Kanwade",
        role: "Content Creator",
        department: "Marketing",
        icon: "fa-solid fa-bullhorn"
      },
      {
        name: "Mr. Ajay Desai",
        role: "Digital Marketer",
        department: "Marketing",
        icon: "fa-solid fa-bullhorn"
      },
      {
        name: "Ms. Gayatri Waskar",
        role: "Data Manager",
        department: "Data Management",
        icon: "fa-solid fa-database"
      },
      {
        name: "Ms. Sakshi Deshmukh",
        role: "Data Analyst",
        department: "Data Management",
        icon: "fa-solid fa-database"
      },
      {
        name: "Ms. Sanika Patil",
        role: "Database Administrator",
        department: "Data Management",
        icon: "fa-solid fa-database"
      },
      {
        name: "Ms. Isha Marathe",
        role: "Data Coordinator",
        department: "Data Management",
        icon: "fa-solid fa-database"
      }
    ];

    this.init();
  }

  init() {
    this.renderAllCards();
    this.initIntersectionObserver();
  }

  getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  getCardStyle(index) {
    const styles = ['card-style-1', 'card-style-2', 'card-style-3', 'card-style-4'];
    return styles[index % styles.length];
  }

  renderAllCards() {
    const container = document.getElementById('team-container');

    this.allMembers.forEach((member, index) => {
      const card = this.createIndividualCard(member, index);
      container.appendChild(card);
    });
  }

  createIndividualCard(member, index) {
    const card = document.createElement('div');
    card.className = `individual-card ${this.getCardStyle(index)} reveal`;
    card.style.transitionDelay = `${index * 0.05}s`;

    const photoElement = member.photo
      ? `<img src="${member.photo}" alt="${member.name}" class="profile-photo" />`
      : `<div class="profile-initials">${this.getInitials(member.name)}</div>`;

    card.innerHTML = `
      <div class="floating-element floating-element-1"></div>
      <div class="floating-element floating-element-2"></div>
      
      <div class="profile-section">
        ${photoElement}
        <div class="role-icon-overlay">
          <i class="${member.icon}"></i>
        </div>
      </div>
      
      <h3 class="member-name">${member.name}</h3>
      <p class="member-role">${member.role}</p>
      <div class="department-badge">${member.department}</div>
    `;

    return card;
  }

  initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }
}

// Initialize individual team cards
document.addEventListener('DOMContentLoaded', () => {
  new IndividualTeamCards();
});






const upcomingEvents = [
  {
    title: "Cloud Computing Workshop",
    description: "AWS + Azure fundamentals with hands-on labs.",
    date: "Oct 28, 2025",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1400&auto=format&fit=crop",
    isHighlighted: true,
  },
  {
    title: "Interview Prep Sessions",
    description: "Mock interviews and behavioral prep with alumni.",
    date: "Nov 5, 2025",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop",
    isHighlighted: false,
  },
];

// Render upcoming
const upcomingContainer = document.getElementById(
  "upcoming-events-container"
);
upcomingEvents.forEach((event, index) => {
  const eventCard = document.createElement("div");
  eventCard.className = `relative overflow-hidden rounded-2xl glass card-3d reveal upcoming-card ${event.isHighlighted ? "ring-2 ring-highlight/60 shadow-glow" : ""
    }`;

  eventCard.style.transitionDelay = index * 80 + "ms";
  eventCard.innerHTML = `
        <div class="relative">
          <img
            class="w-full h-52 sm:h-56 md:h-60 object-cover"
            src="${event.image}"
            alt="${event.title}"
          />
          ${event.isHighlighted
      ? '<div class="absolute top-4 left-4 px-3 py-1 text-xs rounded-full bg-highlight text-ink font-bold">Next Event</div>'
      : ""
    }
        </div>
        <div class="p-6">
          <h4 class="text-xl font-semibold">${event.title}</h4>
          <p class="text-white/70 mt-1">${event.description}</p>
          <div class="mt-3 text-white/60 text-sm">
            <i class="fa-regular fa-calendar-days mr-2"></i>${event.date}
          </div>
        </div>
      `;
  upcomingContainer.appendChild(eventCard);
});

// Enhanced Past Events with Modal Slideshow - REPLACE the existing pastEvents code
const pastEventsWithGallery = [
  {
    id: 'hackathon-2024',
    title: "Freshers Party",
    description: "Welcoming the new Tech Enthusiastics In College.",
    date: "Jan 2025",
    coverImage: "https://i.postimg.cc/hGy6cXWN/Freshers.jpg",
    gallery: [
      "https://i.postimg.cc/hGy6cXWN/Freshers.jpg",
      // "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop",
      // "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1400&auto=format&fit=crop",
      // "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1400&auto=format&fit=crop",
      // "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1400&auto=format&fit=crop",
      // "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
    ],
    fullDescription: `Step into the world of fun, music, and celebration!
The Fresher’s Party is here to welcome our new batch with open arms, creating memories that last a lifetime. An evening filled with dazzling performances, exciting games, groovy dance moves, and loads of laughter awaits you.

Get ready to break the ice, make new friends, and kickstart your college journey in the most happening way. Dress to impress, bring your energy, and let’s celebrate the beginning of a brand-new chapter!`,
    highlights: [
      "200+ participants from 1st, 2nd, 3rd students from our colleges",
      "Warm Welcome to the Freshers",
      "Testy Food",
      "Full on Enjoyment"
    ]
  },
  {
    id: 'ai-workshop-2024',
    title: "Inauguration Ceremony",
    description: "Starting new chapter of the ACSES.",
    date: "Nov 5-26, 2024",
    coverImage: "https://i.postimg.cc/MpPmG4tr/Inoguration.jpg",
    gallery: [
      "https://i.postimg.cc/MpPmG4tr/Inoguration.jpg",
      // "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop",
      // "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1400&auto=format&fit=crop",
      // "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop",
      // "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1400&auto=format&fit=crop"
    ],
    fullDescription: "The Fresher’s Party will begin with a grand Inauguration Ceremony, marking the start of an exciting evening filled with joy, energy, and celebration. The ceremony aims to warmly welcome the new batch and set a vibrant tone for their journey ahead.",
    highlights: [
      "Lighting of the Lamp",
      "Welcome Speech",
      "Chief Guest Address",
      "Cultural Performances",
      "Fresher Introduction Session",
      "Vote of Thanks"
    ]
  },
  {
    id: 'career-fair-2024',
    title: "Tech-Nova 2.0",
    description: "A National level event",
    date: "Aug 20, 2024",
    coverImage: "https://i.postimg.cc/7Y7LhT9v/Tech-Nova.jpg",
    gallery: [
      "https://i.postimg.cc/QMvPFVSP/t1.jpg",
      "https://i.postimg.cc/vBMr2smT/t2.jpg"
    ],
    fullDescription: "Tech Nova is a thrilling national-level technical competition designed to challenge intellect, speed, and innovation. Participants will battle through multiple rounds, testing their problem-solving skills, technical knowledge, and creativity. Gear up for a journey where aptitude meets technology and brilliance leads to victory!",
    highlights: [
      "National-Level Technical Event",
      "Aptitude Quest – Round 1",
      "Tech Challenge – Round 2",
      "Exciting Cash Prizes & Certificates",
      "Platform to Showcase Skills & Innovation",
      "Opportunity to Compete with the Best Minds"
    ]
  }
];


// Event Modal Class
class EventModal {
  constructor() {
    this.modal = document.getElementById('event-modal');
    this.modalClose = document.getElementById('modal-close');
    this.slidesTrack = document.getElementById('slides-track');
    this.slideNext = document.getElementById('slide-next');
    this.slidePrev = document.getElementById('slide-prev');
    this.slideIndicators = document.getElementById('slide-indicators');

    this.currentSlide = 0;
    this.totalSlides = 0;
    this.currentEvent = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderPastEvents();
  }

  bindEvents() {
    // Close modal events
    this.modalClose.addEventListener('click', () => this.closeModal());
    this.modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal());

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    // Slideshow navigation
    this.slideNext.addEventListener('click', () => this.nextSlide());
    this.slidePrev.addEventListener('click', () => this.prevSlide());
  }

  renderPastEvents() {
    const container = document.getElementById("past-events-container");

    pastEventsWithGallery.forEach((event, index) => {
      const eventCard = document.createElement("div");
      eventCard.className = "overflow-hidden rounded-2xl glass card-3d reveal past-card";
      eventCard.style.transitionDelay = index * 80 + "ms";
      eventCard.setAttribute('data-event-id', event.id);

      eventCard.innerHTML = `
        <div class="relative group">
          <img
            class="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            src="${event.coverImage}"
            alt="${event.title}"
            loading="lazy"
          />
        </div>
        <div class="p-5">
          <h4 class="font-semibold">${event.title}</h4>
          <p class="text-white/70 text-sm mt-1">${event.description}</p>
          <div class="mt-2 text-white/60 text-xs">
            <i class="fa-regular fa-calendar mr-2"></i>${event.date}
          </div>
        </div>
      `;

      // Add click event to open modal
      eventCard.addEventListener('click', () => this.openModal(event.id));

      container.appendChild(eventCard);
    });
  }

  openModal(eventId) {
    this.currentEvent = pastEventsWithGallery.find(event => event.id === eventId);
    if (!this.currentEvent) return;

    this.populateModalContent();
    this.setupSlideshow();

    // Show modal
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      this.modal.classList.add('active');
    }, 10);
  }

  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';

    setTimeout(() => {
      this.modal.classList.add('hidden');
      this.currentEvent = null;
      this.currentSlide = 0;
    }, 300);
  }

  populateModalContent() {
    document.getElementById('modal-title').textContent = this.currentEvent.title;
    document.getElementById('modal-date').innerHTML = `
      <i class="fa-regular fa-calendar"></i>
      ${this.currentEvent.date}
    `;
    document.getElementById('modal-description').textContent = this.currentEvent.fullDescription;

    const highlightsHtml = `
      <h4>Event Highlights:</h4>
      <ul>
        ${this.currentEvent.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
      </ul>
    `;
    document.getElementById('modal-highlights').innerHTML = highlightsHtml;
  }

  setupSlideshow() {
    this.totalSlides = this.currentEvent.gallery.length;
    this.currentSlide = 0;

    // Create slides
    this.slidesTrack.innerHTML = '';
    this.currentEvent.gallery.forEach((imageUrl, index) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.innerHTML = `<img src="${imageUrl}" alt="Event image ${index + 1}" loading="lazy" />`;
      this.slidesTrack.appendChild(slide);
    });

    // Create indicators
    this.slideIndicators.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.className = `slide-indicator ${i === 0 ? 'active' : ''}`;
      indicator.addEventListener('click', () => this.goToSlide(i));
      this.slideIndicators.appendChild(indicator);
    }

    this.updateSlideshow();
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.updateSlideshow();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlideshow();
    }
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    this.updateSlideshow();
  }

  updateSlideshow() {
    // Update slides position
    const translateX = -this.currentSlide * 100;
    this.slidesTrack.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    const indicators = this.slideIndicators.querySelectorAll('.slide-indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });

    // Update navigation buttons
    this.slidePrev.disabled = this.currentSlide === 0;
    this.slideNext.disabled = this.currentSlide === this.totalSlides - 1;
  }
}

// Initialize the enhanced events section AFTER the DOM is loaded
const eventModal = new EventModal();
document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));




// Enhanced Contact Form Handler - Add this to your existing website JS
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const messageDiv = document.getElementById("contact-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.querySelector('[name="name"]').value.trim(),
      email: form.querySelector('[name="email"]').value.trim(),
      message: form.querySelector('[name="message"]').value.trim(),
    };

    try {
      const res = await fetch("https://acses-backend.onrender.com/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        messageDiv.textContent = "✅ Success: " + (data.message || "Message sent");
        messageDiv.style.color = "limegreen";
      } else {
        messageDiv.textContent = "❌ Error: " + (data.message || "Something went wrong");
        messageDiv.style.color = "red";
      }
    } catch (err) {
      console.error("Fetch error:", err);
      messageDiv.textContent = "❌ Network error: " + err.message;
      messageDiv.style.color = "red";
    }
  });
});

document
  .querySelectorAll(".reveal")
  .forEach((el) => el.classList.add("in"));