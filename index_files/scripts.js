// Функции
// функция подключения скриптов
function includeFiles(url) {
  var script = document.createElement('script');
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};
// функция модификации шапки
function headerChange() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 10) {
    document.body.classList.add('header-sticky');
  } else {
    document.body.classList.remove('header-sticky');
  }
};

// Основная рабочая область
document.addEventListener("DOMContentLoaded", () => {

  // Проверяем состояние прокрутки страницы. если прокрутка есть - перекрашиваем шапку
  headerChange();
  // отслеживаем событие прокрутки страницы > модификация шапки
  document.addEventListener('scroll', e => {
    headerChange();
  });

  // подключаем файлы тут
  includeFiles("/local/templates/main/js/parts/mobile-menu-show.js");
  includeFiles("/local/templates/main/js/parts/smoothscroll.js");
  //includeFiles("/local/templates/main/js/parts/yandex.map.js");
  includeFiles("/local/templates/main/js/parts/swiper-collection.js?v2");
  includeFiles("/local/templates/main/js/parts/accordion.js");
  includeFiles("/local/templates/main/js/parts/input-phone-mask.js?v5");
  //includeFiles("/local/templates/main/js/parts/button-add.js");
  includeFiles("/local/templates/main/js/parts/channel-details.js");
  //includeFiles("/local/templates/main/js/parts/modals.js");

  // небольшие программы
  // Проверяем состояние прокрутки страницы. если прокрутка есть - перекрашиваем шапку
  headerChange();
  // отслеживаем событие прокрутки страницы > модификация шапки
  document.addEventListener('scroll', e => {
    headerChange();
  });

});

// техническая часть - УДАЛИТЬ НА ПРОДАКШЕНЕ!
// получить в консоли элемент, по которому кликнули
//document.addEventListener('click', e => console.log(e.target));
