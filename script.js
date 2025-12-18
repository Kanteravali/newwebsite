// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Features Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const featuresContents = document.querySelectorAll('.features-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        featuresContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Testimonials Slider
const testimonialDots = document.querySelectorAll('.slider-dot');
const testimonials = document.querySelectorAll('.testimonial');
let currentSlide = 0;

function showSlide(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected testimonial and activate dot
    testimonials[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentSlide = index;
}

// Add click events to dots
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide testimonials
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}, 5000);

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.classList.contains('open');
        
        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.classList.remove('open');
        });
        
        // Remove active class from all questions
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
        });
        
        // If it wasn't open, open it
        if (!isOpen) {
            answer.classList.add('open');
            question.classList.add('active');
        }
    });
});

// Pricing Tabs
const pricingTabs = document.querySelectorAll('.pricing-tab');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const annualPrices = document.querySelectorAll('.annual-price');

pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        pricingTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show/hide prices based on selected tab
        const plan = tab.getAttribute('data-plan');
        
        if (plan === 'monthly') {
            monthlyPrices.forEach(price => price.style.display = 'block');
            annualPrices.forEach(price => price.style.display = 'none');
        } else {
            monthlyPrices.forEach(price => price.style.display = 'none');
            annualPrices.forEach(price => price.style.display = 'block');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// About Section - Animated Statistics Counter
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.getAttribute('data-count') === '99' ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.getAttribute('data-count') === '99' ? '%' : '+');
        }
    }, 16);
}

// Initialize counters when About section is in view
const aboutSection = document.getElementById('about');
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function checkAboutSectionInView() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // If About section is in view and counters haven't been animated yet
    if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0 && !countersAnimated) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            animateCounter(stat, target, 1500);
        });
        countersAnimated = true;
    }
}

// Initialize the page with first testimonial visible
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
    
    // Add scroll listener for About section animations
    window.addEventListener('scroll', checkAboutSectionInView);
    
    // Check on initial load
    checkAboutSectionInView();
});