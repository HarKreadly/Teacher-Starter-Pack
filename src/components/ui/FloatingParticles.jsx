import React, { useEffect, useRef } from 'react';

const FloatingParticles = ({ count = 60, color = 'white', opacity = 0.4 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastScrollY = window.scrollY;

    let particles = [];
    const particleCount = count;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.baseOpacity = Math.random() * opacity;
        this.parallaxFactor = Math.random() * 0.5 + 0.1; // Varied parallax depth
      }

      update(scrollDelta) {
        // Natural drift
        this.x += this.speedX;
        this.y += this.speedY;

        // Scroll reaction (parallax)
        this.y -= scrollDelta * this.parallaxFactor;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = color;
        ctx.globalAlpha = this.baseOpacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update(scrollDelta);
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-1"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default FloatingParticles;
