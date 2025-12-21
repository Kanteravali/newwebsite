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
let testimonialInterval = setInterval(() => {
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

// Animated Counter for Metrics
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (element.textContent.includes('%')) {
            element.textContent = value + '%';
        } else if (element.textContent.includes('+')) {
            element.textContent = value + '+';
        } else {
            element.textContent = value;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe metrics section for animation
const metricsSection = document.getElementById('metrics');
const metricValues = document.querySelectorAll('.metric-value');

let metricsAnimated = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !metricsAnimated) {
            metricValues.forEach(valueElement => {
                const target = parseInt(valueElement.getAttribute('data-target'));
                animateCounter(valueElement, 0, target, 2000);
            });
            metricsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (metricsSection) {
    observer.observe(metricsSection);
}

// Contact Form Modal
function openContactModal(title = "Schedule a Consultation") {
    const modalHTML = `
        <div class="modal-overlay" id="contactModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="contactForm">
                        <div class="form-group">
                            <label for="name">Full Name *</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address *</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="company">Company Name</label>
                            <input type="text" id="company">
                        </div>
                        <div class="form-group">
                            <label for="service">Interest in Service</label>
                            <select id="service">
                                <option value="">Select a service</option>
                                <option value="worksuite">Pulsecraft Worksuite</option>
                                <option value="crypto">Cryptocurrency Services</option>
                                <option value="cloud">Cloud Services</option>
                                <option value="all">All Services</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="message">Message *</label>
                            <textarea id="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn" style="width: 100%;">Submit Request</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('contactModal');
    const closeBtn = modal.querySelector('.modal-close');
    const form = document.getElementById('contactForm');
    
    // Close modal when clicking X or outside
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you! Your consultation request has been submitted. We'll contact you within 24 hours.");
        modal.remove();
    });
}

// Service Detail Modal
function openServiceModal(serviceType) {
    const serviceData = {
        worksuite: {
            title: "Pulsecraft Worksuite Details",
            description: "Our comprehensive workspace solution includes:",
            features: [
                "Task & Project Management with Kanban boards",
                "Team Collaboration Tools (chat, video, docs)",
                "CRM & Customer Management System",
                "E-commerce Integration Tools",
                "Advanced Analytics & Reporting",
                "Mobile App Access"
            ],
            pricing: "Starting at ₹223/user/month"
        },
        crypto: {
            title: "Cryptocurrency Services Details",
            description: "Complete crypto solutions for businesses:",
            features: [
                "Secure Multi-signature Wallets",
                "Blockchain Integration & Smart Contracts",
                "Crypto Payment Processing Gateway",
                "Trading Platform Development",
                "NFT Marketplace Solutions",
                "Crypto Compliance & Security"
            ],
            pricing: "Custom pricing based on requirements"
        },
        cloud: {
            title: "Cloud Services Details",
            description: "Enterprise cloud infrastructure:",
            features: [
                "Multi-cloud Migration Strategy",
                "AWS, Azure, Google Cloud Management",
                "Cloud Security & Compliance",
                "Disaster Recovery Solutions",
                "24/7 Cloud Monitoring",
                "Cost Optimization & Management"
            ],
            pricing: "Starting at ₹446/user/month"
        }
    };
    
    const data = serviceData[serviceType];
    const modalHTML = `
        <div class="modal-overlay" id="serviceModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${data.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${data.description}</p>
                    <ul class="service-modal-features">
                        ${data.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                    <div class="service-pricing">
                        <h4>Pricing: ${data.pricing}</h4>
                    </div>
                    <button class="btn btn-contact" style="width: 100%; margin-top: 20px;" onclick="openContactModal('${data.title}')">Get Started with This Service</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('serviceModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Plan Selection Modal
function openPlanModal(planType) {
    const planData = {
        starter: {
            name: "Starter Plan",
            price: "₹223/user/month",
            annualPrice: "₹178/user/month",
            bestFor: "Small teams & startups",
            features: [
                "Up to 10 users",
                "30 GB pooled cloud storage",
                "Basic crypto wallet",
                "Video meetings (up to 100)",
                "Pulsecraft AI assistant",
                "Standard support"
            ]
        },
        standard: {
            name: "Standard Plan",
            price: "₹446/user/month",
            annualPrice: "₹357/user/month",
            bestFor: "Growing businesses",
            features: [
                "Up to 50 users",
                "2 TB pooled storage",
                "Secure crypto wallets",
                "Crypto payment processing",
                "Multi-cloud management",
                "Priority support"
            ]
        },
        enterprise: {
            name: "Enterprise Plan",
            price: "₹1,516/user/month",
            annualPrice: "₹1,213/user/month",
            bestFor: "Large organizations",
            features: [
                "Unlimited users",
                "5 TB+ scalable storage",
                "Full crypto trading platform",
                "Blockchain integration",
                "Enterprise security suite",
                "Dedicated 24/7 support"
            ]
        }
    };
    
    const data = planData[planType];
    const modalHTML = `
        <div class="modal-overlay" id="planModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${data.name}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="plan-price">
                        <h4>${data.price}</h4>
                        <p>${data.annualPrice} with annual billing (Save 20%)</p>
                    </div>
                    <div class="plan-best-for">
                        <strong>Best for:</strong> ${data.bestFor}
                    </div>
                    <ul class="plan-features">
                        ${data.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                    <button class="btn btn-contact" style="width: 100%; margin-top: 20px;" onclick="openContactModal('${data.name}')">Select This Plan</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('planModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Demo Request Modal
function openDemoModal() {
    const modalHTML = `
        <div class="modal-overlay" id="demoModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Request a Platform Demo</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Experience Pulsecraft Worksuite firsthand with a personalized demo from our experts.</p>
                    <form id="demoForm">
                        <div class="form-group">
                            <label for="demo-name">Full Name *</label>
                            <input type="text" id="demo-name" required>
                        </div>
                        <div class="form-group">
                            <label for="demo-email">Email Address *</label>
                            <input type="email" id="demo-email" required>
                        </div>
                        <div class="form-group">
                            <label for="demo-company">Company Name *</label>
                            <input type="text" id="demo-company" required>
                        </div>
                        <div class="form-group">
                            <label for="demo-time">Preferred Demo Time</label>
                            <select id="demo-time">
                                <option value="">Select time</option>
                                <option value="morning">Morning (9 AM - 12 PM)</option>
                                <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                                <option value="evening">Evening (4 PM - 6 PM)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Areas of Interest</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" name="interest" value="worksuite"> Worksuite</label>
                                <label><input type="checkbox" name="interest" value="crypto"> Cryptocurrency</label>
                                <label><input type="checkbox" name="interest" value="cloud"> Cloud Services</label>
                            </div>
                        </div>
                        <button type="submit" class="btn" style="width: 100%;">Request Demo</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('demoModal');
    const closeBtn = modal.querySelector('.modal-close');
    const form = document.getElementById('demoForm');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Demo requested successfully! We'll send you a confirmation email with scheduling details.");
        modal.remove();
    });
}

// Enhanced Button Click Handlers
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonial slider
    showSlide(0);
    
    // Hero buttons
    document.querySelector('.hero-btns .btn[href="#services"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: document.getElementById('services').offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    // Contact buttons - open contact modal
    document.querySelectorAll('a[href="#contact"], .btn-contact').forEach(btn => {
        if (btn.getAttribute('href') === '#contact') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openContactModal();
            });
        }
    });
    
    // "Explore Features" button
    document.querySelector('a[href="#features"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: document.getElementById('features').offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    // "View Plans" button
    document.querySelector('a[href="#pricing"].btn-cloud')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: document.getElementById('pricing').offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    // Service "Learn More" buttons
    document.querySelectorAll('.service-card .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceType = btn.closest('.service-card').classList[1]; // worksuite, crypto, or cloud
            openServiceModal(serviceType);
        });
    });
    
    // Pricing card buttons
    document.querySelectorAll('.pricing-footer .btn').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const plans = ['starter', 'standard', 'enterprise'];
            openPlanModal(plans[index]);
        });
    });
    
    // CTA button - open demo modal
    document.querySelector('.cta .btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openDemoModal();
    });
    
    // "Get In Touch" button in About section
    document.querySelector('.cta-button')?.addEventListener('click', (e) => {
        e.preventDefault();
        openContactModal("Get In Touch");
    });
});

// Add modal styles dynamically
const modalStyles = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        background: white;
        border-radius: 15px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideUp 0.3s ease;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .modal-header {
        padding: 20px 30px;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        color: var(--primary);
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--gray);
        line-height: 1;
    }
    
    .modal-close:hover {
        color: var(--primary);
    }
    
    .modal-body {
        padding: 30px;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--dark);
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(42, 110, 255, 0.1);
    }
    
    .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-top: 10px;
    }
    
    .checkbox-group label {
        display: flex;
        align-items: center;
        font-weight: normal;
    }
    
    .checkbox-group input {
        width: auto;
        margin-right: 8px;
    }
    
    .service-modal-features,
    .plan-features {
        list-style: none;
        padding: 0;
        margin: 20px 0;
    }
    
    .service-modal-features li,
    .plan-features li {
        padding: 8px 0;
        display: flex;
        align-items: center;
    }
    
    .service-modal-features li i,
    .plan-features li i {
        color: var(--secondary);
        margin-right: 10px;
    }
    
    .plan-price {
        text-align: center;
        margin: 20px 0;
        padding: 20px;
        background: var(--gray-light);
        border-radius: 10px;
    }
    
    .plan-price h4 {
        color: var(--primary);
        font-size: 1.8rem;
        margin-bottom: 10px;
    }
    
    .plan-best-for {
        margin-bottom: 20px;
        font-style: italic;
        color: var(--gray);
    }
`;

// Add modal styles to head
const styleSheet = document.createElement("style");
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);