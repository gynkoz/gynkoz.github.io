document.addEventListener('DOMContentLoaded', function() {
  const sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav);

  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 56, behavior: 'smooth' });
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
