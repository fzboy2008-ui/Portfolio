// Initialize Icons & Dynamic Data
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Interactive Moving Particle Constellation Canvas
  initParticles();
});

// Toast notification function
function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-msg");
    if (toast && toastMsg) {
      toastMsg.textContent = message || "Copied to clipboard!";
      toast.classList.remove("translate-y-24", "opacity-0");
      toast.classList.add("translate-y-0", "opacity-100");

      setTimeout(() => {
        toast.classList.add("translate-y-24", "opacity-0");
        toast.classList.remove("translate-y-0", "opacity-100");
      }, 2200);
    }
  }).catch(err => {
    console.error("Copy failed: ", err);
  });
}

// Particle Canvas Implementation
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "rgba(96, 165, 250," : "rgba(34, 211, 238,"
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + "0.6)";
      ctx.fill();

      // Connect particles close to each other
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}
