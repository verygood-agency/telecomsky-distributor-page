$(function () {
  $(".button").mouseover(function (e) {
    // положение элемента
    var pos = $(this).offset();
    var elem_left = pos.left;
    var elem_top = pos.top;
    // положение курсора внутри элемента
    var Xinner = e.pageX - elem_left;
    var Yinner = e.pageY - elem_top;
    $(this).find(".button_hover").css({
      "left": Xinner,
      "top": Yinner
    })
  });
});

document.addEventListener('DOMContentLoaded', function () {
  //Обработка модальных окон
  const dialogButtons = document.querySelectorAll('[data-dialog-button]');
  const overlay = document.querySelector('.overlay');

  if (dialogButtons && overlay) {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-btn');

    dialogButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();

        const dialogId = button.getAttribute('data-dialog-button');
        const dialog = document.querySelector(`[data-dialog-modal='${dialogId}']`);

        //Наполняем данными модальное окно
        if (dialogId == "connection") {
          if (button.dataset.title != undefined) {
            dialog.querySelector('.title').innerHTML = button.dataset.title;
            dialog.querySelector('input[name="title"]').value = button.dataset.title;
          } else {
            dialog.querySelector('.title').innerHTML = "";
            dialog.querySelector('input[name="title"]').value = "";
          }
          if (button.dataset.subtitle != undefined) {
            dialog.querySelector('.subtitle').innerHTML = button.dataset.subtitle;
            dialog.querySelector('input[name="subtitle"]').value = button.dataset.subtitle;
          } else {
            dialog.querySelector('.subtitle').innerHTML = "";
            dialog.querySelector('input[name="subtitle"]').value = "";
          }
          if ((button.dataset.price != undefined && button.dataset.price != "") || (button.dataset.rental != undefined && button.dataset.rental != "")) {
            dialog.querySelector('.connection-request__price').classList.remove("hidden");
          } else {
            dialog.querySelector('.connection-request__price').classList.add("hidden");
          }
          if (button.dataset.price != undefined && button.dataset.price != "") {
            dialog.querySelector('.js_price').innerHTML = 'Стоимость <strong>'+button.dataset.price+'</strong>';
            dialog.querySelector('input[name="price"]').value = button.dataset.price;
          } else {
            dialog.querySelector('.js_price').innerHTML = "";
            dialog.querySelector('input[name="price"]').value = "";
          }
          if (button.dataset.rental != undefined && button.dataset.rental != "") {
            dialog.querySelector('.js_rental').innerHTML = 'Аренда <strong>'+button.dataset.rental+'</strong>';
            dialog.querySelector('input[name="rental"]').value = button.dataset.rental;
          } else {
            dialog.querySelector('.js_rental').innerHTML = "";
            dialog.querySelector('input[name="rental"]').value = "";
          }
        } else if (dialogId == "choosing-order-option") {
          if (button.dataset.title != undefined) {
            dialog.querySelector('.title').innerHTML = button.dataset.title;
          } else {
            dialog.querySelector('.title').innerHTML = "";
          }

          if (button.dataset.price != undefined && button.dataset.price != "") {
            let arPrices, idActive;
            let newHtml = "";
            if (button.dataset.idActive == undefined) {
              idActive = "0";
            } else {
              idActive = button.dataset.idActive;
            }
            arPrices = JSON.parse(button.dataset.price);

            for (let keyPrice in arPrices) {
              newHtml += '<li><input class="visually-hidden" data-id="'+keyPrice+'" data-name="'+arPrices[keyPrice]["NAME"]+'" data-price="'+arPrices[keyPrice]["PRICE"]+'" data-old="'+arPrices[keyPrice]["PRICE_OLD"]+'" type="radio" name="form-ownership" id="form-ownership-'+keyPrice+'" ';
              if (keyPrice == idActive) {
                newHtml += 'checked';
              }
              newHtml += '><label for="form-ownership-'+keyPrice+'">'+arPrices[keyPrice]["NAME"]+' - '+arPrices[keyPrice]["PRICE"]+'</label></li>';
            };
            dialog.querySelector('.js-list').innerHTML = newHtml;

            dialog.querySelectorAll('input[name="form-ownership"]').forEach(input => {
              input.addEventListener('click', (e) => {
                let link = button.closest("a");

                //Прописываем новые значения
                button.innerHTML = input.dataset.name;
                button.dataset.idActive = input.dataset.id;
                button.parentNode.querySelector('.js-price').innerHTML = input.dataset.price;
                button.parentNode.querySelector('.js-price-old').innerHTML = input.dataset.old;
                if (link != null && button.dataset.link != undefined) {
                  link.href = button.dataset.link + "?price=" + input.dataset.id;
                }

                //Закрываем модалку
                modals.forEach(modal => {
                  modal.classList.remove('modal-show');
                });
                overlay.classList.remove('overlay-show');
                document.body.style.overflow = 'visible';
              });
            });
          }
        }

        document.body.style.overflow = 'hidden';
        dialog.classList.add('modal-show');
        overlay.classList.add('overlay-show');
      });
    });

    overlay.addEventListener('click', () => {
      modals.forEach(modal => {
        modal.classList.remove('modal-show');
      });
      overlay.classList.remove('overlay-show');
      document.body.style.overflow = 'visible';
    });

    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        document.body.style.overflow = 'visible';
        modal.classList.remove('modal-show');
        overlay.classList.remove('overlay-show');
      });
    });
  };

  //Функция вывода уведомления
  function fNotification(title = "", subtitle = "") {
    let dialog = document.querySelector(`[data-dialog-modal='notification']`);
    dialog.querySelector('.title').innerHTML = title;
    dialog.querySelector('.subtitle').innerHTML = subtitle;
    document.body.style.overflow = 'hidden';
    dialog.classList.add('modal-show');
    overlay.classList.add('overlay-show');
  }

  //Обработка форм
  const forms = document.querySelectorAll('form.js_form_standard');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let formData = new FormData(form);

      if (formData.get("name") == "" || formData.get("phone") == "" || formData.get("consent") != "on") {
        fNotification("Заполните все обязательные поля");
      } else if (formData.get("phone").replace(/[\D]+/g, '').length != 11) {
        fNotification("Укажите правильный номер телефон");
      } else {
        BX.ajax({
          url: '/local/ajax/form.standard.php',
          data: formData,
          method: 'POST',
          dataType: 'json',
          processData: false,
          preparePost: false,
          onsuccess: function (result) {
            result = JSON.parse(result);
            //console.log(result);
            if (result.status == "success") {
              if (form.dataset.modal != undefined) {
                document.querySelector(`[data-dialog-modal='`+form.dataset.modal+`']`).classList.remove('modal-show');
              }
              fNotification(result.text);
              form.reset();
            } else {
              fNotification(result.text);
            }
          },
          onfailure: function () {
            fNotification("Ошибка отправки формы");
          }
        });
      }
    });
  });
});

const supportHeader = document.querySelector('.header__support');
if (supportHeader) {
  supportHeader.addEventListener('mouseover', () => {
    const details = supportHeader.querySelector('details');
    if (details) {
      details.setAttribute('open', '');
    }
  });
  supportHeader.addEventListener('mouseout', () => {
    const details = supportHeader.querySelector('details');
    if (details) {
      details.removeAttribute('open');
    }
  });
}
