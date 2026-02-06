/* Dynamic Projects + Horizontal Infinite Auto-Scroll (fixed) */
(function () {
    function start() {
        const grid = document.getElementById('project-grid');
        if (!grid) return;

        // --- Fallback: paksa strip horizontal kalau CSS belum nempel ---
        Object.assign(grid.style, {
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '18px',
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            padding: '6px 4px 10px'
        });

        const linkLabel = (obj, lang) => {
            if (!obj) return ['', ''];
            if (obj.demo) return [lang === 'id' ? 'Demo / Repo' : 'Demo / Repo', obj.demo];
            if (obj.case) return [lang === 'id' ? 'Studi Kasus' : 'Case Study', obj.case];
            if (obj.live) return [lang === 'id' ? 'Live Demo' : 'Live Demo', obj.live];
            if (obj.repo) return [lang === 'id' ? 'Repository' : 'Repository', obj.repo];
            return ['', ''];
        };

        const homeChipIcons = ['group', 'event', 'business'];
        const chipIcon = (label) => {
            const text = String(label || '').toLowerCase();
            if (text.includes('android')) return 'android';
            if (text.includes('offline')) return 'cloud_off';
            if (text.includes('analytics')) return 'insights';
            if (text.includes('timeseries') || text.includes('time series')) return 'show_chart';
            if (text.includes('edge')) return 'hub';
            if (text.includes('cv') || text.includes('vision')) return 'visibility';
            return 'label';
        };

        const renderChip = (chip, idx, mode) => {
            if (!chip) return '';
            if (typeof chip === 'object') {
                const label = chip.label || '';
                const icon = chip.icon || (mode === 'home' ? (homeChipIcons[idx] || 'label') : chipIcon(label));
                if (!label) return '';
                return `<div class="chip blue white-text"><i class="material-icons">${icon}</i>${label}</div>`;
            }
            const label = chip;
            const icon = mode === 'home' ? (homeChipIcons[idx] || 'label') : chipIcon(label);
            return `<div class="chip blue white-text"><i class="material-icons">${icon}</i>${label}</div>`;
        };

        const cardHTML = (p, lang) => {
            const title = (p.title && (p.title[lang] || p.title.id || p.title.en)) || '';
            const desc  = (p.desc  && (p.desc [lang]  || p.desc.id  || p.desc.en )) || '';
            const isHomeChips = Array.isArray(p.homeChips) && p.homeChips.length;
            const chipData = isHomeChips ? p.homeChips : (p.chips || []);
            const chips = chipData.map((c, idx) => renderChip(c, idx, isHomeChips ? 'home' : 'default')).join('');
            const cover = (p.gallery && p.gallery[0]) || p.image;
            const detailHref = `project.html?p=${encodeURIComponent(p.id)}`;

            return `
            <div class="project-item">
              <a class="card hoverable project-card" href="${detailHref}" aria-label="${title}">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${cover}" alt="${title}" loading="lazy">
                </div>
                <div class="card-content">
                  <div class="project-head">
                    <h5 class="project-title grey-text text-darken-4">${title}</h5>
                    <i class="material-icons more-icon">chevron_right</i>
                  </div>
                  <div class="project-chips">${chips}</div>
                  <p class="project-desc">${desc}</p>
                </div>
              </a>
            </div>
          `;
        };


        // ===== Enable CSS auto-carousel by wrapping & duplicating children =====
        function startRafCarousel(grid){
            const track = grid.querySelector('.auto-track');
            const lane1 = track.querySelector('.lane');     // satu lane (nanti diduplikasi di HTML)
            if (!track || !lane1) return;

            let speed = 3;   // px per frame (~48px/detik di 60fps). Silakan sesuaikan
            let paused = false;
            let x = 0;         // posisi translateX saat ini
            let laneW = 0;     // lebar 1 lane + margin-right-nya (gap antar-lane)

            const measure = () => {
                const style = getComputedStyle(lane1);
                const mr = parseFloat(style.marginRight) || 0;
                laneW = lane1.getBoundingClientRect().width + mr;
            };

            // pause/resume interaksi
            grid.addEventListener('mouseenter', () => paused = true);
            grid.addEventListener('mouseleave', () => paused = false);
            // drag desktop
            let down=false, sx=0, ox=0;
            grid.addEventListener('mousedown', e => { down=true; paused=true; sx=e.clientX; ox=x; });
            window.addEventListener('mouseup',   () => { if(down){ down=false; paused=false; }});
            window.addEventListener('mousemove', e => { if(!down) return; x = ox + (e.clientX - sx); track.style.transform = `translate3d(${x}px,0,0)`; });
            // touch
            let tx=0, ox2=0;
            grid.addEventListener('touchstart', e=>{ paused=true; tx=e.touches[0].clientX; ox2=x; }, {passive:true});
            grid.addEventListener('touchmove',  e=>{ x = ox2 + (e.touches[0].clientX - tx); track.style.transform = `translate3d(${x}px,0,0)`; }, {passive:true});
            grid.addEventListener('touchend',   ()=>{ paused=false; }, {passive:true});

            // rAF loop
            function tick(){
                if (!paused){
                    x -= speed;                // geser ke kiri -> terlihat maju ke kanan
                    if (x <= -laneW){          // sudah melewati 1 lane penuh?
                        x += laneW;              // geser maju 1 lane (tanpa reset ke 0) -> mulus
                    }
                    track.style.transform = `translate3d(${x}px,0,0)`;
                }
                requestAnimationFrame(tick);
            }

            // hitung ulang bila resize
            const onResize = () => { const prev = laneW; measure(); /* jaga posisi saat lebar berubah */ x = (x % laneW) * (laneW/prev) || 0; };
            window.addEventListener('resize', onResize);

            measure();
            requestAnimationFrame(tick);
        }


        function renderProjects(){
            const lang  = (document.documentElement.lang || 'id').startsWith('en') ? 'en' : 'id';
            const cards = window.PROJECTS.map(p => cardHTML(p, lang)).join('');
            const grid  = document.getElementById('project-grid');
            if (!grid) return;

            grid.removeAttribute('style'); // pastikan bukan flex
            grid.innerHTML = `
            <div class="auto-track">
              <div class="lane">${cards}</div>
              <div class="lane">${cards}</div>
            </div>
          `;

            startRafCarousel(grid); // <-- jalankan carousel kontinu
        }



        renderProjects();

        // --- Auto-scroll infinite ---
        let paused = false;
        let speed = 3;
        let rafId;

        function loop(){
            if (!paused) {
                grid.scrollLeft += speed;
                const half = grid.scrollWidth / 2;
                if (grid.scrollLeft >= half) grid.scrollLeft -= half;  // reset mulus
            }
            rafId = requestAnimationFrame(loop);
        }
        rafId = requestAnimationFrame(loop);

    // pause saat hover/focus
        grid.addEventListener('mouseenter', () => paused = true);
        grid.addEventListener('mouseleave', () => paused = false);
        grid.addEventListener('focusin',   () => paused = true);
        grid.addEventListener('focusout',  () => paused = false);

    // drag desktop
        let isDown=false, sx=0, sl=0;
        grid.addEventListener('mousedown', (e)=>{ isDown=true; paused=true; sx=e.clientX; sl=grid.scrollLeft; });
        window.addEventListener('mouseup', ()=>{ if(isDown){ isDown=false; paused=false; }});
        window.addEventListener('mousemove', (e)=>{ if(!isDown) return; grid.scrollLeft = sl - (e.clientX - sx); });

    // touch mobile
        let tx=0, tl=0;
        grid.addEventListener('touchstart', e=>{ paused=true; tx=e.touches[0].clientX; tl=grid.scrollLeft; }, {passive:true});
        grid.addEventListener('touchmove',  e=>{ grid.scrollLeft = tl - (e.touches[0].clientX - tx); }, {passive:true});
        grid.addEventListener('touchend',   ()=>{ paused=false; }, {passive:true});

    // re-render saat ganti bahasa (kalau kamu pakai tombol ID/EN)
        ['btn-id','btn-en'].forEach(id=>{
            const b = document.getElementById(id);
            if (b) b.addEventListener('click', ()=>{ renderProjects(); });
        });

    // optional: bersih saat unload
        window.addEventListener('beforeunload', ()=>{ if (rafId) cancelAnimationFrame(rafId); });

    }

    // Pastikan jalan setelah DOM siap, supaya #project-grid sudah ada
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
