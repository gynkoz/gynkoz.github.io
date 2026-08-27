/* ============================================================
   PROJECTS OVERLAY — "Show All" curtain grid
   - Full-screen overlay, clip-path open from button
   - anime.js staggered grid, animated filter changes
   ============================================================ */

(function () {
    function start() {
        const data = window.PROJECTS || [];
        if (!data.length || !window.ProjectRenderer) return;

        const UI_TXT = window.UI_TXT || {
            allProjects: { id: 'Semua Project', en: 'All Projects' },
            searchPh: { id: 'Cari judul atau deskripsi…', en: 'Search title or description…' },
            close: { id: 'Tutup', en: 'Close' },
            nomatch: { id: 'Tidak ada project yang cocok.', en: 'No projects match your filters.' }
        };

        const ALL_CHIPS = [...new Set(data.flatMap(p => p.chips || []))];
        const hasAnime = typeof anime !== 'undefined';
        const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let selected = new Set();
        let keyword = '';
        let overlay = null;
        let triggerBtn = null;

        function lang() {
            return (document.documentElement.lang || 'id').startsWith('en') ? 'en' : 'id';
        }
        function tt(obj) { return (obj && (obj[lang()] || obj.id || obj.en)) || ''; }

        function applyFilter() {
            const kw = keyword.trim().toLowerCase();
            const needChip = selected.size > 0;
            return data.filter(p => {
                const title = (p.title[lang()] || p.title.id || p.title.en || '').toLowerCase();
                const desc = (p.desc[lang()] || p.desc.id || p.desc.en || '').toLowerCase();
                const textHit = !kw || title.includes(kw) || desc.includes(kw);
                if (!needChip) return textHit;
                return textHit && (p.chips || []).some(c => selected.has(c));
            });
        }

        function renderGrid(animateIn) {
            const grid = overlay && overlay.querySelector('.pj-grid');
            const empty = overlay && overlay.querySelector('.pj-empty');
            if (!grid) return;
            const items = applyFilter();
            grid.innerHTML = items.map(p => window.ProjectRenderer.gridCardHTML(p, lang())).join('');
            if (empty) empty.style.display = items.length ? 'none' : '';

            const cards = Array.from(grid.children);
            if (animateIn && hasAnime && !reduced && cards.length) {
                anime({
                    targets: cards,
                    opacity: [0, 1],
                    translateY: [36, 0],
                    scale: [.96, 1],
                    duration: 420,
                    easing: 'easeOutCubic',
                    delay: anime.stagger(45, { grid: [Math.ceil(Math.sqrt(cards.length)), cards.length], from: 'first' })
                });
            }
            const count = overlay && overlay.querySelector('.pj-count');
            if (count) count.textContent = items.length + ' / ' + data.length;
        }

        function buildOverlay() {
            const el = document.createElement('div');
            el.className = 'pj-overlay';
            el.setAttribute('role', 'dialog');
            el.setAttribute('aria-modal', 'true');
            el.setAttribute('aria-label', tt(UI_TXT.allProjects));
            el.innerHTML = `
        <div class="pj-head">
          <div class="pj-head-top">
            <h3 class="pj-title">${tt(UI_TXT.allProjects)} <span class="pj-count"></span></h3>
            <button class="pj-close" type="button" aria-label="${tt(UI_TXT.close)}">
              <i class="material-icons">close</i>
            </button>
          </div>
          <div class="searchbox" role="search">
            <i class="material-icons" aria-hidden="true">search</i>
            <input type="search" placeholder="${tt(UI_TXT.searchPh)}"
                   aria-label="${tt(UI_TXT.searchPh)}" autocomplete="off">
          </div>
          <div class="chip-filter"></div>
        </div>
        <div class="pj-body">
          <div class="pj-grid"></div>
          <p class="pj-empty" style="display:none">${tt(UI_TXT.nomatch)}</p>
        </div>`;

            const chipWrap = el.querySelector('.chip-filter');
            chipWrap.innerHTML = ALL_CHIPS.map(c =>
                `<button class="chip" type="button" data-chip="${c}">${c}</button>`).join('');

            el.querySelector('.pj-close').addEventListener('click', closeOverlay);
            el.addEventListener('pointerdown', (e) => { if (e.target === el) closeOverlay(); });

            const input = el.querySelector('input[type="search"]');
            input.value = keyword;
            input.addEventListener('input', () => { keyword = input.value; renderGrid(true); });

            chipWrap.addEventListener('click', (e) => {
                const chip = e.target.closest('.chip');
                if (!chip) return;
                const c = chip.dataset.chip;
                if (selected.has(c)) { selected.delete(c); chip.classList.remove('is-selected'); }
                else { selected.add(c); chip.classList.add('is-selected'); }
                renderGrid(true);
            });
            selected.forEach(c => {
                const chip = chipWrap.querySelector(`[data-chip="${CSS.escape(c)}"]`);
                if (chip) chip.classList.add('is-selected');
            });

            return el;
        }

        function originFrom(btn) {
            const r = btn.getBoundingClientRect();
            return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        }

        function openOverlay(btn) {
            if (overlay) return;
            triggerBtn = btn || null;
            overlay = buildOverlay();
            document.body.appendChild(overlay);
            document.documentElement.style.overflow = 'hidden';

            renderGrid(false);
            const cards = overlay.querySelectorAll('.pj-grid > *');
            const head = overlay.querySelector('.pj-head');

            if (hasAnime && !reduced && triggerBtn) {
                const o = originFrom(triggerBtn);
                overlay.style.clipPath = `circle(0% at ${o.x}px ${o.y}px)`;
                anime({
                    targets: overlay,
                    clipPath: [`circle(0% at ${o.x}px ${o.y}px)`, `circle(150% at ${o.x}px ${o.y}px)`],
                    duration: 650,
                    easing: 'easeOutExpo'
                });
                anime({
                    targets: head,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 500,
                    delay: 200,
                    easing: 'easeOutCubic'
                });
                if (cards.length) {
                    anime({
                        targets: cards,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        scale: [.96, 1],
                        duration: 460,
                        delay: anime.stagger(45, { start: 300 }),
                        easing: 'easeOutCubic'
                    });
                }
            } else {
                overlay.style.opacity = '0';
                if (hasAnime) {
                    anime({ targets: overlay, opacity: [0, 1], duration: 250, easing: 'linear' });
                } else {
                    overlay.style.opacity = '1';
                }
            }

            document.addEventListener('keydown', onKey);
            const input = overlay.querySelector('input[type="search"]');
            if (input) input.focus({ preventScroll: true });
        }

        function onKey(e) { if (e.key === 'Escape') closeOverlay(); }

        function closeOverlay() {
            if (!overlay) return;
            const el = overlay;
            overlay = null;
            document.removeEventListener('keydown', onKey);
            document.documentElement.style.overflow = '';

            const done = () => { el.remove(); };
            if (hasAnime && !reduced) {
                const cards = el.querySelectorAll('.pj-grid > *');
                if (cards.length) {
                    anime({
                        targets: cards,
                        opacity: [1, 0],
                        translateY: [0, 20],
                        duration: 180,
                        delay: anime.stagger(15),
                        easing: 'easeInQuad'
                    });
                }
                anime({
                    targets: el,
                    opacity: [1, 0],
                    duration: 320,
                    delay: 120,
                    easing: 'easeInQuad',
                    complete: done
                });
            } else {
                done();
            }
            if (triggerBtn) triggerBtn.focus({ preventScroll: true });
        }

        /* Inject "Show All" button into the projects section header */
        function injectShowAllButton() {
            const header = document.querySelector('#projects .sec-head');
            if (!header) return;
            let btn = document.getElementById('showAllBtn');
            if (!btn) {
                btn = document.createElement('button');
                btn.id = 'showAllBtn';
                btn.className = 'showall-btn';
                btn.type = 'button';
                btn.innerHTML = '<i class="material-icons">grid_view</i><span></span>';
                header.appendChild(btn);
                btn.addEventListener('click', () => openOverlay(btn));
            }
            btn.querySelector('span').textContent = tt(UI_TXT.allProjects);
            // live-refresh open overlay on language change
            if (overlay) {
                const l = lang();
                overlay.querySelector('.pj-title').firstChild.textContent = tt(UI_TXT.allProjects) + ' ';
                overlay.querySelector('input[type="search"]').placeholder = tt(UI_TXT.searchPh);
                renderGrid(false);
            }
        }

        document.addEventListener('DOMContentLoaded', injectShowAllButton);
        document.addEventListener('langchange', injectShowAllButton);
        if (document.readyState !== 'loading') injectShowAllButton();
    }

    start();
})();
