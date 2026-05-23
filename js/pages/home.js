/**
 * Home Page Logic
 * كل دوال الصفحة الرئيسية
 */

class HomePage {
    
    static async init() {
        console.log("🏠 Initializing Home Page");
        
        // Load services
        this.loadServices();
        
        // Load featured projects
        await this.loadFeaturedProjects();
        
        // Initialize role rotator
        this.initRoleRotator();
        
        // Initialize particles effect
        this.initParticles();
        
        // Initialize contact form
        this.initContactForm();
        
        // Setup event listeners
        this.setupEvents();
    }
    
    static loadServices() {
        const servicesGrid = document.getElementById('services-grid');
        if(!servicesGrid) return;
        
        const services = [
            { icon: 'fas fa-dragon', title: 'تطوير متقدم', desc: 'تطبيقات ويب وجوال بأداء خارق', glow: 'purple' },
            { icon: 'fas fa-shield-haltered', title: 'أمن سيبراني', desc: 'حماية متكاملة ضد الاختراقات', glow: 'gold' },
            { icon: 'fas fa-brain', title: 'ذكاء اصطناعي', desc: 'حلول ذكية باستخدام AI/ML', glow: 'cyan' },
            { icon: 'fas fa-cloud-upload-alt', title: 'حلول سحابية', desc: 'نشر وإدارة على AWS/Azure', glow: 'purple' }
        ];
        
        servicesGrid.innerHTML = services.map(service => `
            <div class="service-card" data-glow="${service.glow}">
                <div class="service-icon"><i class="${service.icon}"></i></div>
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
                <div class="service-shine"></div>
            </div>
        `).join('');
    }
    
    static async loadFeaturedProjects() {
        const sliderWrapper = document.getElementById('slider-wrapper');
        if(!sliderWrapper) return;
        
        try {
            const projects = await ProjectsService.getLatestProjects(5);
            
            if(projects.length === 0) {
                sliderWrapper.innerHTML = '<div class="no-projects">لا توجد مشاريع حالياً</div>';
                return;
            }
            
            sliderWrapper.innerHTML = projects.map(project => `
                <div class="slider-slide">
                    <div class="project-featured-card">
                        <div class="project-bg-glow"></div>
                        <div class="project-content">
                            <h3>${Helpers.escapeHtml(project.title)}</h3>
                            <p>${Helpers.escapeHtml(project.description?.substring(0, 120))}...</p>
                            <div class="project-tech">
                                ${project.technologies?.map(tech => `<span class="tech-badge">${tech}</span>`).join('') || ''}
                            </div>
                            <a href="/pages/project-details.html?id=${project.id}" class="btn-view-project">
                                تفاصيل المشروع <i class="fas fa-arrow-left"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Initialize slider navigation
            SliderComponent.init('featured-slider');
            
        } catch(error) {
            console.error("Error loading featured projects:", error);
            sliderWrapper.innerHTML = '<div class="error-message">حدث خطأ في تحميل المشاريع</div>';
        }
    }
    
    static initRoleRotator() {
        const container = document.getElementById('role-rotator');
        if(!container) return;
        
        const roles = [
            { text: "مهندس برمجيات", class: "role-1" },
            { text: "خبير أمن سيبراني", class: "role-2" },
            { text: "مطور فول ستاك", class: "role-3" }
        ];
        
        let index = 0;
        
        setInterval(() => {
            container.style.opacity = '0';
            setTimeout(() => {
                const role = roles[index % roles.length];
                container.innerHTML = `<span class="${role.class}">✦ ${role.text} ✦</span>`;
                container.style.opacity = '1';
                index++;
            }, 300);
        }, 3000);
    }
    
    static initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if(!canvas) return;
        
        // Simple particle effect with canvas
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        for(let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 1.5,
                speedY: (Math.random() - 0.5) * 1.5,
                color: `hsl(${Math.random() * 60 + 260}, 100%, 65%)`
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                
                p.x += p.speedX;
                p.y += p.speedY;
                
                if(p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if(p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            });
            requestAnimationFrame(animate);
        }
        
        animate();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    static initContactForm() {
        const form = document.getElementById('contact-form');
        if(!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            const feedback = document.getElementById('contact-feedback');
            
            if(!name || !email || !message) {
                Toast.show('❌ جميع الحقول مطلوبة', 'error');
                return;
            }
            
            if(!Validators.isEmail(email)) {
                Toast.show('❌ البريد الإلكتروني غير صالح', 'error');
                return;
            }
            
            try {
                await MessagesService.sendMessage({ name, email, message });
                Toast.show('✨ تم إرسال رسالتك بنجاح! سأرد عليك قريباً', 'success');
                form.reset();
            } catch(error) {
                Toast.show('❌ فشل الإرسال، حاول مرة أخرى', 'error');
            }
        });
    }
    
    static setupEvents() {
        const exploreBtn = document.getElementById('explore-btn');
        if(exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                window.location.href = '/pages/projects.html';
            });
        }
        
        const contactBtn = document.getElementById('contact-btn');
        if(contactBtn) {
            contactBtn.addEventListener('click', () => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            });
        }
    }
}

window.HomePage = HomePage;
