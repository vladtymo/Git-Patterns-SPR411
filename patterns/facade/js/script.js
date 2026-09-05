// Link copier
document.getElementById('copyLink').addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(location.href);

        const btn = document.getElementById('copyLink');
        const old = btn.textContent;

        btn.textContent = 'Copied!';

        setTimeout(() => {
            btn.textContent = old;
        }, 1200);
    } catch { }
});


// Contrast toggle
const toggleBtn = document.getElementById('toggleContrast');

let high = false;

toggleBtn.addEventListener('click', () => {
    high = !high;

    document.documentElement.style.setProperty(
        '--bg',
        high ? '#05070f' : ''
    );

    document.documentElement.style.setProperty(
        '--card',
        high ? '#0a0f22' : ''
    );

    document.documentElement.style.setProperty(
        '--card-2',
        high ? '#0b1020' : ''
    );

    document.documentElement.style.setProperty(
        '--text',
        high ? '#f2f6ff' : ''
    );

    document.documentElement.style.setProperty(
        '--border',
        high ? '#243463' : ''
    );
});


// Tabs logic
const tabsRoot = document.getElementById('langTabs');

const tabs = Array.from(
    tabsRoot.querySelectorAll('.tab')
);

const panels = Array.from(
    tabsRoot.querySelectorAll('.tabpanel')
);

function activate(id) {
    tabs.forEach(t => {
        t.dataset.active = (t.dataset.tab === id);
    });

    panels.forEach(p => {
        p.classList.toggle(
            'active',
            p.id === 'tab-' + id
        );
    });
}

tabs.forEach(t => {
    t.addEventListener('click', () => {
        activate(t.dataset.tab);
    });
});

activate('java');


// Facade Demo

class VideoLoader {
    load(filename) {
        return `Loaded ${filename}`;
    }
}

class VideoDecoder {
    decode(video) {
        return `Decoded ${video}`;
    }
}

class AudioProcessor {
    process(video) {
        return `Audio processed for ${video}`;
    }
}

class VideoEncoder {
    encode(video) {
        return `Encoded ${video}`;
    }
}

class FileWriter {
    save(video) {
        return `Saved ${video}`;
    }
}


// Facade
class VideoFacade {
    constructor() {
        this.loader = new VideoLoader();
        this.decoder = new VideoDecoder();
        this.audio = new AudioProcessor();
        this.encoder = new VideoEncoder();
        this.writer = new FileWriter();
    }

    convert(filename) {
        const loaded = this.loader.load(filename);
        const decoded = this.decoder.decode(loaded);
        const processed = this.audio.process(decoded);
        const encoded = this.encoder.encode(processed);

        return this.writer.save(encoded);
    }
}


const facade = new VideoFacade();

const log = document.getElementById('log');

function render(message) {
    log.textContent += message + '\n';
}


document.getElementById('incA').addEventListener('click', () => {
    const result = facade.convert('video-A.mp4');
    render(result);
});


document.getElementById('incB').addEventListener('click', () => {
    const result = facade.convert('video-B.mp4');
    render(result);
});


document.getElementById('reset').addEventListener('click', () => {
    log.textContent = 'Ready.\n';
});