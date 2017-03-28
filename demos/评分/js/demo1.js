$(document).ready(function() {

  scores();

  function scores() {
    var score = $('.score');
    var i = 0;
    var l = score.length;
    var index = 0;

    for (; i < l; i++) {
      index = score[i].getAttribute('data-selected');
      $(score[i]).children('a').eq(index - 1).prevAll().andSelf().addClass('selected');
    }

    $('.score a').on('mouseenter', function() {
      $(this).prevAll().andSelf().addClass('active');
    }).on('mouseleave', function() {
      $(this).prevAll().andSelf().removeClass('active');
    }).on('click', function() {
      // 判断是不是最后一个
      var isLast = $(this).index() === $(this).parent().children().length - 1;
      // 有选择过
      if ($(this).nextAll().hasClass('selected') && !isLast) {
        $(this).prevAll().andSelf().addClass('selected');
      } else {
        // 没有选择过
        if ($(this).hasClass('selected')) {
          $(this).prevAll().andSelf().removeClass('selected');
        } else {
          $(this).prevAll().andSelf().addClass('selected');
        }
      }
      $(this).nextAll().removeClass('selected');
      return false;
    });
  }

});
