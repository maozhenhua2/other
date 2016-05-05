// 下拉框
cselect();
function cselect() {
  var l = $('.c-select-list').length;
  var i = 0;
  var l2 = l;
  $('.c-select-btn, .c-select input').click(function () {
    $('.c-select-list').not($(this).parent().children('.c-select-list')).hide();
    $(this).parent().children('.c-select-list').toggle();
  });

  $('.c-select-list li').click(function () {
    var p = $(this).parent().parent();
    $(this).addClass('cselected').siblings().removeClass('cselected');
    p.hide();
    p.parent().children('.input-text').val($(this).html());

  });

  documentClickHide('.c-select-list');

  for (; i < l; i++) {
    $($('.c-select-list')[i]).css({
      'z-index': 5 + (l - i)
    });
  }
}

function documentClickHide(sel){
  $(document).click(function (e) {
    var p = $(e.target).find(sel).length;
    var p2 = $(e.target).siblings(sel).length;
    if ((p && !p2) || (!p && !p2)) {
      $(sel).hide();
    }
  });
}