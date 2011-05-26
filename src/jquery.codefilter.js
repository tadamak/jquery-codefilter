$.fn.hideOption = function() {
  return this.each(function() {
    $(this).wrap('<span>').parent().hide()
  });
};

$.fn.showOption = function() {
  return this.each(function() {
    var $span = $(this);
    var opt = $span.children()[0];
    $span.replaceWith(opt);
  });
};

$.fn.codefilter = function(selector, options) {

  var options = $.extend({
    selector_size: 3
  }, options);

  return this.each(function() {

    // prepare elements
    var $code = $(this);
    var $selector = $(selector);

    // bind events
    $code.bind({
      focus: function() { $selector.attr('size', options.selector_size); },
      blur: function() { $selector.attr('size', 1); }
    });

    $selector.bind('change', function() {
      $code.val(this.value);
    });

    $code.bind('keyup', function() {
      var code = $code.val();

      $selector.val(code);

      if (code.length == 0) {
        $selector.children('span').showOption();
        return;
      }

      $selector.children('option:not([value^="' + code + '"])').hideOption();
      $selector.find('span > option[value^="' + code + '"]').parent().showOption();
    });

  });

};

