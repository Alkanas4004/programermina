/**
 * Projects Service
 * كل العمليات المتعلقة بالمشاريع (CRUD)
 */

class ProjectsService {
    
    // جلب كل المشاريع
    static async getAllProjects() {
        try {
            const snapshot = await db.collection('projects')
                .orderBy('createdAt', 'desc')
                .get();
            
            const projects = [];
            snapshot.forEach(doc => {
                projects.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return projects;
        } catch(error) {
            console.error("Error fetching projects:", error);
            throw error;
        }
    }
    
    // جلب مشروع محدد
    static async getProjectById(projectId) {
        try {
            const doc = await db.collection('projects').doc(projectId).get();
            if(!doc.exists) return null;
            return { id: doc.id, ...doc.data() };
        } catch(error) {
            console.error("Error fetching project:", error);
            throw error;
        }
    }
    
    // جلب أحدث المشاريع
    static async getLatestProjects(limit = 6) {
        try {
            const snapshot = await db.collection('projects')
                .orderBy('createdAt', 'desc')
                .limit(limit)
                .get();
            
            const projects = [];
            snapshot.forEach(doc => {
                projects.push({ id: doc.id, ...doc.data() });
            });
            return projects;
        } catch(error) {
            console.error("Error fetching latest projects:", error);
            throw error;
        }
    }
    
    // إضافة مشروع جديد (للأدمن فقط)
    static async addProject(projectData) {
        try {
            const newProject = {
                ...projectData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                views: 0,
                likes: 0
            };
            const docRef = await db.collection('projects').add(newProject);
            return { id: docRef.id, ...newProject };
        } catch(error) {
            console.error("Error adding project:", error);
            throw error;
        }
    }
    
    // تحديث مشروع
    static async updateProject(projectId, updateData) {
        try {
            await db.collection('projects').doc(projectId).update({
                ...updateData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch(error) {
            console.error("Error updating project:", error);
            throw error;
        }
    }
    
    // حذف مشروع
    static async deleteProject(projectId) {
        try {
            await db.collection('projects').doc(projectId).delete();
            return true;
        } catch(error) {
            console.error("Error deleting project:", error);
            throw error;
        }
    }
    
    // زيادة عدد المشاهدات
    static async incrementViews(projectId) {
        try {
            const projectRef = db.collection('projects').doc(projectId);
            await projectRef.update({
                views: firebase.firestore.FieldValue.increment(1)
            });
        } catch(error) {
            console.error("Error incrementing views:", error);
        }
    }
    
    // تصفية المشاريع حسب التقنية
    static async filterByTechnology(tech) {
        try {
            const snapshot = await db.collection('projects')
                .where('technologies', 'array-contains', tech)
                .get();
            
            const projects = [];
            snapshot.forEach(doc => {
                projects.push({ id: doc.id, ...doc.data() });
            });
            return projects;
        } catch(error) {
            console.error("Error filtering projects:", error);
            throw error;
        }
    }
}

// Make it globally available
window.ProjectsService = ProjectsService;
