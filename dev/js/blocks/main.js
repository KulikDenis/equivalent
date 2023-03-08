'use strict';
MicroModal.init({
  onClose: function (modal, element, event) {
    event.preventDefault();
    event.stopPropagation();
  },
  closeTrigger: 'data-micromodal-close',
  openClass: 'is-open',
  disableScroll: true,
  disableFocus: true,
  awaitOpenAnimation: false,
  awaitCloseAnimation: false,
  debugMode: false
});

// check if mobile
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};
const header = document.querySelector('.header');
if (isMobile.any()) {
  header.classList.add('_touch');
  let menuArrows = document.querySelectorAll('.menu-arr');

  if (menuArrows.length > 0) {
    for (let ind = 0; ind < menuArrows.length; ind++) {
      const menuArrow = menuArrows[ind];
      menuArrow.parentElement.addEventListener('click', function (e) {
        e.preventDefault;
        menuArrow.parentElement.classList.toggle('activeArr');
      });
    }
  }
} else {
  header.classList.add('_pc');
}

//menu burger
const menuBurger = document.querySelector('.menu-burger');
const menuBody = document.querySelector('.menu_body');
if (menuBurger) {
  menuBurger.addEventListener('click', function (e) {
    document.body.classList.toggle('preventScroll');
    if (menuBody.classList.contains('_bg')) {
      setTimeout(() => {
        menuBody.classList.remove('_bg');
      }, 400);
    }
    menuBody.classList.toggle('_active');
    menuBurger.classList.toggle('_active');
    menuBody.classList.add('_bg');
  });
}

//scroll header
const headerWrap = document.querySelector('.header-wrapper');
window.addEventListener('scroll', function () {
  if (window.scrollY > 800) {
    headerWrap.classList.add('_fixed');
  } else {
    headerWrap.classList.remove('_fixed');
  }
});
window.addEventListener('load', function () {
  if (window.scrollY > 800) {
    headerWrap.classList.add('_fixed');
  } else {
    headerWrap.classList.remove('_fixed');
  }
});

//remove prevent scroll page if resize screen
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && menuBody.classList.contains('_active')) {
    document.body.classList.remove('preventScroll');
    menuBurger.classList.remove('_active');
    menuBody.classList.remove('_active');
    menuBody.classList.remove('_bg');
  }
});

//tabs main banner
const tabs = document.querySelectorAll('.tabs__btn');
const tabsContent = document.querySelectorAll('.tabs__body');

if (tabsContent.length > 0 || tabs.length > 0) {
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.remove('active');
    });

    tabs.forEach((item) => {
      item.classList.remove('active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('active');
    tabs[i].classList.add('active');
  }

  hideTabContent();
  showTabContent();

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      hideTabContent();
      showTabContent(index);
    });
  });
}

//splider

// Updates the bar width whenever the carousel moves:

document.addEventListener('DOMContentLoaded', function () {
  var elms = document.getElementsByClassName('customSplide'),
    desctopSplide = document.getElementsByClassName('desctopSplide');

  for (var i = 0; i < elms.length; i++) {
    let mySplide = new Splide(elms[i], {
      mediaQuery: 'min',
      pagination: false,
      arrows: false,
      autoWidth: true,
      gap: '1rem',
      flickPower: 200,
      breakpoints: {
        992: {
          destroy: true
        }
      }
    });
    progerssBar(mySplide);
    mySplide.mount();
    window.addEventListener('resize', () => progerssBar(mySplide));
  }

  for (var i = 0; i < desctopSplide.length; i++) {
    let mySplide = new Splide(desctopSplide[i], {
      mediaQuery: 'min',
      pagination: false,

      autoWidth: true,
      gap: '1.9rem',
      flickPower: 200
    });
    progerssBar(mySplide);
    mySplide.mount();
    window.addEventListener('resize', () => progerssBar(mySplide));
  }
});

function progerssBar(el) {
  var bar = el.root.querySelector('.my-carousel-progress-bar');
  el.on('mounted move', function () {
    var end = el.Components.Controller.getEnd() + 1;
    var rate = Math.min((el.index + 1) / end, 1);
    bar.style.width = String(100 * rate) + '%';
  });
}

const btnPhone = document.querySelector('.ico-phone'),
  btnOrder = document.querySelector('.js-order-call');
btnPhone.addEventListener('click', function () {
  MicroModal.show('popup-call', {
    openClass: 'is-open',
    disableScroll: true,
    disableFocus: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
    debugMode: false
  });
});
btnOrder.addEventListener('click', function () {
  MicroModal.close('popup-call');
  MicroModal.show('popup-order', {
    closeTrigger: 'data-micromodal-close',
    openClass: 'is-open',
    disableScroll: true,
    disableFocus: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
    debugMode: false
  });
});

//table scroll
const tableContainer = document.querySelector('.table-conteiner'),
  customTable = document.querySelector('.table-conteiner table'),
  moveLeft = document.querySelector('.moveLeft'),
  moveRight = document.querySelector('.moveRight'),
  tdWidth = document.querySelectorAll('.table-conteiner table tr td')[1];

if (tableContainer) {
  let tdWidthNum;
  window.addEventListener('DOMContentLoaded', () => {
    if (tableContainer.getBoundingClientRect().width < customTable.getBoundingClientRect().width) {
      tableContainer.classList.add('custom-scroll');
      tdWidthNum = tdWidth.getBoundingClientRect().width;
    }
  });
  window.addEventListener('resize', () => {
    if (tableContainer.getBoundingClientRect().width < customTable.getBoundingClientRect().width) {
      tableContainer.classList.add('custom-scroll');
    } else {
      tableContainer.classList.remove('custom-scroll');
    }
    tdWidthNum = tdWidth.getBoundingClientRect().width;
  });
  moveRight.addEventListener('click', () => {
    tableContainer.scrollBy({
      top: 0,
      left: +tdWidthNum,
      behavior: 'smooth'
    });
  });
  moveLeft.addEventListener('click', () => {
    tableContainer.scrollBy({
      top: 0,
      left: -tdWidthNum,
      behavior: 'smooth'
    });
  });
}

//sroll to

const scrollToLlink = document.querySelectorAll('.scroll-to');

scrollToLlink.forEach(function (link) {
  link.addEventListener('click', function () {
    let dataSection = this.dataset.href;
    console.log(document.querySelector('' + dataSection + '').offsetTop);
    window.scroll({
      top: document.querySelector('' + dataSection + '').offsetTop - 100,
      left: 0,
      behavior: 'smooth'
    });
  });
});

// // breadcrump text width
// function breadcrumpCut() {
//   const breadcrumpPage = document.querySelectorAll('.pages-breadcrump ul li a');
//   if (breadcrumpPage) {
//     for (var i = 0; i < breadcrumpPage.length; i++) {
//       let fullText = breadcrumpPage[i].innerText,
//         cutText = breadcrumpPage[i].innerText.slice(0, 33) + '...';
//       if (window.innerWidth < 769) {
//         if (breadcrumpPage[i].innerText.length > 33) {
//           breadcrumpPage[i].innerText = cutText;
//         }
//       } else {
//         breadcrumpPage[i].innerText = fullText;
//       }
//     }
//   }
// }
// window.addEventListener('load', function () {
//   breadcrumpCut();
// });
// window.addEventListener('resize', () => {
//   breadcrumpCut();
// });

$("form").each(function() {
  $(this).validate({
    errorElement: 'p',
    errorPlacement: function (error, element) {
      error.appendTo(element.parent('div'))
    },
    ignore: ':hidden',
    rules: {
      timetable_from: {
        required: false
      },
      timetable_where: {
        required: false
      },
      rate_from: {
        required: false
      },
      rate_where: {
        required: false
      },
      rate_type: {
        required: false
      },
      cargo_from: {
        required: false
      },
      cargo_where: {
        required: false
      },
      cargo_size: {
        required: false
      },
      cargo_weight: {
        required: false
      },
      tracking_container:{
        required: false
      },
      name: {
        required: true,
        minlength: 2,
        maxlength: 22
      },
      phone: { // номер телефон
        required: true,
        minlength: 18,
        maxlength: 18
      },
      email: { 
        required: true,
        email: true
      },
      politic: { 
        required: false
      },
      data: { 
        required: false
      }
    },
    messages: {
      name: {
        required: 'Пожалуйста введите Ваше имя',
        minlength: 'Ваше Имя слишком короткое',
        maxlength: 'Ваше Имя слишком длинное'
      },
      phone: {
        required: 'Пожалуйста введите телефон',
        minlength: 'Телефон введен неполностью'
      },
      email: {
        required: 'Пожалуйста введите ваш email'
      }
    },
    submitHandler: function (form) {

      switch (form.name) {
        case 'calendar_form':
          $('input[name="data_timetable_from"]').val(form.timetable_from.value);
          $('input[name="data_timetable_where"]').val(form.timetable_where.value);
          break;
        case 'calkulate_form':
          $('input[name="data_rate_from"]').val(form.rate_from.value);
          $('input[name="data_rate_where"]').val(form.rate_where.value);
          $('input[name="data_rate_type"]').val(form.rate_type.value);
          break;
        case 'cargo_form_1':
        case 'cargo_form_2':
          $('input[name="data_cargo_from"]').val(form.cargo_from.value);
          $('input[name="data_cargo_where"]').val(form.cargo_where.value);
          $('input[name="data_cargo_size"]').val(form.cargo_size.value);
          $('input[name="data_cargo_weight"]').val(form.cargo_weight.value);
          break;
        case 'global_form':
          $('input[name="data_tracking_container"]').val(form.tracking_container.value);
          break;
        default:
    
          break;
      }

      switch (form.name) {
        case 'calendar_form':
        case 'calkulate_form':
        case 'cargo_form_1':
        case 'cargo_form_2':
        case 'global_form':
    
          MicroModal.show('popup-order', {
            openClass: 'is-open',
            disableScroll: true,
            disableFocus: true,
            awaitOpenAnimation: true,
            awaitCloseAnimation: true,
            debugMode: false
          });
          
          break;
        default:
          submitFormLead(form)
          break;
      }

      return false;
    }
  });
});


function submitFormLead(formSubmit) {
  disabledButton(formSubmit); // отключение кнопк
  
  var formData = ($('#' + formSubmit.id).serialize() + '&form=' + formSubmit.getAttribute('name')).replace('%26', '&').replace('%3D', '=');
  
  if (formSubmit.getAttribute('name') == 'banner__form') {
    MicroModal.close('popup-order');
  } else if (formSubmit.getAttribute('name') == 'header__form') {
    MicroModal.close('popup-calc');
  } else {

  }
  
  $.ajax({
    type: 'POST',
    url: '/wp-admin/admin-ajax.php?action=send_form',
    data: formData,
    crossDomain: true,
    success: function (response) {

      MicroModal.show('popup-thanks', {
        openClass: 'is-open',
        disableScroll: true,
        disableFocus: true,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true,
        debugMode: false
      });
      
      disabledButton(formSubmit, 1); // включение кнопки

      setTimeout(() => {
        location.reload();
      }, 3000)
      
      
    },
    error: function (response) {

      MicroModal.show('popup-thanks', {
        openClass: 'is-open',
        disableScroll: true,
        disableFocus: true,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true,
        debugMode: false
      });
      
      disabledButton(formSubmit, 1); // включение кнопки

      setTimeout(() => {
        location.reload();
      }, 3000)
      
    }
  });

  MicroModal.show('popup-error', {
    openClass: 'is-open',
    disableScroll: true,
    disableFocus: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
    debugMode: false
  });

  disabledButton(formSubmit, 1); // включение кнопки
  
};

/**
 * выключение и включение кнопки отправки с type="submit"
 * @param {*} node - нода формы
 * @param {*} status если true включенние кнопки
 */
function disabledButton (node, status) {
  var button = node.querySelector('[type="submit"]');
  button.disabled=true;
  if (status) {
    button.disabled=false;
    return;
  };
}


$('#all_posts_tab, #news_posts_tab, #blog_posts_tab' ).on('click', function (e) {
  e.preventDefault();
  e.target.id

  switch (e.target.id) {
    case 'news_posts_tab':
      $('#all_posts_tab').parent().removeClass('active-item');
      $('#blog_posts_tab').parent().removeClass('active-item');
      $('#all_posts').hide();
      $('#blog_posts').hide();
      $('#news_posts').show();
      $('#'+ e.target.id).parent().addClass('active-item');
      break;
    case 'blog_posts_tab':
      $('#news_posts_tab').parent().removeClass('active-item');
      $('#all_posts_tab').parent().removeClass('active-item');
      $('#news_posts').hide();
      $('#all_posts').hide();
      $('#blog_posts').show();
      $('#'+ e.target.id).parent().addClass('active-item');
      break;
    case 'all_posts_tab':
      $('#news_posts_tab').parent().removeClass('active-item');
      $('#news_posts_tab').parent().removeClass('active-item');
      $('#news_posts').hide();
      $('#blog_posts').hide();
      $('#all_posts').show();
      $('#'+ e.target.id).parent().addClass('active-item');
      break;
    default:
      
      break;
  }
  
});



