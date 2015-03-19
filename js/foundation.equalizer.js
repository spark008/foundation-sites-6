!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Equalizer.
   * @class
   * @fires Equalizer#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Equalizer(element, options) {
    this.$element = element;
    this.options  = $.extend(this.defaults, options);
    this.$window  = $(window);
    this.name     = 'equalizer';
    this.attr     = 'data-equalizer';

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Equalizer#init
     */
    this.$element.trigger('init.zf.equalizer');
  }

  Equalizer.defaults = {
    equalizeOnStack: true
  };

  Equalizer.prototype = {
    /**
     * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
     * @private
     */
    _init: function() {
      var heights = this.getHeights(this.$element);
      this.applyHeight(this.$element, heights);

    },

    /**
     * Initializes events for Equalizer.
     * @private
     */
    _events: function() {
      var self = this;

      this.$window
        .off('.equalizer')
        .on('resize.fndtn.equalizer', Foundation.throttle(function () {
          self._reflow();
        }.bind(this), 50));
    },
    /**
     * Calls necessary functions to update Equalizer upon DOM change
     * @private
     */
    _reflow: function() {
      var self = this;

      $('[' + this.attr + ']').each(function() {
        var $eqParent       = $(this),
            adjustedHeights = self.getHeights($eqParent);

        self.applyHeight($eqParent, adjustedHeights);   
      });
    },
    /**
     * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
     * @param {Object} $eqParent - A jQuery instance of an Equalizer container
     * @return {array} heights - An array of heights of children within Equalizer container
     */
    getHeights: function($eqParent) {

      var eqGroupName = $eqParent.data('equalizer'),
          eqGroup = eqGroupName ? $eqParent.find('[' + this.attr + '-watch="' + eqGroupName + '"]:visible') : $eqParent.find('[' + this.attr + '-watch]:visible');
          eqGroup.height('inherit');

      var heights = eqGroup.map(function () { return $(this).outerHeight(false) }).get();
      return heights;
    },
    /**
     * Changes the CSS height property of each child in an Equalizer parent to match the tallest
     * @param {Object} $eqParent - A jQuery instance of an Equalizer container
     * @param {array} heights - An array of heights of children within Equalizer container
     * @fires Equalizer#preEqualized
     * @fires Equalizer#postEqualized
     */
    applyHeight: function($eqParent, heights) {
      var eqGroupName = $eqParent.data('equalizer'),
          eqGroup = eqGroupName ? $eqParent.find('['+this.attr+'-watch="'+eqGroupName+'"]:visible') : $eqParent.find('['+this.attr+'-watch]:visible'),
          max      = Math.max.apply(null, heights);

      /**
       * Fires before the heights are applied
       * @event Equalizer#preEqualized
       */
      $eqParent.trigger('preEqualized.fndtn.equalizer');

      // for now, apply the max height found in the array
      for (var i = 0; i < eqGroup.length; i++) {
        $(eqGroup[i]).css('height', max);
      }

      /**
       * Fires when the heights have been applied
       * @event Equalizer#postEqualized
       */
      $eqParent.trigger('postEqualized.fndtn.equalizer');
    }
  }

  Foundation.plugin('equalizer', Equalizer);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Equalizer;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Equalizer;
    });

}(Foundation, jQuery);