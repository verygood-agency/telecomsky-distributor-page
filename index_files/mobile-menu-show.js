const buttonMenu = document.querySelector('.button--menu');
const headerMobile = document.querySelector('.mobile-nivigation');

buttonMenu.addEventListener('click', function() {
  buttonMenu.classList.toggle('isActive');
  headerMobile.classList.toggle('isActive');
  document.body.classList.toggle('mob-menu-open');

});
