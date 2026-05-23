/**
 * Loader Component
 * شاشة/مؤشرات التحميل
 */

class Loader {
    
    static show(message = 'جاري التحميل...') {
        let loader = document.getElementById('dynamic-loader');
        
        if(!loader) {
            loader = document.createElement('div');
            loader.id = 'dynamic-loader';
            loader.className = 'dynamic-loader-overlay';
            loader.innerHTML = `
                <div class="dynamic-loader-content">
                    <div class="loader-spinner-cosmic">
                        <div class="loader-ring"></div>
                        <div class="loader-ring"></div>
                        <div class="loader-ring"></div>
                    </div>
                    <p class="loader-message">${message}</p>
                </div>
            `;
            document.body.appendChild(loader);
            
            // إضافة الـ CSS
            const style = document.createElement('style');
            style.textContent = `
                .dynamic-loader-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(10, 10, 15, 0.95);
                    backdrop-filter: blur(8px);
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                
                .dynamic-loader-overlay.show {
                    opacity: 1;
                }
                
                .loader-spinner-cosmic {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 20px;
                }
                
                .loader-ring {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border: 3px solid transparent;
                    border-radius: 50%;
                    animation: spinRing 1.5s linear infinite;
                }
                
                .loader-ring:nth-child(1) {
                    border-top-color: #FFD700;
                    animation-duration: 1s;
                }
                
                .loader-ring:nth-child(2) {
                    border-right-color: #BF4EFF;
                    animation-duration: 1.3s;
                }
                
                .loader-ring:nth-child(3) {
                    border-bottom-color: #00D4FF;
                    animation-duration: 1.6s;
                }
                
                @keyframes spinRing {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .loader-message {
                    color: #BF4EFF;
                    font-family: 'Orbitron', monospace;
                    font-size: 14px;
                    letter-spacing: 2px;
                    text-align: center;
                    margin-top: 20px;
                }
            `;
            document.head.appendChild(style);
        }
        
        const messageEl = loader.querySelector('.loader-message');
        if(messageEl) messageEl.textContent = message;
        
        setTimeout(() => {
            loader.classList.add('show');
        }, 10);
    }
    
    static hide() {
        const loader = document.getElementById('dynamic-loader');
        if(loader) {
            loader.classList.remove('show');
            setTimeout(() => {
                loader.remove();
            }, 300);
        }
    }
    
    // لودر صغير داخل الأزرار
    static buttonLoader(button, isLoading, originalText = null) {
        if(isLoading) {
            button.dataset.originalText = button.innerHTML;
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري...';
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalText || originalText || 'تم';
            delete button.dataset.originalText;
        }
    }
}

window.Loader = Loader;
