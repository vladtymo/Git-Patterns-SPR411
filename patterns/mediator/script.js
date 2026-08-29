/* ================= COPY LINK ================= */
document.getElementById('copyLink').addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(location.href);
        const btn = document.getElementById('copyLink');
        const old = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = old;
        }, 1200);
    } catch {
        console.log('Unable to copy link');
    }
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
    tabs.forEach(tab => {
        tab.dataset.active = tab.dataset.tab === id;
    });
    panels.forEach(panel => {
        panel.classList.toggle('active', panel.id === 'tab-' + id);
    });
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        activate(tab.dataset.tab);
    });
});
activate('classic');

/* ================= MEDIATOR DEMO ================= */
const log = document.getElementById('demoLog');
const state = {
    events: []
};

/* ================= LOGGING ================= */
function writeLog(message) {
    state.events.push(message);
    log.innerHTML = '<code>' + state.events.join('\n') + '</code>';
    log.scrollTop = log.scrollHeight;
}

/* ================= COMPONENTS ================= */
const PatientComponent = {
    update() {
        writeLog('[Patient Component]');
        writeLog('  └─ update()');
        Mediator.notify(this, 'patient.updated');
    }
};

const AppointmentComponent = {
    create() {
        writeLog('[Appointment Component]');
        writeLog('  └─ create()');
        Mediator.notify(this, 'appointment.created');
    }
};

const NotificationComponent = {
    notify(event) {
        writeLog(`[Notification Component] → ${event}`);
    }
};

const MedicalRecordComponent = {
    refresh() {
        writeLog('[Medical Record Component] → refresh()');
    }
};

const PaymentComponent = {
    process() {
        writeLog('[Payment Component] → process()');
    }
};

/* ================= MEDIATOR ================= */
const Mediator = {
    notify(sender, event) {
        writeLog('');
        writeLog(`[Mediator] received: ${event}`);
        writeLog(`[Mediator] sender: ${getSenderName(sender)}`);
        switch (event) {
            case 'patient.updated':
                writeLog('[Mediator] coordinating patient update...');
                NotificationComponent.notify('patient.updated');
                MedicalRecordComponent.refresh();
                break;
            case 'appointment.created':
                writeLog('[Mediator] coordinating appointment creation...');
                PaymentComponent.process();
                NotificationComponent.notify('appointment.created');
                break;
        }
        writeLog('[Mediator] done');
    }
};

/* ================= HELPER ================= */
function getSenderName(sender) {
    if (sender === PatientComponent) {
        return 'PatientComponent';
    }
    if (sender === AppointmentComponent) {
        return 'AppointmentComponent';
    }
    return 'Unknown';
}

/* ================= BUTTON EVENTS ================= */
document.getElementById('patientBtn').addEventListener('click', () => {
    PatientComponent.update();
});
document.getElementById('appointmentBtn').addEventListener('click', () => {
    AppointmentComponent.create();
});

/* ================= CLEAR ================= */
document.getElementById('clearLog').addEventListener('click', () => {
    state.events = [];
    log.innerHTML = '<code>Mediator ready...</code>';
});

/* ================= INITIAL STATE ================= */
writeLog('[System] Mediator initialized');
