/*jshint globalstrict: true*/

// WooCommerce minicart
if (document.querySelector('#mini-cart')) {
  const miniCart = document.querySelector('#mini-cart');
  const widgetCart = miniCart.querySelector('.widget_shopping_cart');
  const inputsQty = miniCart.querySelectorAll('.quantity');
  const btnsMinus = miniCart.querySelectorAll('.button.minus');
  const btnsPlus = miniCart.querySelectorAll('.button.plus');
  const btnsRemoveProduct = miniCart.querySelectorAll('.mini-cart__remove');
  const miniCartTotal = widgetCart.querySelector('.woocommerce-mini-cart__total bdi');
  const miniCartTotalCurrency = miniCartTotal.innerHTML.replace(/\d+/g, '').trim();

  // Prototype remove
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
  }

  // Get the width of the scrollbar 
  function geScrolltWidth() {
    let divScroll = document.createElement('div');

    divScroll.style.overflowY = 'scroll';
    divScroll.style.width = '50px';
    divScroll.style.height = '50px';
    document.body.appendChild(divScroll);

    let scrollWidth = divScroll.offsetWidth - divScroll.clientWidth;
    divScroll.remove();

    return scrollWidth;
  }

  // Event click - Open mini cart in mobile screen
  function openMiniCartInMobile() {
    if (850 > window.innerWidth) {
      miniCart.addEventListener('click', function(event) {
        event.preventDefault();

        widgetCart.classList.add('widget_shopping_cart--show');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = geScrolltWidth() + 'px';
        setTimeout(function() {
          widgetCart.classList.add('widget_shopping_cart--open');
        }, 10);
      });

      // Hide the mini cart if the click was outside of it
      document.addEventListener('click', function(e) {
        if (widgetCart.classList.contains('widget_shopping_cart--open')) {
          const withinBoundaries = e.composedPath().includes(miniCart);

          if (!withinBoundaries) {
            widgetCart.classList.remove('widget_shopping_cart--open');
            document.body.removeAttribute("style");
            setTimeout(function() {
              widgetCart.classList.remove('widget_shopping_cart--show');
            }, 300);
          }
        }
      });
    } else {
      // When changing the screen size over 850 pixels, 
      // the mobile version of the cart is hidden
      if (widgetCart.classList.contains('widget_shopping_cart--open')) {
        widgetCart.classList.remove('widget_shopping_cart--show');
        widgetCart.classList.remove('widget_shopping_cart--open');
      }

      // Event - Show mini cart
      miniCart.addEventListener('mouseover', function() {
        widgetCart.classList.add('widget_shopping_cart--show');
        setTimeout(function() {
          widgetCart.classList.add('widget_shopping_cart--open');
        }, 10);
      });

      // Event - Hide mini cart
      miniCart.addEventListener('mouseleave', function() {
        setTimeout(function() {
          widgetCart.classList.remove('widget_shopping_cart--open');
          document.body.removeAttribute("style");

          if (widgetCart.classList.contains('widget_shopping_cart--show')) {
            widgetCart.classList.remove('widget_shopping_cart--show');
          }
        }, 200);
      });
    }
  }

  // Calling the function to open the shopping cart on page load 
  // and on screen width change
  openMiniCartInMobile();
  window.addEventListener('resize', function() {
    openMiniCartInMobile();
  });

  // Change the value of the number of items in the cart
  function changeValueCartCount() {
    let cartValue = 0;
    const miniCartProductItem = document.querySelectorAll('#mini-cart .woocommerce-mini-cart-item');

    for (let i = 0; i < miniCartProductItem.length; i++) {
      cartValue += Number(miniCartProductItem[i].querySelector('.quantity').value);
    }

    createCartCount(cartValue);
  }

  // Number of products in the cart
  function createCartCount(count) {
    if (!document.querySelector('#mini-cart .mini-cart__count')) {
      if (count != 0) {
        let miniCartCount = document.createElement('span');
        miniCartCount.classList.add('mini-cart__count');
        miniCartCount.innerText = count;
        document.querySelector('#mini-cart .mini-cart__contents').appendChild(miniCartCount);
      }
    } else {
      if (count != 0) {
        // Change the number of products
        document.querySelector('#mini-cart .mini-cart__count').innerHTML = count;
      } else {
        // Remove the cart window
        document.querySelector('#mini-cart .mini-cart__count').remove();
        document.querySelector('#mini-cart .woocommerce-mini-cart__products').remove();
        document.querySelector('#mini-cart .woocommerce-mini-cart__footer').remove();

        // Add notification text for an empty cart
        let cartEmpty = document.createElement('p');
        cartEmpty.classList.add('woocommerce-mini-cart__empty-message');
        cartEmpty.innerText = "В корзине нет товаров";
        document.querySelector('#mini-cart .widget_shopping_cart_content').appendChild(cartEmpty);
      }
    }
  }

  // Checking the entered data in the input
  function checkData(item, min, max) {
    if (max < item.value) {
      item.value = max;
    } else if (min > item.value) {
      item.value = min;
    }
  }

  // Divide the number by thousands with a space.
  let groupNums = (
    function () {
      var r = /(\d{3})/g;
      return function (text) {
        text = String(text);
        return text.split("").reverse().join("").replace(r, "$1 ").split("").reverse().join("");
      };
    }
  )();

  // Change the amount of the order in the mini cart
  function changeTotal() {
    let totalPrice = 0;
    const miniCartProductItem = widgetCart.querySelectorAll('.woocommerce-mini-cart-item');

    Array.prototype.forEach.call(miniCartProductItem, function(item) {
      const qty = item.querySelector('.quantity').value;
      const price = item.querySelector('bdi').innerText.replace(/[^0-9]/g, "");

      totalPrice += Number(qty) * Number(price);
    });

    let total = groupNums(String(totalPrice)) + miniCartTotalCurrency;

    miniCartTotal.innerHTML = total;
  }

  // Click on the minus button
  Array.prototype.forEach.call(btnsMinus, function(item) {
    item.addEventListener('click', function(event) {
      let input = item.nextElementSibling;
      let inputMin = Number(input.min);
      let inputMax = Number(input.max);

      if (inputMin < input.value) {
        input.value--;
      }

      changeValueCartCount();
      checkData(input, inputMin, inputMax);
      changeTotal();
    });
  });

  // Track data changes in inputs
  Array.prototype.forEach.call(inputsQty, function(item) {
    item.addEventListener('input', function () {
      let inputMin = Number(item.min);
      let inputMax = Number(item.max);

      checkData(item, inputMin, inputMax);
      changeValueCartCount();
      changeTotal();
    });
  });

  // Click on the plus button
  Array.prototype.forEach.call(btnsPlus, function(item) {
    item.addEventListener('click', function(event) {
      let input = item.previousElementSibling;
      let inputMin = Number(input.min);
      let inputMax = Number(input.max);

      if (inputMax > input.value) {
        input.value++;
      }

      changeValueCartCount();
      checkData(input, inputMin, inputMax);
      changeTotal();
    });
  });

  // Remove a product from the cart 
  Array.prototype.forEach.call(btnsRemoveProduct, function(item) {
    item.addEventListener('click', function(event) {
      event.preventDefault();

      item.parentNode.parentNode.remove();

      changeValueCartCount();
      changeTotal();
    });
  });

  changeValueCartCount();
  changeTotal();
}
