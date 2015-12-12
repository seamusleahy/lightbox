/**
 * @file XHR utility
 */

(function(Promise) {
  'use strict';

  /**
   * Make an XHR request
   * @param {string} url - URL to call
   * @param {{method: {string}}} options - Options for the call
   * @param {*} passThroughData - Data to pass along with the results
   * @return {Promise}
   *
   * The success value is an object with:
   *  - response: the data from the response
   *  - xhr: The XMLHttpRequest for the request
   *  - passThroughData: The value placed in passThroughData
   *
   * The error valus is the same except with no response.
   */
  function load(url, options, passThroughData) {
    options = options || {};
    var method = options.method || 'get';

    function makeRequest(resolve, reject) {
      var request = new XMLHttpRequest();

      request.onreadystatechange = function xhrStateChange() {
        if (request.readyState == XMLHttpRequest.DONE ) {
           if (request.status >= 200 && request.status < 300){
              var data = request.responseText;
              var contentType = request.getResponseHeader('content-type');

              if (contentType === 'application/json') {
                data = JSON.parse(data);
              }

              resolve({response: data, xhr: request, passThroughData: passThroughData});
           } else {
              reject({xhr: request, passThroughData: passThroughData});
           }
        }
      };

      request.open(method, url);
      request.send();
    }

    return new Promise(makeRequest);
  }

  window.lib = window.lib || {};
  window.lib.xhr = {
    load: load
  };
})(window.lib.Promise);
