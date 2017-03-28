// 等比缩放
function scaleSize(obj) {
  var dom = obj.dom;
  var w = obj.w;
  var h = obj.h;
  dom.height(dom.width() * h / w);
}
// pop
var pop = {
  init: function (obj) {
    this.showClass = obj.show;
    this.hideClass = obj.hide;
    this.pop = obj.pop ? obj.pop : '.pop';
    if ($('.pop').hasClass('pop-confirm')) {
    } else if ($('.pop').hasClass('pop-info')) {

    } else if ($('.pop').hasClass('pop-pulling')) {

      scaleSize({
        dom: $(this.pop),
        w: 963,
        h: 1002
      });
    }
    this.position();
    this.event();
  },
  position: function () {
    var w = $(window).width();
    var h = $(window).height();
    var obj = $(this.pop);
    obj.css({
      left: (w - obj.outerWidth()) / 2 + 'px',
      top: (h - obj.outerHeight()) / 2 + 'px'
    });
  },
  show: function () {
    var showClass = this.showClass;
    if (!showClass) {
      if ($(this.pop).hasClass('loading')) {
        showClass = 'rollIn';
      } else if ($(this.pop).hasClass('pop-confirm')) {
        showClass = 'bounceIn';
      }
    }

    showClass = showClass ? showClass : 'tada';

    $('body').addClass('overflow');
    $('.pop-box').addClass('show');
    $(this.pop).addClass('animatedS ' + showClass);
    $(this.pop).show();
    $(this.pop).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass('animatedS ' + showClass)
    });

  },
  hide: function () {
    var showClass = this.showClass;
    var hideClass = this.hideClass;
    if (!hideClass) {
      if ($(this.pop).hasClass('loading')) {
        hideClass = 'rollOut';
      } else if ($(this.pop).hasClass('pop-confirm')) {
        hideClass = 'bounceOut';
      }
    }
    hideClass = hideClass ? hideClass : 'hinge';

    $(this.pop).removeClass('animatedS ' + showClass);
    $(this.pop).addClass('animatedE ' + hideClass);
    $(this.pop).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $('.pop-box').removeClass('show');
      $(this).hide();
      $(this).removeClass('animatedE ' + hideClass);
      $('body').removeClass('overflow');
    });
  },
  event: function (obj) {
    var _this = this;
    var yes = obj && obj.yes;
    var no = obj && obj.no;
    $('.confirm-yes').click(function () {
      yes && yes();
      _this.hide();
    });

    $('.confirm-no').click(function () {
      no && no();
      _this.hide();
    });

    $('.pop-close').click(function () {
      _this.hide();
    });
  }
};