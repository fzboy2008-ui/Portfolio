// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Set Auto Year in Footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Copy Email Functionality with Feedback
  const copyBtn = document.getElementById("copy-btn");
  const copyText = document.getElementById("copy-text");
  const emailToCopy = "fzboy2008@gmail.com";

  if (copyBtn && copyText) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(emailToCopy).then(() => {
        const originalText = copyText.textContent;
        copyText.textContent = "Copied!";
        copyBtn.classList.add("border-green-500", "text-green-400");

        setTimeout(() => {
          copyText.textContent = originalText;
          copyBtn.classList.remove("border-green-500", "text-green-400");
        }, 2000);
      }).catch(err => {
        console.error("Failed to copy email: ", err);
      });
    });
  }
});
