/**
 * Slider Component
 * سلايدر تفاعلي للمشاريع
 */

class SliderComponent {
    
    static init(containerId) {
        const container = document.getElementById(containerId);
        if(!container) return;
        
        const wrapper = container.querySelector('.slider-wrapper');
        const slides = container.querySelectorAll('.slider-slide');
        const prevBtn = container.querySelector('.slider-arrow.prev');
        const nextBtn = container.querySelector('.slider-arrow.next');
        
        if(!wrapper || slides.length === 0) return;
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        // عرض السلايد الحالي
        const updateSlider = () => {
            const offset = -currentIndex * 100;
            wrapper.style.transform = `translateX(${offset}%)`;
            
            // تحديث حالة الأزرار
            if(prevBtn) {
                prevBtn.disabled = currentIndex === 0;
                prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            }
            if(nextBtn) {
                nextBtn.disabled = currentIndex === slideCount - 1;
                nextBtn.style.opacity = currentIndex === slideCount - 1 ? '0.5' : '1';
            }
        };
        
        // أحداث الأزرار
        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                if(currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
        }
        
        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                if(currentIndex < slideCount - 1) {
                    currentIndex++;
                    updateSlider();
                }
            });
        }
        
        // تمرير تلقائي (اختياري)
        let autoPlayInterval;
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                if(currentIndex < slideCount - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }, 5000);
        };
        
        const stopAutoPlay = () => {
            if(autoPlayInterval) clearInterval(autoPlayInterval);
        };
        
        // تشغيل التلقائي
        startAutoPlay();
        
        // إيقاف عند hover
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
        
        // تحديث عند تغيير حجم الشاشة
        window.addEventListener('resize', updateSlider);
        
        updateSlider();
    }
}

window.SliderComponent = SliderComponent;
