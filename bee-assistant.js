(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    function initBee() {
        const suggestions = [
            { text: 'Check our latest laptops and systems.', href: 'products.html', cta: 'View Products' },
            { text: 'Need customized web design for your business?', href: 'services.html', cta: 'Web Design' },
            { text: 'Ask for CCTV, power backup, and electrical solutions.', href: 'services.html', cta: 'See Services' },
            { text: 'Talk to us instantly on WhatsApp.', href: 'https://wa.me/919591555095', cta: 'Chat Now' }
        ];

        const env = document.createElement('div');
        env.className = 'bee-env';
        env.innerHTML = `
            <div class="bee-sun-flare" aria-hidden="true"></div>
            <div class="bee-tech-grass" aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
        `;

        const canvas = document.createElement('canvas');
        canvas.className = 'bee-particle-canvas';

        const bee = document.createElement('button');
        bee.type = 'button';
        bee.className = 'bee-assistant';
        bee.setAttribute('aria-label', 'Dhanu Tech Bee mascot');
        bee.innerHTML = `
            <svg class="bee-body" viewBox="0 0 300 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                <defs>
                    <radialGradient id="beeAura" cx="50%" cy="50%" r="52%">
                        <stop offset="0%" stop-color="#fde68a" stop-opacity="0.52"/>
                        <stop offset="100%" stop-color="#fde68a" stop-opacity="0"/>
                    </radialGradient>
                    <linearGradient id="beeGold" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#fff6bf"/>
                        <stop offset="48%" stop-color="#facc15"/>
                        <stop offset="100%" stop-color="#eab308"/>
                    </linearGradient>
                    <radialGradient id="beeChar" cx="45%" cy="28%" r="75%">
                        <stop offset="0%" stop-color="#4a3a35"/>
                        <stop offset="100%" stop-color="#1f1715"/>
                    </radialGradient>
                    <radialGradient id="wingThin" cx="50%" cy="36%" r="85%">
                        <stop offset="0%" stop-color="#ecfeff" stop-opacity="0.68"/>
                        <stop offset="70%" stop-color="#99f6e4" stop-opacity="0.24"/>
                        <stop offset="100%" stop-color="#67e8f9" stop-opacity="0.03"/>
                    </radialGradient>
                </defs>

                <circle cx="154" cy="128" r="90" fill="url(#beeAura)" class="bee-aura"/>

                <!-- Side-view wings for 3D look -->
                <ellipse class="bee-wing wing-left" cx="140" cy="78" rx="20" ry="34" fill="url(#wingThin)" transform="rotate(-16 140 78)"/>
                <ellipse class="bee-wing wing-right" cx="190" cy="82" rx="20" ry="30" fill="url(#wingThin)" transform="rotate(12 190 82)"/>

                <!-- Body capsule with perspective -->
                <ellipse cx="164" cy="136" rx="74" ry="52" fill="url(#beeGold)"/>
                <ellipse cx="164" cy="136" rx="74" ry="52" fill="none" stroke="#111827" stroke-width="6.5"/>
                <ellipse cx="136" cy="112" rx="44" ry="36" fill="url(#beeChar)"/>
                <ellipse cx="221" cy="142" rx="16" ry="12" fill="#111827" opacity="0.9"/>

                <!-- Stripe curvature -->
                <path d="M97 128 C132 116 194 118 228 132 L226 141 C194 133 132 132 98 139 Z" fill="#111827" opacity="0.96"/>
                <path d="M100 148 C136 138 197 141 232 155 L229 163 C197 155 135 152 101 160 Z" fill="#111827" opacity="0.96"/>

                <!-- Calm trustworthy face -->
                <path d="M113 105 Q121 100 129 105" stroke="#111827" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M142 106 Q151 101 160 106" stroke="#111827" stroke-width="3" fill="none" stroke-linecap="round"/>

                <ellipse cx="124" cy="117" rx="11" ry="12" fill="#fff"/>
                <ellipse cx="153" cy="118" rx="11" ry="12" fill="#fff"/>
                <circle cx="124" cy="119" r="6" fill="#0f172a"/>
                <circle cx="153" cy="120" r="6" fill="#0f172a"/>
                <circle cx="126" cy="116" r="1.6" fill="#fff"/>
                <circle cx="155" cy="117" r="1.6" fill="#fff"/>

                <path d="M126 133 Q137 140 148 133" stroke="#7c2d12" stroke-width="3.6" fill="none" stroke-linecap="round"/>

                <!-- Fur strands with randomness -->
                <g class="bee-fur-strands" stroke="#2c211d" stroke-width="1.1" stroke-linecap="round" opacity="0.52">
                    <path d="M116 92 l-2 -5"/><path d="M122 90 l-1 -7"/><path d="M129 90 l0 -6"/>
                    <path d="M136 89 l1 -6"/><path d="M143 90 l2 -5"/><path d="M149 92 l2 -5"/>
                </g>

                <!-- Antenna -->
                <path d="M132 82 Q122 46 102 37" stroke="#1f2937" stroke-width="3.2" fill="none"/>
                <path d="M154 82 Q165 48 184 38" stroke="#1f2937" stroke-width="3.2" fill="none"/>
                <circle cx="100" cy="36" r="7" fill="#f59e0b"/>
                <circle cx="186" cy="37" r="7" fill="#f59e0b"/>
            </svg>
        `;

        const tooltip = document.createElement('aside');
        tooltip.className = 'bee-tooltip';

        document.body.appendChild(env);
        document.body.appendChild(canvas);
        document.body.appendChild(bee);
        document.body.appendChild(tooltip);

        const ctx = canvas.getContext('2d');
        const particles = [];
        let suggestionIndex = 0;
        let tipTimer;

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = Math.floor(window.innerWidth * dpr);
            canvas.height = Math.floor(window.innerHeight * dpr);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function addParticle(x, y, isHeart = false) {
            particles.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 0.35,
                vy: -0.25 - Math.random() * 0.45,
                life: 1,
                size: 3 + Math.random() * 4,
                heart: isHeart,
                hue: isHeart ? 345 : 45
            });
        }

        function drawHeart(p) {
            const s = p.size;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y + s * 0.28);
            ctx.bezierCurveTo(p.x + s * 0.9, p.y - s * 0.72, p.x + s * 1.6, p.y + s * 0.95, p.x, p.y + s * 1.75);
            ctx.bezierCurveTo(p.x - s * 1.6, p.y + s * 0.95, p.x - s * 0.9, p.y - s * 0.72, p.x, p.y + s * 0.28);
            ctx.closePath();
            ctx.fillStyle = `hsla(${p.hue}, 95%, 72%, ${p.life * 0.8})`;
            ctx.fill();
        }

        function drawParticle(p) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 95%, 70%, ${p.life * 0.85})`;
            ctx.shadowColor = `hsla(${p.hue}, 95%, 70%, ${p.life * 0.75})`;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        function renderParticles() {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for (let i = particles.length - 1; i >= 0; i -= 1) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.018;
                p.size *= 0.992;
                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }
                if (p.heart) {
                    drawHeart(p);
                } else {
                    drawParticle(p);
                }
            }
        }

        function showSuggestion(forceIndex) {
            if (typeof forceIndex === 'number') suggestionIndex = forceIndex % suggestions.length;
            const item = suggestions[suggestionIndex];
            suggestionIndex = (suggestionIndex + 1) % suggestions.length;
            const external = item.href.startsWith('http');
            tooltip.innerHTML = `<p>${item.text}</p><a href="${item.href}" class="bee-tooltip-link" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${item.cta}</a>`;
            tooltip.classList.add('show');
            clearTimeout(tipTimer);
            tipTimer = setTimeout(() => tooltip.classList.remove('show'), 3800);
        }

        const motion = { t: 0, x: window.innerWidth * 0.35, y: window.innerHeight * 0.35, angle: 0 };
        let scrollBoost = 0;
        let mouseX = motion.x;
        let mouseY = motion.y;
        let hoverLoop = false;

        function cubicBezier(p0, p1, p2, p3, u) {
            const k = 1 - u;
            return (
                k * k * k * p0 +
                3 * k * k * u * p1 +
                3 * k * u * u * p2 +
                u * u * u * p3
            );
        }

        function pathPoint(t, targetX, targetY) {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const p0x = w * 0.22 + Math.sin(t * 0.6) * 26;
            const p0y = h * 0.34 + Math.cos(t * 0.7) * 22;
            const p1x = w * 0.78 + Math.cos(t * 0.42) * 36;
            const p1y = h * 0.24 + Math.sin(t * 0.45) * 24;
            const p2x = w * 0.74 + Math.sin(t * 0.54) * 32;
            const p2y = h * 0.66 + Math.cos(t * 0.5) * 24;
            const p3x = w * 0.24 + Math.cos(t * 0.47) * 34;
            const p3y = h * 0.62 + Math.sin(t * 0.52) * 24;

            const u = (Math.sin(t * 0.38) + 1) * 0.5;
            const baseX = cubicBezier(p0x, p1x, p2x, p3x, u);
            const baseY = cubicBezier(p0y, p1y, p2y, p3y, u);

            const drift = scrollBoost * 22;
            return {
                x: baseX + (targetX - baseX) * 0.1 + drift,
                y: baseY + (targetY - baseY) * 0.1 - drift * 0.2 + Math.sin(t * 2.2) * 8
            };
        }

        function loopTheLoop() {
            if (hoverLoop) return;
            hoverLoop = true;
            gsap.to(motion, {
                duration: 1.05,
                ease: 'power2.inOut',
                t: motion.t + 1.25,
                onUpdate: () => {
                    motion.angle += 0.28;
                },
                onComplete: () => {
                    hoverLoop = false;
                }
            });
        }

        gsap.ticker.add(() => {
            motion.t += 0.012 + scrollBoost * 0.0018;
            scrollBoost *= 0.9;

            const targetX = mouseX + Math.sin(motion.t * 0.8) * 30;
            const targetY = mouseY - 35 + Math.cos(motion.t * 0.9) * 16;
            const p = pathPoint(motion.t, targetX, targetY);

            const dx = p.x - motion.x;
            const dy = p.y - motion.y;
            motion.x += dx * 0.08;
            motion.y += dy * 0.08;

            const heading = Math.atan2(dy, dx) * (180 / Math.PI);
            motion.angle += (heading - motion.angle) * 0.1;

            bee.style.transform = `translate3d(${motion.x}px, ${motion.y}px, 0) rotate(${motion.angle * 0.12}deg)`;
            tooltip.style.left = `${Math.min(window.innerWidth - 270, motion.x + 54)}px`;
            tooltip.style.top = `${Math.max(84, motion.y - 22)}px`;

            document.documentElement.style.setProperty('--bee-x', `${motion.x}px`);
            document.documentElement.style.setProperty('--bee-y', `${motion.y}px`);

            if (Math.hypot(dx, dy) > 1.2) {
                addParticle(motion.x + 25, motion.y + 42, Math.random() < 0.45);
                if (Math.random() < 0.45) addParticle(motion.x + 22, motion.y + 38, false);
            }

            flowerSpots.forEach((spot) => {
                const fx = window.innerWidth * spot.x;
                const fy = window.innerHeight * spot.y;
                const d = Math.hypot(fx - motion.x, fy - motion.y);
                spot.element.classList.toggle('is-visited', d < 150);
            });

            renderParticles();
        });

        bee.addEventListener('mouseenter', () => {
            showSuggestion();
            loopTheLoop();
        });
        bee.addEventListener('click', () => showSuggestion());

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        window.addEventListener('scroll', () => {
            const sections = [...document.querySelectorAll('section, .service-section, .page-header')];
            const center = window.scrollY + window.innerHeight * 0.5;
            let nearest = null;
            let min = Infinity;
            sections.forEach((el) => {
                const top = el.offsetTop;
                const d = Math.abs(top - center);
                if (d < min) { min = d; nearest = el; }
            });
            if (nearest) {
                mouseY = nearest.offsetTop - window.scrollY + nearest.offsetHeight * 0.35;
            }
            scrollBoost = Math.min(3.6, scrollBoost + 0.6);
        }, { passive: true });

        window.addEventListener('resize', resizeCanvas);

        resizeCanvas();
        showSuggestion(0);
        setInterval(() => showSuggestion(), 9000);
    }

    if (window.gsap) {
        initBee();
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
        script.onload = initBee;
        document.head.appendChild(script);
    }
})();
