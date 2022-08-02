/* jshint browser: true */

// dds a no-js class that hides JavaScript dependent site elements.
var elemsClassNojs = document.querySelectorAll('.no-js');
if (elemsClassNojs[0] !== undefined) {
  Array.prototype.forEach.call(elemsClassNojs, function (el) {
    el.classList.remove('no-js');
  });
}
 
jQuery(document).ready(function($){
  // Slick slider – Get the number of slides to display
  function getSlidesToShow() {
    if (window.innerWidth < 850) {
      slidesToShow = 1;
    } else if (window.innerWidth < 1200) {
      slidesToShow = 2;
    } else {
      slidesToShow = 3;
    }

    return slidesToShow;
  }

  // Slick slider – Progress bar
  function changeSlickProgressBar(slidesToShow) {
    var $slider = $('.slider-projects__slick');
    var $progressBar = $('.slider-projects__progress-bar');
    var countSlides = $slider.find('.slider-projects__item:not(.slick-cloned)').length;

    var calc = Math.min( Math.ceil(100 * 1 / countSlides, 100) );
    $progressBar.css('width', calc + '%');
  
    $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
      calc = Math.min( Math.ceil(100 * ( (nextSlide + 1) / countSlides ), 100) );
      if (nextSlide >= countSlides - slidesToShow) {
        calc = 100;
      }
      $progressBar.css('width', calc + '%');
    });
  }

  var slidesToShow = getSlidesToShow();
  changeSlickProgressBar(slidesToShow);

  window.addEventListener('resize', function() {
    slidesToShow = getSlidesToShow();
    changeSlickProgressBar(slidesToShow);
  });

  // Slick slider – Slider projects
  $('.slider-projects__slick').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button class="btn-nav btn-nav--outline btn-nav--prev"><span class="visually-hidden">Назад</span></button>',
    nextArrow: '<button class="btn-nav btn-nav--outline btn-nav--next"><span class="visually-hidden">Вперёд</span></button>',
    appendArrows: '.slider-projects__arrows',
    infinite: true,
 
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1200,
        asNavFor: '.slider-controll',
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ],
    mobileFirst:true,
  });
});
// jQuery/
