/**
 * Toast Notification Component
 * إشعارات منبثقة جميلة
 */

class Toast {
    
    static show(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if(!container) {
            this.createContainer();
        }
        
        const toast = document.createElement('div');
        toast.className = `toast-message toast-${type}`;
        
        // أيقونة حسب النوع
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
            <button class="toast-close">&times;</button>
        `;
        
        const toastContainer = document.getElementById('toast-container');
        toastContainer.appendChild(toast);
        
        // إظهار مع أنيميشن
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // إغلاق عند الضغط على الـ X
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.hide(toast);
        });
        
        // إخفاء تلقائي
        setTimeout(() => {
            this.hide(toast);
        }, duration);
    }
    
    static hide(toast) {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }
    
    static createContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
        
        // إضافة الـ CSS ديناميكياً
        const style = document.createElement('style');
        style.textContent = `
            .toast-container {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .toast-message {
                background: linear-gradient(135deg, #1A1A2E, #0F0F1A);
                backdrop-filter: blur(10px);
                border-radius: 16px;
                padding: 14px 20px;
                min-width: 280px;
                max-width: 400px;
                display: flex;
                align-items: center;
                gap: 12px;
                border: 1px solid rgba(191, 78, 255, 0.3);
                transform: translateX(400px);
                transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            
            .toast-message.show {
                transform: translateX(0);
            }
            
            .toast-message.hide {
                transform: translateX(400px);
            }
            
            .toast-message i {
                font-size: 22px;
            }
            
            .toast-success i { color: #10b981; }
            .toast-error i { color: #ef4444; }
            .toast-warning i { color: #f59e0b; }
            .toast-info i { color: #3b82f6; }
            
            .toast-message span {
                flex: 1;
                font-size: 14px;
                color: #E0E0FF;
            }
            
            .toast-close {
                background: none;
                border: none;
                color: #888;
                font-size: 20px;
                cursor: pointer;
                padding: 0 5px;
                transition: color 0.2s;
            }
            
            .toast-close:hover {
                color: #BF4EFF;
            }
        `;
        document.head.appendChild(style);
    }
}

window.Toast = Toast;
