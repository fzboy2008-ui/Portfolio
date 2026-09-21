document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Icons & Year
  lucide.createIcons();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Start Animated Cyber Warp Background
  initCyberWarp();

  // 3. Start Typing Effect in Hero
  initTypingEffect();

  // 4. Initialize 3D Tilt for Cards
  initTiltEffect();
});

/* --- TOAST NOTIFICATION --- */
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
  });
}

/* --- DYNAMIC TYPING EFFECT --- */
function initTypingEffect() {
  const words = [
    "Owner of SparkleMC Network",
    "Developer & CEO of Spark Bot",
    "All-In-One Bot Creator",
    "Server Infrastructure Architect"
  ];
  const target = document.getElementById("typing-text");
  if (!target) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 35 : 70;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --- CYBER WARP-SPEED CANVAS ANIMATION --- */
function initCyberWarp() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const numStars = 120;
  const stars = [];

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: (Math.random() - 0.5) * w * 1.5,
      y: (Math.random() - 0.5) * h * 1.5,
      z: Math.random() * w,
      o: Math.random() * 0.7 + 0.3
    });
  }

  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX - w / 2) * 0.05;
    mouseY = (e.clientY - h / 2) * 0.05;
  });

  function render() {
    ctx.fillStyle = "rgba(4, 13, 26, 0.35)";
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2 + mouseX;
    const cy = h / 2 + mouseY;

    for (let i = 0; i < numStars; i++) {
      const star = stars[i];
      star.z -= 1.8; // Warp speed

      if (star.z <= 0) {
        star.z = w;
        star.x = (Math.random() - 0.5) * w * 1.5;
        star.y = (Math.random() - 0.5) * h * 1.5;
      }

      const k = 220 / star.z;
      const px = star.x * k + cx;
      const py = star.y * k + cy;

      if (px >= 0 && px <= w && py >= 0 && py <= h) {
        const size = Math.max((1 - star.z / w) * 2.8, 0.8);
        const alpha = (1 - star.z / w) * star.o;

        // Draw glowing laser star/streak
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? `rgba(56, 189, 248, ${alpha})` : `rgba(129, 140, 248, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#38bdf8";
        ctx.fill();
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* --- 3D TILT EFFECT FOR CARDS --- */
function initTiltEffect() {
  const cards = document.querySelectorAll(".glass-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}
  
