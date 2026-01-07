// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<span class="menu-line"></span><span class="menu-line"></span><span class="menu-line"></span>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<span class="menu-line"></span><span class="menu-line"></span><span class="menu-line"></span>';
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

// Cookie Policy Modal
function openCookiePolicy() {
    const modalHTML = `
        <div class="policy-modal-overlay" id="cookiePolicyModal">
            <div class="policy-modal-content">
                <div class="policy-modal-header">
                    <h3>Cookie Policy</h3>
                    <button class="policy-modal-close">&times;</button>
                </div>
                <div class="policy-modal-body">
                    <div class="cookie-banner-example">
                        <h4 style="margin-top: 0;">We use cookies on our website</h4>
                        <p>We use cookies on our website to give you the most relevant experience by remembering your preferences and repeat visits. By clicking "Accept", you consent to the use of ALL the cookies. You may visit Cookie settings to manage which cookies are used.</p>
                        
                        <div class="cookie-buttons">
                            <button class="cookie-btn accept">Accept</button>
                            <button class="cookie-btn reject">Reject</button>
                            <button class="cookie-btn settings">Cookie settings</button>
                        </div>
                    </div>
                    
                    <div class="policy-section">
                        <h4>What are Cookies?</h4>
                        <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain functionality.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Types of Cookies We Use</h4>
                        <ul class="policy-list">
                            <li><strong>Essential Cookies:</strong> Required for the website to function properly. These cannot be disabled.</li>
                            <li><strong>Performance Cookies:</strong> Collect information about how visitors use our website to help us improve it.</li>
                            <li><strong>Functional Cookies:</strong> Remember your preferences and choices to provide enhanced features.</li>
                            <li><strong>Targeting Cookies:</strong> Used to deliver advertisements relevant to you and your interests.</li>
                        </ul>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Managing Cookies</h4>
                        <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Third-Party Cookies</h4>
                        <p>We may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may be placed on our website by our advertising partners.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Contact Us</h4>
                        <p>If you have any questions about our Cookie Policy, please contact us at privacy@pulsecraft.com.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('cookiePolicyModal');
    const closeBtn = modal.querySelector('.policy-modal-close');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Cookie button functionality
    modal.querySelector('.cookie-btn.accept').addEventListener('click', () => {
        alert('All cookies have been accepted. Thank you!');
        modal.remove();
    });
    
    modal.querySelector('.cookie-btn.reject').addEventListener('click', () => {
        alert('Non-essential cookies have been rejected. Only essential cookies will be used.');
        modal.remove();
    });
    
    modal.querySelector('.cookie-btn.settings').addEventListener('click', () => {
        alert('Cookie settings panel would open here in a real implementation.');
    });
}

// Privacy Policy Modal
function openPrivacyPolicy() {
    const modalHTML = `
        <div class="policy-modal-overlay" id="privacyPolicyModal">
            <div class="policy-modal-content">
                <div class="policy-modal-header">
                    <h3>Privacy Policy</h3>
                    <button class="policy-modal-close">&times;</button>
                </div>
                <div class="policy-modal-body">
                    <div class="policy-section">
                        <h4>Personal Data Apple Collects from You</h4>
                        <p>At Apple, we believe that you can have great products and great privacy. This means that we strive to <span class="highlight-text">collect only the personal data that we need</span>. The personal data Apple collects depends on how you interact with Apple. Descriptions of how Apple handles personal data for certain individual services are available at apple.com/legal/privacy/data.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>When We Collect Your Data</h4>
                        <p>When you create an Apple Account, apply for commercial credit, purchase and/or activate a product or device, download a software update, register for a class at an Apple Store, connect to our services, contact us (including by social media), participate in an online survey, or otherwise interact with Apple, we may collect a variety of information, including:</p>
                        
                        <div class="data-category">
                            <h5>Account Information</h5>
                            <p>Your Apple Account and related account details, including email address, devices registered, account status, and age</p>
                        </div>
                        
                        <div class="data-category">
                            <h5>Device Information</h5>
                            <p>Data from which your device could be identified, such as device serial number, or about your device, such as browser type</p>
                        </div>
                        
                        <div class="data-category">
                            <h5>Contact Information</h5>
                            <p>Data such as name, email address, physical address, phone number, or other contact information</p>
                        </div>
                        
                        <div class="data-category">
                            <h5>Payment Information</h5>
                            <p><span class="highlight-text">Data about your billing address and method of payment, such as bank details, credit, debit, or other payment card information</span></p>
                        </div>
                        
                        <div class="data-category">
                            <h5>Transaction Information</h5>
                            <p>Data about purchases of Apple products and services or transactions facilitated by Apple, including purchases on Apple platforms</p>
                        </div>
                        
                        <div class="data-category">
                            <h5>Fraud Prevention Information</h5>
                            <p>Data used to help identify and prevent fraud, including a device trust score</p>
                        </div>
                        
                        <div class="data-category">
                            <h5>Usage Data</h5>
                            <p>Data about your activity on and use of our offerings, such as app launches within our services, including browsing history; search history; product interaction; crash data, performance and other diagnostic data; and other usage data</p>
                        </div>
                        
                        <div class="data-category">
                            <h5>Location Information</h5>
                            <p>Precise location only to support services such as Find My or where you agree for region-specific services, and coarse location</p>
                        </div>
                        
                        <div class="data-category">
                            <h5>Health Information</h5>
                            <p>Data relating to the health status of an individual, including data related to one's physical or mental health or condition. Personal health data also includes data that can be used to make inferences about or detect the health status of an individual. If you participate in a study using an Apple Health Research Study app, the policy governing the privacy of your personal data is described in the Apple Health Study Apps Privacy Policy.</p>
                        </div>
                    </div>
                    
                    <div class="policy-section">
                        <h4>How We Use Your Data</h4>
                        <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Apple and our users. We also use this information to offer you tailored content - like giving you more relevant search results and ads.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Data Sharing and Disclosure</h4>
                        <p>We do not sell your personal information. We share your personal information only in the ways that are described in this privacy policy, with your consent, or as required by law.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Data Security</h4>
                        <p>We work hard to protect Apple and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We implement security measures like encryption and fraud monitoring.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('privacyPolicyModal');
    const closeBtn = modal.querySelector('.policy-modal-close');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Terms of Service Modal
function openTermsOfService() {
    const modalHTML = `
        <div class="policy-modal-overlay" id="termsOfServiceModal">
            <div class="policy-modal-content">
                <div class="policy-modal-header">
                    <h3>Terms and Conditions</h3>
                    <button class="policy-modal-close">&times;</button>
                </div>
                <div class="policy-modal-body">
                    <div class="terms-conditions">
                        <h4>Terms and Conditions</h4>
                        <p>Please read these Terms and Conditions carefully before clicking "I Agree" button. Your access to and use of the Service is conditional on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
                        
                        <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. Our Service as a whole is protected by copyright.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Account Creation</h4>
                        <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. You must not disclose your password to any third party.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Information Accuracy</h4>
                        <p>We make no warranties, expressed or implied, as to the accuracy, completeness, or suitability of the information and materials found or offered on this Service for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</p>
                        
                        <p>Your use of any information or materials on this Service is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this Service meet your specific requirements.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Intellectual Property</h4>
                        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Pulsecrafts and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Termination</h4>
                        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Limitation of Liability</h4>
                        <p>In no event shall Pulsecrafts, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Governing Law</h4>
                        <p>These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
                    </div>
                    
                    <div class="policy-section">
                        <h4>Changes to Terms</h4>
                        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                    </div>
                    
                    <button class="terms-agree-btn">I Agree</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('termsOfServiceModal');
    const closeBtn = modal.querySelector('.policy-modal-close');
    const agreeBtn = modal.querySelector('.terms-agree-btn');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    agreeBtn.addEventListener('click', () => {
        alert('Thank you for agreeing to our Terms and Conditions!');
        modal.remove();
    });
}

// Contact Form Functionality
function openContactForm(title = "Schedule a Consultation") {
    const modalHTML = `
        <div class="policy-modal-overlay" id="contactModal">
            <div class="policy-modal-content">
                <div class="policy-modal-header">
                    <h3>${title}</h3>
                    <button class="policy-modal-close">&times;</button>
                </div>
                <div class="policy-modal-body">
                    <form id="contactForm" class="contact-form">
                        <div class="form-group">
                            <label for="name">Full Name *</label>
                            <input type="text" id="name" name="name" required placeholder="Enter your full name">
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email Address *</label>
                            <input type="email" id="email" name="email" required placeholder="Enter your email address">
                        </div>
                        
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number">
                        </div>
                        
                        <div class="form-group">
                            <label for="company">Company Name</label>
                            <input type="text" id="company" name="company" placeholder="Enter your company name">
                        </div>
                        
                        <div class="form-group">
                            <label for="plan">Interested Plan</label>
                            <select id="plan" name="plan">
                                <option value="">Select a plan</option>
                                <option value="starter">Starter</option>
                                <option value="standard">Standard</option>
                                <option value="enterprise">Enterprise</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="service">Primary Interest</label>
                            <select id="service" name="service">
                                <option value="">Select service</option>
                                <option value="worksuite">Worksuite</option>
                                <option value="crypto">Cryptocurrency Services</option>
                                <option value="cloud">Cloud Services</option>
                                <option value="all">All Services</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Message *</label>
                            <textarea id="message" name="message" rows="5" required placeholder="Tell us about your requirements..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" required>
                                I agree to receive communications from Pulsecrafts
                            </label>
                        </div>
                        
                        <button type="submit" class="btn btn-primary submit-btn">Submit Request</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('contactModal');
    const closeBtn = modal.querySelector('.policy-modal-close');
    const contactForm = modal.querySelector('#contactForm');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            plan: document.getElementById('plan').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert(`Thank you ${formData.name}! We have received your contact request. Our team will reach out to you at ${formData.email} within 24 hours.`);
        
        // Reset form and close modal
        contactForm.reset();
        modal.remove();
    });
}

// "Get Started" button functionality for pricing cards
function handlePricingButton(planName) {
    openContactForm(`Get Started with ${planName} Plan`);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonial slider
    showSlide(0);
    
    // Contact buttons - open contact form
    document.querySelectorAll('.btn[href="#contact"], a[href="#contact"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openContactForm();
        });
    });
    
    // CTA button in hero section
    document.querySelector('.hero-btns .btn[href="#contact"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        openContactForm("Get Started");
    });
    
    // CTA button in CTA section
    document.querySelector('.cta .btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openContactForm();
    });
    
    // "Get In Touch" button in About section
    document.querySelector('.cta-button')?.addEventListener('click', (e) => {
        e.preventDefault();
        openContactForm("Get In Touch");
    });
    
    // "Learn More" buttons in services
    document.querySelectorAll('.service-card .btn').forEach(btn => {
        if (!btn.href || btn.href.includes('#')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceTitle = btn.closest('.service-card').querySelector('h3').textContent;
                openContactForm(`Learn More About ${serviceTitle}`);
            });
        }
    });
    
    // "Explore Features" button in hero
    document.querySelector('.hero-btns .btn[href="#services"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: document.getElementById('services').offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    // "View Plans" button in hero
    document.querySelector('.hero-btns .btn[href="#pricing"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: document.getElementById('pricing').offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    // Pricing card buttons
    document.querySelectorAll('.pricing-footer .btn').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const planNames = ['Starter', 'Standard', 'Enterprise'];
            handlePricingButton(planNames[index] || '');
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Show success message
                alert('Thank you for subscribing to our newsletter! You will receive updates and news about Pulsecrafts.');
                
                // Store subscription (in a real app, this would go to a server)
                localStorage.setItem('newsletterSubscribed', 'true');
                localStorage.setItem('newsletterEmail', email);
                
                // Reset form
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Footer links functionality
    document.querySelectorAll('.footer-links a').forEach(link => {
        if (!link.href || link.href === '#') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const linkText = link.textContent;
                
                // Handle different footer links
                switch(linkText.trim()) {
                    case 'Pulsecrafts Worksuite':
                        window.scrollTo({
                            top: document.getElementById('services').offsetTop - 80,
                            behavior: 'smooth'
                        });
                        break;
                    case 'Cryptocurrency Services':
                    case 'Cloud Services':
                        // Find the crypto or cloud service card and highlight it
                        const serviceCards = document.querySelectorAll('.service-card');
                        serviceCards.forEach(card => {
                            if (card.textContent.includes(linkText.split(' ')[0])) {
                                card.style.boxShadow = '0 0 0 3px var(--primary)';
                                setTimeout(() => {
                                    card.style.boxShadow = '';
                                }, 2000);
                            }
                        });
                        window.scrollTo({
                            top: document.getElementById('services').offsetTop - 80,
                            behavior: 'smooth'
                        });
                        break;
                    case 'Custom Solutions':
                    case 'Enterprise Solutions':
                        openContactForm(`Inquiry: ${linkText}`);
                        break;
                    case 'About Us':
                        window.scrollTo({
                            top: document.getElementById('about').offsetTop - 80,
                            behavior: 'smooth'
                        });
                        break;
                    case 'Careers':
                        alert('Career opportunities information would be displayed here. Please email careers@pulsecraft.com for current openings.');
                        break;
                    case 'Newsroom':
                        alert('Our latest news and announcements would be displayed here.');
                        break;
                    case 'Help Center':
                        // Scroll to FAQ
                        window.scrollTo({
                            top: document.getElementById('faq').offsetTop - 80,
                            behavior: 'smooth'
                        });
                        break;
                    case 'Documentation':
                        alert('Technical documentation would open in a new tab.');
                        window.open('#', '_blank');
                        break;
                    case 'API Reference':
                        alert('API documentation would open in a new tab.');
                        window.open('#', '_blank');
                        break;
                    case 'Blog':
                        alert('Blog would open in a new tab.');
                        window.open('#', '_blank');
                        break;
                    case 'Webinars':
                        alert('Upcoming webinar schedule would be displayed here.');
                        break;
                    case 'Community':
                        alert('Community forum would open in a new tab.');
                        window.open('#', '_blank');
                        break;
                    case 'Pricing Plans':
                        window.scrollTo({
                            top: document.getElementById('pricing').offsetTop - 80,
                            behavior: 'smooth'
                        });
                        break;
                    case 'FAQ':
                        window.scrollTo({
                            top: document.getElementById('faq').offsetTop - 80,
                            behavior: 'smooth'
                        });
                        break;
                    default:
                        // For any other links, just scroll to top
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    });
    
    // Social media links
    document.querySelectorAll('.social-icons a').forEach(socialLink => {
        socialLink.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = socialLink.getAttribute('aria-label').toLowerCase();
            let url = '#';
            
            switch(platform) {
                case 'linkedin':
                    url = 'https://linkedin.com/company/pulsecrafts';
                    break;
                case 'github':
                    url = 'https://github.com/pulsecrafts';
                    break;
                case 'youtube':
                    url = 'https://youtube.com/c/pulsecrafts';
                    break;
            }
            
            alert(`Redirecting to our ${platform} page...`);
            window.open(url, '_blank');
        });
    });
    
    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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
    
    // Add some basic validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Initialize active nav link on load
    setActiveNavLink();
});

// Add CSS for contact form
const contactFormCSS = `
    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .form-group label {
        font-weight: 600;
        color: var(--dark);
        font-size: 0.9rem;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 12px 15px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Poppins', sans-serif;
        transition: all 0.3s;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(42, 110, 255, 0.1);
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: normal;
        cursor: pointer;
    }
    
    .checkbox-label input {
        width: 18px;
        height: 18px;
    }
    
    .submit-btn {
        margin-top: 10px;
        padding: 15px 30px;
        font-size: 1.1rem;
    }
`;

// Add the CSS to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = contactFormCSS;
document.head.appendChild(styleSheet);