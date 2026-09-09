document.getElementById("copyLink").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    const button = document.getElementById("copyLink");
    const previousText = button.textContent;
    button.textContent = "Copied!";
    setTimeout(() => (button.textContent = previousText), 1200);
  } catch {
    // Clipboard access may be unavailable on local file pages.
  }
});

const contrastButton = document.getElementById("toggleContrast");
let highContrast = false;
contrastButton.addEventListener("click", () => {
  highContrast = !highContrast;
  document.documentElement.style.setProperty("--bg", highContrast ? "#05070f" : "");
  document.documentElement.style.setProperty("--card", highContrast ? "#0a0f22" : "");
  document.documentElement.style.setProperty("--card-2", highContrast ? "#0b1020" : "");
  document.documentElement.style.setProperty("--text", highContrast ? "#f2f6ff" : "");
  document.documentElement.style.setProperty("--border", highContrast ? "#243463" : "");
});

const tabs = [...document.querySelectorAll(".tab")];
const panels = [...document.querySelectorAll(".tabpanel")];
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => (item.dataset.active = String(item === tab)));
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === `tab-${tab.dataset.tab}`);
    });
  });
});
tabs[0].dataset.active = "true";

const output = document.querySelector("#demoOutput code");
const elements = ["File: report.pdf", "Folder: documents", "File: notes.txt"];

document.getElementById("exportTree").addEventListener("click", () => {
  output.textContent = elements.map((element) => `export ${element}`).join("\n");
});
document.getElementById("countTree").addEventListener("click", () => {
  output.textContent = `visited elements = ${elements.length}`;
});
document.getElementById("resetDemo").addEventListener("click", () => {
  output.textContent = "visitor = ready";
});
