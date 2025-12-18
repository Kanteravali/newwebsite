// Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding tab content
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
        
        // Testimonial slider
        const testimonialSlides = document.getElementById('testimonialSlides');
        const sliderBtns = document.querySelectorAll('.slider-btn');
        let currentSlide = 0;
        
        function showSlide(index) {
            // Update slide position
            testimonialSlides.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active button
            sliderBtns.forEach(btn => btn.classList.remove('active'));
            sliderBtns[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Add click events to slider buttons
        sliderBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Auto-slide testimonials
        setInterval(() => {
            let nextSlide = currentSlide < sliderBtns.length - 1 ? currentSlide + 1 : 0;
            showSlide(nextSlide);
        }, 5000);
        
        // FAQ accordion
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                answer.classList.toggle('active');
                toggle.textContent = item.classList.contains('active') ? '−' : '+';
            });
        });
        
        // Animated counters
        const counters = document.querySelectorAll('.counter');
        
        function animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + (counter.getAttribute('data-target') === '99' ? '%' : '+');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + (counter.getAttribute('data-target') === '99' ? '%' : '+');
                }
            }, 20);
        }
        
        // Start counters when they come into view
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    animateCounter(counter);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
        
        // Demo modal
        const demoBtn = document.getElementById('demoBtn');
        const demoModal = document.getElementById('demoModal');
        const closeModal = document.getElementById('closeModal');
        const liveChatBtn = document.getElementById('liveChatBtn');
        
        demoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            demoModal.classList.add('active');
        });
        
        closeModal.addEventListener('click', () => {
            demoModal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        demoModal.addEventListener('click', (e) => {
            if (e.target === demoModal) {
                demoModal.classList.remove('active');
            }
        });
        
        // Live chat button
        liveChatBtn.addEventListener('click', () => {
            alert("Live chat support is coming soon! In the meantime, please email us at support@pulsecraft.com or call +1 (555) 123-4567.");
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if(this.getAttribute('href') === '#') return;
                
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
        
        // Sticky header on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
