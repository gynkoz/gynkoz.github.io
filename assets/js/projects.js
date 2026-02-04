/* Dynamic Projects + Horizontal Infinite Auto-Scroll (fixed) */
(function () {
    // --- DATA ---
    window.PROJECTS = [
        {
            id: 'people-counting',
            title: { id: 'People Counting', en: 'People Counting' },
            desc: {
                id: 'Sistem counting di toko ritel untuk traffic, heatmap, dan journey analytics. Akurasi tinggi dan realtime.',
                en: 'In-store counting for traffic, heatmap, and journey analytics. High accuracy and real-time.'
            },
            chips: ['CV', 'Edge'],
            stack: ['Android (Kotlin)', 'TFLite', 'RTSP', 'MQTT'],
            features: [
                { id:'Akurasi >95% di kondisi store umum', en:'>95% accuracy in typical store conditions' },
                { id:'Realtime heatmap & journey path', en:'Real-time heatmap & journey path' },
                { id:'Edge-first, hemat bandwidth', en:'Edge-first, bandwidth friendly' }
            ],
            metrics: [
                { label:'Latency', value:'~80–120 ms' },
                { label:'Devices', value:'300+ cameras' }
            ],
            client: 'MAP Active',
            period: '2024 — ongoing',
            role: 'Solution Architect • CV Engineer',
            gallery: [
                'assets/img/placeholder.png',
                'assets/img/placeholder.png',
                'assets/img/placeholder.png'
            ],
            image: 'assets/img/placeholder.png',
            links: {
                demo: '#',
                video: 'https://youtu.be/xxxx',
                case: '#'
            }
        },
        {
            id: 'merchandiser-app',
            title: { id:'Merchandiser App', en:'Merchandiser App' },
            desc: {
                id:'Sistem Merchandise offline-first (sinkronisasi besar, ribuan user).',
                en:'Offline-first merchandising with massive sync for thousands of users.'
            },
            chips: ['Android', 'Offline-first'],
            stack: ['Android (Kotlin/Java)', 'Room/GreenDAO', 'WorkManager', 'JWT'],
            features: [
                { id:'Sinkronisasi besar saat login', en:'Bulk sync on login' },
                { id:'Modul order, audit, foto bukti', en:'Orders, audits, photo proofs' },
                { id:'Material3 UI + aksesibilitas', en:'Material3 UI + accessibility' }
            ],
            metrics: [
                { label:'Users', value:'8K+' },
                { label:'Audit Accuracy', value:'High' },
                { label:'Manual Tracking', value:'Digitalized' }
            ],
            client: 'Pitjarus',
            period: '2021 — ongoing',
            role: 'Lead Android Dev',
            gallery: [
                'assets/img/placeholder.png',
                'assets/img/placeholder.png'
            ],
            image: 'assets/img/placeholder.png',
            links: { case:'#' }
        },
        {
            id: 'forecast-dashboard',
            title: { id:'Forecast Dashboard', en:'Forecast Dashboard' },
            desc: {
                id:'Dashboard forecasting interaktif untuk keputusan berbasis data.',
                en:'Interactive forecasting dashboard for data-driven decisions.'
            },
            chips: ['Analytics', 'Timeseries'],
            stack: ['Node.js', 'ClickHouse', 'Highcharts'],
            features: [
                { id:'Tes skenario promosi', en:'Promotion what-if' },
                { id:'Anomali detector', en:'Anomaly detection' },
                { id:'Export PDF/CSV', en:'Export PDF/CSV' }
            ],
            metrics: [
                { label:'SKU', value:'1.2K+' },
                { label:'Latency', value:'sub-second charting' }
            ],
            client: 'FMCG Brand',
            period: '2024',
            role: 'Fullstack Engineer',
            gallery: ['assets/img/placeholder.png','assets/img/placeholder.png'],
            image: 'assets/img/placeholder.png',
            links: { }
        },

        {
            id: 'SFA Apps',
            title: { id:'SFA Apps', en:'SFA Apps' },
            desc: {
                id:'Dashboard forecasting interaktif untuk keputusan berbasis data.',
                en:'Interactive forecasting dashboard for data-driven decisions.'
            },
            chips: ['Analytics', 'Timeseries'],
            stack: ['Node.js', 'ClickHouse', 'Highcharts'],
            features: [
                { id:'Tes skenario promosi', en:'Promotion what-if' },
                { id:'Anomali detector', en:'Anomaly detection' },
                { id:'Export PDF/CSV', en:'Export PDF/CSV' }
            ],
            metrics: [
                { label:'SKU', value:'1.2K+' },
                { label:'Latency', value:'sub-second charting' }
            ],
            client: 'FMCG Brand',
            period: '2024',
            role: 'Fullstack Engineer',
            gallery: ['assets/img/placeholder.png','assets/img/placeholder.png'],
            image: 'assets/img/placeholder.png',
            links: { }
        }
    ];


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

        const cardHTML = (p, lang) => {
            const title = (p.title && (p.title[lang] || p.title.id || p.title.en)) || '';
            const desc  = (p.desc  && (p.desc [lang]  || p.desc.id  || p.desc.en )) || '';
            const chips = (p.chips || []).map(c => `<div class="chip blue white-text">${c}</div>`).join('');
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

            let speed = 3;   // px per frame (≈ 48px/detik di 60fps). Silakan sesuaikan
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
                    x -= speed;                // geser ke kiri → terlihat maju ke kanan
                    if (x <= -laneW){          // sudah melewati 1 lane penuh?
                        x += laneW;              // geser maju 1 lane (tanpa reset ke 0) → mulus
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
