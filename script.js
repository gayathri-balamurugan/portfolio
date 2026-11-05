document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('backToTop');
  const year = document.getElementById('year');

  year.textContent = new Date().getFullYear();

  const updateScrollUI = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
    backToTop.classList.toggle('show', window.scrollY > 420);
  };
  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Reveal sections gently as they enter the viewport.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // Close the mobile menu after selecting a section.
  document.querySelectorAll('#navLinks .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navLinks');
      if (menu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
