document.addEventListener('DOMContentLoaded', function() {
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

          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });

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
