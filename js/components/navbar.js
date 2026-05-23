/**
 * Navbar Component
 * شريط التنقل الرئيسي - ديناميكي حسب حالة المستخدم
 */

class NavbarComponent {
    
    static async render() {
        const container = document.getElementById('navbar-container');
        if(!container) return;
        
        // جلب حالة المستخدم
        const currentUser = AuthService.getCurrentUser();
        const isAdmin = currentUser ? await AuthService.isAdmin(currentUser.uid) : false;
        
        const html = `
            <nav class="nexus-navbar">
                <div class="nav-container">
                    <div class="nav-logo">
                        <a href="/" class="logo-link">
                            <span class="logo-icon">◆</span>
                            <span class="logo-text">NEXUS<span class="logo-dot">.</span>DEV</span>
                        </a>
                    </div>
                    
                    <div class="nav-menu" id="nav-menu">
                        <a href="/" class="nav-link active" data-page="home">
                            <i class="fas fa-home"></i>
                            <span>الرئيسية</span>
                        </a>
                        <a href="/pages/projects.html" class="nav-link" data-page="projects">
                            <i class="fas fa-cube"></i>
                            <span>المشاريع</span>
                        </a>
                        ${isAdmin ? `
                        <a href="/pages/dashboard.html" class="nav-link" data-page="dashboard">
                            <i class="fas fa-chart-line"></i>
                            <span>لوحة التحكم</span>
                        </a>
                        <a href="/pages/add-project.html" class="nav-link" data-page="add-project">
                            <i class="fas fa-plus-circle"></i>
                            <span>إضافة مشروع</span>
                        </a>
                        ` : ''}
                    </div>
                    
                    <div class="nav-actions">
                        ${currentUser ? `
                            <div class="user-menu">
                                <img src="${currentUser.photoURL || 'assets/icons/default-avatar.png'}" class="user-avatar" alt="avatar">
                                <span class="user-name">${currentUser.displayName || currentUser.email}</span>
                                <button id="logout-btn" class="logout-btn">
                                    <i class="fas fa-sign-out-alt"></i>
                                </button>
                            </div>
                        ` : `
                            <button id="login-btn" class="login-btn-glow">
                                <i class="fas fa-user-astronaut"></i>
                                <span>دخول</span>
                            </button>
                        `}
                        <button id="theme-toggle" class="theme-toggle">
                            <i class="fas fa-moon"></i>
                        </button>
                        <button class="mobile-toggle" id="mobile-toggle">
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </div>
            </nav>
        `;
        
        container.innerHTML = html;
        this.attachEvents();
    }
    
    static attachEvents() {
        // تسجيل الخروج
        const logoutBtn = document.getElementById('logout-btn');
        if(logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                await AuthService.signOut();
                window.location.reload();
            });
        }
        
        // زر تسجيل الدخول
        const loginBtn = document.getElementById('login-btn');
        if(loginBtn) {
            loginBtn.addEventListener('click', () => {
                window.location.href = '/pages/login.html';
            });
        }
        
        // تبديل الثيم
        const themeToggle = document.getElementById('theme-toggle');
        if(themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                document.body.classList.toggle('neon-theme');
            });
        }
        
        // القائمة الموبايل
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        if(mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show');
                mobileToggle.classList.toggle('active');
            });
        }
    }
}

window.NavbarComponent = NavbarComponent;
