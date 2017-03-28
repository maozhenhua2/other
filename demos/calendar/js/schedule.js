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
        html += arr[index].txt;
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
    var className = '';
    var dataIndex = 0;
    var fday = this.fday === 0 ? 6 : this.fday;
    for (; i < l; i++) {
      dayIndex = new Date(arr[i]['ImplementTime']).getDate();
      dataIndex = dayIndex + fday;
      td = obj.querySelector('[data-index="' + dataIndex + '"]');
      className = this.className[arr[i]['PerformState']];
      if (callback && typeof callback === 'function') {
        callback(td, arr[i]['ID']);
      }

      html = '';
      html += '<span class="' + className + '">';
      html += dataIndex - fday;
      html += '</span>';
      // console.dir(td, dataIndex, html)
      td.innerHTML = html;
    }
    return this;
  },
  getData: function () {
    return this.arr;
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

    return this;
  }

};