var popbox = {
  init: function(maskhide) {
    var $this = this;
    var mask = '<div class="mask"></div>';
    var l = $('.mask').length;
    if (l) {
      $('.mask').addClass('active');
    } else {
      $('body').append(mask);
    }
    if (maskhide) {
      $('.mask-box').click(function(e) {
        var l = $(e.target).find('.msg').length;
        if (l || $(e.target).hasClass('msg') || $(e.target).hasClass('hide-pop')) {
          $this.hide();
        }
      });
    }

  },
  show: function(id) {
    $('body').addClass('overflow');
    $(id).addClass('active');
    $('.mask').addClass('active');
  },
  hide: function(id) {
    var o = id || '.mask-box';
    $('body').removeClass('overflow');
    $(o).removeClass('active');
    $('.mask').removeClass('active');
  }
};
