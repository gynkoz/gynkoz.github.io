// year
document.getElementById('year').textContent = new Date().getFullYear();

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();window.scrollTo({top:t.offsetTop-64,behavior:'smooth'});}
  });
});

// drawer for mobile
const btn=document.getElementById('btn-menu');
const drawer=document.getElementById('drawer');
if(btn && drawer){ btn.addEventListener('click',()=>drawer.open=true); }
