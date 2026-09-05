// Link copier
document.getElementById('copyLink').addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(location.href);
        const btn = document.getElementById('copyLink');
        const old = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = old, 1200);
    } catch { }
});

// Contrast toggle (temporary CSS override)
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

// Tabs logic
const tabsRoot = document.getElementById('langTabs');
const tabs = Array.from(tabsRoot.querySelectorAll('.tab'));
const panels = Array.from(tabsRoot.querySelectorAll('.tabpanel'));
function activate(id) {
    tabs.forEach(t => t.dataset.active = (t.dataset.tab === id));
    panels.forEach(p => p.classList.toggle('active', p.id === 'tab-' + id));
}
tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.tab)));
activate('java');

// Proxy demo: control access to a document service
class RealDocumentService {
    fetch(path) { return `Contents of ${path}`; }
}

class DocumentProxy {
    constructor(service, canRead) {
        this.service = service;
        this.canRead = canRead;
    }
    fetch(path) {
        if (!this.canRead) throw new Error('Access denied');
        return this.service.fetch(path);
    }
}

