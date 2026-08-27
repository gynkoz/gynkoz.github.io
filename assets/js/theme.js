/* ============================================================
   THEME — light/dark toggle
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    const themeButtons = document.querySelectorAll('.theme-btn');
    if (!themeButtons.length) return;

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeButtons.forEach(btn => {
            btn.setAttribute('aria-pressed', String(btn.dataset.theme === theme));
        });
    };

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));

    themeButtons.forEach(btn => btn.addEventListener('click', () => applyTheme(btn.dataset.theme)));
});
