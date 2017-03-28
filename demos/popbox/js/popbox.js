var popbox = {
  init: function(o) {
    var $this = this;
    var mask = '<div class="mask"></div>';
    var l = $('.mask').length;
    if (!l) {
      $('body').append(mask);
    }

    if (o.transition) {
      $('.mask-box').addClass('transition');
      $('.mask').addClass('transition');
    } else {
      $('.mask-box').removeClass('transition');
      $('.mask').removeClass('transition');
    }

    if (o.maskhide) {
      $('.mask-box').on('click', hide);
    } else {
      $('.mask-box').off('click', hide);
    }

    function hide(e) {
      var l = $(e.target).find('.msg').length;
      if (l || $(e.target).hasClass('msg') || $(e.target).hasClass('hide-pop')) {
        $this.hide();
      }
    }
    return this;
  },
  show: function(id) {
    $('body').addClass('overflow');
    $(id).addClass('active');
    $('.mask').addClass('active');
    return this;
  },
  hide: function(id) {
    var o = id || '.mask-box';
    $('body').removeClass('overflow');
    $(o).removeClass('active');
    $('.mask').removeClass('active');
    return this;
  }
};
