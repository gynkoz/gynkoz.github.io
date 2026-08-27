/* ============================================================
   LANG — id/en switcher, applies window.DICT to [data-i18n]
   ============================================================ */

function currentLang() {
    const htmlLang = (document.documentElement.lang || '').toLowerCase();
    const globalLang = (window.APP_LANG || window.LANG || '').toLowerCase();
    const stored = (localStorage.getItem('lang') || '').toLowerCase();
    const v = htmlLang || globalLang || stored || 'id';
    return v.startsWith('en') ? 'en' : 'id';
}

function t(obj) {
    const lang = currentLang();
    return (obj && (obj[lang] || obj.id || obj.en)) || '';
}

function applyLang(lang) {
    const dict = (window.DICT && window.DICT[lang]) || (window.DICT && window.DICT.en) || {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = dict[key];
        if (typeof val === 'string') el.textContent = val;
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

document.addEventListener('DOMContentLoaded', function () {
    const btnId = document.getElementById('btn-id');
    const btnEn = document.getElementById('btn-en');
    if (btnId) btnId.addEventListener('click', () => applyLang('id'));
    if (btnEn) btnEn.addEventListener('click', () => applyLang('en'));

    if (typeof window.detectDefaultLang === 'function') {
        applyLang(window.detectDefaultLang());
    }
});
