// NovaTech — interactividad
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
if (burger) burger.addEventListener('click', () => menu.classList.toggle('abierto'));
menu && menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => menu.classList.remove('abierto')));

// Enlace activo según sección visible
const secciones = document.querySelectorAll('section[id]');
const enlaces = document.querySelectorAll('.menu a[href^="#"]');
if (secciones.length && enlaces.length) {
  window.addEventListener('scroll', () => {
    let actual = secciones[0].id;
    secciones.forEach(s => { if (scrollY >= s.offsetTop - 140) actual = s.id; });
    enlaces.forEach(a => a.classList.toggle('activo', a.getAttribute('href') === '#' + actual));
  });
}

// FAQ acordeón
document.querySelectorAll('.faq-item button').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const estabaAbierto = item.classList.contains('abierto');
    document.querySelectorAll('.faq-item.abierto').forEach(i => i.classList.remove('abierto'));
    if (!estabaAbierto) item.classList.add('abierto');
  });
});

// Formulario de contacto (validación + simulación de envío)
const form = document.getElementById('formContacto');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const email  = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  if (!nombre || !email.includes('@') || !mensaje) {
    alert('Por favor completa los campos obligatorios correctamente.');
    return;
  }
  document.getElementById('okMsg').style.display = 'block';
  form.reset();
  setTimeout(() => document.getElementById('okMsg').style.display = 'none', 5000);
});

// Animación de aparición al hacer scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
