function pages(obj) {
  this.currentPage = obj.currentPage;
  this.totalCount = obj.totalCount;
  this.pageSize = obj.pageSize;
  this.selecter = obj.selecter;
  this.firstText = obj.firstText ? obj.firstText : '|&lt;';
  this.prevText = obj.prevText ? obj.prevText : '&lt;&lt;';
  this.nextText = obj.nextText ? obj.nextText : '&gt;&gt;';
  this.lastText = obj.lastText ? obj.lastText : '&gt;|';
  this.pageEvent = obj.pageEvent ? obj.pageEvent : function() {};
  this.totalPage = this.totalCount % this.pageSize == 0 ? this.totalCount / this.pageSize : parseInt(this.totalCount / this.pageSize) + 1; //总页数
  this.page_list_size = 5; // 页码显示的个数
  this.inum = Math.floor(this.page_list_size / 2); // 分页显示个数
  this.h = '';

  //console.debug(currentPage, totalCount, pageSize, selecter, totalPage)
  if (typeof this.init != 'function') {
    // 运行
    pages.prototype.init = function() {
      this.reset(this.currentPage);
      this.event();
    };

    pages.prototype.infoChange = function(obj) {
      this.currentPage = obj.currentPage;
      this.totalCount = obj.totalCount;
      this.pageSize = obj.pageSize;
      this.totalPage = this.totalCount % this.pageSize == 0 ? this.totalCount / this.pageSize : parseInt(this.totalCount / this.pageSize) + 1;
    };

    // 生成分页html
    pages.prototype.reset = function(s) {
        var _this = this;
        var page = 0;
        var linkPage = '';
        var html = '';
        var tagName = '';

        for (var i = _this.inum; i >= 1; i--) {
          page = s - i;
          if (page < 1) {
            continue;
          }
          linkPage += '&nbsp;<a class="pages">' + page + '</a>&nbsp;';
        }

        linkPage += '&nbsp;<span class="pages active">' + s + '</span>&nbsp;';

        for (var i = 1; i <= _this.inum; i++) {
          page = s + i;
          if (page <= _this.totalPage) {
            linkPage += '&nbsp;<a class="pages">' + page + '</a>&nbsp;';
          } else {
            break;
          }
        }

        //html += '<span>共' + _this.totalCount + '条记录</span>&nbsp;';
        //html += '<span>第<span class="c_page">' + s + '</span>页/共<span class="tpage">' + _this.totalPage + '</span>页</span>&nbsp;';
        if (_this.currentPage !== 1) {
          tagName = 'a';
        } else {
          tagName = 'span';
        }

        html += '<' + tagName + ' class="first">' + _this.firstText + ' </' + tagName + '>&nbsp;';
        html += '<' + tagName + ' class="prev">' + _this.prevText + ' </' + tagName + '>&nbsp;';

        html += linkPage;

        if (_this.currentPage !== _this.totalPage) {
          tagName = 'a';
        } else {
          tagName = 'span';
        }

        html += '<' + tagName + ' class="next">' + _this.nextText + ' </' + tagName + '>&nbsp;';
        html += '<' + tagName + ' class="last">' + _this.lastText + ' </' + tagName + '>';

        //html += '<input type="text" class="page_number" maxlength=3 size=1 /><input type="button" class="goto_page" value="Go" />';

        //console.debug(_this.selecter);
        if (_this.totalCount <= _this.pageSize) {
          _this.selecter.html('');
        } else {
          _this.selecter.html(html);
        }

      }
      // 分页事件
    pages.prototype.event = function() {
      var _this = this;
      // 页码点击
      this.selecter.find('.pages').on('click', function() {
        var i = parseInt($(this).html(), 10);
        if (i === _this.currentPage) {
          return false;
        }
        // console.log(_this.currentPage);
        //$(this).addClass('active').siblings('.pages').removeClass('active');
        _this.currentPage = i;

        _this.init();

        _this.pageEvent(i);
      });

      // 上一页
      this.selecter.find('.prev').on('click', function() {
        if (_this.currentPage < 1) {
          return false;
        }
        _this.currentPage--;
        if (_this.currentPage < 1) {
          _this.currentPage = 1;
        }

        // console.log(_this.currentPage);

        _this.init();

        _this.pageEvent(_this.currentPage);
      });

      // 下一页
      this.selecter.find('.next').on('click', function() {
        if (_this.currentPage === _this.totalPage) {
          return false;
        }
        _this.currentPage++;
        if (_this.currentPage > _this.totalPage) {
          _this.currentPage = _this.totalPage;
        }

        // console.log(_this.currentPage);
        _this.init();

        _this.pageEvent(_this.currentPage);
      });

      // 首页
      this.selecter.find('.first').on('click', function() {
        if (_this.currentPage === 1) {
          return false;
        }

        _this.currentPage = 1;
        // console.log(_this.currentPage);

        _this.init();

        _this.pageEvent(_this.currentPage);
      })

      // 尾页
      this.selecter.find('.last').on('click', function() {
        if (_this.currentPage === _this.totalPage) {
          return false;
        }

        _this.currentPage = _this.totalPage;
        // console.log(_this.currentPage);

        _this.init();

        _this.pageEvent(_this.currentPage);
      });

    };

  }
}
