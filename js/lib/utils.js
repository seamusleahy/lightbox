/**
 * @file A collection of utility functions
 */

(function() {
  'use strict';

  /**
   * Throttles the number of times a function is executed within the wait time
   * @param {funciton} fn
   * @param {Number} wait
   */
  function throttle(fn, wait) {
    var timer = null;
    var args;

    return function throttled() {
      args = arguments;
      if (!timer) {
        timer = setTimeout(function() {
          fn.apply(null, args);
          timer = null;
        }, wait);
      }
    };
  }

  /**
   * Merge defaults into the destination object
   * @param {{}} dest
   * @param {{}} defaults
   */
  function mergeDefaults(dest, defaults) {
    for (var name in defaults) {
      if (!(name in dest)) {
        dest[name] = defaults[name];
      }
    }

    return dest;
  }

  window.lib = window.lib || {};
  window.lib.utils = {
    throttle: throttle,
    mergeDefaults: mergeDefaults
  };
})();
