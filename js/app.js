/**
 * Main Application Entry Point
 * ده الملف الرئيسي اللي بيشغل كل حاجة
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log("🚀 NEXUS DEV - Application Starting");
    
    // إخفاء اللودر بعد التحميل
    setTimeout(() => {
        const loader = document.getElementById('global-loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // Initialize Auth State
    AuthService.onAuthStateChanged(async (user) => {
        // Re-render navbar when auth state changes
        await NavbarComponent.render();
        
        // Load page-specific content
        await loadPageContent();
    });
    
    // Initial navbar render
    await NavbarComponent.render();
    
    // Load home page content
    await loadPageContent();
});

// Load content based on current page
async function loadPageContent() {
    const path = window.location.pathname;
    
    if(path === '/' || path === '/index.html') {
        // Home page specific
        await HomePage.init();
    } else if(path.includes('projects.html')) {
        await ProjectsPage.init();
    } else if(path.includes('project-details.html')) {
        await ProjectDetailsPage.init();
    } else if(path.includes('dashboard.html')) {
        await DashboardPage.init();
    } else if(path.includes('login.html')) {
        await LoginPage.init();
    } else if(path.includes('add-project.html')) {
        await AddProjectPage.init();
    }
}

// Handle offline/online status
window.addEventListener('online', () => {
    Toast.show('🌐 أنت متصل بالإنترنت الآن', 'success');
});

window.addEventListener('offline', () => {
    Toast.show('⚠️ أنت غير متصل بالإنترنت - بعض الميزات قد لا تعمل', 'warning');
});
