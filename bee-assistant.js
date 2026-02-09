(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bee = document.createElement('button');
    bee.type = 'button';
    bee.className = 'bird-assistant bee-cartoon bee-only-visible';
    bee.setAttribute('aria-label', 'DhanuTech bee assistant');
    bee.innerHTML = `
        <svg class="bird-svg" viewBox="0 0 180 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
            <defs>
                <linearGradient id="beeYellow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#fff176"/>
                    <stop offset="100%" stop-color="#facc15"/>
                </linearGradient>
                <linearGradient id="wingBlue" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.95"/>
                    <stop offset="100%" stop-color="#93c5fd" stop-opacity="0.35"/>
                </linearGradient>
            </defs>

            <ellipse class="bee-wing left" cx="86" cy="52" rx="20" ry="11" fill="url(#wingBlue)" stroke="#60a5fa" stroke-width="1.3"/>
            <ellipse class="bee-wing right" cx="105" cy="47" rx="20" ry="11" fill="url(#wingBlue)" stroke="#60a5fa" stroke-width="1.3"/>
            <ellipse cx="93" cy="90" rx="33" ry="22" fill="url(#beeYellow)" stroke="#7c4a16" stroke-width="2.6" transform="rotate(-12 93 90)"/>
            <path d="M69 84 Q91 72 115 78" stroke="#2b2b2b" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path d="M66 95 Q89 83 113 89" stroke="#2b2b2b" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path d="M64 106 Q87 95 109 101" stroke="#2b2b2b" stroke-width="6" fill="none" stroke-linecap="round"/>
            <circle cx="58" cy="75" r="20" fill="url(#beeYellow)" stroke="#7c4a16" stroke-width="2.4"/>
            <circle cx="51" cy="73" r="3.2" fill="#111827"/>
            <circle cx="63" cy="73" r="3.2" fill="#111827"/>
            <path d="M50 82 Q57 88 64 82" stroke="#9a3412" stroke-width="2.2" fill="none" stroke-linecap="round"/>
            <path d="M53 58 Q49 46 42 41" stroke="#2f2f2f" stroke-width="2" fill="none"/>
            <path d="M66 58 Q70 46 77 41" stroke="#2f2f2f" stroke-width="2" fill="none"/>
            <circle cx="41" cy="40" r="2.4" fill="#2f2f2f"/>
            <circle cx="78" cy="40" r="2.4" fill="#2f2f2f"/>
        </svg>
    `;

    document.body.appendChild(bee);

    const state = {
        x: Math.max(70, window.innerWidth - 220),
        y: Math.max(120, window.innerHeight - 300),
        tx: Math.max(70, window.innerWidth - 220),
        ty: Math.max(120, window.innerHeight - 300),
        angle: 0,
        t: 0,
        retargetAt: performance.now() + 1200
    };

    function retarget() {
        state.tx = 90 + Math.random() * Math.max(140, window.innerWidth - 220);
        state.ty = 110 + Math.random() * Math.max(120, window.innerHeight - 340);
        state.retargetAt = performance.now() + 1400 + Math.random() * 900;
    }

    function tick(now) {
        state.t += 0.018;
        if (now > state.retargetAt || (Math.abs(state.tx - state.x) < 18 && Math.abs(state.ty - state.y) < 18)) retarget();

        const ox = Math.sin(state.t * 1.9) * 18;
        const oy = Math.cos(state.t * 2.3) * 10;
        state.x += (state.tx + ox - state.x) * 0.08;
        state.y += (state.ty + oy - state.y) * 0.08;
        state.angle += ((ox * 0.3) - state.angle) * 0.16;

        bee.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.angle}deg)`;
        bee.style.setProperty('--wing-fast', `${Math.sin(state.t * 48) * 27}deg`);
        requestAnimationFrame(tick);
    }

    window.addEventListener('resize', retarget);
    retarget();
    requestAnimationFrame(tick);
})();
