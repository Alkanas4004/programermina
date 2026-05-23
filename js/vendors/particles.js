/**
 * Simple Particles Effect
 * No external library - pure vanilla JS
 */

class ParticlesEffect {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if(!this.container) return;
        
        this.count = options.count || 80;
        this.color = options.color || '#BF4EFF';
        this.particles = [];
        
        this.init();
    }
    
    init() {
        this.container.style.position = 'absolute';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.overflow = 'hidden';
        this.container.style.pointerEvents = 'none';
        
        for(let i = 0; i < this.count; i++) {
            this.createParticle();
        }
        
        this.animate();
    }
    
    createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = this.color;
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        this.container.appendChild(particle);
        
        this.particles.push({
            element: particle,
            x: parseFloat(particle.style.left),
            y: parseFloat(particle.style.top),
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            size: size
        });
    }
    
    animate() {
        const animateFrame = () => {
            for(let p of this.particles) {
                p.x += p.speedX;
                p.y += p.speedY;
                
                if(p.x < 0) p.x = 100;
                if(p.x > 100) p.x = 0;
                if(p.y < 0) p.y = 100;
                if(p.y > 100) p.y = 0;
                
                p.element.style.left = p.x + '%';
                p.element.style.top = p.y + '%';
            }
            
            requestAnimationFrame(animateFrame);
        };
        
        animateFrame();
    }
}

window.ParticlesEffect = ParticlesEffect;
