/* ============================================================
   PROJECTS HOME — deck showcase
   - Stacked card deck (front / mid / back), thumbnail strip nav
   - anime.js deck transitions + autoplay progress
   ============================================================ */

(function () {
    function start() {
        var root = document.getElementById('project-spotlight');
        if (!root || !window.PROJECTS || !window.ProjectRenderer) return;

        var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var hasAnime = typeof anime !== 'undefined';
        var DELAY = 6500;
        var PEEK = 3; // visible deck layers

        var index = 0;
        var timer = null;
        var busy = false;
        var queued = null;
        var gen = 0;

        function slides() { return Array.from(root.querySelectorAll('.spot-slide')); }
        function thumbs() { return Array.from(root.querySelectorAll('.spot-thumb')); }
        function lang() {
            var l = (document.documentElement.lang || 'id');
            return l.indexOf('en') === 0 ? 'en' : 'id';
        }
        var UNIT_SELS = ['.spot-media', '.spot-title', '.spot-desc', '.spot-metrics', '.spot-more'];

        function offsetOf(k, i, n) { return ((k - i) % n + n) % n; }

        /* Assign deck layer classes from current index */
        function setDeck(i) {
            var all = slides();
            var n = all.length;
            var wrap = root.querySelector('.spot-deck-wrap');
            if (wrap) wrap.setAttribute('data-current-num', String(i + 1).padStart(2, '0'));
            all.forEach(function (s, k) {
                var off = offsetOf(k, i, n);
                s.classList.toggle('is-front', off === 0);
                s.classList.toggle('is-mid', off === 1);
                s.classList.toggle('is-back', off === 2);
                s.classList.toggle('is-hidden', off >= PEEK);
                s.style.zIndex = off < PEEK ? (PEEK - off) : 0;
                if (hasAnime) anime.remove(s);
                s.style.opacity = '';
                s.style.transform = '';
                s.style.filter = '';
                s.style.position = '';
                s.style.inset = '';
                s.style.width = '';
                s.style.pointerEvents = off === 0 ? '' : 'none';
            });
            thumbs().forEach(function (t, k) {
                t.classList.toggle('is-active', k === i);
                t.setAttribute('aria-selected', String(k === i));
            });
            var active = thumbs()[i];
            if (active && active.scrollIntoView) {
                active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' });
            }
        }

        function resetUnits(slide) {
            if (!slide) return;
            UNIT_SELS.forEach(function (sel) {
                var u = slide.querySelector(sel);
                if (!u) return;
                if (hasAnime) anime.remove(u);
                u.style.opacity = '0';
                u.style.transform = 'translateY(24px)';
                u.style.willChange = 'transform, opacity';
            });
        }

        function revealUnits(slide, id) {
            if (gen !== id) return;
            var units = UNIT_SELS.map(function (sel) { return slide.querySelector(sel); }).filter(Boolean);
            if (!units.length) return;
            if (!hasAnime || reduced) {
                units.forEach(function (u) {
                    u.style.opacity = '1';
                    u.style.transform = 'none';
                    u.style.willChange = 'auto';
                });
                return;
            }
            anime({
                targets: units,
                opacity: [0, 1],
                translateY: ['24px', '0px'],
                duration: 520,
                easing: 'easeOutCubic',
                delay: anime.stagger(90)
            });
        }

        function show(i, instant) {
            var all = slides();
            var n = all.length;
            if (!n) return;
            i = ((i % n) + n) % n;

            if (busy) { queued = i; return; }
            if (i === index && !instant && root.querySelector('.spot-slide.is-front')) { autoplay(); return; }
            if (!hasAnime || reduced || instant) { setDeck(i); index = i; autoplay(); return; }

            var cur = all[index];
            var next = all[i];
            if (!next) { autoplay(); return; }

            busy = true;
            var id = ++gen;
            var prevIndex = index;
            index = i;

            thumbs().forEach(function (t, k) {
                t.classList.toggle('is-active', k === i);
                t.setAttribute('aria-selected', String(k === i));
            });
            var active = thumbs()[i];
            if (active && active.scrollIntoView) {
                active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
            }

            var forward = offsetOf(i, prevIndex, n) <= n / 2;

            resetUnits(next);

            var finish = function () {
                if (gen !== id) return;
                setDeck(i);
                revealUnits(next, id);
                busy = false;
                if (queued !== null) { var q = queued; queued = null; show(q, true); }
                else { autoplay(); }
            };

            /* Leaving card: fly out up (forward) or sink down (backward) */
            var leave = forward
                ? { translateY: [0, -60], rotate: [0, -2], opacity: [1, 0] }
                : { translateY: [0, 60], rotate: [0, 2], opacity: [1, 0] };
            leave.duration = 420;
            leave.easing = 'easeInQuad';

            cur.style.zIndex = String(PEEK + 2);
            /* pin leaving card as absolute so the deck doesn't jump when
               the incoming card takes over the in-flow .is-front slot */
            cur.classList.remove('is-front');
            cur.style.position = 'absolute';
            cur.style.inset = '0';
            cur.style.width = '100%';
            anime({ targets: cur, ...leave });

            /* Incoming card rises from the deck */
            next.classList.remove('is-hidden', 'is-mid', 'is-back');
            next.classList.add('is-front');
            next.style.zIndex = String(PEEK + 1);
            next.style.pointerEvents = '';
            anime({
                targets: next,
                opacity: [0, 1],
                translateY: [forward ? 40 : -40, 0],
                scale: [.92, 1],
                duration: 480,
                delay: 120,
                easing: 'easeOutExpo',
                complete: finish
            });

            /* Remaining visible layers settle one step */
            all.forEach(function (s, k) {
                if (s === cur || s === next) return;
                var off = offsetOf(k, i, n);
                if (off >= PEEK) return;
                s.style.zIndex = String(PEEK - off);
            });
        }

        function progressBar() { return root.querySelector('.spot-progress-fill'); }

        function autoplay() {
            stop();
            if (reduced || slides().length < 2) return;
            timer = setTimeout(function () { show(index + 1); }, DELAY);
            var fill = progressBar();
            if (fill && hasAnime) {
                anime.remove(fill);
                fill.style.width = '0%';
                anime({ targets: fill, width: '100%', duration: DELAY, easing: 'linear' });
            } else if (fill) {
                fill.style.width = '100%';
            }
        }

        function stop() {
            if (timer) { clearTimeout(timer); timer = null; }
            var fill = progressBar();
            if (fill && hasAnime) anime.remove(fill);
        }

        function render() {
            var projects = window.PROJECTS;
            var list = projects.map(function (p, i) {
                return window.ProjectRenderer.spotlightSlideHTML(p, lang(), i, projects.length);
            }).join('');

            root.innerHTML =
                '<div class="spot-deck-wrap">' +
                    '<div class="spot-deck">' + list + '</div>' +
                '</div>' +
                '<div class="spot-progress" aria-hidden="true"><div class="spot-progress-fill"></div></div>' +
                '<div class="spot-thumbs" role="tablist" aria-label="Projects">' +
                    projects.map(function (p, i) { return window.ProjectRenderer.thumbHTML(p, i); }).join('') +
                '</div>';

            index = 0;
            gen = 0;
            busy = false;
            queued = null;

            thumbs().forEach(function (t, i) {
                t.addEventListener('click', function () { show(i); });
            });

            setDeck(0);
            var first = slides()[0];
            var id = ++gen;
            resetUnits(first);
            revealUnits(first, id);
            autoplay();
            initTilt();
        }

        /* 3D tilt on the front card (8deg, GPU transform) */
        function initTilt() {
            if (reduced) return;
            if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
            var deck = root.querySelector('.spot-deck');
            if (!deck) return;
            var raf = null;
            deck.addEventListener('pointermove', function (e) {
                if (raf) return;
                raf = requestAnimationFrame(function () {
                    var card = root.querySelector('.spot-slide.is-front .spot-link');
                    if (!card) { raf = null; return; }
                    var r = deck.getBoundingClientRect();
                    var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
                    var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
                    card.style.transform = 'perspective(1000px) rotateY(' + (dx * 8).toFixed(2) + 'deg) rotateX(' + (-dy * 8).toFixed(2) + 'deg)';
                    raf = null;
                });
            });
            deck.addEventListener('pointerleave', function () {
                var card = root.querySelector('.spot-slide.is-front .spot-link');
                if (card) card.style.transform = '';
            });
        }

        render();
        root.addEventListener('pointerenter', stop);
        root.addEventListener('pointerleave', autoplay);
        root.addEventListener('focusin', stop);
        root.addEventListener('focusout', autoplay);
        root.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') show(index - 1);
            else if (e.key === 'ArrowRight') show(index + 1);
        });
        document.addEventListener('langchange', render);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
