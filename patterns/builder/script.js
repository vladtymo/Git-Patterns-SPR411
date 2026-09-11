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

// Contrast toggle
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

// Language Tabs
const tabsRoot = document.getElementById('langTabs');
const tabs = Array.from(tabsRoot.querySelectorAll('.tab'));
const panels = Array.from(tabsRoot.querySelectorAll('.tabpanel'));
function activate(id) {
    tabs.forEach(t => t.dataset.active = (t.dataset.tab === id));
    panels.forEach(p => p.classList.toggle('active', p.id === 'tab-' + id));
}
tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.tab)));
activate('java');

// Interactive Builder & Director Demonstration
class ComputerBuilder {
    constructor() {
        this.reset();
    }

    reset() {
        this.computer = {
            cpu: "Basic Dual-Core CPU",
            gpu: "Integrated Graphics",
            ram: "8GB DDR4",
            cooling: "Standard Air Cooler",
            assembledAt: null
        };
    }

    setCpu(cpu) {
        this.computer.cpu = cpu;
        return this;
    }

    setGpu(gpu) {
        this.computer.gpu = gpu;
        return this;
    }

    setRam(ram) {
        this.computer.ram = ram;
        return this;
    }

    setCooling(cooling) {
        this.computer.cooling = cooling;
        return this;
    }

    getProduct() {
        this.computer.assembledAt = new Date().toLocaleTimeString();
        const product = { ...this.computer };
        this.reset();
        return product;
    }
}

class ComputerDirector {
    buildGamingRig(builder) {
        builder.reset();
        builder.setCpu("Intel Core i9-14900K / Ryzen 9 7950X")
                .setGpu("NVIDIA GeForce RTX 4090 24GB")
                .setRam("64GB DDR5 6000MHz RGB")
                .setCooling("360mm Custom Liquid Loop");
        return builder.getProduct();
    }

    buildOfficePc(builder) {
        builder.reset();
        builder.setCpu("Intel Core i5-13400")
                .setGpu("Integrated UHD Graphics 730")
                .setRam("16GB DDR4 3200MHz")
                .setCooling("Quiet Stock Air Cooler");
        return builder.getProduct();
    }
}

const builder = new ComputerBuilder();
const director = new ComputerDirector();
const log = document.getElementById('demoLog');

function renderState(title, obj) {
    log.textContent = `=== ${title} ===\n` + JSON.stringify(obj, null, 2);
}

document.getElementById('presetGaming').addEventListener('click', () => {
    const pc = director.buildGamingRig(builder);
    renderState("Director: Gaming Rig Built", pc);
});

document.getElementById('presetOffice').addEventListener('click', () => {
    const pc = director.buildOfficePc(builder);
    renderState("Director: Office PC Built", pc);
});

document.getElementById('resetPc').addEventListener('click', () => {
    builder.reset();
    renderState("Builder Reset to Initial State", builder.computer);
});

document.getElementById('stepCpu').addEventListener('click', () => {
    builder.setCpu("AMD Ryzen 7 7800X3D");
    renderState("Step Added: CPU Updated", builder.computer);
});

document.getElementById('stepGpu').addEventListener('click', () => {
    builder.setGpu("NVIDIA GeForce RTX 4070 Ti Super");
    renderState("Step Added: GPU Updated", builder.computer);
});

document.getElementById('stepRam').addEventListener('click', () => {
    builder.setRam("32GB Dual-Channel DDR5");
    renderState("Step Added: RAM Updated", builder.computer);
});

document.getElementById('stepCooling').addEventListener('click', () => {
    builder.setCooling("280mm AIO Liquid Cooler");
    renderState("Step Added: Cooling Updated", builder.computer);
});

document.getElementById('buildBtn').addEventListener('click', () => {
    const finishedPc = builder.getProduct();
    renderState("Finished Product Retrieved (Builder Auto-Reset)", finishedPc);
});