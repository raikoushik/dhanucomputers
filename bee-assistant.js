(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function start() {
        const tips = [
            { text: 'Welcome to DhanuTech! Explore our power, IT, and electrical solutions.', href: 'index.html', cta: 'Home' },
            { text: 'Check our latest laptops, desktops, and accessories.', href: 'products.html', cta: 'View Products' },
            { text: 'Need custom builds or service help? Contact us quickly on WhatsApp.', href: 'contact.html', cta: 'Contact Us' }
        ];

        const bot = document.createElement('button');
        bot.type = 'button';
        bot.className = 'ai-assistant github-style';
        bot.setAttribute('aria-label', 'DhanuTech AI assistant');
        bot.innerHTML = `
            <svg class="ai-body" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                <defs>
                    <linearGradient id="ai_shell" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#c7d2fe"/>
                        <stop offset="100%" stop-color="#60a5fa"/>
                    </linearGradient>
                </defs>
                <circle cx="80" cy="80" r="56" fill="url(#ai_shell)" stroke="#1e3a8a" stroke-width="4"/>
                <rect x="44" y="56" width="72" height="50" rx="16" fill="#0f172a" stroke="#1e40af" stroke-width="3"/>
                <circle cx="66" cy="80" r="8" fill="#22d3ee"/>
                <circle cx="94" cy="80" r="8" fill="#22d3ee"/>
                <rect x="66" y="95" width="28" height="5" rx="2.5" fill="#93c5fd"/>
                <path d="M80 24 L80 42" stroke="#1e3a8a" stroke-width="4" stroke-linecap="round"/>
                <circle cx="80" cy="20" r="7" fill="#38bdf8"/>
                <circle cx="40" cy="84" r="7" fill="#1d4ed8"/>
                <circle cx="120" cy="84" r="7" fill="#1d4ed8"/>
            </svg>
        `;

        const spotlight = document.createElement('div');
        spotlight.className = 'ai-spotlight';

        const tip = document.createElement('aside');
        tip.className = 'ai-tooltip github-style';

        document.body.appendChild(spotlight);
        document.body.appendChild(bot);
        document.body.appendChild(tip);

        let tipIndex = 0;
        let hideTimer;

        function showTip(force) {
            if (typeof force === 'number') tipIndex = force % tips.length;
            const item = tips[tipIndex];
            tipIndex = (tipIndex + 1) % tips.length;
            const external = item.href.startsWith('http');
            tip.innerHTML = `<p>${item.text}</p><a href="${item.href}" class="bee-tooltip-link" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${item.cta}</a>`;
            tip.classList.add('show');
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => tip.classList.remove('show'), 3400);
        }

        function parseLuminance(color) {
            const m = color && color.match(/rgba?\(([^)]+)\)/);
            if (!m) return 1;
            const [r, g, b] = m[1].split(',').slice(0, 3).map((n) => Number.parseFloat(n.trim()) / 255);
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }

        function updateContrastMode(x, y) {
            const el = document.elementFromPoint(Math.max(0, Math.min(window.innerWidth - 1, x)), Math.max(0, Math.min(window.innerHeight - 1, y)));
            let node = el;
            let lum = 1;
            while (node && node !== document.documentElement) {
                const bg = getComputedStyle(node).backgroundColor;
                if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                    lum = parseLuminance(bg);
                    break;
                }
                node = node.parentElement;
            }
            bot.classList.toggle('on-dark', lum < 0.45);
            spotlight.classList.toggle('on-dark', lum < 0.45);
        }

        const state = {
            x: window.innerWidth - 120,
            y: window.innerHeight - 180,
            targetX: window.innerWidth - 120,
            targetY: window.innerHeight - 180,
            t: 0,
            z: 0,
            angle: 0,
            loop: 0
        };

        gsap.ticker.add(() => {
            state.t += 0.0105;
            const ox = Math.sin(state.t * 1.1) * 26;
            const oy = Math.cos(state.t * 1.7) * 17;
            state.z = (Math.sin(state.t * 0.65) + 1) * 0.5;

            state.x += ((state.targetX + ox) - state.x) * 0.07;
            state.y += ((state.targetY + oy) - state.y) * 0.07;
            state.angle += ((ox * 0.32) - state.angle) * 0.14;

            const loopY = Math.sin(state.loop * Math.PI * 2) * 24;
            const scale = 0.9 + state.z * 0.24;
            const visualY = state.y - loopY;
            bot.style.transform = `translate3d(${state.x}px, ${visualY}px, 0) rotate(${state.angle}deg) scale(${scale})`;

            spotlight.style.left = `${state.x + 34}px`;
            spotlight.style.top = `${visualY + 40}px`;
            spotlight.style.transform = `rotate(${state.angle + 10}deg) scale(${0.88 + state.z * 0.2})`;

            tip.style.left = `${Math.max(14, state.x - 240)}px`;
            tip.style.top = `${Math.max(74, visualY - 4)}px`;

            updateContrastMode(state.x + 36, visualY + 36);
        });

        function moveToCurrentSection() {
            const sections = [...document.querySelectorAll('section, .service-section, .page-header')];
            const mid = window.scrollY + window.innerHeight * 0.5;
            let nearest = null;
            let min = Infinity;
            sections.forEach((s) => {
                const d = Math.abs(s.offsetTop - mid);
                if (d < min) {
                    min = d;
                    nearest = s;
                }
            });
            if (!nearest) return;
            const rect = nearest.getBoundingClientRect();
            state.targetY = Math.min(window.innerHeight - 150, Math.max(120, rect.top + rect.height * 0.28));
            state.targetX = window.innerWidth - 120;
        }

        bot.addEventListener('mouseenter', () => {
            showTip();
            gsap.to(state, { duration: 0.75, loop: 1, yoyo: true, repeat: 1, ease: 'power2.inOut' });
        });

        bot.addEventListener('click', () => showTip());
        window.addEventListener('scroll', moveToCurrentSection, { passive: true });
        window.addEventListener('resize', () => {
            state.targetX = window.innerWidth - 120;
        });

        showTip(0);
        setInterval(() => showTip(), 10000);
    }

    if (window.gsap) {
        start();
    } else {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
        s.onload = start;
        document.head.appendChild(s);
    }
})();
