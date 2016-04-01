var popbox = {
  init: function () {
    var $this = this;
    var mask = '<div class="mask"></div>';
    var l = $('.mask').length;
    if(l){
      $('.mask').addClass('active');
    } else {
      $('body').append(mask);
    }
    $('.mask-box').click(function (e) {
      var l = $(e.target).find('.msg').length;
      if(l || $(e.target).hasClass('msg') || $(e.target).hasClass('hide-pop')){
        $this.hide();
      }
    });
  },
  show: function (id) {
    $('body').addClass('overflow');
    $(id).addClass('active');
    $('.mask').addClass('active');
  },
  hide: function () {
    $('body').removeClass('overflow');
    $('.mask-box').removeClass('active');
    $('.mask').removeClass('active');
  }
};