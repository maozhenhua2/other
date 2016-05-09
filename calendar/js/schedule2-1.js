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
  _setData: function (d) {
    this.data = d && d.length ? d : [];
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
    var html = '';
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
    var html = '';
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
      var td = parentsUntil(e.target, 'td');
      // 获取点击的td
      _this.td = td;
      // 已经选择了td
      if (td.nodeName.toLowerCase() === 'td' && hasClass(td, 'active')) {
        // 点击添加事件
        if (hasClass(e.target.parentNode, 'addLi') || hasClass(e.target, 'addLi')) {
          // 获取点击的是第几天
          var fday = _this.fday === 0 ? 6 : _this.fday;
          _this.currentDay = parseInt(_this.td.getAttribute('data-index'), 10) - fday;
          calendar1.createPopContent(_this.td.getAttribute('data-arrIndex'), 'add');
          popbox.show(_this.popId);
        }

        removeLi(e);

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
            ul.appendChild(_this._addLi());
            dayList.appendChild(ul);
          }

        }

        removeLi(e);

      }

      function removeLi(e) {
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
          _this.createPopContent(tdindex, 'edit', liIndex);
          popbox.show(_this.popId);
        }
      }


    });
  },
  // 返回日程数据
  getData: function () {
    return this.data;
  },
  // 生成弹窗内容
  createPopContent: function (index, type, index2) {
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
    var html = '';
    var ol = document.createElement('ol');
    ol.setAttribute('data-index', index);
    var li = document.createElement('li');
    li.setAttribute('data-index', index2);
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control inline-block';
    if (type === 'edit') {
      input.value = data[index2].txt;
    }
    li.appendChild(input);
    ol.appendChild(li);
    var div = document.createElement('div');
    html += '<div class="content-pannel">';
    html += '<button type="button" class="' + type + ' btn btn-default">确定</button>';
    if (type === 'edit') {
      html += '<button type="button" class="remove btn btn-default">删除</button>';
    }
    html += '<button type="button" class="cancel btn btn-default">取消</button>';
    html += '</div>';
    div.innerHTML = html;
    document.getElementById(this.contentId).innerHTML = '';
    document.getElementById(this.contentId).appendChild(ol);
    document.getElementById(this.contentId).appendChild(div);
  },
  // 弹窗后添加删除等事件
  contentEvent: function () {
    var _this = this;
    if (this.contentId) {
      document.getElementById(this.contentId).addEventListener('click', function (e) {
        var target = e.target;
        var td = _this.td;
        var index1 = document.querySelector(_this.popId).querySelector('ol').getAttribute('data-index');
        var index2 = document.querySelector(_this.popId).querySelector('li').getAttribute('data-index');

        if (hasClass(target, 'add')) {
          _this.contentData.data = _this.createContentData();
          if (_this.contentData.data.length === 0) {
            popbox.hide('#pop1');
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
            _this.data.push({
              ID: '',
              ImplementTime: new Date(_this.year + '-' + (_this.month + 1) + '-' + _this.currentDay),
              PerformState: _this.contentData.data
            });
          }
          popbox.hide('#pop1');
        } else if (hasClass(target, 'edit')) {
          _this.contentData.data = _this.createContentData();
          _this.data[index1]['PerformState'][index2].txt = _this.contentData.data[0].txt;
          popbox.hide('#pop1');
        } else if (hasClass(target, 'remove')) {
          _this.data[index1]['PerformState'].splice(index2, 1);
          popbox.hide('#pop1');
        } else if (hasClass(target, 'cancel')) {// 取消弹窗事件

          popbox.hide('#pop1');
        }

        if(!_this.data[_this.contentData.index]) {
          return;
        }
        var ul = document.createElement('ul');
        ul.appendChild(_this.createDaySchedule(_this.data[_this.contentData.index]['PerformState']));
        ul.appendChild(_this._addLi());
        td.setAttribute('data-arrIndex', _this.contentData.index);
        td.querySelector('.day-list').innerHTML = '';
        td.querySelector('.day-list').appendChild(ul);
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
    this.createPop();
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