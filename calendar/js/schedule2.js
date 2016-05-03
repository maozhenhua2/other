var calendar1 = {
  now: function () {
    return new Date();
  },
  getYear: function (d) { // 获取年份
    return d.getFullYear();
  },
  getMonth: function (d) { // 获取月份，索引从0开始，即1月是0
    return d.getMonth();
  },
  getDate: function (d) { // 获取今天是几号
    return d.getDate()
  },
  getDays: function (d) { // 获取指定日期的天数
    return d.getDate();
  },
  getFDay: function (d) { // 这个月的1号是星期几，索引是0开始，0为周日，1为周一，以此类推
    return d.getDay();
  },
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
  _createTdArr: function (days, fday) {
    /*
     * days: 每个月天数
     * fday: 每个月的第一天是星期几
     * */
    // 生成每个月的表格内容数组
    var d = 1;
    var arr = [];
    var i = 0;
    var l = 42;
    for (; i < l; i++) {
      if (i < fday) {
        arr.push({
          txt: ''
        });
      } else if (fday === 0 && i < 7) {
        arr.push({
          txt: ''
        });
      } else if (d <= days) {
        arr.push({
          txt: d
        });
        d++;
      } else {
        arr.push({
          txt: ''
        });
      }
    }
    return arr;
  },
  _createTbody: function (arr) {
    /*
     * arr: _createTdArr所生成的数据
     * */
    var i = 0;
    var j = 0;
    var l = arr.length / 7;
    var k = 7;
    var html = '';
    var t1 = false;
    var index = 0;
    var id = '';
    if (this.year === this.nowDate.year && this.month === this.nowDate.month) {
      t1 = true;
    }
    for (; i < l; i++) {
      html += '<tr>';
      for (j = 0; j < k; j++) {
        index = (i * 7) + j;
        var today = '';
        today = arr[index].txt === this.nowDate.date && t1 ? 'c-today' : '';
        id = arr[index].ID ? arr[index].ID : '';
        html += '<td class="' + today + '" data-index="' + index + '" data-id="' + id + '">';
        if (today === 'c-today') {
          html += '<span class="bg-primary">今天' + (this.nowDate.month + 1) + '月' + this.nowDate.date + '日' + '</span>';
        } else {
          html += '<span>' + arr[index].txt + '</span>';
        }

        html += '<div class="day-list"></div>';
        html += '</td>';
      }
      html += '</tr>';
    }
    return html;
  },
  _createHtml: function (id, h) {
    document.getElementById(id).innerHTML = h;
  },
  change: function (y, m) {
    /*
     * y: 年份
     * m: 月份
     * */
    this.year = y;
    this.month = m;
    this.days = this.getDays(new Date(this.year, this.month + 1, 0));
    this.fday = this.getFDay(new Date(this.year, this.month, 1));
    this.arr = this._createTdArr(this.days, this.fday);
    this.h = this._createTbody(this.arr);
    this._createHtml(this.id, this.h);
    return this;
  },
  _setData: function (d) {
    this.data = d && d.length ? d : [];
  },
  createSchedule: function (d, callback) {
    /*
     * d: 数据
     * callback: 有数据td上对应的回调函数
     * */
    var obj = document.getElementById(this.id);
    this._setData(d);
    var i = 0;
    var arr = this.data;
    var l = arr.length;
    var dayIndex = 0;
    var td = '';
    var html = '';
    var dataIndex = 0;
    var fday = this.fday === 0 ? 6 : this.fday;

    for (; i < l; i++) {
      dayIndex = new Date(arr[i]['ImplementTime']).getDate();
      dataIndex = dayIndex + fday;
      td = obj.querySelector('[data-index="' + dataIndex + '"]');
      td.setAttribute('data-id', arr[i]['ID']);
      td.setAttribute('data-arrIndex', i);
      // console.log(arr[i])
      html = this.createDaySchedule(arr[i]['PerformState']);

      td.querySelector('.day-list').innerHTML = html;

    }
    return this;
  },
  createDaySchedule: function (d) {
    // 根据指定日期数据显示日程列表
    var html = '';
    var i = 0;
    var l = d.length;
    html += '<ul>';
    for (; i < l; i++) {
      html += '<li><span>' + d[i].txt + '</span></li>';
    }
    html += '</ul>';
    return html;
  },
  callbackFn: function (callback) {
    // 点击日期框事件
    var _this = this;
    document.getElementById(this.id).addEventListener('click', function (e) {
      e.stopPropagation();
      var p = parentsUntil(e.target, 'td');
      var parent;
      if (e.target.nodeName.toUpperCase() === 'TD') {
        parent = e.target;
      } else if (p.nodeName.toUpperCase() === 'TD') {
        parent = p;
      }
      // addClassName(parent, 'active');
      _this.td = parent;
      if (callback && typeof callback === 'function') {
        var fday = _this.fday === 0 ? 6 : _this.fday;
        _this.currentDay = parseInt(parent.getAttribute('data-index'), 10) - fday;
        callback(parent);
      }
    });
  },
  getData: function () {
    return this.data;
  },
  createPopContent: function (index) {
    // 生成弹窗内容
    var data;
    if (!this.data[index]) {
      data = [];
    } else {
      data = this.data[index]['PerformState'];
    }

    this.contentData = {
      data: data,
      index: index
    };
    var i = 0;
    var l = data.length;
    var html = '';
    html += '<ol data-index="' + index + '">';
    if (l >= 1) {
      for (; i < l; i++) {
        html += '<li>';
        html += '<input type="text" class="form-control inline-block" name="" id="" value="' + data[i].txt + '">';
        html += '<button type="button" class="remove btn btn-primary">-</button>';
        html += '</li>';
      }
    }

    html += '<li>';
    html += '<input type="text" name="" id="" class="form-control inline-block">';
    html += '<button type="button" class="add btn btn-primary">+</button>';
    html += '</li>';

    html += '</ol>';
    html += '<div class="content-pannel"><button type="button" class="ok btn btn-primary">确定</button><button type="button" class="cancel btn btn-primary">取消</button></div>';
    document.getElementById(this.contentId).innerHTML = html;
  },
  contentEvent: function () {
    // 弹窗后添加删除等事件
    var _this = this;
    var liIndex = 0;
    if (this.contentId) {
      document.getElementById(this.contentId).addEventListener('click', function (e) {
        var target = e.target;

        if (hasClass(target, 'add')) {// 添加行事件
          liIndex = index(target.parentNode, document.getElementById(_this.contentId).querySelectorAll('li'));
          var li = document.createElement('li');
          var html = '';
          html += '<input type="text" name="" id="" class="form-control inline-block">';
          html += '<button type="button" class="add btn btn-primary">+</button>';
          li.innerHTML = html;
          _this.addContentLi(target, li);
          target.className = 'remove btn btn-primary';
          target.innerHTML = '-';

        } else if (hasClass(target, 'remove')) {// 删除行事件
          liIndex = index(target.parentNode, document.getElementById(_this.contentId).querySelectorAll('li'));
          _this.removeContentLi(target);
        } else if (hasClass(target, 'cancel')) {// 取消弹窗事件
          popbox.hide('#pop1');
          // removeClassName(_this.td, 'active');
        } else if (hasClass(target, 'ok')) {// 确定事件
          var td = _this.td;
          if (!_this.contentData.index) {
            _this.contentData.index = _this.data.length;
          }

          _this.contentData.data = _this.createContentData();

          if (_this.contentData.data.length === 0) {
            popbox.hide('#pop1');
            return false;
          }
          if (!_this.data[_this.contentData.index]) {
              _this.data.push({
                ID: '',
                ImplementTime: new Date(_this.year + '-' + (_this.month + 1) + '-' + _this.currentDay),
                PerformState: _this.contentData.data
              });
          } else {
            _this.data[_this.contentData.index]['PerformState'] = _this.contentData.data;

          }
          td.setAttribute('data-arrIndex', _this.contentData.index);
          td.querySelector('.day-list').innerHTML = _this.createDaySchedule(_this.contentData.data);
          popbox.hide('#pop1');
          // removeClassName(_this.td, 'active');
        }
      });
    }
  },
  addContentLi: function (o, li) {
    // 添加行
    o.parentNode.parentNode.appendChild(li);
  },
  removeContentLi: function (o) {
    // 删除行
    o.parentNode.parentNode.removeChild(o.parentNode);
  },
  createContentData: function () {
    // 获取弹窗所输入的内容
    var li = document.getElementById(this.contentId).querySelectorAll('li');
    var i = 0;
    var l = li.length;
    var arr = [];
    var v = '';
    for (;i < l;i++) {
      v = trim(li[i].querySelector('input').value);
      if (v) {
        arr.push({
          txt: v
        });
      }
    }
    return arr;
  },
  init: function (option) {
    /*
     * option:
     * id: 表格tbody的id
     * className：数据中每个状态所对应的class
     * time：指定日期,至少要有年月，格式为new Date()所支持的格式
     * month: 指定月份,必须与year同时存在;不能与time同时存在
     * year: 指定年份,必须与month同时存在;不能与time同时存在
     * */
    this.className = option.className || [{
        REJECT: 'plan plan-reject',
        PASS: 'plan plan-complete',
        SCHEDULED: 'plan'
      }];
    var d = option.time || this.now();
    this.contentId = option.contentId;
    this.nowDate = this.today(d);
    this.data = [];
    var m = option.month;
    m = m ? m - 1 : this.getMonth(d);
    this.id = option.id;
    this.year = option.year || this.getYear(d);
    this.month = m;
    this.date = this.getDate(d);
    this.days = this.getDays(new Date(this.year, this.month + 1, 0));
    this.fday = this.getFDay(new Date(this.year, this.month, 1));
    this.arr = this._createTdArr(this.days, this.fday);
    this.h = this._createTbody(this.arr);
    this._createHtml(this.id, this.h);
    this.callbackFn(option.callback);
    this.contentEvent();
    return this;
  }

};


// 获取向上范围的指定父级元素
function parentsUntil(o, select) {
  var parent = o;
  var type = typeof select;

  function setCondition(parent) {
    var condition;
    var arr = [];
    if (type === 'string') {
      if (select.indexOf('.') !== -1) {
        // console.log('class');
        arr = select.split('.');
        arr.shift();
        condition = arr.indexOf(parent.className) === -1;
      } else if (select.indexOf('#') !== -1) {
        // console.log('id');
        arr = select.split('#');
        arr.shift();
        condition = arr.indexOf(parent.id) === -1;
      } else {
        // console.log('tag');
        condition = parent.nodeName.toLowerCase() !== select;
      }

    } else if (type === 'object') {
      condition = parent != select;
    }

    return condition;
  }

  while (setCondition(parent)) {
    parent = parent.parentNode;
  }

  return parent;
}

// 获取索引
function index(current, obj) {
  for (var i = 0, length = obj.length; i < length; i++) {
    if (obj[i] == current) {
      return i;
    }
  }
}

// 将节点插入到某节点前
function prependChild(parent, newChild) {
  if (parent.firstChild) {
    // 如果存在一个子节点就在这个子节点之前插入
    parent.insertBefore(newChild, parent.firstChild);
  } else {
    // 如果没有就直接添加
    parent.appendChild(newChild);
  }
  // 返回父元素实现方法连缀
  return parent;
}

// 判断是否含有指定class
function hasClass(element, className) {
  var re = new RegExp('\\b' + className + '\\b', 'i');
  return element.className.match(re);
}

// 去除文字两边空白
function trim(string) {
  return string.replace(/^\s+|\s+$/g, "");
}

// 添加类
function addClassName(element, className) {
  element.className += (element.className ? " " : "") + className;
  return true;
}

// 删除类
function removeClassName(element, className) {
  var classes = getClassNames(element),
    length = classes.length,
    i = length - 1;
  for (; i >= 0; i--) {
    if (classes[i] === className) {
      // delete(classes[i]);
      classes.splice(i, 1);
    }
  }
  element.className = classes.join(" ");
  return length === classes.length;
}

// 获取元素节点的class
function getClassNames(element) {
  return element.className.replace(/\s+/, " ").split(" ");
}