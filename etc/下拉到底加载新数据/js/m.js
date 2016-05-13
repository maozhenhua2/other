// 显示loading
function loading_show(fn) {
  $('#loading').addClass('active');
  setTimeout(function () {
    if (typeof fn === 'function') {
      fn();
    }
  }, 600);
}

// 关闭loading
function loading_hide() {
  $('#loading').removeClass('active');
}

// 点击黑色遮罩层关闭弹出框
$('.mask').click(function () {
  if ($(this).parent()[0].id !== 'loading') {
    $(this).parent().removeClass('active');
  }


});