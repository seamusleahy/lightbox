/**
 * @file A collection of DOM helper functions
 */

(function(document) {
  'use strict';

  /**
   * A shorthand wrapper for querySelector on the document
   * @param {string} selectorQuery - the CSS selector to query with
   * @return {Element|null}
   */
  function query(selectorQuery) {
    return document.body.querySelector(selectorQuery);
  }

  /**
   * A shorthand wrapper for querySelectorAll on the document
   * @param {string} selectorQuery - the CSS selector to query with
   * @return {NodeList}
   */
  function queryAll(selectorQuery) {
    return document.body.querySelectorAll(selectorQuery);
  }

  /**
   * A shorthand wrapper for querySelector on an element
   * @param {string} selectorQuery - the CSS selector to query with
   * @return {Element|null}
   */
  function find(element, selectorQuery) {
    return element.querySelector(selectorQuery);
  }

  /**
   * A shorthand wrapper for querySelectorAll on an element
   * @param {string} selectorQuery - the CSS selector to query with
   * @return {NodeList}
   */
  function findAll(element, selectorQuery) {
    return element.querySelectorAll(selectorQuery);
  }

  /**
   * A shorthand for addEventListener
   * @param {Element|NodeList} elements
   * @param {string} type
   * @param {function} listener
   * @param {boolean|undefined} useCapture
   */
  function on(elements, type, listener, useCapture) {
    if (elements instanceof NodeList) {
      for (var i=0; i<elements.length; ++i) {
        elements.item(i).addEventListener(type, listener, useCapture);
      }
    } else {
      elements.addEventListener(type, listener, useCapture);
    }
  }

  /**
   * Add an event listener to this element but only call the listener when
   * the element or a descentant element of event.target matches the querySelector
   *
   * @param {Element} element
   * @param {string} type
   * @param {string} querySelector
   * @param {function} listener
   */
  function onDelegate(element, type, querySelector, listener) {
    on(element, type, wrappedListener);

    function wrappedListener(event) {
      var originalTarget = event.target;
      var el = originalTarget;
      var matchesSelector = false;

      // Search up to the source element to find the first element that matches
      // the querySelector
      while(el && el !== element && !matchesSelector) {
        matchesSelector = matches(el, querySelector);
        if (!matchesSelector) {
          el = el.parentNode;
        }
      }

      if (matchesSelector) {
        event.delegatedTarget = el;
        listener(event);
      }
    }
  }

  /**
   * Check if an element matches the selector query
   * @param {Element} element
   * @param {string} selectorQuery
   */
  function matches(element, selectorQuery) {
    return element.matches ? element.matches(selectorQuery) : element.msMatchesSelector(selectorQuery);
  }

  /**
   * Remove all the children nodes of an element
   * @param {Element} element
   */
  function empty(element) {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
  }

  // Needed for IE11
  var toggleClassNeedPolyfill = (function() {
    var div = document.createElement('div');
    div.classList.add('foo');
    div.classList.toggle('foo', true);
    return div.classList.length !== 1;
  })();

  /**
   * @param {Element} element
   * @param {string} className
   * @param {boolean} force
   */
  function toggleClass(element, className, force) {
    if (toggleClassNeedPolyfill && force !== undefined) {
      if (force) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    } else {
      element.classList.toggle(className, force);
    }
  }

  window.lib = window.lib || {};
  // COMMENTARY: If using an ES6 transpiler, then I would use the
  // property-value-shorthand for setting the properties to the same named
  // functions.
  window.lib.dom = {
    query: query,
    queryAll: queryAll,
    find: find,
    findAll: findAll,
    on: on,
    onDelegate: onDelegate,
    matches: matches,
    empty: empty,
    toggleClass: toggleClass
  };
})(document);
