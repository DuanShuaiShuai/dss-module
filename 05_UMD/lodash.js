;(function() {
    var runInContext = (function runInContext(context) {
      function lodash(){
        //  ...
      }
      //...
          // Add chain sequence methods to the `lodash` wrapper.
      lodash.prototype.at = wrapperAt;
      lodash.prototype.chain = wrapperChain;
      lodash.prototype.commit = wrapperCommit;
      lodash.prototype.next = wrapperNext;
      lodash.prototype.plant = wrapperPlant;
      lodash.prototype.reverse = wrapperReverse;
      lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
  
      // Add lazy aliases.
      lodash.prototype.first = lodash.prototype.head;
  
      if (symIterator) {
        lodash.prototype[symIterator] = wrapperToIterator;
      }
      return lodash;
    });
  
    /*--------------------------------------------------------------------------*/
  
    // Export lodash.
    var _ = runInContext();
  
    // Some AMD build optimizers, like r.js, check for condition patterns like:
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      // Expose Lodash on the global object to prevent errors when Lodash is
      // loaded by a script tag in the presence of an AMD loader.
      // See http://requirejs.org/docs/errors.html#mismatch for more details.
      // Use `_.noConflict` to remove Lodash from the global object.
      root._ = _;
  
      // Define as an anonymous module so, through path mapping, it can be
      // referenced as the "underscore" module.
      define(function() {
        return _;
      });
    }
    // Check for `exports` after `define` in case a build optimizer adds it.
    else if (freeModule) {
      // Export for Node.js.
      (freeModule.exports = _)._ = _;
      // Export for CommonJS support.
      freeExports._ = _;
    }
    else {
      // Export to the global object.
      root._ = _;
    }
  }.call(this));
  