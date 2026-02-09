(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function start() {
        const tips = [
            { text: 'Explore our latest products and offers.', href: 'products.html', cta: 'View Products' },
            { text: 'Need a custom website? We offer web design services.', href: 'services.html', cta: 'Web Design' },
            { text: 'Talk to us directly on WhatsApp for quick support.', href: 'https://wa.me/919591555095', cta: 'Chat Now' }
        ];

        const canvas = document.createElement('canvas');
        canvas.className = 'bee-particle-canvas github-style';

        const bee = document.createElement('button');
        bee.type = 'button';
        bee.className = 'bee-assistant github-style';
        bee.setAttribute('aria-label', 'DhanuTech assistant bee');
        bee.innerHTML = `
            <svg class="bee-body" viewBox="0 0 220 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                <defs>
                    <radialGradient id="bFur" cx="45%" cy="35%" r="70%">
                        <stop offset="0%" stop-color="#fff59d"/>
                        <stop offset="45%" stop-color="#fde047"/>
                        <stop offset="100%" stop-color="#facc15"/>
                    </radialGradient>
                    <radialGradient id="bShade" cx="50%" cy="45%" r="75%">
                        <stop offset="0%" stop-color="#5b3b2f"/>
                        <stop offset="100%" stop-color="#2a1d17"/>
                    </radialGradient>
                    <radialGradient id="bWing" cx="50%" cy="35%" r="85%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
                        <stop offset="100%" stop-color="#dbeafe" stop-opacity="0.35"/>
                    </radialGradient>
                </defs>

                <!-- wings -->
                <ellipse class="bee-wing wing-left" cx="130" cy="52" rx="24" ry="40" fill="url(#bWing)" transform="rotate(-20 130 52)"/>
                <ellipse class="bee-wing wing-right" cx="160" cy="62" rx="22" ry="36" fill="url(#bWing)" transform="rotate(12 160 62)"/>

                <!-- body -->
                <ellipse cx="104" cy="104" rx="67" ry="52" fill="url(#bFur)" stroke="#3b2a1f" stroke-width="4"/>
                <ellipse cx="83" cy="86" rx="42" ry="32" fill="url(#bFur)"/>

                <!-- fluffy fur spikes -->
                <g fill="#f6d53d" opacity="0.9">
                    <path d="M56 63 l7 -10 l6 11z"/><path d="M70 57 l6 -10 l6 10z"/><path d="M84 53 l6 -10 l5 11z"/>
                    <path d="M98 51 l6 -9 l5 10z"/><path d="M112 52 l6 -9 l5 10z"/>
                </g>

                <!-- stripes -->
                <path d="M42 97 C74 83 125 83 158 97 L157 108 C124 98 74 98 43 109 Z" fill="#3a2a20"/>
                <path d="M48 121 C80 108 130 110 163 126 L161 138 C130 125 80 123 49 134 Z" fill="#3a2a20"/>

                <!-- eyes -->
                <ellipse cx="78" cy="86" rx="13" ry="14" fill="#fff"/>
                <ellipse cx="104" cy="88" rx="12" ry="13" fill="#fff"/>
                <ellipse cx="78" cy="88" rx="8" ry="9" fill="#1f2937"/>
                <ellipse cx="104" cy="89" rx="7" ry="8" fill="#1f2937"/>
                <circle cx="81" cy="84" r="2.2" fill="#fff"/>
                <circle cx="106" cy="86" r="2" fill="#fff"/>

                <!-- smile and blush -->
                <ellipse cx="67" cy="96" rx="6" ry="3.7" fill="#fda4af" opacity="0.55"/>
                <ellipse cx="116" cy="100" rx="6" ry="3.5" fill="#fda4af" opacity="0.5"/>
                <path d="M81 102 Q89 109 98 102" stroke="#7c2d12" stroke-width="3" fill="none" stroke-linecap="round"/>

                <!-- antenna -->
                <path d="M78 64 Q69 39 52 30" stroke="#2b211c" stroke-width="3" fill="none"/>
                <path d="M102 65 Q102 40 116 28" stroke="#2b211c" stroke-width="3" fill="none"/>
                <ellipse cx="50" cy="29" rx="5" ry="4" fill="#3b2a1f"/>
                <ellipse cx="117" cy="27" rx="5" ry="4" fill="#3b2a1f"/>

                <!-- legs -->
                <ellipse cx="73" cy="136" rx="7" ry="10" fill="url(#bShade)"/>
                <ellipse cx="96" cy="142" rx="7" ry="10" fill="url(#bShade)"/>
                <ellipse cx="121" cy="138" rx="7" ry="10" fill="url(#bShade)"/>
            </svg>
        `;

        const tip = document.createElement('aside');
        tip.className = 'bee-tooltip github-style';

        document.body.appendChild(canvas);
        document.body.appendChild(bee);
        document.body.appendChild(tip);

        const ctx = canvas.getContext('2d');
        const particles = [];
        let tipIndex = 0;
        let hideTimer;

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = Math.floor(window.innerWidth * dpr);
            canvas.height = Math.floor(window.innerHeight * dpr);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function showTip(force) {
            if (typeof force === 'number') tipIndex = force % tips.length;
            const item = tips[tipIndex];
            tipIndex = (tipIndex + 1) % tips.length;
            const external = item.href.startsWith('http');
            tip.innerHTML = `<p>${item.text}</p><a href="${item.href}" class="bee-tooltip-link" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${item.cta}</a>`;
            tip.classList.add('show');
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => tip.classList.remove('show'), 3200);
        }

        function emit(x, y) {
            particles.push({ x, y, vx: (Math.random() - 0.5) * 0.2, vy: -0.22, a: 0.8, r: 2 + Math.random() * 2 });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for (let i = particles.length - 1; i >= 0; i -= 1) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.a -= 0.02;
                if (p.a <= 0) {
                    particles.splice(i, 1);
                    continue;
                }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(250, 204, 21, ${p.a})`;
                ctx.fill();
            }
        }

        const state = {
            x: window.innerWidth - 120,
            y: window.innerHeight - 170,
            targetX: window.innerWidth - 120,
            targetY: window.innerHeight - 170,
            t: 0,
            angle: 0
        };

        gsap.ticker.add(() => {
            state.t += 0.012;
            const ox = Math.sin(state.t * 1.4) * 18;
            const oy = Math.cos(state.t * 1.9) * 12;

            state.x += ((state.targetX + ox) - state.x) * 0.08;
            state.y += ((state.targetY + oy) - state.y) * 0.08;
            state.angle += ((ox * 0.25) - state.angle) * 0.12;

            bee.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.angle}deg)`;
            tip.style.left = `${Math.max(12, state.x - 210)}px`;
            tip.style.top = `${Math.max(80, state.y - 10)}px`;

            if (Math.random() < 0.45) emit(state.x + 38, state.y + 58);
            drawParticles();
        });

        function moveToCurrentSection() {
            const sections = [...document.querySelectorAll('section, .service-section, .page-header')];
            const mid = window.scrollY + window.innerHeight * 0.5;
            let nearest = null;
            let min = Infinity;
            sections.forEach((s) => {
                const d = Math.abs(s.offsetTop - mid);
                if (d < min) { min = d; nearest = s; }
            });
            if (!nearest) return;
            const rect = nearest.getBoundingClientRect();
            state.targetY = Math.min(window.innerHeight - 140, Math.max(120, rect.top + rect.height * 0.28));
            state.targetX = window.innerWidth - 120;
        }

        bee.addEventListener('mouseenter', () => {
            showTip();
            gsap.to(state, { duration: 0.7, t: state.t + 2.5, ease: 'power2.inOut' });
        });

        bee.addEventListener('click', () => showTip());
        window.addEventListener('scroll', moveToCurrentSection, { passive: true });
        window.addEventListener('resize', () => {
            resizeCanvas();
            state.targetX = window.innerWidth - 120;
        });

        resizeCanvas();
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
