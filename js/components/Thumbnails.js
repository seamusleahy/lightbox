/**
 * @file Handles the thumbnails component
 */

(function(ElementComponentSetup, dom) {
  'use strict';

  function ThumbnailsComponent(el, storage) {
    ElementComponentSetup.call(this, el, storage);

    this.templateSrc = dom.find(this.el, '[data-thumbnail-template]').innerHTML;
    this.gifsHolderEl = dom.find(this.el, '[data-gifs-holder]');
    this.noResultsEl = dom.find(this.el, '[data-gif-empty]');
    this.lastGifs = null;

    dom.onDelegate(this.el, 'click', 'article', this.onClickThumbnail.bind(this));
  }

  ThumbnailsComponent.prototype = {
    /**
     * Callback for when the storage updates
     * @param {{}} data
     */
    onStorageUpdate: function(data) {
      if (this.lastGifs !== data.gifs) {
        this.lastGifs = data.gifs;
        this.gifsHolderEl.innerHTML = this.renderGifs(data.gifs);
      }

      this.updateVisiblity(data.noResults);
    },

    /**
     * Render the GIFs into HTML
     * @param {[]} gifs - An array of Giphy GIFs
     * @return {string}
     */
    renderGifs: function(gifs) {
      var contents = '';

      gifs.forEach(function createThumbnails(gif, index) {
        var vars = {
          id: gif.id,
          src: gif.images.fixed_height_still.url,
          index: index
        };

        contents = contents + this.imageTemplate(vars);
      }, this);

      return contents;
    },

    /**
     * Update the visibility of the component
     * @param {boolean} isVisible
     */
    updateVisiblity: function(isVisible) {
      dom.toggleClass(this.noResultsEl, 'is-visible', isVisible);
    },

    /**
     * Renders the HTML for an image
     * @param {{}} data
     * @return {string}
     */
    imageTemplate: function(data) {
      var tokenRe = /\{\{\s*(\w+)\s*}}/g;
      function replace(match, name) {
        return data[name] !== undefined ? data[name] : '';
      }
      return this.templateSrc.replace(tokenRe, replace);
    },

    /**
     * Handles the clicking of the thumbnail to open the lightbox
     * @param {Event} event
     */
    onClickThumbnail: function(event) {
      var modalIndex = parseInt(event.delegatedTarget.dataset.modalIndex);
      this.storage.dispatch({
        type: 'LIGHTBOX',
        value: modalIndex
      });
    }
  };

  window.components = window.components || {};
  window.components.Thumbnails = ThumbnailsComponent;
})(window.components.ElementComponentSetup, window.lib.dom);
