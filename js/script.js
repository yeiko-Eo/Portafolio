// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close menu when clicking on a link (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Smooth scroll effect for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll appearance effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply effect to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Change header style on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(26, 54, 93, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--dark-blue)';
        header.style.backdropFilter = 'none';
    }
});

// Skill bars animation on scroll
const skillBars = document.querySelectorAll('.skill-level');
const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevel = entry.target;
            const width = skillLevel.style.width;
            skillLevel.style.width = '0';
            setTimeout(() => {
                skillLevel.style.transition = 'width 1.5s ease-in-out';
                skillLevel.style.width = width;
            }, 300);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// CV Download functionality
document.getElementById('download-cv').addEventListener('click', function() {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Set the href to your CV file path
    link.href = './assets/LuisFajardoCV.pdf'; // Update this path to your actual CV file
    
    // Set the download attribute with the desired file name
    link.download = 'LuisFajardoCV.pdf';
    
    // Append to the body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Show a confirmation message
    alert('Your CV download has started!');
});

// Typewriter effect in the hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter effect if the element exists
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 120);
}

// Active navigation links on scroll
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Project filtering (if you add categories in the future)
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (category === 'all' || project.getAttribute('data-category') === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 50);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Preloader
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-blue);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div class="spinner" style="
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255,255,255,0.3);
            border-top: 5px solid var(--accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    
    document.body.appendChild(preloader);
    
    // Hide preloader when page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize preloader
initPreloader();

// Parallax effect for the hero
function initParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax effect
initParallax();

// Viewport detection for additional animations
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-content');
const elementObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(element => {
    elementObserver.observe(element);
});

// Add CSS styles for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .skill-category, .project-card, .timeline-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .skill-category.animate-in, 
    .project-card.animate-in, 
    .timeline-content.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(animationStyles);