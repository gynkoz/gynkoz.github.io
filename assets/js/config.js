/* ============================================================
   CONFIG — i18n dictionary + shared UI text
   ============================================================ */

window.DICT = {
    en: {
        'label.indonesian': 'Indonesia',
        'label.english': 'English',
        'hero.eyebrow': 'Android & Backend Developer',
        'hero.hi': "Hi, I'm",
        'hero.pitch': 'Building Android & backend apps since 2018, focusing on intuitive UI/UX, solid architecture, and real-time data integration to support large-scale business needs.',
        'cta.projects': 'View Projects',
        'cta.contact': 'Contact',
        'cta.cv': 'CV',
        'projects.title': 'Projects',
        'proj.demo': 'Demo / Repo',
        'proj.case': 'Case Study',
        'proj.live': 'Live Demo',
        'contact.strap': "Let's build something great together",
        'footer.rights': 'All rights reserved.',
        'footer.top': 'Back to top',
        'scroll.hint': 'Scroll down',
        'showall': 'Show All',
        'hero.available': 'Available for work',
        'stat.years.label': 'Years exp',
        'stat.users.label': 'Field users',
        'stat.company.label': 'Companies',
        'stat.eff.label': 'Efficiency'
    },
    id: {
        'label.indonesian': 'Indonesia',
        'label.english': 'Inggris',
        'hero.eyebrow': 'Android & Backend Developer',
        'hero.hi': 'Hi, saya',
        'hero.pitch': 'Membangun aplikasi Android & backend sejak 2018, berfokus pada UI/UX yang intuitif, arsitektur solid, dan integrasi data real-time untuk mendukung kebutuhan bisnis skala besar.',
        'cta.projects': 'Lihat Projects',
        'cta.contact': 'Kontak',
        'cta.cv': 'CV',
        'projects.title': 'Projects',
        'proj.demo': 'Demo / Repo',
        'proj.case': 'Studi Kasus',
        'proj.live': 'Live Demo',
        'contact.strap': 'Mari kita bangun sesuatu yang hebat bersama',
        'footer.rights': 'All rights reserved.',
        'footer.top': 'Kembali ke atas',
        'scroll.hint': 'Scroll ke bawah',
        'showall': 'Lihat Semua',
        'hero.available': 'Tersedia untuk kerja',
        'stat.years.label': 'Tahun exp',
        'stat.users.label': 'User lapangan',
        'stat.company.label': 'Perusahaan',
        'stat.eff.label': 'Efisiensi'
    }
};

/* Rotating role words for the hero (per-language) */
window.HERO_ROLES = {
    en: ['Android Developer', 'Backend Engineer', 'AI / Computer Vision', 'Solution Architect'],
    id: ['Android Developer', 'Backend Engineer', 'AI / Computer Vision', 'Solution Architect']
};

/* Orbiting tech badges around the hero photo */
window.HERO_TECH = [
    { icon: 'android', label: 'Android' },
    { icon: 'memory', label: 'Node.js' },
    { icon: 'psychology', label: 'TFLite' },
    { icon: 'storage', label: 'PostgreSQL' },
    { icon: 'cloud', label: 'Edge' },
    { icon: 'bolt', label: 'Realtime' }
];

/* Animated stat counters (value counts up to `to`) */
window.HERO_STATS = [
    { to: 7, suffix: '+', labelKey: 'stat.years.label' },
    { to: 6, suffix: 'K+', labelKey: 'stat.users.label' },
    { to: 15, suffix: '+', labelKey: 'stat.company.label' },
    { to: 50, prefix: '+', suffix: '%', labelKey: 'stat.eff.label' }
];

/* Shared small UI strings used by projects/modal.js */
window.UI_TXT = {
    allProjects: { id: 'Semua Project', en: 'All Projects' },
    searchPh: { id: 'Cari judul atau deskripsi…', en: 'Search title or description…' },
    close: { id: 'Tutup', en: 'Close' },
    nomatch: { id: 'Tidak ada project yang cocok.', en: 'No projects match your filters.' }
};

const ID_TIMEZONES = new Set(['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura']);

window.detectDefaultLang = function () {
    const saved = localStorage.getItem('lang');
    if (saved && (saved in window.DICT)) return saved;
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (ID_TIMEZONES.has(tz)) return 'id';
    } catch (e) {}
    const nav = (navigator.language || 'en').toLowerCase();
    return nav.startsWith('id') ? 'id' : 'en';
};
