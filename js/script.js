let isMobile = {
   Android: function() {return navigator.userAgent.match(/Android/i);},
   BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
   iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
   Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
   Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
   any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
function checkScroll() {
	const header = document.querySelector('.header');

	if (window.pageYOffset > 120 && window.innerWidth > 1024) {
		header.classList.add('_sticky');
	} else {
		header.classList.remove('_sticky');
	}

}
checkScroll();

window.addEventListener('scroll', checkScroll)
// const forms = document.getElementById('form');

// form.addEventListener('submit', (e) => {
//    e.preventDefault();
   
//    let error = checkValueInput(form);
//    if (error === 0) {
//       console.log('Спасибо за подписку!');
//    } else {
//       console.log('Пожалуйста, заполните поля.');
//    }
// });

// const checkValueInput = (form) => { 
//    let error = 0;
//    const inputs = form.querySelectorAll('._req');

//    for (let input of inputs) {
//       input.parentElement.classList.remove('_error', '_fld-email');
//       if (input.classList.contains('_email')) {
//          if (emailTest(input)) {
//             input.parentElement.classList.add('_error', '_fld-email');
//             error++;
//          }
//       } else {
//          if (input.value === '') {
//             input.parentElement.classList.add('_error');
//             error++;
//          }
//       }

//    }

//    return error;
   
// };

// function emailTest(input) {
//    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
// }

// В случае если не все поля обязательно заполнять
const form   = document.querySelector('.form-sub');
const inputs = form.querySelectorAll('input');

form.addEventListener('click', (e) => { // submit
   e.preventDefault();
   if (e.target.classList.contains('form-sub__btn') && e.target.previousElementSibling.value === '') {
      e.target.parentElement.classList.add('_error');
   }
   onChange();
});

const onChange = () => {
   if (inputs.length > 0) {
      for (let input of inputs) {
         input.addEventListener('blur', (e) => {
            input.parentElement.classList.remove('_error');
            if (input.classList.contains('_email')) {
               if(emailTest(input)) {
                  input.parentElement.classList.add('_error');
               }
            } else if (input.value === '') {
               input.parentElement.classList.add('_error');
            }
         });
      }
   }
};

onChange();

function emailTest(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
const body   = document.querySelector('body');
const burger = document.querySelector('.icon-menu');
const menu   = document.querySelector('.menu__body');

burger.addEventListener('click', () => {
   body.classList.toggle('_lock');
   burger.classList.toggle('_active');
   menu.classList.toggle('_active');
});
// const inputCalendar = document.querySelector('.body-content__input');
// const arrowDown     = document.querySelector('._arrow-down');

// inputCalendar.addEventListener('focus', () => {
//    arrowDown.classList.add('_active');
// });

// inputCalendar.addEventListener('blur', (e) => {
//    console.log(e.target);
//    if (!e.target.closest('.body-content__input')) {
//       arrowDown.classList.remove('_active');
//    }
// });

$('.body-content__input').datepicker({
   // inline: true,
   offset: 5,
   range: true,
   clearButton: true,
   multipleDatesSeparator: ' - ',
   dateFormat: "dd MM",
   autoClose: true
})
const uiSlider = document.getElementById('duration');

noUiSlider.create(uiSlider, {
   start: [0, 120],
   connect: true,
   range: {
      'min': 2,
      'max': 120
   },
   step: 1,
});

const snapValues = [
   document.getElementById('value-from'),
   document.getElementById('value-to')
];

uiSlider.noUiSlider.on('update', function (values, handle) {
   snapValues[handle].innerHTML = values[handle];
});

const BodyContent = document.querySelector('.travels-body__content');
const input       = document.querySelector('.travels-body__select');
const arrowDown   = input.nextElementSibling;
const subMenu     = document.querySelector('.travels-body__menu');

BodyContent.addEventListener('click', (e) => {
   if (e.target.classList.contains('travels-body__select') || e.target.classList.contains('_arrow-down') && !e.target.classList.contains('_people')) {
      if (input.classList.contains('_init')) {
         BodyContent.classList.remove('_init');
         input.classList.remove('_init');
         arrowDown.classList.remove('_init');
      } else {
         BodyContent.classList.add('_init');
         input.classList.add('_init');
         arrowDown.classList.add('_init');
      }
      subMenu.classList.toggle('_show');
      clickToClose(subMenu);
   }
});

if (document.querySelector('.menu-body__btns')) {
   const menuBnts = document.querySelectorAll('.menu-body__btns');
   
   for (let menuBtn of menuBnts) {
      menuBtn.addEventListener('click', (e) => {
         getCurrentCount = menuBtn.previousElementSibling;
         if (e.target.closest('.menu-body__btn')) {
            getIdBtn = e.target.id;
            if (getIdBtn === 'minus') {
               let number = +getCurrentCount.innerHTML;
               if (number > 0) {
                  let resultMinus = number - 1;
                  let string = String(resultMinus);
                  getCurrentCount.innerHTML = string;
               }
            } else if (getIdBtn === 'plus') {
               let number = +getCurrentCount.innerHTML;
               if (number < 999) {
                  let resultMinus = number + 1;
                  let string = String(resultMinus);
                  getCurrentCount.innerHTML = string;
               }   
            }
         }
      }); 
   }
}

   
const clickToClose = (object) => {
   document.addEventListener('click', (e) => {
      if (!e.target.closest('.travels-body__menu') && !e.target.closest('.travels-body__content')) {
         object.classList.remove('_show');
         BodyContent.classList.remove('_init');
         input.classList.remove('_init');
         arrowDown.classList.remove('_init');
      }
      if (!e.target.closest('.body-content__select-date')) {
         object.classList.remove('_init');
      }
   });
};


const calendarBody  = document.querySelector('.body-content__select-date');
const calendarInput = document.querySelector('.body-content__input');
const calendarArrow = calendarInput.nextElementSibling;

calendarBody.addEventListener('click', (e) => {
   if (e.target.classList.contains('body-content__input') || e.target.classList.contains('_arrow-down') && !e.target.classList.contains('_icon-item-calendar')) {
      calendarArrow.classList.add('_init');
      clickToClose(calendarArrow);
   }
});
$('.btns-form-content__global-search').click(function (e) {
   e.preventDefault();
   $('.form-content__details').slideDown(400);
   $(this).addClass('_hide'); 
   $('.btns-form-content__global-search--hide').addClass('_show');
});

$('.btns-form-content__global-search--hide').click(function (e) {
   e.preventDefault();
   $('.form-content__details').slideUp(400);
   $(this).removeClass('_show');
   $('.btns-form-content__global-search').removeClass('_hide');
});
const allBtns = document.querySelector('.catalog__btns');
allBtns.addEventListener('click', (e) => {
   if (e.target.classList.contains('catalog__country-btn')) {
      document.querySelector('.catalog__country-btn._active').classList.remove('_active');
      e.target.classList.add('_active');
   }
});

const mixer = mixitup('.catalog__items', {
   selectors: {
      target: '.mix',
   },
   animation: {
      easing: 'ease-in-out',
      duration: 400
   }
});
if (window.innerWidth < 992 && isMobile.any()) {
   document.querySelector('.sub__top').addEventListener('click', (e) => {
      if (e.target.classList.contains('sub__subtitle')) {
         const currentTarget = e.target === document.querySelector('.sub__top').firstElementChild;
         if (currentTarget === true) {
            e.target.classList.remove('_active');
            e.target.nextElementSibling.classList.add('_active');
         } else {
            e.target.classList.remove('_active');
            e.target.previousElementSibling.classList.add('_active');
         }
         const targetAttr = e.target.getAttribute('data-type');
         const allItems = document.querySelectorAll('.form-sub__contacts');
         for (let item of allItems) {
            let itemAttr = item.getAttribute('data-show');
            if (targetAttr !== itemAttr) {
               item.classList.remove('_show');
               item.classList.add('_hide');
            } else {
               //e.target.classList.add('_active');
               item.classList.remove('_hide');
               item.classList.add('_show');
            }
         }
      }
   });
}
if (document.querySelector('.offers__items')) {
	new Swiper('.offers__items', {
      loop: false,
      observer: true,
      observeParents: true,
      slidesPerView: 2,
      spaceBetween: 32,
      speed: 1000,
      watchOverflow: false,
      simulateTouch: false,

      // Dotts
      pagination: {
         el: '.offers__paginations',
         clickable: true,
      },
      
		breakpoints: {
			// when window width is >= 320px
			320: {
            slidesPerView: 1.03,
            spaceBetween: 10
			},
            // when window width is >= 768px
			480: {
            slidesPerView: 1.08,
            spaceBetween: 15
			},
			// when window width is >= 768px
			768: {
            slidesPerView: 1.08,
            spaceBetween: 22
			},
			// when window width is >= 992px
			992: {
            watchOverflow: true,
			}
		}

	})
}

if (document.querySelector('.quotes__items')) {
	new Swiper('.quotes__items', {
      loop: false,
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 32,
      watchOverflow: false,

      // Dotts
      pagination: {
         el: '.quotes__paginations',
         clickable: true,
      },
      
      navigation: {
        nextEl: '.slider-arrows .slider-arrows__next',
        prevEl: '.slider-arrows .slider-arrows__prev',
      },
      
		breakpoints: {
			// when window width is >= 320px
			320: {
                slidesPerView: 1,
                spaceBetween: 10,
                autoHeight: true,
                slidesPerGroup: 1,
                speed: 600,
			},
            // when window width is >= 600px
			600: {
                slidesPerView: 1,
                spaceBetween: 15,
                autoHeight: true,
                slidesPerGroup: 1,
                speed: 600,
            },
			// when window width is >= 768px
			768: {
                slidesPerView: 2,
                spaceBetween: 20,
                autoHeight: false,
                slidesPerGroup: 2,
                speed: 800,
                
			},
			// when window width is >= 992px
			992: {
                slidesPerView: 3,
                spaceBetween: 32,
                slidesPerGroup: 3,
                speed: 1100,
			}
		}

	})
}
if (window.innerWidth < 481 && isMobile.any()) {
   const items = document.querySelector('.footer__items');
   items.addEventListener('click', (e) => {
      if (e.target.classList.contains('footer__title') || e.target.classList.contains('_arrow-down')) {
         const parent      = e.target.parentNode;
         const lastElement = parent.lastElementChild;

         parent.classList.toggle('_show');
         if (!lastElement.classList.contains('_show')) {
            lastElement.classList.add('_show');
            lastElement.style.height = 'auto'; // устанавливаем высоту авто

            const height = lastElement.clientHeight + 'px'; // получаем высоту элемента

            lastElement.style.height = '0px'; // устанавлиаем высоту 0 пикселей

            setTimeout(() => {
               lastElement.style.height = height; // устанавлиаем высоту полученого элемента
            }, 0);
         } else {
            lastElement.style.height = '0px';

            lastElement.addEventListener('transitionend', (e) => {
               lastElement.classList.remove('_show');
            }, {
               once: true
            });
         }
      }
   });
}