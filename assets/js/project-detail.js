(function(){
    const params = new URLSearchParams(location.search);
    const slug = params.get('p');
    const lang = (document.documentElement.lang || 'id').startsWith('en') ? 'en' : 'id';
    const loadingText = lang === 'en' ? 'Loading image...' : 'Memuat gambar...';
    const errorText = lang === 'en' ? 'Image failed to load.' : 'Gambar gagal dimuat.';
    const data = (window.PROJECTS || []).find(x => x.id === slug);
    const el = document.getElementById('project-detail');
    if (!el) return;

    const t = (obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[lang] || obj.id || obj.en || '';
    };
    const labels = {
        back: lang === 'en' ? 'Back' : 'Kembali',
        caps: lang === 'en' ? 'Core Capabilities' : 'Kapabilitas Utama',
        screens: lang === 'en' ? 'Real App Screenshots' : 'Tampilan Aplikasi Asli',
        screensDesc: lang === 'en'
            ? 'Preview the native Android experience. Some data is anonymized.'
            : 'Preview pengalaman native Android. Beberapa data disamarkan.',
        screen: lang === 'en' ? 'Screen' : 'Tampilan',
        badge: lang === 'en' ? 'Used in Production' : 'Sudah digunakan di produksi',
        caseStudy: lang === 'en' ? 'Case Study' : 'Studi Kasus',
        projectCaseStudy: lang === 'en' ? 'Project Case Study' : 'Studi Kasus Proyek',
        notFound: lang === 'en' ? 'Project not found.' : 'Project tidak ditemukan.'
    };

    const backLabel = document.querySelector('.case-back-label');
    if (backLabel) backLabel.textContent = labels.back;
    const caseTitle = document.getElementById('case-title');
    if (caseTitle) caseTitle.textContent = labels.projectCaseStudy;

    el.classList.add('page-enter');
    if (!data){
        el.innerHTML = `<p>${labels.notFound}</p>`;
        requestAnimationFrame(() => el.classList.add('show'));
        return;
    }

    const badgeText = t(data.badge) || labels.badge;
    const titleText = t(data.title);
    const titleLead = t(data.titleLead) || titleText;
    const titleAccent = t(data.titleAccent);
    const heroTitle = titleAccent
        ? `${titleLead}<br><span class="hero-title-accent">${titleAccent}</span>`
        : titleText;
    const splitFeature = (text) => {
        if (!text) return {title:'Capability', desc:''};
        if (text.includes('—') || text.includes('â€”')) {
            const parts = text.split(/—|â€”/);
            return {title: parts[0].trim(), desc: parts.slice(1).join('—').trim()};
        }
        if (text.includes(' - ')) {
            const parts = text.split(' - ');
            return {title: parts[0].trim(), desc: parts.slice(1).join(' - ').trim()};
        }
        return {title:text.trim(), desc:''};
    };
    const capIcon = (text) => {
        const l = (text || '').toLowerCase();
        if (l.includes('gps') || l.includes('location')) return 'location_on';
        if (l.includes('photo') || l.includes('camera')) return 'photo_camera';
        if (l.includes('sync') || l.includes('offline')) return 'sync';
        if (l.includes('audit')) return 'fact_check';
        if (l.includes('cv') || l.includes('ai') || l.includes('vision')) return 'auto_awesome';
        return 'apps';
    };
    const rawCapabilities = Array.isArray(data.features)
        ? data.features
        : (Array.isArray(data.capabilities) ? data.capabilities : []);
    const capabilities = rawCapabilities.map((item) => {
        if (item == null) return null;
        if (typeof item === 'string') {
            const raw = t(item);
            const parts = splitFeature(raw);
            return { title: parts.title, desc: parts.desc, icon: capIcon(raw) };
        }
        const title = t(item.title || item);
        const desc = t(item.desc) || '';
        const icon = item.icon || capIcon(`${title} ${desc}`);
        return { title, desc, icon };
    }).filter(c => c && c.title);
    const capCards = capabilities.map(c => {
        const title = c.title;
        const desc = c.desc || '';
        const icon = c.icon;
        return `
              <div class="cap-card">
                <div class="cap-icon"><span class="material-symbols-outlined">${icon}</span></div>
                <div class="cap-title">${title}</div>
                ${desc ? `<div class="cap-desc">${desc}</div>` : ''}
              </div>`;
    }).join('');

    const rawShots = (data.screenshots && data.screenshots.length)
        ? data.screenshots
        : (data.gallery && data.gallery.length ? data.gallery : (data.image ? [data.image] : []));
    const shots = rawShots.map((s) => {
        if (!s) return null;
        if (typeof s === 'string') return { src: s, label: null };
        return { src: s.src || s.image || '', label: s.label || null };
    }).filter(s => s && s.src);
    const shotCards = shots.map((s,i)=>{
        const label = s.label ? t(s.label) : `${labels.screen} ${i+1}`;
        return `
              <figure class="shot-card">
                <div class="shot-frame media-slot">
                  <div class="img-loader" aria-hidden="true">
                    <div class="img-spinner"></div>
                    <div class="img-loader-text">${loadingText}</div>
                  </div>
                  <img src="${s.src}" alt="${label}" loading="lazy">
                </div>
                <figcaption class="shot-cap">${label}</figcaption>
              </figure>`;
    }).join('');
    const dotCount = shots.length;
    const screenDots = dotCount > 1
        ? Array.from({length: dotCount}, (_,i)=>`<span class="screen-dot${i===0 ? ' active' : ''}"></span>`).join('')
        : '';

    const heroImg = data.heroImage || data.hero || data.image || 'assets/img/placeholder.png';
    const heroGhostImg = data.heroGhostImage || data.heroSecondary || 'assets/img/placeholder.png';
    const metaIcons = ['group', 'event', 'business'];
    const metaItems = (Array.isArray(data.homeChips) && data.homeChips.length)
        ? data.homeChips.map((label, idx) => ({ label, icon: metaIcons[idx] || 'label' }))
        : [
            { label: data.role, icon: 'badge' },
            { label: data.period, icon: 'event' },
            { label: data.client, icon: 'business' }
        ];
    const meta = metaItems
        .filter(item => item && item.label)
        .map(item => `<span class="meta-pill"><span class="material-symbols-outlined">${item.icon}</span>${item.label}</span>`)
        .join('');
    const metaBlock = meta ? `<div class="case-meta">${meta}</div>` : '';

    el.innerHTML = `
    <section class="hero-grid">
      <div class="hero-copy">
        <div class="hero-badge">
          <span class="material-symbols-outlined">verified</span>
          <span>${badgeText}</span>
        </div>
        <h1 class="hero-title">${heroTitle}</h1>
        <p class="hero-desc">${t(data.desc)}</p>
        ${metaBlock}
      </div>
      <div class="hero-art">
        <div class="hero-device hero-device-main media-slot" id="hero-media">
          <div class="img-loader" aria-hidden="true">
            <div class="img-spinner"></div>
            <div class="img-loader-text">${loadingText}</div>
          </div>
          <img src="${heroImg}" alt="${t(data.title)}" loading="lazy">
        </div>
        <div class="hero-device hero-device-ghost" aria-hidden="true">
          <img src="${heroGhostImg}" alt="${t(data.title)} preview" loading="lazy">
        </div>
        <div class="hero-art-glow" aria-hidden="true"></div>
      </div>
    </section>

    <section class="case-section capabilities-section">
      <div class="section-headline center">
        <h2>${labels.caps}</h2>
      </div>
      <div class="cap-grid">${capCards}</div>
    </section>

    ${shots.length ? `
    <section class="case-section screens-wrap">
      <div class="section-headline center">
        <h2>${labels.screens}</h2>
        <p>${labels.screensDesc}</p>
      </div>
      <div class="screen-row hide-scrollbar">
        ${shotCards}
      </div>
      ${screenDots ? `<div class="screen-dots">${screenDots}</div>` : ''}
    </section>
    ` : ''}
  `;

    if (caseTitle) caseTitle.textContent = `${t(data.title)} ${labels.caseStudy}`;

    // Image loading (hero + screenshots)
    const initMediaLoaders = () => {
        document.querySelectorAll('.media-slot').forEach((slot) => {
            const img = slot.querySelector('img');
            const loaderTextEl = slot.querySelector('.img-loader-text');
            if (!img) return;
            const setLoaded = () => slot.classList.add('img-loaded');
            const setError = () => {
                slot.classList.add('img-error');
                if (loaderTextEl) loaderTextEl.textContent = errorText;
            };
            if (img.complete && img.naturalWidth > 0) {
                setLoaded();
            } else {
                img.addEventListener('load', setLoaded, {once:true});
                img.addEventListener('error', setError, {once:true});
            }
        });
    };
    const initScreensCarousel = () => {
        const row = document.querySelector('.screen-row');
        const dots = Array.from(document.querySelectorAll('.screen-dot'));
        if (!row || !dots.length) return;

        const items = Array.from(row.querySelectorAll('.shot-card'));
        if (items.length <= 1) return;

        row.classList.add('snap-disabled');

        let idx = 0;
        let targets = [];
        let rafId = null;
        let timer;
        let animating = false;
        let scrollEndTimer;
        const autoDelay = 2200;
        const animDuration = 650;

        const calcTargets = () => {
            const padLeft = parseFloat(getComputedStyle(row).paddingLeft) || 0;
            const maxScroll = Math.max(0, row.scrollWidth - row.clientWidth);
            targets = items.map(item => {
                const target = item.offsetLeft - padLeft - (row.clientWidth - item.clientWidth) / 2;
                return Math.min(Math.max(0, target), maxScroll);
            });
        };

        const updateDots = () => {
            dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        };

        const easeInOutCubic = (t) => (t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2);

        const animateTo = (nextIdx, duration = animDuration) => {
            idx = (nextIdx + dots.length) % dots.length;
            if (!targets.length) calcTargets();
            const target = targets[idx] ?? 0;
            if (duration <= 0) {
                row.scrollLeft = target;
                updateDots();
                return;
            }
            const start = row.scrollLeft;
            const startTime = performance.now();
            animating = true;
            if (rafId) cancelAnimationFrame(rafId);
            const tick = (now) => {
                const t = Math.min(1, (now - startTime) / duration);
                const eased = easeInOutCubic(t);
                row.scrollLeft = start + (target - start) * eased;
                if (t < 1) {
                    rafId = requestAnimationFrame(tick);
                } else {
                    animating = false;
                    updateDots();
                }
            };
            updateDots();
            rafId = requestAnimationFrame(tick);
        };

        const startAuto = () => {
            stopAuto();
            timer = setInterval(() => animateTo(idx + 1, animDuration), autoDelay);
        };
        const stopAuto = () => {
            if (timer) clearInterval(timer);
        };

        row.addEventListener('mouseenter', stopAuto);
        row.addEventListener('mouseleave', startAuto);
        row.addEventListener('touchstart', stopAuto, {passive:true});
        row.addEventListener('touchend', startAuto, {passive:true});
        row.addEventListener('scroll', () => {
            if (animating) return;
            if (scrollEndTimer) clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(() => {
                if (!targets.length) calcTargets();
                const current = row.scrollLeft;
                let nearest = 0;
                let min = Infinity;
                targets.forEach((t, i) => {
                    const d = Math.abs(current - t);
                    if (d < min) { min = d; nearest = i; }
                });
                if (nearest !== idx) {
                    idx = nearest;
                    updateDots();
                }
            }, 120);
        }, {passive:true});

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                animateTo(i, animDuration);
                startAuto();
            });
        });

        window.addEventListener('resize', () => {
            calcTargets();
            animateTo(idx, 0);
        });

        calcTargets();
        updateDots();
        startAuto();
    };

    initMediaLoaders();
    initScreensCarousel();
    requestAnimationFrame(() => {
        el.classList.add('show');
        const finishEnter = () => {
            if (!el.classList.contains('page-enter')) return;
            el.classList.remove('page-enter');
            el.classList.add('page-entered');
        };
        const hero = document.querySelector('.hero-device-main');
        if (hero) hero.addEventListener('animationend', finishEnter, {once:true});
        setTimeout(finishEnter, 1500);
    });
})();
