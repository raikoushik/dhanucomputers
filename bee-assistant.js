(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const suggestions = [
        { text: 'Need a new laptop? Explore our latest products.', href: 'products.html', cta: 'View Products' },
        { text: 'Get quick support and pricing on WhatsApp.', href: 'https://wa.me/919591555095', cta: 'Chat on WhatsApp' },
        { text: 'Build your dream PC with our customization service.', href: 'customization.html', cta: 'Customize Now' },
        { text: 'Discover CCTV, power backup, and electrical services.', href: 'services.html', cta: 'See Services' },
        { text: 'Read useful tech tips and updates in our blog.', href: 'blog.html', cta: 'Read Blog' }
    ];

    const flowerSpots = [
        { x: 0.08, y: 0.8 }, { x: 0.18, y: 0.88 }, { x: 0.3, y: 0.82 },
        { x: 0.44, y: 0.9 }, { x: 0.56, y: 0.8 }, { x: 0.7, y: 0.88 }, { x: 0.84, y: 0.82 }
    ];

    const sky = document.createElement('div');
    sky.className = 'bee-sky-glow';

    const garden = document.createElement('div');
    garden.className = 'bee-garden';

    const trailLayer = document.createElement('div');
    trailLayer.className = 'bee-trail-layer';

    const bee = document.createElement('button');
    bee.type = 'button';
    bee.className = 'bee-assistant';
    bee.setAttribute('aria-label', 'Interactive bumblebee guide mascot');
    bee.innerHTML = `
        <svg class="bee-body" viewBox="0 0 260 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
            <defs>
                <radialGradient id="beeAura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#fde68a" stop-opacity="0.7"/>
                    <stop offset="100%" stop-color="#fde68a" stop-opacity="0"/>
                </radialGradient>
                <linearGradient id="beeGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#fff7ae"/>
                    <stop offset="50%" stop-color="#facc15"/>
                    <stop offset="100%" stop-color="#f59e0b"/>
                </linearGradient>
                <radialGradient id="beeFurShade" cx="45%" cy="30%" r="75%">
                    <stop offset="0%" stop-color="#4b2f2a"/>
                    <stop offset="100%" stop-color="#1b1412"/>
                </radialGradient>
                <radialGradient id="wingSSS" cx="50%" cy="40%" r="80%">
                    <stop offset="0%" stop-color="#ecfeff" stop-opacity="0.95"/>
                    <stop offset="70%" stop-color="#a5f3fc" stop-opacity="0.52"/>
                    <stop offset="100%" stop-color="#67e8f9" stop-opacity="0.18"/>
                </radialGradient>
            </defs>

            <circle cx="130" cy="122" r="88" fill="url(#beeAura)" class="bee-aura"/>

            <ellipse class="bee-wing wing-left" cx="86" cy="78" rx="31" ry="40" fill="url(#wingSSS)"/>
            <ellipse class="bee-wing wing-right" cx="173" cy="78" rx="31" ry="40" fill="url(#wingSSS)"/>

            <ellipse cx="130" cy="132" rx="66" ry="54" fill="url(#beeGold)"/>
            <ellipse cx="130" cy="132" rx="66" ry="54" fill="none" stroke="#111827" stroke-width="8"/>
            <ellipse cx="130" cy="102" rx="47" ry="39" fill="url(#beeFurShade)"/>

            <path d="M76 126 C98 114 162 114 184 126 L184 137 C162 130 98 130 76 137 Z" fill="#0f172a"/>
            <path d="M76 146 C98 134 162 134 184 146 L184 157 C162 150 98 150 76 157 Z" fill="#0f172a"/>

            <path d="M100 94 Q111 86 122 94" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M138 94 Q149 86 160 94" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round"/>

            <circle cx="114" cy="108" r="14" fill="#fff"/>
            <circle cx="147" cy="108" r="14" fill="#fff"/>
            <circle cx="114" cy="110" r="8" fill="#0f172a"/>
            <circle cx="147" cy="110" r="8" fill="#0f172a"/>
            <circle cx="117" cy="105" r="2.2" fill="#fff"/>
            <circle cx="150" cy="105" r="2.2" fill="#fff"/>

            <ellipse cx="102" cy="120" rx="7" ry="5" fill="#fb7185" opacity="0.6"/>
            <ellipse cx="159" cy="120" rx="7" ry="5" fill="#fb7185" opacity="0.6"/>
            <path d="M114 129 Q130 142 146 129" stroke="#7c2d12" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M120 135 Q130 141 140 135" stroke="#fb7185" stroke-width="4" fill="none" stroke-linecap="round"/>

            <path d="M118 74 Q109 40 90 31" stroke="#1f2937" stroke-width="4" fill="none"/>
            <path d="M142 74 Q151 40 170 31" stroke="#1f2937" stroke-width="4" fill="none"/>
            <circle cx="88" cy="30" r="8" fill="#f59e0b"/>
            <circle cx="172" cy="30" r="8" fill="#f59e0b"/>

            <g class="bee-hand-wave">
                <ellipse cx="68" cy="144" rx="13" ry="11" fill="#f59e0b"/>
                <circle cx="57" cy="136" r="5.3" fill="#f59e0b"/>
                <circle cx="53" cy="145" r="5.3" fill="#f59e0b"/>
                <circle cx="58" cy="154" r="5.3" fill="#f59e0b"/>
            </g>
        </svg>
    `;

    const tooltip = document.createElement('aside');
    tooltip.className = 'bee-tooltip';

    const nest = document.createElement('div');
    nest.className = 'bee-nest';

    document.body.appendChild(sky);
    document.body.appendChild(garden);
    document.body.appendChild(trailLayer);
    document.body.appendChild(nest);
    document.body.appendChild(bee);
    document.body.appendChild(tooltip);

    flowerSpots.forEach((spot, i) => {
        const flower = document.createElement('div');
        flower.className = `bee-flower flower-${i % 4}`;
        flower.innerHTML = `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="50" cy="50" r="14" fill="#f59e0b"/>
                <ellipse cx="50" cy="22" rx="11" ry="18" fill="#f472b6"/>
                <ellipse cx="50" cy="78" rx="11" ry="18" fill="#f472b6"/>
                <ellipse cx="22" cy="50" rx="18" ry="11" fill="#f472b6"/>
                <ellipse cx="78" cy="50" rx="18" ry="11" fill="#f472b6"/>
                <ellipse cx="31" cy="31" rx="12" ry="9" fill="#f9a8d4"/>
                <ellipse cx="69" cy="31" rx="12" ry="9" fill="#f9a8d4"/>
            </svg>
        `;
        spot.element = flower;
        document.body.appendChild(flower);
    });

    let x = window.innerWidth * 0.35;
    let y = window.innerHeight * 0.35;
    let t = 0;
    let centerX = x;
    let centerY = y;
    let scrollBoost = 0;
    let mouseX = x;
    let mouseY = y;
    let idleMode = false;
    let suggestionIndex = 0;
    let hideTipTimer;
    let nestX = 110;
    let nestY = window.innerHeight - 105;

    function positionScene() {
        nestX = Math.max(90, Math.min(window.innerWidth - 130, window.innerWidth * 0.12));
        nestY = window.innerHeight - 105;
        nest.style.left = `${nestX}px`;
        nest.style.top = `${nestY}px`;
        flowerSpots.forEach((spot) => {
            spot.element.style.left = `${Math.round(window.innerWidth * spot.x)}px`;
            spot.element.style.top = `${Math.round(window.innerHeight * spot.y)}px`;
        });
    }

    function showSuggestion(forceIndex) {
        if (typeof forceIndex === 'number') {
            suggestionIndex = forceIndex % suggestions.length;
        }
        const item = suggestions[suggestionIndex];
        suggestionIndex = (suggestionIndex + 1) % suggestions.length;
        const external = item.href.startsWith('http');
        tooltip.innerHTML = `<p>${item.text}</p><a href="${item.href}" class="bee-tooltip-link" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${item.cta}</a>`;
        tooltip.classList.add('show');
        clearTimeout(hideTipTimer);
        hideTipTimer = setTimeout(() => tooltip.classList.remove('show'), 4200);
    }

    function spawnLoveParticle(speed) {
        const p = document.createElement('span');
        p.className = Math.random() < 0.55 ? 'bee-sparkle heart' : 'bee-sparkle';
        p.style.left = `${x + 26 + Math.random() * 12}px`;
        p.style.top = `${y + 42 + Math.random() * 8}px`;
        p.style.setProperty('--sparkle-size', `${4 + Math.min(10, speed * 20)}px`);
        trailLayer.appendChild(p);
        p.addEventListener('animationend', () => p.remove());
    }

    function updateNearbyFlowers() {
        flowerSpots.forEach((spot) => {
            const fx = window.innerWidth * spot.x;
            const fy = window.innerHeight * spot.y;
            const d = Math.hypot(fx - x, fy - y);
            if (d < 140) {
                spot.element.classList.add('is-visited');
            } else {
                spot.element.classList.remove('is-visited');
            }
        });
    }

    function animate() {
        t += 0.018 + scrollBoost * 0.002;
        scrollBoost *= 0.92;

        const targetCX = idleMode ? (Math.random() < 0.5 ? mouseX : nestX) : (window.innerWidth * 0.5 + Math.sin(t * 0.33) * window.innerWidth * 0.22);
        const targetCY = idleMode ? (Math.random() < 0.5 ? Math.max(95, mouseY - 40) : nestY) : (window.innerHeight * 0.42 + Math.cos(t * 0.27) * window.innerHeight * 0.17);

        centerX += (targetCX - centerX) * 0.018;
        centerY += (targetCY - centerY) * 0.018;

        const fig8x = Math.sin(t * 1.06) * 120;
        const fig8y = Math.sin(t * 2.12) * 64;

        const nx = centerX + fig8x;
        const ny = centerY + fig8y;

        const dx = nx - x;
        const dy = ny - y;
        const speed = Math.hypot(dx, dy) * 0.03;

        x += dx * 0.09;
        y += dy * 0.09;

        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        bee.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle * 0.13}deg)`;

        tooltip.style.left = `${Math.min(window.innerWidth - 270, x + 56)}px`;
        tooltip.style.top = `${Math.max(84, y - 24)}px`;

        if (speed > 0.12) {
            spawnLoveParticle(speed);
        }

        updateNearbyFlowers();
        requestAnimationFrame(animate);
    }

    bee.addEventListener('mouseenter', () => {
        showSuggestion();
        idleMode = true;
    });

    bee.addEventListener('mouseleave', () => {
        idleMode = false;
    });

    bee.addEventListener('click', () => {
        showSuggestion();
    });

    let idleTimer;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        idleMode = false;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            idleMode = true;
        }, 2600);
    }, { passive: true });

    window.addEventListener('scroll', () => {
        scrollBoost = Math.min(4, scrollBoost + 0.7);
    }, { passive: true });

    window.addEventListener('resize', positionScene);

    positionScene();
    showSuggestion(0);
    animate();
    setInterval(() => showSuggestion(), 9000);
})();
