/**
 * Project Details Page
 * عرض تفاصيل مشروع محدد
 */

class ProjectDetailsPage {
    
    static project = null;
    
    static async init() {
        console.log("📖 Initializing Project Details Page");
        
        const params = Helpers.getUrlParams();
        const projectId = params.id;
        
        if(!projectId) {
            Toast.show('لم يتم تحديد المشروع', 'error');
            setTimeout(() => {
                window.location.href = '/pages/projects.html';
            }, 2000);
            return;
        }
        
        Loader.show('جاري تحميل تفاصيل المشروع...');
        
        await this.loadProject(projectId);
        
        Loader.hide();
    }
    
    static async loadProject(projectId) {
        try {
            this.project = await ProjectsService.getProjectById(projectId);
            
            if(!this.project) {
                Toast.show('المشروع غير موجود', 'error');
                setTimeout(() => {
                    window.location.href = '/pages/projects.html';
                }, 2000);
                return;
            }
            
            // زيادة عدد المشاهدات
            await ProjectsService.incrementViews(projectId);
            
            this.renderProjectDetails();
            this.setupActions();
            
        } catch(error) {
            console.error("Error loading project:", error);
            Toast.show('حدث خطأ في تحميل المشروع', 'error');
        }
    }
    
    static renderProjectDetails() {
        const container = document.getElementById('project-detail-container');
        if(!container) return;
        
        container.innerHTML = `
            <div class="project-detail-card">
                <div class="project-detail-header">
                    <div class="project-detail-image">
                        <img src="${this.project.imageUrl || 'assets/images/default-project.jpg'}" alt="${this.project.title}">
                        <div class="project-detail-badge">
                            ${this.project.category || 'مشروع'}
                        </div>
                    </div>
                    <div class="project-detail-info">
                        <h1>${Helpers.escapeHtml(this.project.title)}</h1>
                        <div class="project-meta">
                            <span><i class="fas fa-eye"></i> ${this.project.views || 0} مشاهدة</span>
                            <span><i class="fas fa-heart"></i> ${this.project.likes || 0} إعجاب</span>
                            <span><i class="fas fa-calendar"></i> ${Helpers.formatDate(this.project.createdAt)}</span>
                        </div>
                        <div class="project-tech-full">
                            <strong>التقنيات المستخدمة:</strong>
                            <div class="tech-list">
                                ${this.project.technologies?.map(tech => `<span class="tech-badge-large">${tech}</span>`).join('') || ''}
                            </div>
                        </div>
                        <div class="project-actions">
                            <button class="btn-like" id="like-project">
                                <i class="fas fa-heart"></i> أعجبني
                            </button>
                            <button class="btn-share" id="share-project">
                                <i class="fas fa-share-alt"></i> مشاركة
                            </button>
                            ${this.project.demoLink ? `
                                <a href="${this.project.demoLink}" target="_blank" class="btn-demo">
                                    <i class="fas fa-external-link-alt"></i> تجربة حية
                                </a>
                            ` : ''}
                            ${this.project.githubLink ? `
                                <a href="${this.project.githubLink}" target="_blank" class="btn-github">
                                    <i class="fab fa-github"></i> رمز المصدر
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
                
                <div class="project-detail-description">
                    <h2>عن المشروع</h2>
                    <div class="description-content">
                        <p>${Helpers.escapeHtml(this.project.description)}</p>
                    </div>
                </div>
                
                ${this.project.features ? `
                <div class="project-features">
                    <h2>المميزات الرئيسية</h2>
                    <ul class="features-list">
                        ${this.project.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${this.project.screenshots ? `
                <div class="project-screenshots">
                    <h2>معرض الصور</h2>
                    <div class="screenshots-grid">
                        ${this.project.screenshots.map(img => `
                            <div class="screenshot-item">
                                <img src="${img}" alt="screenshot">
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }
    
    static setupActions() {
        // زر الإعجاب
        const likeBtn = document.getElementById('like-project');
        if(likeBtn) {
            likeBtn.addEventListener('click', async () => {
                const liked = localStorage.getItem(`liked_${this.project.id}`);
                if(!liked) {
                    await ProjectsService.updateProject(this.project.id, {
                        likes: (this.project.likes || 0) + 1
                    });
                    localStorage.setItem(`liked_${this.project.id}`, 'true');
                    Toast.show('شكراً لإعجابك بالمشروع!', 'success');
                    this.project.likes = (this.project.likes || 0) + 1;
                    document.querySelector('.project-meta .fa-heart').parentElement.innerHTML = 
                        `<i class="fas fa-heart"></i> ${this.project.likes} إعجاب`;
                } else {
                    Toast.show('لقد أعجبت بهذا المشروع من قبل', 'info');
                }
            });
        }
        
        // زر المشاركة
        const shareBtn = document.getElementById('share-project');
        if(shareBtn) {
            shareBtn.addEventListener('click', () => {
                const url = window.location.href;
                if(navigator.share) {
                    navigator.share({
                        title: this.project.title,
                        text: this.project.description,
                        url: url
                    });
                } else {
                    Helpers.copyToClipboard(url);
                    Toast.show('تم نسخ رابط المشروع', 'success');
                }
            });
        }
    }
}

window.ProjectDetailsPage = ProjectDetailsPage;
