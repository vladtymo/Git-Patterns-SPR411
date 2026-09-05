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

// Simple Singleton Demo: event bus & counter shared across widgets
const Bus = (() => {
    const listeners = new Map();
    return {
        on(event, fn) {
            if (!listeners.has(event)) listeners.set(event, new Set());
            listeners.get(event).add(fn);
            return () => listeners.get(event).delete(fn);
        },
        emit(event, payload) {
            (listeners.get(event) || []).forEach(fn => fn(payload));
        }
    };
})(); // module-level singleton bus

const state = { count: 0 };
const log = document.getElementById('log');
function render() { log.textContent = `count = ${state.count}\n`; }
Bus.on('inc', () => { state.count++; render(); });
Bus.on('reset', () => { state.count = 0; render(); });

document.getElementById('incA').addEventListener('click', () => Bus.emit('inc'));
document.getElementById('incB').addEventListener('click', () => Bus.emit('inc'));
document.getElementById('reset').addEventListener('click', () => Bus.emit('reset'));