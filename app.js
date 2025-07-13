/* =========================================================
   app.js – logika interaktif & penyesuaian responsif
   (c) 2025 PT Mitra Asa Pratama
   =========================================================*/

//-----------------------------------------
// Feather Icons render
//-----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  feather.replace();
});

//-----------------------------------------
// Sidebar toggle (mobile)
//-----------------------------------------
(function(){
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const btnOpen = document.getElementById('btn-open');
  const btnClose= document.getElementById('btn-close');

  if(!sidebar) return; // halaman tanpa sidebar

// buka & tutup sidebar di mobile
document.getElementById('btn-open').onclick = () => {
  sidebar.classList.remove('-translate-x-full');
  overlay.classList.remove('hidden');
};
document.getElementById('btn-close').onclick = () => {
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
};
overlay.onclick = () => {
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
};


//-----------------------------------------
// Auto‑scroll close sidebar (mobile)
//-----------------------------------------
(function(){
  const links = document.querySelectorAll('#sidebar a');
  links.forEach(l => l.addEventListener('click',()=>{
    if(window.innerWidth < 1024){ // lg breakpoint
      document.getElementById('btn-close')?.click();
    }
  }));
})();

//-----------------------------------------
// Resize handler – tambah kelas body breakpoints
//-----------------------------------------
(function(){
  const sizes = {mobile:0,tablet:768,laptop:1024};
  function setBodyClass(){
    const w = window.innerWidth;
    document.body.classList.remove('device-mobile','device-tablet','device-laptop');
    if(w < sizes.tablet)       document.body.classList.add('device-mobile');
    else if(w < sizes.laptop)  document.body.classList.add('device-tablet');
    else                       document.body.classList.add('device-laptop');
  }
  window.addEventListener('resize', setBodyClass);
  setBodyClass();
})();
const formLink = 'https://docs.google.com/forms/d/e/1FAIpQLSdMzBvHqAMErUPQnioIor1XRQlB4JfdhK5O-nrLuXg2fE1Hkg/viewform?usp=sharing&ouid=101264464207911273124';

// Fungsi pasang link ke tombol setelah DOM dimuat
window.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cards');
  const template = document.getElementById('card-template');
  
  const rooms = [
    { key: 'arjuna', name: 'Ruang Meeting Arjuna' },
    { key: 'srikandi', name: 'Ruang Meeting Srikandi' },
    { key: 'gatotkaca', name: 'Ruang Meeting Gatotkaca' }
  ];

  rooms.forEach(room => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.room-title').textContent = room.name;

    const statusEl = clone.querySelector('.room-status');
    statusEl.id = `status-${room.key}`;

    const linkEl = clone.querySelector('.room-link');
    linkEl.href = formLink;
    linkEl.addEventListener('click', e => {
      e.preventDefault();
      window.open(formLink, '_blank');
    });

    cardsContainer.appendChild(clone);
  });
});

//-----------------------------------------
// Example: adjust card font on small screens
//-----------------------------------------
(function(){
  const observer = new ResizeObserver(entries=>{
    entries.forEach(entry=>{
      const cards = document.querySelectorAll('.room-status');
      cards.forEach(c=>{
        if(window.innerWidth < 400){
          c.classList.remove('text-3xl');
          c.classList.add('text-2xl');
        }else{
          c.classList.add('text-3xl');
          c.classList.remove('text-2xl');
        }
      });
    });
  });
  observer.observe(document.body);
})();
