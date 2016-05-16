/*
$('.album li').css({
  width: '1272px',
  height: '900px'
});
 */
/*
css3 缩放
要缩放的元素的父级元素一定要能够获得高度和宽度
 */
cscale('.scale');

function cscale(classs) {
  $(classs).each(function() {
    var h1 = $(this).parent().height();
    var h2 = $(this).height() + 5;
    var s1 = h1 / h2;
    /*
    元素与父级的高度比例
     */
    s1 = parseFloat(s1.toFixed(2)) - 0.03;

    var w1 = $(this).parent().width();
    var w2 = $(this).width();
    var s2 = w1 / (w2 * s1) * 100;
    /*
    缩放后元素的宽度撑满父级的宽度的百分比
     */
    s2 = parseInt(s2, 10);

    if (h2 <= h1) {
      return false;
    }
    /*
    第一步
    1.元素整体缩放以适应父级元素，此时元素宽高应该与父级元素差不多
    2.缩放后元素宽度通过百分比缩放到和父级一样的宽度
     */
    $(this).css({
      width: s2 + '%',
      transform: 'scale(' + s1 + ', ' + s1 + ')'
    });

    /*
    第二步
    1.由于第一步宽度改变，高度变小
    2.重新计算元素原始高度和缩放过后的高度的比例
     */
    var h3 = $(this).height() * ((w2 * s1) / w1);
    s3 = h3 / (h2 * s1);

    $(this).css({
      transform: 'scale(' + s1 + ', ' + (s1 / s3) + ')'
    });
  });
}
