document.addEventListener("DOMContentLoaded", () => {
  // Initialize Icons & Auto Year
  lucide.createIcons();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Run Animated Galaxy Canvas & Dynamic Typing
  initGalaxyCanvas();
  initTyping();
});

// Toast / Copy functionality
function copyText(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-msg");
    if (toast && toastMsg) {
      toastMsg.textContent = message || "Copied to clipboard!";
      toast.classList.remove("translate-y-28", "opacity-0");
      toast.classList.add("translate-y-0", "opacity-100");

      setTimeout(() => {
        toast.classList.add("translate-y-28", "opacity-0");
        toast.classList.remove("translate-y-0", "opacity-100");
      }, 2200);
    }
  });
}

// Typing Text Effect for FZBOY
function initTyping() {
  const roles = [
    "Owner of SparkleMC Network",
    "Developer & CEO of Spark Bot",
    "All-In-One Discord Bot Creator",
    "Server Infrastructure Architect"
  ];
  const target = document.getElementById("typing-text");
  if (!target) return;

  let rIdx = 0;
  let cIdx = 0;
  let deleting = false;

  function type() {
    const current = roles[rIdx];
    if (deleting) {
      target.textContent = current.substring(0, cIdx - 1);
      cIdx--;
    } else {
      target.textContent = current.substring(0, cIdx + 1);
      cIdx++;
    }

    let speed = deleting ? 30 : 65;

    if (!deleting && cIdx === current.length) {
      speed = 2000;
      deleting = true;
    } else if (deleting && cIdx === 0) {
      deleting = false;
      rIdx = (rIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

// Spiral Galaxy Canvas Animation
function initGalaxyCanvas() {
  const canvas = document.getElementById("galaxyCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const starCount = Math.min(Math.floor(window.innerWidth / 12), 120);
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.3 + 0.1,
      color: Math.random() > 0.4 ? "#38bdf8" : "#818cf8"
    });
  }

  function render() {
    ctx.clearRect(0, 0, w, h);

    // Subtle galaxy center nebula glow
    const grad = ctx.createRadialGradient(w / 2, h / 3, 50, w / 2, h / 3, w * 0.6);
    grad.addColorStop(0, "rgba(14, 116, 144, 0.08)");
    grad.addColorStop(0.5, "rgba(30, 58, 138, 0.05)");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Render twinkling floating stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.y -= s.speed;
      if (s.y < 0) {
        s.y = h;
        s.x = Math.random() * w;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.alpha * (0.6 + 0.4 * Math.sin(Date.now() * 0.003 + i));
      ctx.shadowBlur = 6;
      ctx.shadowColor = s.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(render);
  }

  render();
}
