/*jshint globalstrict: true*/
"use strict";

/**
 * Mobile menu
 */
if (document.querySelector('#mobile-menu') && document.querySelector('#burger-menu')) {
  const siteHeader = document.querySelector('#site-header');
  const mobMenu = document.querySelector('#mobile-menu');
  const burgerMenu = document.querySelector('#burger-menu');

  const mobNavMenu = mobMenu.querySelector('.nav-menu');
  const itemHasChildrenLink = mobNavMenu.querySelectorAll('.menu-item-has-children > .nav-top-link');

  // Toggle submenu in mobile menu
  Array.prototype.forEach.call(itemHasChildrenLink, function (item) {
    item.addEventListener('click', function (event) {
      event.preventDefault();

      const itemParent = event.target.parentElement;

      if (itemParent.classList.contains('menu-item-has-children')) {

        if (itemParent.classList.contains('menu-item-has-children--show')) {
          // Hide menu item. If the click was on the active menu item
          itemParent.classList.add('menu-item-has-children--hide');
          setTimeout(function () {
            itemParent.classList.remove('menu-item-has-children--show');
            itemParent.classList.remove('menu-item-has-children--hide');
          }, 300);
        } else {
          // Show menu item
          if (!mobNavMenu.querySelector('.menu-item-has-children--show')) {
            itemParent.classList.add('menu-item-has-children--show');
          } else {
            const selected = mobNavMenu.querySelector('.menu-item-has-children--show');

            if (selected) {
              selected.classList.add('menu-item-has-children--hide');
              setTimeout(function () {
                selected.classList.remove('menu-item-has-children--show');
                selected.classList.remove('menu-item-has-children--hide');
              }, 300);
            }

            setTimeout(function () {
              itemParent.classList.add('menu-item-has-children--show');
            }, 300);
          }
        }

      }
    });
  });

  // Open mobile menu
  function openMobMenu(timeout) {
    document.body.classList.add('body-fixed');
    mobMenu.classList.add('mobile-menu--show');
    mobMenu.style.top = '64px';
    siteHeader.classList.add('mobile-menu-show');

    setTimeout(function () {
      siteHeader.classList.add('mobile-menu-open');
      mobMenu.classList.add('mobile-menu--open');
    }, timeout);
  }

  // Close mobile menu
  function closenMobMenu(timeout) {
    document.body.classList.remove('body-fixed');
    siteHeader.classList.remove('mobile-menu-open');
    mobMenu.classList.remove('mobile-menu--open');

    setTimeout(function () {
      mobMenu.classList.remove('mobile-menu--show');
      mobMenu.removeAttribute("style");
      siteHeader.classList.remove('mobile-menu-show');
    }, timeout);
  }

  // Click burger menu
  burgerMenu.addEventListener('click', function (event) {
    event.preventDefault();

    if (!siteHeader.classList.contains('mobile-menu-show')) {
      // Open
      openMobMenu(100);
    } else {
      // Close
      closenMobMenu(350);
    }

  });

  // Close mobile menu when screen width is more than 850px
  window.addEventListener('resize', function() {
    if (850 <= window.innerWidth && mobMenu.classList.contains('mobile-menu--show')) {
      closenMobMenu(0);
    }
  });
}
