/* ============================================================
   ANIMATIONS — anime.js showcase for the homepage
   - Hero intro timeline (name, stats, orbit, photo)
   - Rotating role words
   - Animated stat counters
   - Orbiting tech badges + continuous rotation
   - Mouse-move parallax (photo + blobs) + magnetic buttons
   - Cinematic scroll-reveal for the rest of the page
   ============================================================ */

(function () {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasAnime = typeof anime !== 'undefined';

    function lang() {
        return (document.documentElement.lang || 'id').startsWith('en') ? 'en' : 'id';
    }

    /* ---------- Split a name into word spans for staggered reveal ---------- */
    function splitWords(el) {
        const words = el.textContent.trim().split(/\s+/);
        el.textContent = '';
        const frag = document.createDocumentFragment();
        words.forEach(w => {
            const s = document.createElement('span');
            s.className = 'w';
            s.textContent = w;
            frag.appendChild(s);
        });
        el.appendChild(frag);
        return el.querySelectorAll('.w');
    }

    /* ---------- Build the orbiting tech badges ---------- */
    function buildOrbit() {
        const orbit = document.getElementById('hero-orbit');
        const tech = window.HERO_TECH || [];
        if (!orbit || !tech.length) return [];

        const stage = orbit.parentElement;
        if (!stage) return [];
        orbit.setAttribute('role', 'list');
        orbit.innerHTML = '';
        const badges = tech.map((t) => {
            const b = document.createElement('div');
            b.className = 'orbit-badge';
            b.setAttribute('role', 'listitem');
            b.innerHTML = `<i class="material-icons" aria-hidden="true">${t.icon}</i>${t.label}`;
            orbit.appendChild(b);
            return b;
        });

        // radius relative to stage size
        const positionAll = (angleOffset) => {
            const rect = stage.getBoundingClientRect();
            const R = Math.min(rect.width, rect.height) * 0.46;
            badges.forEach((b, i) => {
                const a = angleOffset + (i / badges.length) * Math.PI * 2;
                const x = Math.cos(a) * R;
                const y = Math.sin(a) * R;
                b.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
            });
        };

        return { badges, positionAll };
    }

    /* ---------- Rotating role words ---------- */
    function startRotatingRoles() {
        const el = document.getElementById('hero-rotating-role');
        if (!el) return;
        // read roles live so langchange applies without a reload
        const roles = () => (window.HERO_ROLES && window.HERO_ROLES[lang()]) || [];
        if (roles().length < 2) return;

        let i = 0;
        el.textContent = roles()[0];

        const swap = () => {
            const list = roles();
            if (!list.length) return;
            const next = list[(i + 1) % list.length];
            if (!hasAnime || prefersReduced) { el.textContent = next; i = (i + 1) % list.length; return; }
            anime({
                targets: el,
                opacity: [1, 0],
                translateY: [0, -10],
                duration: 260,
                easing: 'easeInCubic',
                complete: () => {
                    el.textContent = next;
                    i = (i + 1) % list.length;
                    anime({ targets: el, opacity: [0, 1], translateY: [10, 0], duration: 320, easing: 'easeOutCubic' });
                }
            });
        };
        let iv = setInterval(swap, 2300);
        // pause rotation while user hovers the role line
        const wrap = el.closest('.hero-roles');
        if (wrap) {
            wrap.addEventListener('pointerenter', () => { clearInterval(iv); iv = null; });
            wrap.addEventListener('pointerleave', () => { if (!iv) iv = setInterval(swap, 2300); });
        }
    }

    /* ---------- Animated stat counters ---------- */
    function buildStats() {
        const wrap = document.getElementById('hero-stats');
        const stats = window.HERO_STATS || [];
        const dict = (window.DICT && window.DICT[lang()]) || {};
        if (!wrap || !stats.length) return [];

        wrap.innerHTML = stats.map((s) => {
            const label = dict[s.labelKey] || '';
            return `<div class="hero-stat">
                <span class="hero-stat-num" data-to="${s.to}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix || ''}">${s.prefix || ''}0${s.suffix || ''}</span>
                <span class="hero-stat-label">${label}</span>
            </div>`;
        }).join('');

        // reserve final width up-front so counting never reflows the row
        const nums = wrap.querySelectorAll('.hero-stat-num');
        nums.forEach((el) => {
            const final = (el.dataset.prefix || '') + (el.dataset.to || '') + (el.dataset.suffix || '');
            el.style.minWidth = (final.length + 0.5) + 'ch';
        });

        return nums;
    }

    function runCounters(nums) {
        if (!nums || !nums.length) return;
        nums.forEach((el) => {
            const to = parseInt(el.dataset.to, 10) || 0;
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            if (!hasAnime || prefersReduced) { el.textContent = `${prefix}${to}${suffix}`; return; }
            const obj = { v: Math.max(0, to - 9) };
            el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
            anime({
                targets: obj,
                v: to,
                duration: 1800,
                easing: 'easeInOutQuad',
                update: () => { el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`; },
                complete: () => el.classList.add('stat-landed')
            });
        });
    }

    /* ---------- Magnetic buttons ----------
       mousemove: snap-follow cursor (no transition, class removed).
       mouseleave: add .magnetic-reset → CSS transition animates the
       transform back to origin smoothly. Deterministic, no drift. */
    function initMagnetic() {
        if (prefersReduced) return;
        document.querySelectorAll('.magnetic').forEach((btn) => {
            const strength = 0.18;
            btn.addEventListener('mousemove', (e) => {
                btn.classList.remove('magnetic-reset');
                const r = btn.getBoundingClientRect();
                const mx = e.clientX - (r.left + r.width / 2);
                const my = e.clientY - (r.top + r.height / 2);
                btn.style.transform = `translate(${mx * strength}px, ${my * strength}px) scale(1.03)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.classList.add('magnetic-reset');
                btn.style.transform = '';
            });
        });
    }

    /* ---------- Mouse parallax for photo + blobs ---------- */
    function initParallax() {
        if (prefersReduced) return;
        const stage = document.getElementById('hero-photo-stage');
        const blobs = document.querySelectorAll('.hero-blob');
        const hero = document.getElementById('home');
        if (!hero) return;

        let raf = null;
        hero.addEventListener('mousemove', (e) => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                const cx = window.innerWidth / 2;
                const cy = window.innerHeight / 2;
                const dx = (e.clientX - cx) / cx;
                const dy = (e.clientY - cy) / cy;
                if (stage) stage.style.transform = `translate(${dx * 18}px, ${dy * 18}px)`;
                blobs.forEach((b, i) => {
                    const depth = (i + 1) * 10;
                    b.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
                });
                raf = null;
            });
        });
    }

    /* ---------- Hero intro timeline ---------- */
    function heroIntro() {
        const orbit = buildOrbit();
        const statNums = buildStats();

        // Reveal helper: strip pre-hidden state so fallback shows content
        const show = (sel) => document.querySelectorAll(sel).forEach(el => { el.style.opacity = 1; });

        if (!hasAnime || prefersReduced) {
            // Static fallback: reveal everything, still run counters/roles instantly
            document.querySelectorAll('#home [data-hx]').forEach(el => el.style.opacity = 1);
            document.querySelectorAll('.orbit-badge').forEach(b => b.style.opacity = 1);
            document.querySelectorAll('.lang-toggle').forEach(b => b.style.opacity = 1);
            if (orbit && orbit.positionAll) orbit.positionAll(-Math.PI / 2);
            runCounters(statNums);
            startRotatingRoles();
            startOrbitSpin(orbit);
            return;
        }

        // Pre-arrange badges at their orbit slots (stayed hidden via .js-anim)
        // so the reveal only fades them in at the correct radius — no bunching.
        if (orbit && orbit.positionAll) orbit.positionAll(-Math.PI / 2);

        // Split the name into words (gradient + stagger are gated behind .js-anim,
        // so a split here can never leave the name invisible).
        const nameEl = document.querySelector('#home [data-hx="name"]');
        const words = nameEl ? splitWords(nameEl) : [];

        const tl = anime.timeline({ easing: 'easeOutExpo', duration: 800, delay: 250 });

        tl.add({ targets: '.lang-toggle', opacity: [0, 1], translateY: [-16, 0], duration: 600 })
          .add({ targets: '#home [data-hx="greeting"]', opacity: [0, 1], translateY: [14, 0], duration: 500 }, '-=300')
          .add({ targets: nameEl, opacity: [0, 1], duration: 1 }, '-=350')
          .add({ targets: words.length ? words : nameEl, opacity: [0, 1], translateY: [36, 0], duration: 650, delay: words.length ? anime.stagger(85) : 0, easing: 'easeOutBack' }, '-=350')
          .add({ targets: '#home [data-hx="roles"]', opacity: [0, 1], translateX: [-16, 0], duration: 500 }, '-=250')
          .add({ targets: '#home [data-hx="desc"]', opacity: [0, 1], translateY: [16, 0], duration: 500 }, '-=300')
          .add({
              targets: '#home [data-hx="stats"]',
              opacity: [0, 1],
              translateY: [16, 0],
              duration: 500,
              begin: () => runCounters(statNums)
          }, '-=250')
          .add({ targets: '#home [data-hx="cta"]', opacity: [0, 1], translateY: [16, 0], duration: 500 }, '-=250')
          .add({
              targets: '#home [data-hx="photo"]',
              opacity: [0, 1],
              scale: [0.8, 1],
              duration: 900,
              easing: 'spring(1, 80, 10, 0)'
          }, '-=900')
          .add({
              targets: '.orbit-badge',
              opacity: [0, 1],
              duration: 550,
              delay: anime.stagger(90)
          }, '-=500');

        tl.finished.then(() => { startOrbitSpin(orbit); });

        startRotatingRoles();
    }

    /* ---------- Continuous orbit rotation (paused when hidden/hovered) ---------- */
    function startOrbitSpin(orbit) {
        if (!orbit || !orbit.positionAll || prefersReduced) {
            if (orbit && orbit.positionAll) orbit.positionAll(-Math.PI / 2);
            return;
        }
        let angle = -Math.PI / 2;
        const speed = 0.0008;
        let last = performance.now();
        let paused = false;
        let rafId = null;

        const loop = (now) => {
            const dt = now - last; last = now;
            if (!paused) {
                angle += speed * dt;
                orbit.positionAll(angle);
            }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        // pause when tab hidden or hero scrolled out of view
        document.addEventListener('visibilitychange', () => {
            paused = document.hidden;
            last = performance.now();
        });
        const hero = document.getElementById('home');
        if (hero && 'IntersectionObserver' in window) {
            new IntersectionObserver((es) => {
                paused = !es[0].isIntersecting || document.hidden;
                last = performance.now();
            }, { threshold: 0.02 }).observe(hero);
        }

        // hover a badge pauses the spin so its tooltip stays put
        const orbitEl = document.getElementById('hero-orbit');
        if (orbitEl) {
            orbitEl.addEventListener('pointerenter', () => { paused = true; }, true);
            orbitEl.addEventListener('pointerleave', () => { paused = false; last = performance.now(); }, true);
        }

        // reposition on resize (throttled via rAF)
        let resizeRaf = null;
        window.addEventListener('resize', () => {
            if (resizeRaf) return;
            resizeRaf = requestAnimationFrame(() => { orbit.positionAll(angle); resizeRaf = null; });
        });
    }

    /* ---------- Scroll hint auto-hide ---------- */
    function initScrollHint() {
        const hint = document.querySelector('#home .scroll-hint');
        if (!hint) return;
        const projects = document.getElementById('projects');
        window.addEventListener('scroll', () => {
            hint.classList.toggle('hide', window.scrollY > 40);
        }, { passive: true });
        hint.addEventListener('click', () => {
            if (projects) projects.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        if (projects) {
            new IntersectionObserver((es) => { if (es[0].isIntersecting) hint.classList.add('hide'); }, { threshold: .1 }).observe(projects);
        }
    }

    /* ---------- Cinematic scroll reveal for sections ---------- */
    function initScrollReveal() {
        const groups = document.querySelectorAll('[data-reveal-group]');
        if (!groups.length) return;

        const revealGroup = (group) => {
            group.classList.add('in-view');
            const items = group.querySelectorAll('[data-reveal]');
            const subItems = group.querySelectorAll('[data-reveal-item]');

            if (!hasAnime || prefersReduced) {
                items.forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; el.classList.add('revealed'); });
                subItems.forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
                return;
            }

            items.forEach((el, i) => {
                const kind = el.getAttribute('data-reveal');
                const props = { targets: el, opacity: [0, 1], duration: 700, delay: i * 90, easing: 'easeOutCubic', complete: () => el.classList.add('revealed') };
                if (kind === 'left') props.translateX = [-46, 0];
                else if (kind === 'right') props.translateX = [46, 0];
                else if (kind === 'scale') props.scale = [0.92, 1];
                else props.translateY = [46, 0];
                anime(props);
            });

            if (subItems.length) {
                anime({
                    targets: subItems,
                    opacity: [0, 1],
                    translateY: [40, 0],
                    scale: [0.96, 1],
                    duration: 650,
                    delay: anime.stagger(90, { start: 200 }),
                    easing: 'easeOutCubic'
                });
            }
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealGroup(entry.target);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        groups.forEach(g => io.observe(g));
    }

    /* ---------- Rebuild hero i18n bits on language change ---------- */
    function onLangChange() {
        // rebuild stats labels + roles list to new language (values already animated)
        const wrap = document.getElementById('hero-stats');
        if (wrap) {
            const dict = (window.DICT && window.DICT[lang()]) || {};
            wrap.querySelectorAll('.hero-stat').forEach((stat, idx) => {
                const cfg = (window.HERO_STATS || [])[idx];
                const labelEl = stat.querySelector('.hero-stat-label');
                if (cfg && labelEl) labelEl.textContent = dict[cfg.labelKey] || '';
            });
        }
        // roles: reset current text to first of new language
        const roleEl = document.getElementById('hero-rotating-role');
        const roles = (window.HERO_ROLES && window.HERO_ROLES[lang()]) || [];
        if (roleEl && roles.length) roleEl.textContent = roles[0];

        // re-split section-head titles that haven't been revealed yet
        document.querySelectorAll('.sec-head').forEach(h => {
            if (!h.dataset.revealed) splitHead(h);
        });
    }

    /* ---------- Section headings: split-word reveal + icon + line ---------- */
    function splitHead(head) {
        const title = head.querySelector('[data-split]');
        if (!title) return;
        const cur = title.textContent.trim();
        const orig = title.dataset.orig;
        if (orig === undefined) {
            title.dataset.orig = cur;
            splitWords(title);
        } else if (cur !== orig) {
            title.dataset.orig = cur;
            splitWords(title);
        }
    }

    function initSectionHeads() {
        const heads = document.querySelectorAll('.sec-head');
        if (!heads.length) return;

        const revealHead = (head) => {
            if (head.dataset.revealed) return;
            head.dataset.revealed = '1';
            const title = head.querySelector('[data-split]');
            const icon = head.querySelector('.sec-head-icon');
            const line = head.querySelector('.sec-head-line');
            const words = title ? title.querySelectorAll('.w') : [];
            if (hasAnime && !prefersReduced) {
                if (icon) anime({ targets: icon, opacity: [0, 1], scale: [.6, 1], duration: 520, easing: 'easeOutBack' });
                if (words.length) anime({ targets: words, opacity: [0, 1], translateY: [26, 0], duration: 540, easing: 'easeOutBack', delay: anime.stagger(80) });
                if (line) anime({ targets: line, width: ['0px', '64px'], duration: 650, easing: 'easeOutCubic', delay: 350 });
            } else {
                words.forEach(w => { w.style.opacity = 1; w.style.transform = 'none'; });
                if (icon) { icon.style.opacity = 1; icon.style.transform = 'none'; }
                if (line) line.style.width = '64px';
            }
        };

        heads.forEach(head => {
            splitHead(head);
            const io = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) { revealHead(head); io.disconnect(); }
            }, { threshold: .4 });
            io.observe(head);
        });
    }

    /* ---------- Custom cursor glow (pointer:fine only) ---------- */
    function initCursorGlow() {
        if (prefersReduced) return;
        if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.setAttribute('aria-hidden', 'true');
        document.body.appendChild(glow);
        let raf = null;
        let x = -999, y = -999;
        window.addEventListener('pointermove', (e) => {
            x = e.clientX; y = e.clientY;
            if (raf) return;
            raf = requestAnimationFrame(() => {
                glow.style.transform = `translate(${x}px, ${y}px)`;
                raf = null;
            });
        }, { passive: true });
    }

    /* ---------- Scroll progress bar ---------- */
    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        bar.setAttribute('aria-hidden', 'true');
        document.body.appendChild(bar);
        let raf = null;
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? (window.scrollY / max) : 0;
            bar.style.transform = `scaleX(${p})`;
            raf = null;
        };
        window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
        window.addEventListener('resize', () => { if (!raf) raf = requestAnimationFrame(update); });
        update();
    }

    /* ---------- Boot ---------- */
    function boot() {
        heroIntro();
        initMagnetic();
        initParallax();
        initScrollHint();
        initScrollReveal();
        initSectionHeads();
        initCursorGlow();
        initScrollProgress();
        document.addEventListener('langchange', onLangChange);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
