/**
 * @file The logic for translating the storage events and previous data into
 * the new data state.
 */

(function(utils) {
  'use strict';

  /**
   * @param {{}} event - The event to change the storage state
   * @param {{}} data - The current storage state
   * @return {{}} - The new storage state
   */
  function storageReducer(event, data) {
    var updatedData = {};

    // Initialization
    if (data === undefined) {
      data = {
        search: '',
        gifs: [],
        modalIndex: null,
        hasPrevious: false,
        hasNext: false,
        noResults: false,
        loading: false
      };
    }

    if (event.type === 'SEARCH' && event.value !== data.search) {
      updatedData.search = event.value;
      updatedData.modalIndex = null;
      updatedData.loading = !!event.value;
    }

    if (event.type === 'GIFS' && event.searchValue === data.search) {
      updatedData.gifs = event.value;
      updatedData.noResults = data.search && updatedData.gifs.length === 0;
      updatedData.loading = false;
    }

    if (event.type === 'LIGHTBOX') {
      updatedData.modalIndex = event.value;
    }

    if (event.type === 'PREVIOUS_LIGHTBOX' && data.modalIndex > 0) {
      updatedData.modalIndex = data.modalIndex - 1;
    }

    if (event.type === 'NEXT_LIGHTBOX' && data.modalIndex < data.gifs.length) {
      updatedData.modalIndex = data.modalIndex + 1;
    }

    if (updatedData.modalIndex !== null || updatedData.modalIndex !== undefined) {
      updatedData.hasNext = updatedData.modalIndex < data.gifs.length - 1;
      updatedData.hasPrevious = updatedData.modalIndex > 0;
    } else {
      updatedData.hasNext = false;
      updatedData.hasPrevious = false;
    }

    utils.mergeDefaults(updatedData, data);

    return updatedData;
  }

  window.data = window.data || {};
  window.data.storageReducer = storageReducer;
})(window.lib.utils);
