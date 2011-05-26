(function($) {

  $.fn.hideOption = function() {
    this.each(function() {
      $(this).wrap('<span>').parent().hide()
    });
  };

  $.fn.showOption = function() {
    this.each(function() {
      var $span = $(this);
      var opt = $span.children()[0];
      $span.replaceWith(opt);
    });
  };

  var CodeFilter = function (src, where, settings) {
    settings = jQuery.extend({
        property: 'text'
    }, settings);

    var $src = $(src);
    var $where = $(where);

    $src.bind({
      focus: function() { $where.attr('size', 2); },
      blur: function() { $where.attr('size', 1); }
    });

    $src.bind('keyup', function() {
      var code = $src.val();

      $where.val(code);

      if (code.length == 0) {
        $where.children('span').showOption();
        return;
      }

      $where.children('option:not([value^="' + code + '"])').hideOption();
      $where.find('span > option[value^="' + code + '"]').parent().showOption();
    });
  }

  $.fn.codeFilter = function (where, opts) {
	  var bleh =  new CodeFilter(this, where, opts);
  }

})(jQuery);
/* END */
