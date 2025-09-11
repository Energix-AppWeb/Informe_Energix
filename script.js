let position = 0;
const speed=1.3;

const lidersTrack=document.querySelector('.liders-track');
const liders = document.querySelectorAll('.liders-card');


liders.forEach(lider =>{
    const clone = lider.cloneNode(true);
    lidersTrack.appendChild(clone);
});

function moveslider(){

    position -=speed;

    const totalwidth = lidersTrack.scrollWidth/2;
    if(Math.abs(position)>=totalwidth)position=0;
    lidersTrack.style.transform = `translateX(${position}px)`; 
    requestAnimationFrame(moveslider)

}

moveslider();


(() => {
  const slider = document.querySelector('.services-slider');
  if (!slider) return;

  const track  = slider.querySelector('.track');
  const cards  = [...track.children];
  const prev   = slider.querySelector('.prev');
  const next   = slider.querySelector('.next');
  const dotsEl = slider.querySelector('.dots');

  let perView = 4;      // cuántas visibles a la vez
  let index = 0;        // índice de la primera tarjeta visible
  let maxIndex = 0;     // hasta dónde puedo llegar
  let cardWidth = 0;    

  function calcPerView(){
    if (window.innerWidth >= 1024) perView = 3;
    else if (window.innerWidth >= 640) perView = 2;
    else perView = 1;
  }

  function layout(){
    calcPerView();
    const wrapWidth = slider.clientWidth - 88; // resta espacio flechas
    cardWidth = Math.floor((wrapWidth - (perView-1)*24) / perView);
    cards.forEach(c => c.style.minWidth = cardWidth + 'px');

    maxIndex = cards.length - perView; // último índice permitido
    index = Math.min(index, maxIndex);

    move();
    drawDots();
  }

  function move(){
    track.style.transform = `translateX(-${index * (cardWidth + 24)}px)`;
    drawDots();
  }

  function drawDots(){
    dotsEl.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++){
      const b = document.createElement('button');
      if (i === index) b.setAttribute('aria-current','true');
      b.addEventListener('click', () => { index = i; move(); });
      dotsEl.appendChild(b);
    }
  }

  function go(dir){
    index = Math.max(0, Math.min(maxIndex, index + dir));
    move();
  }

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  window.addEventListener('resize', layout, { passive:true });

  // init
  layout();
})();


// Helpers
function limpiarFormulario(form) {
  form?.reset();
}
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// === Event delegation (funciona aunque el script cargue antes del HTML) ===
document.addEventListener('click', (e) => {
  const target = e.target;

  // --- 0) Si es un link "real" (href != "#") y NO es trigger de modal, permitir navegación ---
  const link = target.closest('a[href]');
  if (link) {
    const href = link.getAttribute('href');
    const isRealLink = href && href !== '#' && !href.startsWith('javascript:');
    const isModalTrigger = link.matches('[data-open-modal], .open-login, .open-register, .auth-buttons .login, .auth-buttons .sign-up');
    if (isRealLink && !isModalTrigger) {
      // Mostrar loader y dejar que el navegador navegue (¡no hagas preventDefault!)
      const loader = document.getElementById('loader');
      if (loader) { loader.removeAttribute('hidden'); loader.style.display = 'grid'; }
      return; // <- importantísimo, no bloquees el click
    }
  }

  // 1) Cerrar con "X"
  if (target.closest('.close-modal')) {
    const modal = target.closest('.modal');
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    return;
  }

  // 2) Cerrar al hacer click fuera del contenido (overlay)
  if (target.classList?.contains('modal')) {
    target.style.display = 'none';
    target.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    return;
  }

  // 3) Abrir desde botones principales (si usas contenedor .auth-buttons)
  if (target.closest('.auth-buttons .login')) {
    e.preventDefault();
    openModal('loginModal');
    return;
  }
  if (target.closest('.auth-buttons .sign-up')) {
    e.preventDefault();
    openModal('registerModal');
    return;
  }

  // 3b) Abrir por data-atributo genérico (recomendado)
  const opener = target.closest('[data-open-modal]');
  if (opener) {
    e.preventDefault();
    const id = opener.getAttribute('data-open-modal');
    openModal(id);
    return;
  }

  // 4) Cambios entre login <-> registro
  if (target.closest('.open-register')) {
    e.preventDefault();
    limpiarFormulario(document.querySelector('#loginModal .auth-form'));
    closeModal('loginModal');
    openModal('registerModal');
    return;
  }
  if (target.closest('.open-login')) {
    e.preventDefault();
    limpiarFormulario(document.querySelector('#registerModal .auth-form'));
    closeModal('registerModal');
    openModal('loginModal');
    return;
  }
});


// 5) Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(m => {
      if (m.style.display !== 'none') {
        m.style.display = 'none';
        m.setAttribute('aria-hidden', 'true');
      }
    });
    document.body.style.overflow = '';
  }
});

// 6) Submit (opcional, conserva tu lógica)
document.addEventListener('submit', (e) => {
  const form = e.target.closest('.auth-form');
  if (!form) return;
  e.preventDefault();

  // Si es login o registro, redirige a profile.html
  if (
    form.closest('#loginModal') ||
    form.closest('#registerModal')
  ) {
    window.location.href = 'profile.html';
    return;
  }

  // Si quieres usar Swal/i18next para otros formularios, ponlo aquí
});
// Redirigir al enviar el formulario de login
document.querySelectorAll('#loginModal .auth-form, #registerModal .auth-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita el envío normal del formulario
        window.location.href = 'profile.html'; // Redirige a profile.html
    });
});