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

// Decorator demo: wrap a base coffee object with additional behavior
class Coffee {
    constructor(name, price) {
        this.name = name;
        this.basePrice = price;
    }
    getDescription() { return this.name; }
    getItems() { return [this.name]; }
    cost() { return this.basePrice; }
}

class RegularMilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    getDescription() { return `${this.coffee.getDescription()}, regular milk`; }
    getItems() { return [...this.coffee.getItems(), 'regular milk']; }
    cost() { return this.coffee.cost() + 0.5; }
}

class CoconutMilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    getDescription() { return `${this.coffee.getDescription()}, coconut milk`; }
    getItems() { return [...this.coffee.getItems(), 'coconut milk']; }
    cost() { return this.coffee.cost() + 0.9; }
}

class VanillaDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    getDescription() { return `${this.coffee.getDescription()}, vanilla`; }
    getItems() { return [...this.coffee.getItems(), 'vanilla']; }
    cost() { return this.coffee.cost() + 0.75; }
}

class WhippedCreamDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    getDescription() { return `${this.coffee.getDescription()}, whipped cream`; }
    getItems() { return [...this.coffee.getItems(), 'whipped cream']; }
    cost() { return this.coffee.cost() + 0.5; }
}

const log = document.getElementById('log');
const coffeeChoice = document.getElementById('coffeeChoice');
const milkChoice = document.getElementById('milkChoice');
let order = new Coffee('Espresso', 1.55);

function toggleGroup(open, ...groups) {
    groups.forEach(group => {
        group.style.display = group === open ? 'flex' : 'none';
    });
}

function render() {
    const items = order.getItems().map((item, index) => `${index + 1}. ${item}`).join('\n');
    log.textContent = `Order:\n${items}\n\nTotal: $${order.cost().toFixed(2)}\n`;
}

document.getElementById('coffeeToggle').addEventListener('click', () => {
    toggleGroup(coffeeChoice, coffeeChoice, milkChoice);
});

document.getElementById('chooseEspresso').addEventListener('click', () => {
    order = new Coffee('Espresso', 1.55);
    coffeeChoice.style.display = 'none';
    render();
});

document.getElementById('chooseAmericano').addEventListener('click', () => {
    order = new Coffee('Americano', 2.0);
    coffeeChoice.style.display = 'none';
    render();
});

document.getElementById('chooseMilkshake').addEventListener('click', () => {
    order = new Coffee('Milkshake', 3.3);
    coffeeChoice.style.display = 'none';
    render();
});

document.getElementById('addMilk').addEventListener('click', () => {
    toggleGroup(milkChoice, coffeeChoice, milkChoice);
});

document.getElementById('milkRegular').addEventListener('click', () => {
    order = new RegularMilkDecorator(order);
    milkChoice.style.display = 'none';
    render();
});

document.getElementById('milkCoconut').addEventListener('click', () => {
    order = new CoconutMilkDecorator(order);
    milkChoice.style.display = 'none';
    render();
});

document.getElementById('addVanilla').addEventListener('click', () => {
    order = new VanillaDecorator(order);
    render();
});

document.getElementById('addWhipped').addEventListener('click', () => {
    order = new WhippedCreamDecorator(order);
    render();
});

document.getElementById('reset').addEventListener('click', () => {
    order = new Coffee('Espresso', 1.55);
    coffeeChoice.style.display = 'none';
    milkChoice.style.display = 'none';
    render();
});

render();
