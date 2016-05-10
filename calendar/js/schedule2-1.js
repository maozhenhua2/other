var calendar1 = {
  now: function () {
    return new Date();
  },
  // 获取年份
  getYear: function (d) {
    return d.getFullYear();
  },
  // 获取月份，索引从0开始，即1月是0
  getMonth: function (d) {
    return d.getMonth();
  },
  // 获取今天是几号
  getDate: function (d) {
    return d.getDate()
  },
  // 获取指定日期的天数
  getDays: function (d) {
    return d.getDate();
  },
  // 这个月的1号是星期几，索引是0开始，0为周日，1为周一，以此类推
  getFDay: function (d) {
    return d.getDay();
  },
  // 今天
  today: function (d) {
    var _this = this;
    var y = _this.getYear(d);
    var m = _this.getMonth(d);
    return {
      year: _this.getYear(d),
      month: _this.getMonth(d),
      date: _this.getDate(d),
      days: _this.getDays(new Date(y, m + 1, 0)),
      fday: _this.getFDay(new Date(y, m, 0))
    };
  },
  // 新建事件按钮
  _addLi: function () {
    var li = document.createElement('li');
    li.className = 'addLi';
    var span = document.createElement('span');
    span.innerHTML = '新建事件······';
    li.appendChild(span);
    return li;
  },
  /*
   * days: 每个月天数
   * fday: 每个月的第一天是星期几
   * */
  // 生成每个月的表格内容数组
  _createTdArr: function (days, fday) {
    var d = 1;
    var arr = [];
    var i = 0;
    var l = 42;
    // 上个月天数
    var pdays = this.getDays(new Date(this.year, this.month, 0));
    // 下个月天数
    var ndays = 1;
    for (; i < l; i++) {

      if (i < fday) {
        arr.push({
          txt: pdays - 6,
          prev: true
        });
      } else if (fday === 0 && i < 7) {
        arr.push({
          txt: pdays - 6,
          prev: true
        });
      } else if (d <= days) {
        arr.push({
          txt: d
        });
        d++;
      } else {
        arr.push({
          txt: ndays,
          next: true
        });
        ndays++;
      }
      pdays++;
    }
    return arr;
  },
  /*
   * arr: _createTdArr所生成的数据
   * 生成日历表格，不含任何数据
   * */
  _createTbody: function (arr) {
    var i = 0;
    var j = 0;
    var l = arr.length / 7;
    var k = 7;
    var t1 = false;
    var index = 0;
    var id = '';
    if (this.year === this.nowDate.year && this.month === this.nowDate.month) {
      t1 = true;
    }
    var oFragment = document.createDocumentFragment();

    for (; i < l; i++) {
      var tr = document.createElement('tr');
      for (j = 0; j < k; j++) {
        index = (i * 7) + j;
        var today = '';
        today = arr[index].txt === this.nowDate.date && t1 ? 'c-today active' : '';
        id = arr[index].ID ? arr[index].ID : '';

        var td = document.createElement('td');
        td.className = today;
        td.setAttribute('data-index', index);
        td.setAttribute('data-id', id);

        var div = document.createElement('div');
        var span = document.createElement('span');
        var div2 = document.createElement('div');
        div2.className = 'day-list';
        if (today === 'c-today active') {
          span.className = 'bg-default';
          span.innerHTML = '今天' + (this.nowDate.month + 1) + '月' + this.nowDate.date + '日';
          div2.appendChild(this._addLi());
        } else {
          span.innerHTML = arr[index].txt;
          div2.className = 'day-list';
        }
        // 上个月
        if (arr[index].prev) {
          span.className += 'prev';
        } else if (arr[index].next) {
          // 下个月
          span.className += 'next';
        }
        div.appendChild(span);
        div.appendChild(div2);
        td.appendChild(div);
        tr.appendChild(td);
      }
      oFragment.appendChild(tr);
    }
    return oFragment;
  },
  _createHtml: function (id, h) {
    document.getElementById(id).innerHTML = '';
    document.getElementById(id).appendChild(h);
  },
  /*
   * y: 年份
   * m: 月份
   * */
  change: function (y, m) {
    this.year = y;
    this.month = m;
    this.days = this.getDays(new Date(this.year, this.month + 1, 0));
    this.fday = this.getFDay(new Date(this.year, this.month, 1));
    this.arr = this._createTdArr(this.days, this.fday);
    this.h = this._createTbody(this.arr);
    this._createHtml(this.id, this.h);
    return this;
  },
  // 设置日程数据
  _setData: function (d) {
    this.data = d && d.length ? d : [];
  },
  // 返回日程数据
  getData: function () {
    return this.data;
  },
  /*
   * d: 数据
   * callback: 有数据td上对应的回调函数
   * 在表格的基础上添加对应日期上的数据列表
   * */
  createSchedule: function (d) {
    var obj = document.getElementById(this.id);
    this._setData(d);
    var i = 0;
    var arr = this.data;
    var l = arr.length;
    var dayIndex = 0;
    var td = '';
    var dataIndex = 0;
    var fday = this.fday === 0 ? 6 : this.fday;
    for (; i < l; i++) {
      dayIndex = new Date(arr[i]['ImplementTime']).getDate();
      dataIndex = dayIndex + fday;
      td = obj.querySelector('[data-index="' + dataIndex + '"]');
      td.setAttribute('data-id', arr[i]['ID']);
      td.setAttribute('data-arrIndex', i);
      var ul = document.createElement('ul');
      ul.appendChild(this.createDaySchedule(arr[i]['PerformState']));
      if (hasClass(td, 'active')) {
        ul.appendChild(this._addLi());
      }
      td.querySelector('.day-list').innerHTML = '';
      td.querySelector('.day-list').appendChild(ul);
    }

    return this;
  },
  // 根据指定日期数据显示日程列表，不是弹窗
  createDaySchedule: function (d) {
    var i = 0;
    var l = d.length;
    var oFragment = document.createDocumentFragment();
    for (; i < l; i++) {
      var li = document.createElement('li');
      li.title = d[i].txt;
      var span = document.createElement('span');
      span.innerHTML = d[i].txt;
      li.appendChild(span);
      oFragment.appendChild(li);
    }
    return oFragment;
  },
  // 点击日期弹窗
  createPop: function () {
    var _this = this;
    document.getElementById(this.id).addEventListener('click', function (e) {
      var selected = document.querySelector('.selected');
      if (selected) {
        removeClassName(selected, 'selected');
      }

      var td = parentsUntil(e.target, 'td');
      // 获取点击的td
      _this.td = td;
      // 已经选择了td
      if (td.nodeName.toLowerCase() === 'td' && hasClass(td, 'active')) {
        // 点击添加事件
        if (hasClass(e.target.parentNode, 'addLi') || hasClass(e.target, 'addLi')) {
          // 获取点击的是第几天
          // var fday = _this.fday === 0 ? 6 : _this.fday;
          // _this.currentDay = parseInt(_this.td.getAttribute('data-index'), 10) - fday;
          // console.log(_this.td.childNodes[0].childNodes[0].innerHTML)
          var span = _this.td.childNodes[0].childNodes[0];
          _this.currentDay = parseInt(span.innerHTML, 10);
          calendar1.createPopContent(_this.td.getAttribute('data-arrIndex'), 'add', span.className);

          var p;
          if (e.target.nodeName.toLowerCase() === 'li') {
            p = e.target;
          } else if (e.target.parentNode.nodeName.toLowerCase() === 'li') {
            p = e.target.parentNode;
          }

          addClassName(p, 'selected');
          _this.popShow(td);
        }

        _this.editLi.call(_this, td, e);

      } else if (td.nodeName.toLowerCase() === 'td') {
        // 还没选择td

        var addLi;
        var actives = td.parentNode.parentNode.querySelectorAll('.active');
        if (actives.length) {
          var i = 0;
          var l = actives.length;
          for (; i < l; i++) {
            removeClassName(actives[i], 'active');
            addLi = actives[i].querySelector('.addLi');
            // 有新建事件按钮
            if (addLi) {
              var k = actives[i].querySelectorAll('li').length;
              // 如果只有新建事件按钮
              if (k === 1) {
                actives[i].querySelector('.day-list').innerHTML = '';
              } else {// 如果已经有日程列表
                actives[i].querySelector('ul').removeChild(addLi);
              }
            }
          }
        }

        addClassName(td, 'active');

        _this.popHide();

        var dayList = td.querySelector('.day-list');
        addLi = dayList.querySelector('.addLi');

        if (dayList.innerHTML) {
          // 如果已经日程列表
          if (!addLi) {
            dayList.childNodes[0].appendChild(_this._addLi());
          }
        } else {
          // 当前td内容为空，并且没有新建事件按钮
          if (!addLi) {
            var ul = document.createElement('ul');
            if (dayList.previousElementSibling.innerHTML !== '') {
              ul.appendChild(_this._addLi());
            }
            dayList.appendChild(ul);
          }
        }
        _this.editLi.call(_this, td, e);
      }
    });
  },
  // 点击已存在的数据，弹出编辑
  editLi: function (td, e) {
    if (e.target.title || e.target.parentNode.title) {
      var liIndex;
      var p;
      if (e.target.nodeName.toLowerCase() === 'li') {
        p = e.target;
      } else if (e.target.parentNode.nodeName.toLowerCase() === 'li') {
        p = e.target.parentNode;
      }
      liIndex = index(p, p.parentNode.childNodes);
      addClassName(p, 'selected');

      var tdindex = td.getAttribute('data-arrindex');
      this.createPopContent(tdindex, 'edit', liIndex);
      this.popShow(td);
    }
  },
  // 生成弹窗内容
  createPopContent: function (index, type, index2) {
    var data;
    if (!this.data[index]) {
      data = [];
    } else {
      data = this.data[index]['PerformState'];
    }

    var types;
    var index3;

    if (typeof index2 === 'string') {
      types = index2;
    } else if (typeof index2 === 'number') {
      index3 = index2;
    }


    this.contentData = {
      data: data,
      index: index,
      type: types
    };
    var html = '';
    var ol = document.createElement('ol');
    ol.setAttribute('data-index', index);
    var li = document.createElement('li');
    li.setAttribute('data-index', index3);
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control inline-block';
    if (type === 'edit') {
      input.value = data[index3].txt;
    }
    li.appendChild(input);
    ol.appendChild(li);
    var div = document.createElement('div');
    html += '<div class="content-pannel">';
    if (type === 'edit') {
      html += '<button type="button" class="remove btn-danger float-left btn">删除</button>';
    }
    html += '<button type="button" class="cancel btn btn-default float-right">取消</button>';
    html += '<button type="button" class="' + type + ' btn btn-primary float-right">确定</button>';
    html += '</div>';
    div.innerHTML = html;
    document.getElementById(this.popId).innerHTML = '';
    document.getElementById(this.popId).appendChild(ol);
    document.getElementById(this.popId).appendChild(div);
  },
  // 弹窗后添加删除等事件
  contentEvent: function () {
    var _this = this;
    var popId = document.getElementById(this.popId);
    if (this.popId) {
      popId.addEventListener('click', function (e) {
        var target = e.target;
        var td = _this.td;
        var index1 = popId.querySelector('ol').getAttribute('data-index');
        var index2 = popId.querySelector('li').getAttribute('data-index');

        // 添加
        if (hasClass(target, 'add')) {
          _this.contentData.data = _this.createContentData();
          if (_this.contentData.data.length === 0) {
            _this.popHide();
            return false;
          }

          if (_this.contentData.index === null) {
            _this.contentData.index = _this.data.length;
          }

          if (_this.data[_this.contentData.index]) {
            _this.contentData.data.map(function (v, i, all) {
              _this.data[_this.contentData.index]['PerformState'].push(v);
            });
          } else {
            var m = _this.month + 1;

            if (_this.contentData.type === 'prev') {
              m = m - 1;
            } else if (_this.contentData.type === 'next') {
              m = m + 1;
            }

            _this.data.push({
              ID: '',
              // ImplementTime: new Date(_this.year + '-' + m + '-' + _this.currentDay),
              ImplementTime: _this.year + '/' + m + '/' + _this.currentDay + ' 0:00:00',
              PerformState: _this.contentData.data
            });
          }
          createHtml();
          _this.popHide();
          console.log(_this.data);
          //  编辑
        } else if (hasClass(target, 'edit')) {
          _this.contentData.data = _this.createContentData();
          _this.data[index1]['PerformState'][index2].txt = _this.contentData.data[0].txt;
          createHtml();
          _this.popHide();
          console.log(_this.data);
          //  删除
        } else if (hasClass(target, 'remove')) {
          _this.data[index1]['PerformState'].splice(index2, 1);
          createHtml();
          _this.popHide();
          console.log(_this.data);
          //  取消
        } else if (hasClass(target, 'cancel')) {// 取消弹窗事件
          _this.popHide();
        }


        function createHtml() {
          if (!_this.data[_this.contentData.index]) {
            return;
          }
          var ul = document.createElement('ul');
          ul.appendChild(_this.createDaySchedule(_this.data[_this.contentData.index]['PerformState']));
          ul.appendChild(_this._addLi());
          td.setAttribute('data-arrIndex', _this.contentData.index);
          td.querySelector('.day-list').innerHTML = '';
          td.querySelector('.day-list').appendChild(ul);
        }
      });
    }
  },
  // 获取弹窗所输入的内容
  createContentData: function () {
    var li = document.getElementById(this.popId).querySelectorAll('li');
    var i = 0;
    var l = li.length;
    var arr = [];
    var v = '';
    for (; i < l; i++) {
      v = trim(li[i].querySelector('input').value);
      if (v) {
        arr.push({
          txt: v
        });
      }
    }
    return arr;
  },
  // 显示弹框
  popShow: function (o) {
    var po = getElementPosition(o);
    var y = index(o);
    var box = document.getElementById(this.popId);
    var size = getObjSize(o);
    if (y >= 5) {
      box.style.left = po.left - 260 + 'px';
    } else {
      box.style.left = po.left + size.w + 'px';
    }

    box.style.top = po.top + 'px';
    box.style.minHeight = size.h + 'px';
    addClassName(box, 'active');
  },
  // 隐藏弹框
  popHide: function () {
    var box = document.getElementById(this.popId);
    removeClassName(box, 'active');
    this.hideAddLi();
  },
  hideAddLi: function () {
    var addLi = document.querySelector('.addLi.selected');
    if (addLi) {
      removeClassName(addLi, 'selected');
    }
  },
  /*
   * option:
   * id: 表格tbody的id
   // * className：数据中每个状态所对应的class
   * time：指定日期,至少要有年月，格式为new Date()所支持的格式
   * month: 指定月份,必须与year同时存在;不能与time同时存在
   * year: 指定年份,必须与month同时存在;不能与time同时存在
   * popId: 弹窗id
   * */
  init: function (option) {

    this.data = [];
    var d = option.time || this.now();
    this.nowDate = this.today(d);
    var m = option.month;
    m = m ? m - 1 : this.getMonth(d);
    this.month = m;
    this.id = option.id;
    this.popId = option.popId;
    this.year = option.year || this.getYear(d);
    this.okFn = option.okFn;
    this.date = this.getDate(d);
    this.days = this.getDays(new Date(this.year, this.month + 1, 0));
    this.fday = this.getFDay(new Date(this.year, this.month, 1));
    this.arr = this._createTdArr(this.days, this.fday);
    this.h = this._createTbody(this.arr);
    this._createHtml(this.id, this.h);
    this.createPop();
    this.contentEvent();
    return this;
  }

};
