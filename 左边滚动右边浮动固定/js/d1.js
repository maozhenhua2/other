function createHtml() {
  var i = 0;
  var l = 100;
  var h = '';
  h += '<ol>';
  while (i < l) {
    h += '<li>line ' + (i + 1) + '</li>';
    i++;
  }
  h += '</ol>';
  return h;
}

var list = '.list';
var fixed = '.fixed';

$(list).html(createHtml());
$(window).scroll(function() {
  scrollFixed();
});

// 滚动固定
function scrollFixed() {
  var h = $(fixed).height();
  // var m = $('.multi-tag').height() + parseInt($('.multi-tag').css('margin-bottom'), 10);
  var m = 0;

  // console.log(1)
  if ($(list).height() < h) {
    $(fixed).css({
      position: 'relative',
      top: 0 + 'px'
    });
    return false;
  }
  var top = $(list).offset().top;

  var t = $('body')[0].scrollTop;
  var bottom = $(list).height() + top;
  // console.log(t, top, bottom);
  if (t > top && (t + h) < bottom) {
    $(fixed).css({
      position: 'fixed',
      top: 0,
      width: $(list).width() + 'px'
    });
  } else if (t > top && (t + h + m) > bottom) {
    $(fixed).css({
      position: 'absolute',
      top: $(list).parent().height() - h - m + 'px',
      width: $(list).width() + 'px'
    });
  } else {
    $(fixed).css({
      position: 'relative',
      top: 0 + 'px',
      width: $(list).width() + 'px'
    });
  }
}
