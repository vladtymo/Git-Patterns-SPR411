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
    tabs.forEach(t => t.dataset.active = String(t.dataset.tab === id));
    panels.forEach(p => p.classList.toggle('active', p.id === 'tab-' + id));
}

tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.tab)));
activate('js');

const registry = {
    blue: { color: 'blue', size: 18, label: 'Blue template' },
    red: { color: 'red', size: 14, label: 'Red template' }
};

const state = { clones: [] };
const output = document.getElementById('demoOutput');

function render() {
    const lines = state.clones.map((item, index) =>
        `clone ${index + 1}: ${item.label} | color=${item.color} | size=${item.size}`
    );
    output.innerHTML = '<code>' + (lines.length ? lines.join('\n') : 'registry = []') + '</code>';
}

function cloneTemplate(key) {
    const template = registry[key];
    state.clones.push({
        ...template,
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())
    });
    render();
}

document.getElementById('cloneBlue').addEventListener('click', () => cloneTemplate('blue'));
document.getElementById('cloneRed').addEventListener('click', () => cloneTemplate('red'));
document.getElementById('resetDemo').addEventListener('click', () => {
    state.clones = [];
    render();
});

render();
