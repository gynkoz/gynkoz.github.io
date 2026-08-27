/* ============================================================
   PROJECT RENDERER — shared card HTML builder
   used by projects/home.js (spotlight) and projects/modal.js (grid)
   ============================================================ */

window.ProjectRenderer = (function () {
    /** Card for the "Show All" modal grid (uses plain .chips) */
    function gridCardHTML(p, lang) {
        const title = (p.title && (p.title[lang] || p.title.id || p.title.en)) || '';
        const desc = (p.desc && (p.desc[lang] || p.desc.id || p.desc.en)) || '';
        const cover = (p.gallery && p.gallery[0]) || p.image;
        const chips = (p.chips || []).map(c => `<div class="chip">${c}</div>`).join('');
        const href = `project.html?p=${encodeURIComponent(p.id)}`;

        return `
      <div class="col s12 m6 l4">
        <a class="card hoverable project-card project-card-grid" href="${href}" aria-label="${title}">
          <div class="card-image"><img src="${cover}" alt="${title}" loading="lazy"></div>
          <div class="card-content">
            <div class="project-head">
              <h6 class="grey-text text-darken-4">${title}</h6>
              <i class="material-icons">chevron_right</i>
            </div>
            <div class="project-chips">${chips}</div>
            <p class="project-desc">${desc}</p>
          </div>
        </a>
      </div>`;
    }

    function spotlightSlideHTML(p, lang, idx, total) {
        const dict = (window.DICT && window.DICT[lang]) || {};
        const title = (p.title && (p.title[lang] || p.title.id || p.title.en)) || '';
        const desc = (p.desc && (p.desc[lang] || p.desc.id || p.desc.en)) || '';
        const cover = (p.heroImage || p.image || (p.gallery && p.gallery[0])) || '';
        const href = `project.html?p=${encodeURIComponent(p.id)}`;
        const metrics = (Array.isArray(p.homeChips) && p.homeChips.length ? p.homeChips : p.chips || [])
            .map(c => `<span class="spot-metric">${c}</span>`).join('');
        const stack = (p.stack || []).join('<span class="spot-sep">/</span>');
        const linkLabel = dict['proj.case'] || 'Case Study';
        const num = String(idx + 1).padStart(2, '0');

        return `
      <article class="spot-slide" data-p="${p.id}" data-idx="${idx}" data-num="${num}">
        <a class="spot-link" href="${href}" aria-label="${title}">
          <div class="spot-media">
            <img src="${cover}" alt="${title}" loading="lazy">
            <div class="spot-media-glow" aria-hidden="true"></div>
          </div>
          <div class="spot-body">
            <span class="spot-stack">${stack}</span>
            <h4 class="spot-title">${title}</h4>
            <p class="spot-desc">${desc}</p>
            <div class="spot-metrics">${metrics}</div>
            <span class="spot-more">${linkLabel} <i class="material-icons">arrow_forward</i></span>
          </div>
        </a>
      </article>`;
    }

    function thumbHTML(p, idx) {
        const cover = (p.heroImage || p.image || (p.gallery && p.gallery[0])) || '';
        const title = (p.title && (p.title.id || p.title.en)) || '';
        return `<button class="spot-thumb" data-idx="${idx}" aria-label="${title}">
        <img src="${cover}" alt="" loading="lazy">
      </button>`;
    }

    return { spotlightSlideHTML, thumbHTML, gridCardHTML };
})();
