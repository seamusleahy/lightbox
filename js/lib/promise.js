/**
 * @file A Promise Polyfill for IE for my needs.
 * It doesn't fully do everything that Promise actually does - actually it
 * only does a very small amount of the the actually Promise.
 */

(function() {
  'use strict';

  function PromisePolyfill(executor) {
    this.handlers = [];
    this.state = 'pending';
    this.value = [];

    function makeStateUpdate(methodName, state) {
      function callPromiseHandler(prevValue, handler) {
        var value = handler[methodName].apply(null, prevValue);
        return (value === undefined) ? prevValue : [value];
      }

      return function() {
        this.state = state;
        var initialValue = arguments;
        this.value = this.handlers.reduce(callPromiseHandler, initialValue);
      };
    }

    var resolve = makeStateUpdate('onFulfilled', 'fulfilled').bind(this);
    var reject = makeStateUpdate('onRejected', 'rejected').bind(this);

    executor(resolve, reject);
  }

  PromisePolyfill.prototype = {
    then: function then(onFulfilled, onRejected) {
      var value;
      onRejected = onRejected || function() {};

      if (this.state === 'fulfilled' || this.state === 'rejected') {
        value = this.state === 'fulfilled' ? onFulfilled.apply(null, this.value) : onRejected.apply(null, this.value);
        this.value = (value === undefined) ? this.value : [value];
      } else {
        this.handlers.push({
          onFulfilled: onFulfilled,
          onRejected: onRejected
        });
      }

      return this; // Real Promises return a new Promise, but not here
    }
  };

  var PromiseFill = window.Promise || PromisePolyfill;

  window.lib = window.lib || {};
  window.lib.Promise = PromiseFill;
})();
