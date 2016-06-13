var info = {
  tab: 0,
  datas: [{
    current: 1,
    pageSize: 10
  }, {
    current: 1,
    pageSize: 10
  }],
  active: {
    current: 1,
    pageSize: 10
  }
};

// 模拟请求分页数据
function getPageData(current, pageSize, t) {
  var i = 0;
  var l = pageSize;
  var arr = [];
  for (; i < l; i++) {
    arr.push({
      index: current * pageSize + i + 1,
      text: t + (current * pageSize + i + 1)
    })
  }
  return {
    total: 100,
    arr: arr
  };
}

// 根据数据生成表格
function createHtml(data) {
  var h = '';
  var i = 0;
  var l = data.length;
  for (; i < l; i++) {
    h += '<tr>';
    h += '<td>' + data[i].index + '</td>';
    h += '<td>' + data[i].text + '</td>';
    h += '</tr>';
  }
  return h;
}

var getData = [{
  data: function() {
    return getPageData(info.datas[0].current - 1, info.datas[0].pageSize, 'tab-1-');
  }
}, {
  data: function() {
    return getPageData(info.datas[1].current - 1, info.datas[1].pageSize, 'tab-2-');
  }
}];

function setHtml(i, data) {
  document.querySelector('#table' + (i + 1) + ' tbody').innerHTML = createHtml(data);
}

// 调用页面显示和分页状态
function loadHtml(callback) {
  setTimeout(function() {
    var data = getData[info.tab];
    return (function(data) {
      setHtml(info.tab, data.data().arr);

      if (!commentPage) {
        commentPage = new pages({
          currentPage: info.datas[info.tab].current,
          totalCount: data.data().total,
          pageSize: 10,
          selecter: $('.page'),
          pageEvent: function(i) {
            // console.log(info.datas[info.tab].current);
            info.datas[info.tab].current = i;
            info.datas[info.tab].pageSize = 10;
            pageShow(i);
          }
        });
      }

      commentPage.init();

      callback(data);
    }(data));
  });
}
var commentPage;

loadHtml(function(data) {

});

function pageShow(i) {
  setTimeout(function() {
    var data = getData[info.tab];
    setHtml(info.tab, data.data().arr);
  });
}

$('#myTabs a').click(function(e) {
  e.preventDefault()
  var index = $(this).parent().index();
  $(this).parent().addClass('active').siblings().removeClass('active');
  $('.tab-content').children().eq($(this).parent().index()).addClass('active').siblings().removeClass('active');
  info.tab = index;
  // console.log(info.datas[info.tab].current);
  loadHtml(function() {});

});
