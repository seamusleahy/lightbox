/**
 * @file A helper for setting up components
 */

(function() {
  'use strict';

  // COMMENTARY: Because I don't have the need for methods, there is no point
  // inheritanting an empty prototype.
  function ElementComponentSetup(el, storage) {
    this.el = el;
    this.storage = storage;

    if (this.onStorageUpdate) {
      this.storage.subscribe(this.onStorageUpdate.bind(this));
    }
  }

  window.components = window.components || {};
  window.components.ElementComponentSetup = ElementComponentSetup;
})();
