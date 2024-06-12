// particles.js
document.addEventListener('DOMContentLoaded', function () {
  let canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';

  let context = canvas.getContext('2d');
  let particles = [];
  let particleCount = 100;

  class Particle {
      constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = Math.random() * 2 - 1;
          this.vy = Math.random() * 2 - 1;
          this.radius = Math.random() * 3 + 2;
          this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
      }

      update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
              this.vx *= -1;
          }

          if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
              this.vy *= -1;
          }
      }

      draw() {
          context.beginPath();
          context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          context.fillStyle = this.color;
          context.fill();
      }
  }

  function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  }

  function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
      }
  }

  function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
          particle.update();
          particle.draw();
      });
      requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  createParticles();
  animate();
});
