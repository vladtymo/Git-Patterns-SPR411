/* ================= COPY LINK ================= */
document.getElementById('copyLink').addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(location.href);
        const btn = document.getElementById('copyLink');
        const old = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = old; }, 1200);
    } catch { console.log('Unable to copy link'); }
});

/* ================= CONTRAST ================= */
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

/* ================= CODE TABS ================= */
const tabsRoot = document.getElementById('codeTabs');
const tabs = Array.from(tabsRoot.querySelectorAll('.tab'));
const panels = Array.from(tabsRoot.querySelectorAll('.tabpanel'));

function activate(id) {
    tabs.forEach(tab => { tab.dataset.active = tab.dataset.tab === id; });
    panels.forEach(panel => { panel.classList.toggle('active', panel.id === 'tab-' + id); });
}
tabs.forEach(tab => {
    tab.addEventListener('click', () => { activate(tab.dataset.tab); });
});
activate('classic');

/* ================= OBSERVER DEMO ================= */
const log = document.getElementById('demoLog');
const subscriberCount = document.getElementById('subscriberCount');
const state = { events: [] };

function writeLog(message) {
    state.events.push(message);
    if (state.events.length > 15) state.events.shift(); // keep log manageable
    log.innerHTML = '<code>' + state.events.join('\n') + '</code>';
    log.scrollTop = log.scrollHeight;
}

// --- Subject (Publisher) ---
const WeatherStation = {
    observers: [],
    subscribe(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
            writeLog(`[Station] ${observer.name} subscribed.`);
            this.updateUI();
        }
    },
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
        writeLog(`[Station] ${observer.name} unsubscribed.`);
        this.updateUI();
    },
    notify(temperature) {
        writeLog(`\n[Station] Broadcasting Temp: ${temperature}°C`);
        if (this.observers.length === 0) {
            writeLog(` └─ No active subscribers.`);
        }
        this.observers.forEach(obs => obs.update(temperature));
    },
    updateUI() {
        subscriberCount.innerText = this.observers.length;
    }
};

// --- Observers (Subscribers) ---
class DisplayDevice {
    constructor(name) { this.name = name; this.isSubscribed = false; }
    update(temp) {
        writeLog(` └─ [${this.name}] received update: ${temp}°C`);
    }
}

const phoneDisplay = new DisplayDevice("Phone App");
const webDisplay = new DisplayDevice("Web Dashboard");

/* ================= BUTTON EVENTS ================= */
document.getElementById('btnTogglePhone').addEventListener('click', (e) => {
    phoneDisplay.isSubscribed = !phoneDisplay.isSubscribed;
    if (phoneDisplay.isSubscribed) {
        WeatherStation.subscribe(phoneDisplay);
        e.target.innerText = "📱 Unsubscribe Phone";
    } else {
        WeatherStation.unsubscribe(phoneDisplay);
        e.target.innerText = "📱 Subscribe Phone";
    }
});

document.getElementById('btnToggleWeb').addEventListener('click', (e) => {
    webDisplay.isSubscribed = !webDisplay.isSubscribed;
    if (webDisplay.isSubscribed) {
        WeatherStation.subscribe(webDisplay);
        e.target.innerText = "💻 Unsubscribe Web App";
    } else {
        WeatherStation.unsubscribe(webDisplay);
        e.target.innerText = "💻 Subscribe Web App";
    }
});

document.getElementById('btnUpdateTemp').addEventListener('click', () => {
    const randomTemp = Math.floor(Math.random() * 15) + 15; // 15 to 30
    WeatherStation.notify(randomTemp);
});

document.getElementById('clearLog').addEventListener('click', () => {
    state.events = [];
    log.innerHTML = '<code>[System] Weather Station initialized...</code>';
});