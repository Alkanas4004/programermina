/**
 * Projects Page
 * عرض كل المشاريع مع تصفية وبحث
 */

class ProjectsPage {
    
    static projects = [];
    static filteredProjects = [];
    static currentFilter = 'all';
    static currentPage = 1;
    static itemsPerPage = 9;
    
    static async init() {
        console.log("📁 Initializing Projects Page");
        
        Loader.show('جاري تحميل المشاريع...');
        
        await this.loadProjects();
        this.setupFilters();
        this.setupSearch();
        this.setupPagination();
        
        Loader.hide();
    }
    
    static async loadProjects() {
        try {
            this.projects = await ProjectsService.getAllProjects();
            this.filteredProjects = [...this.projects];
            this.renderProjects();
        } catch(error) {
            console.error("Error loading projects:", error);
            Toast.show('حدث خطأ في تحميل المشاريع', 'error');
        }
    }
    
    static renderProjects() {
        const container = document.getElementById('projects-container');
        if(!container) return;
        
        // حساب المشاريع للصفحة الحالية
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const projectsToShow = this.filteredProjects.slice(start, end);
        
        if(projectsToShow.length === 0) {
            container.innerHTML = `
                <div class="no-projects-found">
                    <i class="fas fa-folder-open"></i>
                    <h3>لا توجد مشاريع</h3>
                    <p>لم يتم العثور على مشاريع تطابق معايير البحث</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = projectsToShow.map(project => `
            <div class="project-card-advanced" data-id="${project.id}">
                <div class="project-card-glow"></div>
                <div class="project-card-image">
                    <img src="${project.imageUrl || 'assets/images/default-project.jpg'}" alt="${project.title}">
                    <div class="project-overlay">
                        <span class="project-views"><i class="fas fa-eye"></i> ${project.views || 0}</span>
                    </div>
                </div>
                <div class="project-card-content">
                    <div class="project-category">
                        ${project.category ? `<span class="cat-badge">${project.category}</span>` : ''}
                    </div>
                    <h3>${Helpers.escapeHtml(project.title)}</h3>
                    <p>${Helpers.truncateText(project.description, 100)}</p>
                    <div class="project-tech-stack">
                        ${project.technologies?.slice(0, 3).map(tech => `<span class="tech-pill">${tech}</span>`).join('') || ''}
                        ${project.technologies?.length > 3 ? `<span class="tech-pill more">+${project.technologies.length - 3}</span>` : ''}
                    </div>
                    <a href="/pages/project-details.html?id=${project.id}" class="project-link">
                        تفاصيل المشروع <i class="fas fa-arrow-left"></i>
                    </a>
                </div>
            </div>
        `).join('');
        
        this.updatePagination();
    }
    
    static setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.currentFilter = btn.dataset.filter;
                this.applyFilters();
            });
        });
    }
    
    static setupSearch() {
        const searchInput = document.getElementById('project-search');
        if(searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.searchTerm = e.target.value.toLowerCase();
                    this.applyFilters();
                }, 300);
            });
        }
    }
    
    static applyFilters() {
        let filtered = [...this.projects];
        
        // تصفية حسب الفئة
        if(this.currentFilter !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentFilter);
        }
        
        // تصفية حسب البحث
        if(this.searchTerm) {
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(this.searchTerm) ||
                p.description.toLowerCase().includes(this.searchTerm) ||
                p.technologies?.some(t => t.toLowerCase().includes(this.searchTerm))
            );
        }
        
        this.filteredProjects = filtered;
        this.currentPage = 1;
        this.renderProjects();
    }
    
    static setupPagination() {
        const paginationContainer = document.getElementById('pagination');
        if(!paginationContainer) return;
    }
    
    static updatePagination() {
        const paginationContainer = document.getElementById('pagination');
        if(!paginationContainer) return;
        
        const totalPages = Math.ceil(this.filteredProjects.length / this.itemsPerPage);
        
        if(totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        
        let paginationHtml = '<div class="pagination-controls">';
        
        // زر السابق
        paginationHtml += `
            <button class="page-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                    ${this.currentPage === 1 ? 'disabled' : ''} 
                    data-page="${this.currentPage - 1}">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        // أرقام الصفحات
        for(let i = 1; i <= totalPages; i++) {
            if(i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                paginationHtml += `
                    <button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">
                        ${i}
                    </button>
                `;
            } else if(i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHtml += '<span class="page-dots">...</span>';
            }
        }
        
        // زر التالي
        paginationHtml += `
            <button class="page-btn ${this.currentPage === totalPages ? 'disabled' : ''}" 
                    ${this.currentPage === totalPages ? 'disabled' : ''} 
                    data-page="${this.currentPage + 1}">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        paginationHtml += '</div>';
        paginationContainer.innerHTML = paginationHtml;
        
        // إضافة الأحداث
        document.querySelectorAll('.page-btn[data-page]').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.dataset.page);
                if(!isNaN(page) && page >= 1 && page <= totalPages) {
                    this.currentPage = page;
                    this.renderProjects();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }
}

window.ProjectsPage = ProjectsPage;
