'use strict';

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
      menuArrow.addEventListener('click', function (e) {
        menuArrow.parentElement.classList.toggle('activeArr');
      });
    }
  }
} else {
  header.classList.add('_pc');
}
