// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

// Set initial theme
if (savedTheme) {
    body.classList.toggle('light-theme', savedTheme === 'light-theme');
    icon.className = savedTheme === 'light-theme' ? 'fas fa-moon' : 'fas fa-sun';
} else {
    // If no saved preference, use system preference
    body.classList.toggle('light-theme', !prefersDarkScheme.matches);
    icon.className = prefersDarkScheme.matches ? 'fas fa-sun' : 'fas fa-moon';
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    
    // Update icon
    icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    
    // Save preference
    localStorage.setItem('theme', isLight ? 'light-theme' : 'dark-theme');
    
    // Add transition effect
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-level');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            bar.style.width = bar.parentElement.getAttribute('data-level') || '0%';
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Initialize skill levels
document.querySelectorAll('.skill-level').forEach(level => {
    const width = level.style.width;
    level.style.width = '0';
    level.parentElement.setAttribute('data-level', width);
});

// Navbar hide/show on scroll
let lastScrollTop = 0;
let isScrolling;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    // Add hidden class while scrolling
    navbar.classList.add('nav-hidden');
    
    // Clear the timeout throughout the scroll
    clearTimeout(isScrolling);
    
    // Set a timeout to show the navbar after scrolling stops
    isScrolling = setTimeout(() => {
        navbar.classList.remove('nav-hidden');
    }, 150); // Adjust this value to control how quickly the navbar appears after stopping scroll
});

// Enhanced floating icons animation
document.addEventListener('scroll', () => {
    const icons = document.querySelectorAll('.tech-icon');
    const scrolled = window.scrollY;
    
    icons.forEach((icon, index) => {
        // Create different movement patterns based on icon size and position
        const speed = (index % 3 + 1) * 0.5;
        const rotation = scrolled * speed;
        const scale = 1 + Math.sin(scrolled * 0.002 + index) * 0.1;
        
        // Add parallax effect
        const yOffset = scrolled * (index % 5 - 2) * 0.05;
        
        // Apply transforms with different patterns for each size
        if (icon.classList.contains('large')) {
            icon.style.transform = `rotate(${rotation}deg) scale(${scale}) translateY(${yOffset}px)`;
        } else if (icon.classList.contains('medium')) {
            icon.style.transform = `rotate(-${rotation}deg) scale(${scale * 0.9}) translateY(${yOffset * 1.2}px)`;
        } else {
            icon.style.transform = `rotate(${rotation * 1.5}deg) scale(${scale * 0.8}) translateY(${yOffset * 1.5}px)`;
        }
    });
});

// Add mouse movement interaction
document.addEventListener('mousemove', (e) => {
    const icons = document.querySelectorAll('.tech-icon');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    icons.forEach((icon, index) => {
        const factor = index % 3 === 0 ? 15 : index % 2 === 0 ? 10 : 5;
        const xOffset = mouseX * factor;
        const yOffset = mouseY * factor;
        
        // Get existing transform and add mouse movement
        const currentTransform = icon.style.transform;
        if (currentTransform.includes('translateY')) {
            icon.style.transform = currentTransform.replace(
                /translateY\([^)]+\)/, 
                `translateY(${yOffset}px) translateX(${xOffset}px)`
            );
        }
    });
});

// Add hover effects to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.skill-icon');
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease';
    });

    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.skill-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe all skill items and project cards
document.querySelectorAll('.skill-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add fade-in animation class
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(fadeInStyle);

// CV Download functionality
document.addEventListener('DOMContentLoaded', () => {
    const cvDownloadButton = document.getElementById('cv-download-btn');
    if (cvDownloadButton) {
        cvDownloadButton.addEventListener('click', () => {
            const cvPath = 'Ramachandraa_PS_CV.pdf';
            const link = document.createElement('a');
            link.href = cvPath;
            link.view = 'Ramachandraa_PS_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});