/**
 * @file Handles the lightbox component
 */

(function(ElementComponentSetup, dom) {
  'use strict';
  var ESC_KEY = 27;
  var RIGHT_ARROW_KEY = 39;
  var LEFT_ARROW_KEY = 37;

  // COMMENTARY: There are several features that I would want to add, but for
  // time, they have to wait.
  //
  //  1. Add touch events for swiping the image to get rid of the buttons for
  //     close, next, and previous.
  //  2. Transition the image from one to another.
  function LightboxComponent(el, storage) {
    ElementComponentSetup.call(this, el, storage);

    this.navBoxEl = dom.find(this.el, '[data-nav-box]');
    this.mediaHolderEl = dom.find(this.el, '[data-media-holder]');
    this.screenEl = dom.find(this.el, '[data-screen]');
    this.prevButtonEl = dom.find(this.el, '[data-prev-button]');
    this.nextButtonEl = dom.find(this.el, '[data-next-button]');
    this.closeButtonEl = dom.find(this.el, '[data-close]');
    this.titleEl = dom.find(this.el, '[data-title]');

    this.currentGifId = null;
    this.videoElement = null;

    dom.on(this.screenEl, 'click', this.close.bind(this));
    dom.on(this.closeButtonEl, 'click', this.close.bind(this));
    dom.on(this.prevButtonEl, 'click', this.previous.bind(this));
    dom.on(this.nextButtonEl, 'click', this.next.bind(this));
    dom.on(window, 'keyup', this.keyshortcuts.bind(this));
  }

  LightboxComponent.prototype = {
    /**
     * Callback for when the storage updates
     * @param {{}} data
     */
    onStorageUpdate: function(data) {
      if (data.modalIndex !== null) {
        var gif = data.gifs[data.modalIndex];

        if (this.currentGifId !== gif.id) {
          this.currentGifId = gif.id;
          this.updateVideo(gif);
          this.updateTitle(gif);
          this.updateNavButtons(data.hasNext, data.hasPrevious)
        }
      } else {
        this.currentGifId = null;
        this.removeVideo();
      }

      this.updateVisiblity(data.modalIndex !== null);
    },

    /**
     * Update the video with the GIF
     * @param {{}} gif - An object that represents the Giphy GIF to display
     */
    updateVideo: function(gif) {
      var video = this.makeVideo(gif);
      this.removeVideo();
      this.addVideo(video);
      video.play();
    },

    /**
     * Update the visibility of the previous and next buttons
     * @param {boolean} hasNext
     * @param {boolean} hasPrevious
     */
    updateNavButtons: function(hasNext, hasPrevious) {
      dom.toggleClass(this.navBoxEl, 'has-next', hasNext);
      dom.toggleClass(this.navBoxEl, 'has-previous', hasPrevious);
    },

    /**
     * Update the visibility of the lightbox
     * @param {boolean} isVisible
     */
    updateVisiblity: function(isVisible) {
      dom.toggleClass(this.el,'is-visible', isVisible);
    },

    /**
     * Update the title of the lightbox
     * @param {{}} gif - An object that represents the Giphy GIF to display
     */
    updateTitle: function(gif) {
      var text = document.createTextNode(gif.source_tld);
      dom.empty(this.titleEl);
      this.titleEl.appendChild(text);
    },

    /**
     * Dispatch the event to close the modal
     */
    close: function() {
      this.storage.dispatch({
        type: 'LIGHTBOX',
        value: null
      });
    },

    /**
     * Dispatch the event to display the previous gif
     */
    previous: function() {
      this.storage.dispatch({
        type: 'PREVIOUS_LIGHTBOX'
      });
    },

    /**
     * Dispatch the event to display the next gif
     */
    next: function() {
      this.storage.dispatch({
        type: 'NEXT_LIGHTBOX'
      });
    },

    /**
     * Remove the current video element
     */
    removeVideo: function() {
      if (this.videoElement) {
        this.mediaHolderEl.removeChild(this.videoElement);
      }
      this.videoElement = null;
    },

    /**
     * Add a video to display
     * @param {Element} video
     */
    addVideo: function(video) {
      this.mediaHolderEl.appendChild(video);
      this.videoElement = video;
    },

    /**
     * Make a new video element from a Giphy GIF
     * @param {{}} gif
     */
    makeVideo: function(gif) {
      var img = gif.images.original_still.url;
      var width = gif.images.original.width;
      var height = gif.images.original.height;
      var mp4 = gif.images.original.mp4;

      var video = document.createElement('video');
      video.height = height;
      video.width = width;
      video.src = mp4;
      video.poster = img;
      video.loop = true;

      return video;
    },

    /**
     * Handles key shortcuts
     * @param {Event} event
     */
    keyshortcuts: function(event) {
      switch(event.which) {
        case ESC_KEY:
          this.close(event);
          break;

        case RIGHT_ARROW_KEY:
          this.next(event);
          break;

        case LEFT_ARROW_KEY:
          this.previous(event);
          break;
      }
    }
  };

  window.components = window.components || {};
  window.components.Lightbox = LightboxComponent;
})(window.components.ElementComponentSetup, window.lib.dom);
