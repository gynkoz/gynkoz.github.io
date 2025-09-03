document.getElementById('year').textContent = new Date().getFullYear();
const drawer=document.getElementById('drawer');
document.getElementById('open-drawer').addEventListener('click',()=>drawer.open=true);