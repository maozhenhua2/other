// 下拉框
cselect();

function cselect() {

  $(document).on('click', function(e) {
    var t = e.target;
    var sel = '.c-select-list';
    var cSelectList = $(sel);
    if ($(t).hasClass('c-select-btn') || ($(t).hasClass('input-text') && $(t).parent().hasClass('c-select'))) {
      var l = cSelectList.length;
      var i = 0;
      for (; i < l; i++) {
        $(cSelectList[i]).css({
          'z-index': 15 + (l - i)
        });
      }

      cSelectList.not($(t).parent().children(sel)).hide();
      $(t).parent().children(sel).toggle();
    }

    if ($(t).parent().parent().hasClass('c-select-list')) {
      var p = $(t).parent().parent();
      $(t).addClass('cselected').siblings().removeClass('cselected');
      p.hide();
      p.parent().children('.input-text').val($(t).html());
    }

  });

  documentClickHide('.c-select-list');
}

function documentClickHide(sel) {
  $(document).click(function(e) {
    var p = $(e.target).find(sel).length;
    var p2 = $(e.target).siblings(sel).length;
    if ((p && !p2) || (!p && !p2)) {
      $(sel).hide();
    }
  });
}