(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function start() {
        const tips = [
            { text: 'Hi! Welcome to DhanuTech 🌼 We do power, computers, electronics and electrical solutions.', href: 'index.html', cta: 'Explore Home' },
            { text: 'Need a laptop, desktop or accessory? I can guide you to our products.', href: 'products.html', cta: 'View Products' },
            { text: 'For custom builds and service support, our team is ready to help.', href: 'customization.html', cta: 'Customization' },
            { text: 'Want quick help? Let’s connect on Contact page anytime 💛', href: 'contact.html', cta: 'Contact Us' }
        ];

        const scene = document.createElement('div');
        scene.className = 'bird-scene';
        scene.innerHTML = `
            <div class="bird-tree">
                <div class="bird-tree-crown"></div>
                <div class="bird-branch"></div>
                <div class="bird-water" aria-hidden="true"><span></span></div>
            </div>
            <div class="bird-grass-row" aria-hidden="true"></div>
            <div class="bird-flowers" aria-hidden="true">
                <i class="f f1"></i><i class="f f2"></i><i class="f f3"></i><i class="f f4"></i><i class="f f5"></i>
            </div>
        `;

        const bird = document.createElement('button');
        bird.type = 'button';
        bird.className = 'bird-assistant';
        bird.setAttribute('aria-label', 'DhanuTech yellow bird assistant');
        bird.innerHTML = `
            <svg class="bird-svg" viewBox="0 0 170 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                <defs>
                    <linearGradient id="birdBody" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#fff6bf"/>
                        <stop offset="60%" stop-color="#facc15"/>
                        <stop offset="100%" stop-color="#eab308"/>
                    </linearGradient>
                </defs>
                <ellipse cx="88" cy="86" rx="44" ry="34" fill="url(#birdBody)" stroke="#854d0e" stroke-width="3"/>
                <ellipse class="bird-wing" cx="89" cy="89" rx="22" ry="15" fill="#f59e0b"/>
                <circle cx="56" cy="79" r="18" fill="url(#birdBody)" stroke="#854d0e" stroke-width="2.6"/>
                <circle cx="51" cy="77" r="4.6" fill="#111827"/>
                <circle cx="52" cy="75.8" r="1.4" fill="#fff"/>
                <path d="M40 90 Q48 96 56 90" stroke="#7c2d12" stroke-width="2.4" fill="none" stroke-linecap="round"/>
                <polygon points="35,81 16,86 35,91" fill="#fb923c"/>
                <path d="M128 85 L151 76 L132 90 L151 104 Z" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
                <path d="M84 117 L82 132" stroke="#7c2d12" stroke-width="3" stroke-linecap="round"/>
                <path d="M97 117 L96 132" stroke="#7c2d12" stroke-width="3" stroke-linecap="round"/>
                <ellipse cx="81" cy="133" rx="5" ry="2.8" fill="#7c2d12"/>
                <ellipse cx="96" cy="133" rx="5" ry="2.8" fill="#7c2d12"/>
            </svg>
        `;

        const tooltip = document.createElement('aside');
        tooltip.className = 'bird-tooltip';

        const heartsLayer = document.createElement('div');
        heartsLayer.className = 'bird-hearts-layer';

        document.body.appendChild(scene);
        document.body.appendChild(heartsLayer);
        document.body.appendChild(bird);
        document.body.appendChild(tooltip);

        let tipIndex = 0;
        let hideTimer;
        let mode = 'fly';
        let modeUntil = performance.now() + 7500;

        const state = {
            x: window.innerWidth - 160,
            y: window.innerHeight - 210,
            targetX: window.innerWidth - 160,
            targetY: window.innerHeight - 210,
            t: 0,
            rot: 0,
            flap: 0
        };

        function showTip(force) {
            if (typeof force === 'number') tipIndex = force % tips.length;
            const item = tips[tipIndex];
            tipIndex = (tipIndex + 1) % tips.length;
            tooltip.innerHTML = `<p>${item.text}</p><a href="${item.href}" class="bird-link">${item.cta}</a>`;
            tooltip.classList.add('show');
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => tooltip.classList.remove('show'), 3500);
        }

        function emitLove(x, y) {
            const h = document.createElement('span');
            h.className = 'bird-heart';
            h.textContent = Math.random() > 0.35 ? '❤' : '✨';
            h.style.left = `${x}px`;
            h.style.top = `${y}px`;
            h.style.setProperty('--dx', `${(Math.random() - 0.5) * 34}px`);
            heartsLayer.appendChild(h);
            setTimeout(() => h.remove(), 1300);
        }

        function chooseNextMode() {
            const r = Math.random();
            if (r < 0.22) {
                mode = 'perch';
                modeUntil = performance.now() + 3600;
                state.targetX = 120;
                state.targetY = window.innerHeight - 170;
                scene.classList.add('active-perch');
            } else if (r < 0.35) {
                mode = 'drink';
                modeUntil = performance.now() + 2600;
                state.targetX = 165;
                state.targetY = window.innerHeight - 135;
                scene.classList.add('active-drink');
            } else {
                mode = 'fly';
                modeUntil = performance.now() + 7200;
                scene.classList.remove('active-perch', 'active-drink');
            }
        }

        function moveToSection() {
            if (mode !== 'fly') return;
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
            state.targetY = Math.min(window.innerHeight - 150, Math.max(110, rect.top + rect.height * 0.3));
            state.targetX = window.innerWidth - 150;
        }

        gsap.ticker.add(() => {
            const now = performance.now();
            state.t += 0.012;

            if (now > modeUntil) {
                scene.classList.remove('active-perch', 'active-drink');
                chooseNextMode();
            }

            const ox = Math.sin(state.t * 1.25) * (mode === 'fly' ? 28 : 5);
            const oy = Math.cos(state.t * 1.9) * (mode === 'fly' ? 16 : 3);

            state.x += ((state.targetX + ox) - state.x) * 0.08;
            state.y += ((state.targetY + oy) - state.y) * 0.08;
            state.rot += (((mode === 'fly' ? ox * 0.3 : -8) - state.rot) * 0.14);
            state.flap = mode === 'fly' ? Math.sin(state.t * 18) : Math.sin(state.t * 6) * 0.3;

            bird.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.rot}deg) scale(${mode === 'drink' ? 0.94 : 1})`;
            bird.style.setProperty('--wing', `${state.flap * 17}deg`);

            tooltip.style.left = `${Math.max(12, state.x - 245)}px`;
            tooltip.style.top = `${Math.max(72, state.y - 8)}px`;

            if (Math.random() < 0.09) emitLove(state.x + 35, state.y + 35);
            if (mode === 'drink' && Math.random() < 0.16) scene.classList.add('splash');
            if (scene.classList.contains('splash') && Math.random() < 0.2) scene.classList.remove('splash');
        });

        bird.addEventListener('mouseenter', () => {
            showTip();
            emitLove(state.x + 30, state.y + 10);
            gsap.to(state, { duration: 0.7, targetY: state.targetY - 22, yoyo: true, repeat: 1, ease: 'power2.inOut' });
        });

        bird.addEventListener('click', () => {
            showTip();
            emitLove(state.x + 46, state.y + 12);
            emitLove(state.x + 22, state.y + 18);
        });

        window.addEventListener('scroll', moveToSection, { passive: true });
        window.addEventListener('resize', () => {
            state.targetX = window.innerWidth - 150;
            state.targetY = Math.min(state.targetY, window.innerHeight - 120);
        });

        chooseNextMode();
        showTip(0);
        setInterval(() => showTip(), 11000);
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
