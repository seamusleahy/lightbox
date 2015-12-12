(function(dom, components, Storage, storageReducer, UpdateGifs) {
  'use strict';

  var storage = new Storage(storageReducer);

  var searchComponent = new components.Search(dom.query('[data-component="search"]'), storage);
  var thumbnailsComponent = new components.Thumbnails(dom.query('[data-component="thumbnails"]'), storage);
  var lightbox = new components.Lightbox(dom.query('[data-component="lightbox"]'), storage);
  var loading = new components.Loading(dom.query('[data-component="loading"]'), storage);
  var updateGifs = new UpdateGifs(storage);

  storage.dispatch({type: 'INIT'});

})(window.lib.dom, window.components, window.lib.Storage, window.data.storageReducer, window.data.UpdateGifs);
