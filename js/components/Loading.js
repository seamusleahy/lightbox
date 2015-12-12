/**
 * @file Handles the loading bar component
 */

(function(ElementComponentSetup, dom) {
  'use strict';

  var THROTTLE_WAIT_MS = 300;

  /**
   * View for the loading component
   */
  function LoadingComponent(el, storage) {
    ElementComponentSetup.call(this, el, storage);
  }

  LoadingComponent.prototype = {
    /**
     * Callback for when the storage updates
     * @param {{}} data
     */
    onStorageUpdate: function(data) {
      dom.toggleClass(this.el, 'is-visible', data.loading);
    }
  }

  window.components = window.components || {};
  window.components.Loading = LoadingComponent;
})(window.components.ElementComponentSetup, window.lib.dom);
