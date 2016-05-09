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
  /*
   * arr: _createTdArr所生成的数据
   * */
  _createTbody: function (arr) {
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
        today = arr[index].txt === this.nowDate.date && t1 ? 'c-today active' : '';
        id = arr[index].ID ? arr[index].ID : '';
        html += '<td class="' + today + '" data-index="' + index + '" data-id="' + id + '">';
        html += '<div>';
        if (today === 'c-today active') {
          html += '<span class="bg-default">今天' + (this.nowDate.month + 1) + '月' + this.nowDate.date + '日' + '</span>';
        } else {
          html += '<span>' + arr[index].txt + '</span>';
        }

        html += '<div class="day-list"></div>';
        html += '</div>';
        html += '</td>';
      }
      html += '</tr>';
    }
    return html;
  },
  _createHtml: function (id, h) {
    document.getElementById(id).innerHTML = h;
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
  _setData: function (d) {
    this.data = d && d.length ? d : [];
  },
  /*
   * d: 数据
   * callback: 有数据td上对应的回调函数
   * */
  createSchedule: function (d) {
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
  // 根据指定日期数据显示日程列表，不是弹窗
  createDaySchedule: function (d) {
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
  // 点击日期弹窗
  callbackFn: function () {
    var _this = this;
    document.getElementById(this.id).addEventListener('click', function (e) {
      e.stopPropagation();
      var td = parentsUntil(e.target, 'td');
      if (td.nodeName.toLowerCase() === 'td' && hasClass(td, 'active')) {
        _this.td = td;
        // if (callback && typeof callback === 'function') {
        var fday = _this.fday === 0 ? 6 : _this.fday;
        _this.currentDay = parseInt(_this.td.getAttribute('data-index'), 10) - fday;
        var index = _this.td.getAttribute('data-arrIndex');
        calendar1.createPopContent(index);
        popbox.show(_this.popId);
        // }
      } else if (td.nodeName.toLowerCase() === 'td') {

        var actives = td.parentNode.parentNode.querySelectorAll('.active');
        if (actives.length) {
          Array.prototype.map.call(actives, function (value, index, array) {
            removeClassName(value, 'active');
          });
        }

        addClassName(td, 'active');
      }
    });
  },
  // 返回日程数据
  getData: function () {
    return this.data;
  },
  // 生成弹窗内容
  createPopContent: function (index) {
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
        html += '<button type="button" class="remove btn btn-default"><span class="glyphicon glyphicon-minus"></span></button>';
        html += '</li>';
      }
    }

    html += '<li>';
    html += '<input type="text" name="" id="" class="form-control inline-block">';
    html += '<button type="button" class="add btn btn-default"><span class="glyphicon glyphicon-plus"></span></button>';
    html += '</li>';

    html += '</ol>';
    html += '<div class="content-pannel"><button type="button" class="ok btn btn-default">确定</button><button type="button" class="cancel btn btn-default">取消</button></div>';
    document.getElementById(this.contentId).innerHTML = html;
  },
  // 弹窗后添加删除等事件
  contentEvent: function () {
    var _this = this;
    var liIndex = 0;
    if (this.contentId) {
      document.getElementById(this.contentId).addEventListener('click', function (e) {
        var target = e.target;
        var liNode;
        if (hasClass(target, 'add') || hasClass(target.parentNode, 'add')) {// 添加行事件
          liNode = parentsUntil(target, 'li');
          liIndex = index(liNode, document.getElementById(_this.contentId).querySelectorAll('li'));
          var li = document.createElement('li');
          var html = '';
          html += '<input type="text" name="" id="" class="form-control inline-block">';
          html += '<button type="button" class="add btn btn-default"><span class="glyphicon glyphicon-plus"></span></button>';
          li.innerHTML = html;
          liNode.parentNode.appendChild(li);
          liNode.querySelector('button').className = 'remove btn btn-default';
          liNode.querySelector('button').innerHTML = '<span class="glyphicon glyphicon-minus"></span>';

        } else if (hasClass(target, 'remove') || hasClass(target.parentNode, 'remove')) {// 删除行事件
          liNode = parentsUntil(target, 'li');
          liIndex = index(liNode, document.getElementById(_this.contentId).querySelectorAll('li'));
          liNode.parentNode.removeChild(liNode);

        } else if (hasClass(target, 'cancel')) {// 取消弹窗事件

          popbox.hide('#pop1');
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

          if (_this.okFn && typeof _this.okFn === 'function') {
            _this.okFn();
          }

        }
      });
    }
  },
  // 获取弹窗所输入的内容
  createContentData: function () {
    var li = document.getElementById(this.contentId).querySelectorAll('li');
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
    // 弹窗
    popbox.init({
      maskhide: true,
      transition: true
    });

    this.data = [];
    var d = option.time || this.now();
    this.contentId = option.contentId;
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
    this.callbackFn();
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
    if (parent.nodeName.toLowerCase() === 'html') {
      return false;
    }
    if (type === 'string') {
      if (select.indexOf('.') !== -1) {
        arr = select.split('.');
        arr.shift();
        condition = arr.indexOf(parent.className) === -1;
      } else if (select.indexOf('#') !== -1) {
        arr = select.split('#');
        arr.shift();
        condition = arr.indexOf(parent.id) === -1;
      } else {
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

if (typeof Array.prototype.map != "function") {
  Array.prototype.map = function (fn, context) {
    var arr = [];
    if (typeof fn === "function") {
      for (var k = 0, length = this.length; k < length; k++) {
        arr.push(fn.call(context, this[k], k, this));
      }
    }
    return arr;
  };
}