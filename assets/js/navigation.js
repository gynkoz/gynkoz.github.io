/* ============================================================
   NAVIGATION — smooth scroll, dots nav, scroll hint, footer year
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== Smooth scroll for internal anchors =====
    const goTo = (id) => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id.length > 1) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    goTo(id.slice(1));
                }
            }
        });
    });

    // ===== Dot navigation: click to scroll + highlight active section =====
    // (removed with the dots-nav UI)

    // ===== Hero CTA buttons =====
    [['cta-projects', 'projects'], ['cta-contact', 'contact']].forEach(([btnId, secId]) => {
        const btn = document.getElementById(btnId);
        if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); goTo(secId); });
    });

    // ===== CV download =====
    const btnCv = document.getElementById('btn-download-cv');
    if (btnCv) {
        btnCv.addEventListener('click', () => {
            window.open('https://docs.google.com/document/d/1LV61tOvi8_LSL7fom3hlyUVSM348SWBMf6ScDdkh4QQ/export?format=pdf', '_blank');
        });
    }

    // ===== Scroll hint (auto-hide) =====
    const hint = document.querySelector('#home .scroll-hint');
    if (hint) {
        const hide = () => hint.classList.add('hide');
        const show = () => hint.classList.remove('hide');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) hide(); else show();
        }, { passive: true });

        const next = document.getElementById('projects');
        if (next) {
            const io = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) hide();
            }, { threshold: 0.15 });
            io.observe(next);
        }
        hint.addEventListener('click', () => goTo('projects'));
    }
});
