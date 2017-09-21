window.echo = (function (window, document) {

  'use strict';

  /*
   * Constructor function
   */
  var Echo = function (elem, type) {
    this.type = type;
    this.elem = elem;
    this.render();
    this.listen();
  };

  /*
   * Images for echoing
   */
  var echoStore = [];

  /*
   * Element in viewport logic
   */
  var scrolledIntoView = function (element) {
    var coords = element.getBoundingClientRect();
    return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight));
  };

  /*
   * Changing src attr logic
   */
  var echoSrc = function (el, type, callback) {
    if (type == 'img') {
      el.src = el.getAttribute('data-echo');
    } else {
      el.style.backgroundImage = 'url(' + el.getAttribute('data-echo-bg') + ')';
    }
    if (callback) {
      callback();
    }
  };

  /*
   * Remove loaded item from array
   */
  var removeEcho = function (element, index) {
    if (echoStore.indexOf(element) !== -1) {
      echoStore.splice(index, 1);
    }
  };

  /*
   * Echo the images and callbacks
   */
  var echoImages = function () {
    for (var i = 0; i < echoStore.length; i++) {
      var elem = echoStore[i].elem;
      var type = echoStore[i].type;
      if (scrolledIntoView(elem)) {
        echoSrc(elem, type, removeEcho(elem, i));
      }
    }
  };

  /*
   * Prototypal setup
   */
  Echo.prototype = {
    init: function () {
      echoStore.push(this);
    },
    render: function () {
      if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', echoImages, false);
      } else {
        window.onload = echoImages;
      }
    },
    listen: function () {
      window.onscroll = echoImages;
    }
  };

  /*
   * Initiate the plugin
   */
  var lazyBgs = document.querySelectorAll('[data-echo-bg]');
  var lazyImgs = document.querySelectorAll('img[data-echo]');

  for (var i = 0; i < lazyBgs.length; i++) {
    new Echo(lazyBgs[i], 'bg').init();
  }
  for (var i = 0; i < lazyImgs.length; i++) {
    new Echo(lazyImgs[i], 'img').init();
  }

})(window, document);