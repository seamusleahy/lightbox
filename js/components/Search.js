/**
 * @file Handles the search component
 */

(function(ElementComponentSetup, dom, utils) {
  'use strict';

  var THROTTLE_WAIT_MS = 300;

  /**
   * View for the search component
   */
  function SearchComponent(el, storage) {
    ElementComponentSetup.call(this, el, storage);

    this.inputEl = dom.find(this.el, 'input');

    var onInput = utils.throttle(this.onInput.bind(this), THROTTLE_WAIT_MS);
    dom.on(this.inputEl, 'input', onInput);
    dom.on(this.inputEl, 'change', onInput);
  }

  SearchComponent.prototype = {
    /**
     * Handles the changes in the search field
     * @param {Event} event
     */
    onInput: function(event) {
      this.storage.dispatch({
        type: 'SEARCH',
        value: this.inputEl.value
      });
    },

    /**
     * Callback for when the storage updates
     * @param {{}} data
     */
    onStorageUpdate: function(data) {
      dom.toggleClass(this.el, 'is-empty', data.search === "");
    }
  }

  window.components = window.components || {};
  window.components.Search = SearchComponent;
})(window.components.ElementComponentSetup, window.lib.dom, window.lib.utils);
