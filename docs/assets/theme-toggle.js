(function () {
  var root = document.documentElement;
  var button = document.querySelector("[data-theme-toggle]");
  if (!button) return;

  var label = button.querySelector("[data-theme-label]");
  var logo = document.querySelector("[data-theme-logo]");
  var storageKey = "coherascent-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (logo) {
      logo.src = theme === "light"
        ? logo.getAttribute("data-logo-light")
        : logo.getAttribute("data-logo-dark");
    }
    if (label) {
      label.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    }
  }

  var savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
  } else {
    applyTheme(root.getAttribute("data-theme") || "dark");
  }

  button.addEventListener("click", function () {
    var nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  });
})();
