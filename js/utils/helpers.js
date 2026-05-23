/**
 * Helper Functions
 * دوال مساعدة عامة للمشروع
 */

const Helpers = {
    
    // Escape HTML لمنع الـ XSS
    escapeHtml(str) {
        if(!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if(m === '&') return '&amp;';
            if(m === '<') return '&lt;';
            if(m === '>') return '&gt;';
            return m;
        });
    },
    
    // تنسيق التاريخ
    formatDate(timestamp) {
        if(!timestamp) return 'تاريخ غير معروف';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // اختصار النص
    truncateText(text, maxLength = 100) {
        if(!text) return '';
        if(text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    // إنشاء ID عشوائي
    generateId() {
        return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    },
    
    // التحقق من صحة الرابط
    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch(_) {
            return false;
        }
    },
    
    // تأخير (للـ async/await)
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    // نسخ للنص للحافظة
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch(err) {
            console.error('Failed to copy:', err);
            return false;
        }
    },
    
    // الحصول على معاملات URL
    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for(const [key, value] of params) {
            result[key] = value;
        }
        return result;
    },
    
    // تحويل الصورة إلى Base64
    imageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    },
    
    // منع الـ XSS في النصوص الطويلة
    sanitizeInput(str) {
        if(!str) return '';
        return str.replace(/[<>'"]/g, function(match) {
            if(match === '<') return '&lt;';
            if(match === '>') return '&gt;';
            if(match === "'") return '&#39;';
            if(match === '"') return '&quot;';
            return match;
        });
    },
    
    // التحقق من أن المستخدم أدمن (من LocalStorage مؤقت)
    isAdminUser() {
        const user = AuthService.getCurrentUser();
        if(!user) return false;
        // يمكنك تخزين الأدمن UID هنا
        const adminUIDs = ['YOUR_ADMIN_UID_HERE'];
        return adminUIDs.includes(user.uid);
    }
};

window.Helpers = Helpers;
