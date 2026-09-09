document.getElementById('copyLink').addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(location.href);
        const btn = document.getElementById('copyLink');
        const old = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = old, 1200);
    } catch { }
});

const toggleBtn = document.getElementById('toggleContrast');
let high = false;
toggleBtn.addEventListener('click', () => {
    high = !high;
    document.documentElement.style.setProperty('--bg', high ? '#05070f' : '');
    document.documentElement.style.setProperty('--card', high ? '#0a0f22' : '');
    document.documentElement.style.setProperty('--card-2', high ? '#0b1020' : '');
    document.documentElement.style.setProperty('--text', high ? '#f2f6ff' : '');
    document.documentElement.style.setProperty('--border', high ? '#243463' : '');
});

const tabsRoot = document.getElementById('langTabs');
const tabs = Array.from(tabsRoot.querySelectorAll('.tab'));
const panels = Array.from(tabsRoot.querySelectorAll('.tabpanel'));
function activate(id) {
    tabs.forEach(tab => tab.dataset.active = tab.dataset.tab === id);
    panels.forEach(panel => panel.classList.toggle('active', panel.id === 'tab-' + id));
}
tabs.forEach(tab => tab.addEventListener('click', () => activate(tab.dataset.tab)));
