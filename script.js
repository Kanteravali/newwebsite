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

// Contact Modal function
function openContactModal(title = "Schedule a Consultation") {
    alert("Contact form would open here. You can reach us at contact@pulsecraft.com");
}

// Initialize page
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
    
    // Contact buttons
    document.querySelectorAll('a[href="#contact"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openContactModal();
        });
    });
    
    // CTA button
    document.querySelector('.cta .btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openContactModal();
    });
    
    // "Get In Touch" button in About section
    document.querySelector('.cta-button')?.addEventListener('click', (e) => {
        e.preventDefault();
        openContactModal("Get In Touch");
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            if (emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
});