const UI_TXT = {
    allProjects: {id: 'Semua Project', en: 'All Projects'},
    searchPh: {id: 'Cari judul atau deskripsi…', en: 'Search title or description…'},
    close: {id: 'Tutup', en: 'Close'},
};

// Helper bahasa (pakai lang di <html lang="...">)
function currentLang(){
    // urutan prioritas: html lang → global var → localStorage → default 'id'
    const htmlLang = (document.documentElement.lang || '').toLowerCase();
    const globalLang = (window.APP_LANG || window.LANG || '').toLowerCase();
    const stored = (localStorage.getItem('lang') || '').toLowerCase();
    const v = htmlLang || globalLang || stored || 'id';
    return v.startsWith('en') ? 'en' : 'id';
}
function t(obj){
    const lang = currentLang();
    return (obj && (obj[lang] || obj.id || obj.en)) || '';
}

document.addEventListener('DOMContentLoaded', function () {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scroll (semua anchor internal)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id.length > 1) { // biar ga error kalau cuma "#"
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();

                    const yOffset = -80; // offset utk navbar
                    const y = target.getBoundingClientRect().top + window.scrollY + yOffset;

                    // window.scrollTo({
                    //     top: y,
                    //     behavior: 'smooth'
                    // });

                    // Tutup sidenav kalau di mobile
                    const sidenavInst = M.Sidenav.getInstance(document.querySelector('.sidenav'));
                    if (sidenavInst) sidenavInst.close();
                }
            }
        });
    });


// CV download (Google Docs link)
    const btnCv = document.getElementById('btn-download-cv');
    if (btnCv) {
        btnCv.addEventListener('click', () => {
            window.open(
                "https://docs.google.com/document/d/1LV61tOvi8_LSL7fom3hlyUVSM348SWBMf6ScDdkh4QQ/export?format=pdf",
                "_blank"
            );
        });
    }

// ===== One-Page: reveal + dots + parallax =====

    // ===== Reveal on scroll (repeatable) =====
    (() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    // masuk viewport -> animate in
                    e.target.classList.add('show');
                } else {
                    // keluar viewport -> reset biar bisa animate lagi nanti
                    e.target.classList.remove('show');
                }
            });
        }, {threshold: 0.35});

        document.querySelectorAll('.snap-section.reveal').forEach(el => observer.observe(el));
    })();

// Dot nav: klik = scroll, dan aktif mengikuti section terlihat
    (() => {
        const dots = Array.from(document.querySelectorAll('.dots-nav a'));
        const sections = Array.from(document.querySelectorAll('.snap-section'));

        // Klik dot -> scroll ke section
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const id = dot.getAttribute('data-target');
                const target = document.getElementById(id);
                if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
            });
        });

        // Observer untuk menyalakan dot sesuai section yang paling dominan
        const activeObs = new IntersectionObserver((entries) => {
            const vis = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!vis) return;
            const id = vis.target.id;
            dots.forEach(d => d.classList.toggle('active', d.getAttribute('data-target') === id));
        }, {threshold: [0.55, 0.75, 0.9]});

        sections.forEach(s => activeObs.observe(s));
    })();

// Parallax ringan pada hero image (translateY kecil berdasar scroll)
    (() => {
        const heroWrap = document.querySelector('#home .hero-parallax');
        if (!heroWrap) return;
        const onScroll = () => {
            // geser 0 -> 20px selama user scroll setinggi viewport pertama
            const y = Math.min(window.scrollY, window.innerHeight);
            heroWrap.style.transform = `translateY(${y * 0.05}px)`;
        };
        window.addEventListener('scroll', onScroll, {passive: true});
        onScroll();
    })();


    // ===== Scroll hint (auto-hide) =====
    (() => {
        const hint = document.querySelector('#home .scroll-hint');
        if (!hint) return;

        const hide = () => hint.classList.add('hide');
        const show = () => hint.classList.remove('hide');

        // Sembunyikan kalau user scroll turun sedikit
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) hide(); else show();
        }, {passive: true});

        // Atau kalau section berikutnya terlihat, sembunyikan
        const next = document.getElementById('about') || document.querySelector('.snap-section:nth-of-type(2)');
        if (next) {
            const io = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) hide();
            }, {threshold: 0.15});
            io.observe(next);
        }
    })();


    // ===== Full-page: one wheel = one section (no free scrolling) =====
    (() => {
        const sections = Array.from(document.querySelectorAll('.snap-section'));
        if (!sections.length) return;

        // Helper: cari index section yg paling kelihatan
        const getActiveIndex = () => {
            let maxRatio = 0, idx = 0;
            sections.forEach((s, i) => {
                const r = s.getBoundingClientRect();
                // ratio pendekatan: tinggi yg tampak / tinggi viewport
                const visible = Math.max(0, Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top));
                const ratio = visible / Math.min(window.innerHeight, r.height || window.innerHeight);
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    idx = i;
                }
            });
            return idx;
        };

        let current = getActiveIndex();
        let locked = false;

        const goTo = (i) => {
            if (i < 0 || i >= sections.length) return;
            current = i;
            sections[i].scrollIntoView({behavior: 'auto', block: 'start'});
            document.querySelectorAll('.dots-nav a').forEach(d => {
                d.classList.toggle('active', d.getAttribute('data-target') === sections[i].id);
            });
        };

        // >>> Tambahkan ini: expose controller global <<<
        window.onePage = {
            goToId: (id) => {
                const idx = sections.findIndex(s => s.id === id);
                if (idx !== -1) goTo(idx);
            },
            goToIndex: (idx) => goTo(idx)
        };

        // Wheel (desktop)
        const onWheel = (e) => {
            e.preventDefault();                // blok scroll bebas
            if (locked) return;
            locked = true;

            const dir = e.deltaY > 0 ? 1 : -1; // 1 = next, -1 = prev
            const next = current + dir;

            goTo(next);
            setTimeout(() => {
                locked = false;
            }, 550); // debounce agar 1 gulir = 1 section
        };

        // Touch (mobile)
        let startY = 0;
        const onTouchStart = (e) => {
            startY = e.touches[0].clientY;
        };
        const onTouchMove = (e) => {
            // cegah geser bebas saat gesture
            if (Math.abs(e.touches[0].clientY - startY) > 6) e.preventDefault();
        };
        const onTouchEnd = (e) => {
            const endY = (e.changedTouches?.[0]?.clientY ?? startY);
            const dy = startY - endY;
            if (Math.abs(dy) < 40) return; // swipe kecil diabaikan
            if (locked) return;
            locked = true;
            const dir = dy > 0 ? 1 : -1;
            goTo(current + dir);
            setTimeout(() => {
                locked = false;
            }, 550);
        };

        // Binding (non-passive karena kita preventDefault)
        window.addEventListener('wheel', onWheel, {passive: false});
        window.addEventListener('touchstart', onTouchStart, {passive: true});
        window.addEventListener('touchmove', onTouchMove, {passive: false});
        window.addEventListener('touchend', onTouchEnd, {passive: true});

        // Klik dot nav tetap jalan (langsung lompat)
        document.querySelectorAll('.dots-nav a').forEach((d, i) => {
            d.addEventListener('click', (e) => {
                e.preventDefault();
                goTo(i);
            });
        });

        // Sinkron awal (misal halaman dibuka bukan di #home)
        window.addEventListener('load', () => {
            current = getActiveIndex();
            goTo(current);
        });
    })();


    // CTA di hero -> pakai controller onePage agar state current ikut berubah
    (() => {
        const map = [
            ['cta-projects', 'projects'],
            ['cta-contact', 'contact'],
        ];

        map.forEach(([btnId, secId]) => {
            const btn = document.getElementById(btnId);
            if (!btn) return;

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.onePage && typeof window.onePage.goToId === 'function') {
                    window.onePage.goToId(secId);
                } else {
                    // fallback kalau controller belum tersedia
                    document.getElementById(secId)?.scrollIntoView({behavior: 'auto', block: 'start'});
                }
            });
        });
    })();

    // === Show All Projects: inject button, build modal, search + chip filter ===
    (() => {
        // --- state global modul (persist antar buka-tutup modal) ---
        const data = (window.PROJECTS || []);
        if (!data.length) return;

        const ALL_CHIPS = [...new Set(data.flatMap(p => p.chips || []))];
        const selected = new Set();  // OR filter; ingin AND -> ubah di applyFilter()
        let keyword = '';

        // elemen modal (di-assign ulang tiap rebuild)
        let modalEl, gridEl, chipWrapEl, searchEl, modalInstance;

        // helper render
        function cardHTML(p){
            const cover = (p.gallery && p.gallery[0]) || p.image;
            const title = t(p.title);       // gunakan helper i18n global
            const desc  = t(p.desc);
            const chips = (p.chips || []).map(c => `<div class="chip">${c}</div>`).join('');
            const href  = `project.html?p=${encodeURIComponent(p.id)}`;
            return `
      <div class="col s12 m6 l4">
        <a class="card hoverable project-card project-card-grid" href="${href}" aria-label="${title}">
          <div class="card-image"><img src="${cover}" alt="${title}" loading="lazy"></div>
          <div class="card-content">
            <div class="project-head" style="display:flex;align-items:center;justify-content:space-between;gap:8px">
              <h6 class="grey-text text-darken-4" style="font-weight:800;margin:0">${title}</h6>
              <i class="material-icons">chevron_right</i>
            </div>
            <div class="project-chips" style="margin:8px 0;display:flex;gap:6px;flex-wrap:wrap">${chips}</div>
            <p class="project-desc" style="margin:0">${desc}</p>
          </div>
        </a>
      </div>`;
        }

        function applyFilter(){
            const kw = (keyword || '').trim().toLowerCase();
            const needChip = selected.size > 0;
            return data.filter(p => {
                const textHit = !kw || ( (t(p.title)||'').toLowerCase().includes(kw) || (t(p.desc)||'').toLowerCase().includes(kw) );
                if (!needChip) return textHit;
                const chips = p.chips || [];
                const chipHit = chips.some(c => selected.has(c)); // OR match
                return textHit && chipHit;
            });
        }

        function renderChips(){
            if (!chipWrapEl) return;
            chipWrapEl.innerHTML = ALL_CHIPS.map(ch => `
      <div class="chip ${selected.has(ch) ? 'is-selected' : ''}" data-chip="${ch}">${ch}</div>
    `).join('');
        }

        function renderGrid(){
            if (!gridEl) return;
            const list = applyFilter();
            gridEl.innerHTML = list.map(cardHTML).join('') || `
      <div class="col s12">
        <div class="card-panel grey lighten-4"><span>${t({id:'Tidak ada project yang cocok.', en:'No projects match your filters.'})}</span></div>
      </div>`;
        }

        // build HTML modal sesuai bahasa saat ini
        function buildProjectsModalHTML(){
            return `
      <div id="projectsModal" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h5 class="blue-text text-darken-2" style="margin:0 0 12px">${t(UI_TXT.allProjects)}</h5>
          <div class="row" style="margin-bottom:8px">
            <div class="col s12">
              <div class="searchbox search-wrap" role="search">
                <i class="material-icons" aria-hidden="true">search</i>
                <input id="projSearch" type="search"
                       placeholder="${t(UI_TXT.searchPh)}"
                       aria-label="${t(UI_TXT.searchPh)}"
                       autocomplete="off">
              </div>
            </div>
          </div>
          <div id="chipFilter" class="chip-filter"></div>
          <div id="projectsGrid" class="row" style="margin-top:8px"></div>
        </div>
        <div class="modal-footer">
          <a class="modal-close waves-effect btn">${t(UI_TXT.close)}</a>
        </div>
      </div>`;
        }

        // rebuild modal → assign refs → bind listeners → render awal
        function openModal(){
            // === state & util (local + persistent antar buka-tutup) ===
            const data = (window.PROJECTS || []);
            if (!data.length) return;

            // persist pilihan chip & keyword di properti fungsi
            const selected = openModal.__selected || new Set();
            let keyword    = openModal.__keyword  || '';

            // i18n helpers (pakai lang terkini)
            const UI_TXT = window.UI_TXT || {
                allProjects: { id: 'Semua Project', en: 'All Projects' },
                searchPh:    { id: 'Cari judul atau deskripsi…', en: 'Search title or description…' },
                close:       { id: 'Tutup', en: 'Close' },
                nomatch:     { id: 'Tidak ada project yang cocok.', en: 'No projects match your filters.' }
            };
            const currentLang = () => {
                const htmlLang = (document.documentElement.lang || '').toLowerCase();
                const globalLang = (window.APP_LANG || window.LANG || '').toLowerCase();
                const stored = (localStorage.getItem('lang') || '').toLowerCase();
                const v = htmlLang || globalLang || stored || 'id';
                return v.startsWith('en') ? 'en' : 'id';
            };
            const t = (obj) => (obj && (obj[currentLang()] || obj.id || obj.en)) || '';

            // kumpulkan chips unik
            const ALL_CHIPS = [...new Set(data.flatMap(p => p.chips || []))];

            // builder kartu
            const cardHTML = (p) => {
                const cover = (p.gallery && p.gallery[0]) || p.image;
                const title = t(p.title);
                const desc  = t(p.desc);
                const chips = (p.chips || []).map(c => `<div class="chip">${c}</div>`).join('');
                const href  = `project.html?p=${encodeURIComponent(p.id)}`;
                return `
      <div class="col s12 m6 l4">
        <a class="card hoverable project-card project-card-grid" href="${href}" aria-label="${title}">
          <div class="card-image"><img src="${cover}" alt="${title}" loading="lazy"></div>
          <div class="card-content">
            <div class="project-head" style="display:flex;align-items:center;justify-content:space-between;gap:8px">
              <h6 class="grey-text text-darken-4" style="font-weight:800;margin:0">${title}</h6>
              <i class="material-icons">chevron_right</i>
            </div>
            <div class="project-chips" style="margin:8px 0;display:flex;gap:6px;flex-wrap:wrap">${chips}</div>
            <p class="project-desc" style="margin:0">${desc}</p>
          </div>
        </a>
      </div>`;
            };

            // filter
            const applyFilter = () => {
                const kw = (keyword || '').trim().toLowerCase();
                const needChip = selected.size > 0;
                return data.filter(p => {
                    const textHit = !kw || ((t(p.title)||'').toLowerCase().includes(kw) || (t(p.desc)||'').toLowerCase().includes(kw));
                    if (!needChip) return textHit;
                    return (p.chips || []).some(c => selected.has(c)); // OR
                });
            };

            // --- rebuild modal (hapus lama jika ada) ---
            document.getElementById('projectsModal')?.remove();
            const modalHTML = `
    <div id="projectsModal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h5 class="blue-text text-darken-2" style="margin:0 0 12px">${t(UI_TXT.allProjects)}</h5>
        <div class="row" style="margin-bottom:8px">
          <div class="col s12">
            <div class="searchbox search-wrap" role="search">
              <i class="material-icons" aria-hidden="true">search</i>
              <input id="projSearch" type="search"
                     placeholder="${t(UI_TXT.searchPh)}"
                     aria-label="${t(UI_TXT.searchPh)}"
                     autocomplete="off" value="${keyword.replace(/"/g,'&quot;')}">
            </div>
          </div>
        </div>
        <div id="chipFilter" class="chip-filter"></div>
        <div id="projectsGrid" class="row" style="margin-top:8px"></div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect btn">${t(UI_TXT.close)}</a>
      </div>
    </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHTML);

            // refs baru
            const modalEl    = document.getElementById('projectsModal');
            const gridEl     = document.getElementById('projectsGrid');
            const chipWrapEl = document.getElementById('chipFilter');
            const searchEl   = document.getElementById('projSearch');

            // renderers (pakai refs baru)
            const renderChips = () => {
                chipWrapEl.innerHTML = ALL_CHIPS.map(ch => `
      <div class="chip ${selected.has(ch) ? 'is-selected' : ''}" data-chip="${ch}">${ch}</div>
    `).join('');
            };
            const renderGrid = () => {
                const list = applyFilter();
                gridEl.innerHTML = list.map(cardHTML).join('') || `
      <div class="col s12">
        <div class="card-panel grey lighten-4"><span>${t(UI_TXT.nomatch)}</span></div>
      </div>`;
            };

            // --- init materialize + lock one-page scroll ---
            const contentEl = modalEl.querySelector('.modal-content');
            const stopWheel = (e) => { e.stopPropagation(); };
            const stopTouch = (e) => { e.stopPropagation(); };
            const stopKeys  = (e) => {
                const k = e.key || e.code;
                if (['ArrowUp','ArrowDown','PageUp','PageDown','Space',' '].includes(k)) e.stopPropagation();
            };
            const modalInstance = M.Modal.init(modalEl, {
                preventScrolling: true,
                onOpenEnd(){
                    contentEl.addEventListener('wheel',     stopWheel, {passive:false});
                    contentEl.addEventListener('touchmove', stopTouch, {passive:false});
                    modalEl.addEventListener('keydown',     stopKeys,  true);
                },
                onCloseEnd(){
                    contentEl.removeEventListener('wheel',     stopWheel, {passive:false});
                    contentEl.removeEventListener('touchmove', stopTouch, {passive:false});
                    modalEl.removeEventListener('keydown',     stopKeys,  true);
                }
            });

            // --- bind events (elemen baru) ---
            chipWrapEl.addEventListener('click', (e) => {
                const el = e.target.closest('.chip[data-chip]');
                if (!el) return;
                const v = el.getAttribute('data-chip');
                if (selected.has(v)) selected.delete(v); else selected.add(v);
                renderChips();
                renderGrid();
            });

            let tmr = null;
            searchEl.addEventListener('input', (e) => {
                clearTimeout(tmr);
                tmr = setTimeout(() => {
                    keyword = e.target.value || '';
                    openModal.__keyword = keyword;   // persist
                    renderGrid();
                }, 160);
            });

            // --- first render + open ---
            renderChips();
            renderGrid();
            modalInstance.open();
            setTimeout(() => searchEl && searchEl.focus(), 120);

            // simpan state terpilih untuk sesi berikutnya
            openModal.__selected = selected;
            openModal.__keyword  = keyword;
        }


        // sisipkan tombol "Show All" di header section projects
        (function injectShowAll(){
            const header =
                document.querySelector('#projects .section-title') ||
                document.querySelector('#projects h3') ||
                document.querySelector('#projects h2');
            if (!header) return;

            const btn = document.createElement('a');
            btn.id = 'showAllBtn';
            btn.className = 'btn-flat waves-effect';
            btn.style.fontWeight = '600';
            btn.textContent = t({id:'Lihat Semua', en:'Show All'});

            // pastikan header bisa menampung tombol di kanan
            header.style.display = 'flex';
            header.style.alignItems = 'center';
            header.style.gap = '10px';
            header.appendChild(btn);

            // open modal saat diklik (build on demand)
            btn.addEventListener('click', openModal);
        })();
    })();


})

