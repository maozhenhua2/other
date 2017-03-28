(function (w) {
  var pcPageInfo = {};
  var pageer = $('.pages');

  setTimeout(function () {
    pcPageInfo = {
      currentPage: 1,
      totalCount: 50,
      pageSize: 2,
      firstText: '<span class="glyphicon glyphicon-fast-backward"></span>',
      prevText: '<span class="glyphicon glyphicon-step-backward"></span>',
      nextText: '<span class="glyphicon glyphicon-step-forward"></span>',
      lastText: '<span class="glyphicon glyphicon-fast-forward"></span>',
      selecter: $('.table-pagination'),
      firstFn: function (i) {
        setTimeout(function () {
          pcPageInfo.currentPage = i;
          showPage(pcPageInfo.currentPage - 1);
        }, 500);
      },
      lastFn: function (i) {
        setTimeout(function () {
          pcPageInfo.currentPage = i;
          showPage(pcPageInfo.currentPage - 1);
        }, 500);
      },
      prevFn: function (i) {
        setTimeout(function () {
          pcPageInfo.currentPage = i;
          showPage(pcPageInfo.currentPage - 1);
        }, 500);
      },
      nextFn: function (i) {
        setTimeout(function () {
          pcPageInfo.currentPage = i;
          showPage(pcPageInfo.currentPage - 1);
        }, 500);
      },
      noFn: function (i) {
        setTimeout(function () {
          pcPageInfo.currentPage = i;
          showPage(pcPageInfo.currentPage - 1);
        }, 500);
      }
    };
    // 总页数
    totalPage = pcPageInfo.totalCount % pcPageInfo.pageSize == 0 ? pcPageInfo.totalCount / pcPageInfo.pageSize : parseInt(pcPageInfo.totalCount / pcPageInfo.pageSize) + 1;

    showPage(pcPageInfo.currentPage - 1);
    pcPages();


  }, 500);

  function showPage(i){
    var s = 0;
    var e = pcPageInfo.pageSize;
    var h = '';
    for(; s < e;s++){
      h += '<div class="tr" id="no' + (s + e * i) + '">';
      h += '<div class="name">' + (s + 1 + e * i) + '考试名称</div>';
      h += '<div class="state">';
      // 完成状态
      //h += '<span>完成</span>';
      h += '<a href="#">查看结果</a>';
      // 未完成状态
      //h += '<a class="btn" href="#">开始考试</a>';
      h += '</div>';
      h += '</div>';

    }

    pageer.html(h);
  }


  // pc分页
  function pcPages() {
    var commentPage = new pages(pcPageInfo);
    commentPage.init();
  }
})(window);
