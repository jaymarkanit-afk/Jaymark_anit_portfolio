const toggleButton = document.querySelector(".toggle");
const body = document.body;
const themeIcon = document.querySelector(".moon-icon");

if (toggleButton) {
  toggleButton.addEventListener("click", function () {
    body.classList.toggle("dark");

    if (themeIcon) {
      const isDark = body.classList.contains("dark");
      themeIcon.setAttribute(
        "src",
        isDark ? "images/brightness.png" : "images/moon.png"
      );
      themeIcon.setAttribute("alt", isDark ? "Light mode" : "Dark mode");
    }
  });
}

// Enable About section editing on Read More click
const readMoreBtn = document.querySelector(".about .btn");
const aboutTitle = document.querySelector(".about .about-content h2");
const aboutParagraph = document.querySelector(".about .about-content p");

if (readMoreBtn && aboutTitle && aboutParagraph) {
  readMoreBtn.addEventListener("click", function () {
    const isEditable =
      aboutParagraph.getAttribute("contenteditable") === "true";

    if (!isEditable) {
      aboutTitle.setAttribute("contenteditable", "true");
      aboutParagraph.setAttribute("contenteditable", "true");
      aboutParagraph.focus();
      // Move caret to end
      const range = document.createRange();
      range.selectNodeContents(aboutParagraph);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      readMoreBtn.textContent = "Done";
    } else {
      aboutTitle.setAttribute("contenteditable", "false");
      aboutParagraph.setAttribute("contenteditable", "false");
      readMoreBtn.textContent = "Edit Me";
    }
  });
}
