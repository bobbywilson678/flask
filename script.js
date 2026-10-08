const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const year = document.getElementById('year');
const orderForm = document.getElementById('order-form');
const orderTrigger = document.querySelector('.order-trigger');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (orderTrigger && orderForm) {
  orderTrigger.addEventListener('click', () => {
    orderForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    orderForm.querySelector('input, textarea').focus();
  });
}

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);

    fetch(orderForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          orderForm.reset();
          window.location.href = 'index.html';
        } else {
          alert('There was a problem sending your order. Please try again.');
        }
      })
      .catch(() => {
        alert('There was a problem sending your order. Please try again.');
      });
  });
}
