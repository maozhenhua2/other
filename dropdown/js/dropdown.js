// 下拉框
cselect();

function cselect() {

  $(document).on('click', function(e) {
    var t = e.target;
    var sel = '.c-select-list';
    var cSelectList = $(sel);
    var l = cSelectList.length;
    var i = 0;
    var parent;
    for (; i < l; i++) {
      $(cSelectList[i]).css({
        'z-index': 15 + (l - i)
      });
    }

    if ($(t).hasClass('c-select-btn') || $(t).parent().hasClass('c-select-btn') || ($(t).hasClass('input-text') && $(t).parent().hasClass('c-select'))) {

      if ($(t).parent().hasClass('c-select-btn')) {
        parent = $(t).parent().parent().children(sel);
      } else {
        parent = $(t).parent().children(sel);
      }

      cSelectList.not(parent).hide();
      parent.toggle();
    }

    if ($(t).parent().parent().hasClass('c-select-list')) {
      var p = $(t).parent().parent();
      $(t).addClass('cselected').siblings().removeClass('cselected');
      p.hide();
      p.parent().children('.input-text').val($(t).html());
    }

    var p1 = $(e.target).find(sel).length;
    var p2 = $(e.target).siblings(sel).length;
    var p3 = $(e.target).parent().siblings(sel).length;
    // console.log(p1, p2, p3)

    if ((p1 && !p2 && !p3) || (!p1 && !p2 && !p3)) {
      $(sel).hide();
    }

  });

}
