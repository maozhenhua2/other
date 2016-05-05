var multiTag = {
  arr: [],
  tmpArr: [],
  // 添加数据
  add: function (o) {
    this.tmpArr = [];
    this.tmpArr.push(o);
    this.createTag();
    return this;
  },
  // 删除数据
  remove:function (v) {
    var index = this.arr.indexOf(v);
    this.arr.splice(index, 1);
    this.removeTag(index);
    return this;
  },
  // 生成dom
  createTag: function () {
    var _this = this;
    var html = '';
    _this.tmpArr.map(function (v, index, all) {
      html += '<p data-value="' + v + '">' + v + '<span class="glyphicon glyphicon-remove"></span></p>';
      _this.arr.push(v);
    });
    $('.multi-tag').append(html);
    return _this;
  },
  // 删除dom
  removeTag: function (i) {
    $('.multi-tag').children().eq(i).remove();
    return _this;
  },
  // 获取数组
  getArr: function () {
    return this.arr;
  }
};

$('#add').click(function () {
  var v = $('#d1').val();
  if (v) {
    multiTag.add(v);
  }

});

$('.multi-tag').on('click', 'span', function () {
  var v = $(this).parent().attr('data-value');
  multiTag.remove(v);
});