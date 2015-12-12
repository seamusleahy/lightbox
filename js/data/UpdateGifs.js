/**
 * @file Data component that watches for changes in the search value and then
 * makes the AJAX response to update the GIFs
 */

(function(xhr) {
  'use strict';

  var GIPHY_PUBLIC_BETA_KEY = 'dc6zaTOxFJmzC';

  /**
   * @param {string} searchTerm
   * @return {string} The URL to call
   */
  function makeGiphySearchUrl(searchTerm) {
    var protocol = location.protocol === 'https:' ? 'https:' : 'http:';
    return protocol + '//api.giphy.com/v1/gifs/search?api_key=' + GIPHY_PUBLIC_BETA_KEY + '&limit=50&q=' + encodeURIComponent(searchTerm);
  }

  /**
   * @param {Storage} storage
   */
  function UpdateGifs(storage) {
    this.storage = storage;
    this.lastSearchValue = '';
    this.storage.subscribe(this.onStorageUpdate.bind(this));
  }

  UpdateGifs.prototype = {
    /**
     * Callback for when the storage updates
     * @param {{}} data
     */
    onStorageUpdate: function(data) {
      this.update(data.search);
    },

    /**
     * Update the search results
     * @param {string} searchValue
     */
    update: function(searchValue) {
      if (searchValue !== this.lastSearchValue) {
        this.lastSearchValue = searchValue;
        if (searchValue === "") {
          this.dispatchUpdate([], searchValue);
        } else {
          xhr.load(makeGiphySearchUrl(searchValue), {}, searchValue)
            .then(this.onSuccess.bind(this));
        }
      }
    },

    /**
     * Handle the AJAX response
     */
    onSuccess: function(response) {
      var gifs = response.response.data;
      var searchTerm = response.passThroughData;
      this.dispatchUpdate(gifs, searchTerm);
    },

    /**
     * Dispatch the event to update the list of GIFs
     */
    dispatchUpdate: function(gifs, searchTerm) {
      this.storage.dispatch({
        type: "GIFS",
        value: gifs,
        searchValue: searchTerm
      });
    }
  };

  window.data = window.data || {};
  window.data.UpdateGifs = UpdateGifs;
})(window.lib.xhr);
