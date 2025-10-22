(function(){
  // Smooth scroll
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const id=a.getAttribute('href').slice(1);
      const el=document.getElementById(id);
      if(el){ el.scrollIntoView({behavior:'smooth'}); }
    });
  });

  const gallery = Array.from(document.querySelectorAll('.gallery .tile img'));
  const modal = document.getElementById('modal');
  if(!gallery.length || !modal) return;
  const modalImg = modal.querySelector('.modal-img');
  const btnClose = modal.querySelector('.modal-close');
  const btnPrev = modal.querySelector('.modal-prev');
  const btnNext = modal.querySelector('.modal-next');
  let idx = 0;

  function openAt(i){
    idx = i;
    const img = gallery[idx];
    modalImg.src = img.getAttribute('data-full') || img.src;
    modalImg.alt = img.alt || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  function close(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    modalImg.src='';
  }
  function prev(){ openAt((idx-1+gallery.length)%gallery.length); }
  function next(){ openAt((idx+1)%gallery.length); }

  gallery.forEach((img,i)=>{
    img.addEventListener('click', ()=>openAt(i));
    img.style.cursor='zoom-in';
  });
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) close(); });
  window.addEventListener('keydown', (e)=>{
    if(!modal.classList.contains('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') prev();
    if(e.key==='ArrowRight') next();
  });
})();