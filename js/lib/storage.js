/**
 * @file A class for storage for state and data
 */
(function() {
  'use strict';
  // COMMENTARY: If using an ES6 transpiler, this is where I would
  // use `class Storage {...}` because generally reads better.

  /**
   * @name Storage
   * @constructor
   * @param {function} updateCallback - The function that handles the incoming events and returns the new data state
   *
   * To update the data, call `dispatch()` with the event describing the change.
   * The `updateCallback` will recieve the event and the current storage data.
   * It will then return the new state of the storage data.
   */
  function Storage(updateCallback) {
    this.updateCallback = updateCallback;
    this.data = undefined;
    this.subscribers = [];
  }

  Storage.prototype = {
    /**
     * Dispatch an event to change the state/data of storage
     * @param {object} event
     */
    dispatch: function(event) {

      this.data = this.updateCallback(event, this.data);
      Object.freeze(this.data);

      // COMMENTARY: I like to use named functions instead of anonymous
      // functions for two reason:
      //   1. self-documented code
      //   2. so the stack-trace isn't just a bunch of functions
      //      named "anonymous"
      this.subscribers.forEach(function callSubscriber(subscriber) {
        subscriber(this.data);
      }, this);
    },

    /**
     * Subscribe your function to be called after the dispatch cycle.
     * @param {function} fn
     */
    subscribe: function(fn) {
      this.subscribers.push(fn);
    }
  };

  window.lib = window.lib || {};
  window.lib.Storage = Storage;
})();
