/**
 * Main Application Entry Point
 */

console.log("🚀 MINA DEV - Application Starting");

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ DOM Loaded");
    
    // Hide loader after page loads
    setTimeout(() => {
        const loader = document.getElementById('global-loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                if(loader) loader.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // Initialize Role Rotator
    initRoleRotator();
    
    // Initialize Services Grid
    initServicesGrid();
    
    // Initialize Featured Projects
    initFeaturedProjects();
    
    // Initialize Contact Form
    initContactForm();
    
    // Initialize Smooth Scroll
    initSmoothScroll();
    
    // Check Auth State (optional)
    checkAuthState();
});

// Role Rotator
function initRoleRotator() {
    const rotator = document.getElementById('role-rotator');
    if(!rotator) return;
    
    const roles = ["مهندس برمجيات", "خبير أمن سيبراني", "مبتكر حلول ذكية"];
    let index = 0;
    
    rotator.innerHTML = `✦ ${roles[0]} ✦`;
    
    setInterval(() => {
        index = (index + 1) % roles.length;
        rotator.style.opacity = '0';
        setTimeout(() => {
            rotator.innerHTML = `✦ ${roles[index]} ✦`;
            rotator.style.opacity = '1';
        }, 200);
    }, 3000);
}

// Services Grid
function initServicesGrid() {
    const container = document.getElementById('services-grid');
    if(!container) return;
    
    const services = [
        { icon: "fas fa-laptop-code", title: "تطوير ويب", desc: "مواقع وتطبيقات ويب عالية الأداء" },
        { icon: "fas fa-shield-alt", title: "أمن سيبراني", desc: "حماية متكاملة من الاختراقات" },
        { icon: "fas fa-mobile-alt", title: "تطبيقات جوال", desc: "تطبيقات هجينة وأصلية" },
        { icon: "fas fa-database", title: "قواعد بيانات", desc: "تصميم وإدارة قواعد البيانات" }
    ];
    
    container.innerHTML = services.map(s => `
        <div class="service-card">
            <div class="service-icon"><i class="${s.icon}"></i></div>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
        </div>
    `).join('');
}

// Featured Projects
function initFeaturedProjects() {
    const wrapper = document.getElementById('slider-wrapper');
    if(!wrapper) return;
    
    const projects = [
        { title: "منصة إدارة المشاريع", desc: "نظام متكامل لإدارة الفرق والمشاريع", tech: ["React", "Node.js", "MongoDB"] },
        { title: "نظام حماية متقدم", desc: "حماية من XSS و SQL Injection", tech: ["JS", "Crypto", "Firebase"] },
        { title: "تطبيق تحليل بيانات", desc: "تحليل وعرض إحصائيات بشكل رسومي", tech: ["Python", "Pandas", "Chart.js"] }
    ];
    
    wrapper.innerHTML = projects.map(p => `
        <div class="slider-slide">
            <div class="project-featured-card">
                <h3 style="color: var(--gold); margin-bottom: 15px;">${p.title}</h3>
                <p>${p.desc}</p>
                <div class="project-tech">
                    ${p.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Slider Navigation
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slider-slide');
    const totalSlides = slides.length;
    
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    
    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            if(currentSlide > 0) {
                currentSlide--;
                wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
        });
    }
    
    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            if(currentSlide < totalSlides - 1) {
                currentSlide++;
                wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
        });
    }
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if(!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contact-name')?.value.trim();
        const email = document.getElementById('contact-email')?.value.trim();
        const message = document.getElementById('contact-message')?.value.trim();
        const feedback = document.getElementById('contact-feedback');
        
        if(!name || !email || !message) {
            if(feedback) {
                feedback.innerHTML = '<span style="color: #ef4444;">❌ جميع الحقول مطلوبة</span>';
                setTimeout(() => feedback.innerHTML = '', 3000);
            }
            return;
        }
        
        // Save to localStorage (temporary)
        const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        messages.push({ name, email, message, date: new Date().toISOString() });
        localStorage.setItem('contact_messages', JSON.stringify(messages));
        
        if(feedback) {
            feedback.innerHTML = '<span style="color: #10b981;">✅ تم إرسال رسالتك بنجاح!</span>';
            setTimeout(() => feedback.innerHTML = '', 3000);
        }
        
        form.reset();
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if(targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if(target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    const exploreBtn = document.getElementById('explore-btn');
    if(exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const featured = document.getElementById('featured');
            if(featured) featured.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    const contactBtn = document.getElementById('contact-btn');
    if(contactBtn) {
        contactBtn.addEventListener('click', () => {
            const contact = document.getElementById('contact');
            if(contact) contact.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Auth State Check (for Firebase)
function checkAuthState() {
    if(window.auth) {
        window.auth.onAuthStateChanged((user) => {
            if(user) {
                console.log("User logged in:", user.email);
            }
        });
    }
}
