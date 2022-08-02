// Slider

function HvrSlider(elements) {
  // const elements = document.querySelectorAll(selector);

  // Prototype indexOf
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
  
      var k;
  
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
  
      var o = Object(this);
  
      var len = o.length >>> 0;
  
      if (len === 0) {
        return -1;
      }
  
      var n = fromIndex | 0;
  
      if (n >= len) {
        return -1;
      }
  
      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
  
      while (k < len) {
        if (k in o && o[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    };
  }

  // Prototype matches
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
  }

  Array.prototype.forEach.call(elements, function(el) {
    if (el.querySelectorAll('img').length > 1) {
      const hvr = document.createElement('div');
      hvr.classList.add('hvr');

      const hvrImages = document.createElement('div');
      hvrImages.classList.add('hvr__images');
      hvr.appendChild(hvrImages);

      const hvrSectors = document.createElement('div');
      hvrSectors.classList.add('hvr__sectors');
      hvrImages.appendChild(hvrSectors);

      const hvrDots = document.createElement('ul');
      hvrDots.classList.add('hvr__dots');
      hvr.appendChild(hvrDots);

      el.parentNode.insertBefore(hvr, el);
      hvrImages.insertBefore(el, null);

      const hvrImagesArray = hvr.querySelectorAll('img');
      Array.prototype.forEach.call(hvrImagesArray, function() {
        hvrSectors.insertAdjacentHTML('afterbegin', '<div class="hvr__sector"></div>');
        hvrDots.insertAdjacentHTML('afterbegin', '<li class="hvr__dot"></li>');
      });

      hvrDots.firstChild.classList.add('hvr__dot--active');

      var __spreadArrays = (this && this.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
      };
      
      const setActiveEl = function (targetEl) {
        const index = __spreadArrays(hvrSectors.children).indexOf(targetEl);
        Array.prototype.forEach.call(hvrImagesArray, function(img, idx) {
          if (index == idx) {
            img.style.display = 'block';
          } else {
            img.style.display = 'none';
          }
        });

        Array.prototype.forEach.call(hvr.querySelectorAll('.hvr__dot'), function(dot, idx) {
          if (index == idx) {
            dot.classList.add('hvr__dot--active');
          } else {
            dot.classList.remove('hvr__dot--active');
          }
        });
      };

      hvrSectors.addEventListener('mouseover', function (e) {
        if (e.target.matches('.hvr__sector')) {
          setActiveEl(e.target);
        }
      });
    }
  });
}

HvrSlider(document.querySelectorAll('.project-images'));
