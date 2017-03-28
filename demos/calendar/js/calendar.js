function mCalendar(obj) {
	var __this = this;
	var _thisPrototype = mCalendar.prototype;
	var s = 0;

	__this.now;
	__this.active = 'd';
	__this.input = obj.input || '';
	__this.dateFormat = obj.dateFormat || 'yyyy/mm/dd';

	if (typeof _thisPrototype.getDateInfo != 'function') {

		// 返回指定日期的详细信息
		_thisPrototype.getDateInfo = function(s) {
			var d = new Date(s);
			return {
				year: d.getFullYear(),
				month: d.getMonth(),
				date: d.getDate(),
				days: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),
				fDay: new Date(d.getFullYear(), d.getMonth(), 1).getDay()
			}
		};

		// 获取所在时区，例如北京的时区为+8，但是s为-8，即本地时间 + s 即为utc时间，
		_thisPrototype.getTimeZone = function() {
			var _this = this;
			var s = 0;
			var timeZone = new Date().getTimezoneOffset();

			if (timeZone < 0) {
				s += timeZone / 60;
			} else if (timeZone == 0) {
				s = 0;
			} else {
				s += timeZone / 60;
			}
			return s;
		};

		// 初始化日历不变的元素
		_thisPrototype.initDom = function() {
			var _this = this;

			if (!$('.m-calendar.mc' + s).length) {

				var left = $(_this.input)[0].offsetLeft;
				var top = $(_this.input)[0].offsetHeight;
				_this.info = _this.getDateInfo(new Date());
				_this.now = _this.getDateInfo(new Date());
				var dTitle = _this.info.year + '年' + (_this.info.month + 1) + '月';
				var html = '';
				// 创建文档碎片
				var tmp = document.createDocumentFragment();
				// 创建div
				var div = document.createElement('div');
				div.style.left = left + 'px';
				div.style.top = top + 'px';
				div.className = 'm-calendar mc' + s;
				html += '<h1><a class="prev">&lt;</a><a class="title title-d"><span>' + dTitle + '</span></a><a class="next">&gt;</a></h1>';
				html += '<ul>';
				html += '<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>'
				html += '</ul>';
				html += '<ul class="c-list"></ul>'
				html += '<a class="today">今天</a>'
				div.innerHTML = html;
				tmp.appendChild(div);
				if (!document.getElementById('documentBtn')) {
					var documentBtn = document.createElement('div');
					documentBtn.id = 'documentBtn';
					tmp.appendChild(documentBtn);
				}

				$('body').append(tmp);
				_this.calendarBox = $('.m-calendar.mc' + s);
				// _this.header = $('.m-calendar.mc' + s + ' h1');
				// _this.ul = $('.m-calendar.mc' + s + ' .c-list');
				// _this.th = _this.ul.prev();
				s++;
			} else {
				_this.show();
			}
		};

		// 关闭其他
		_thisPrototype.allHide = function() {
			$('.m-calendar').hide();
		};

		// 显示
		_thisPrototype.show = function() {
			var _this = this;

			_this.allHide();
			if (_this.calendarBox.length) {
				_this.calendarBox.show();
				$('#documentBtn').css({
					visibility: 'visible'
				});
			}
		};

		// 隐藏
		_thisPrototype.hide = function() {
			var _this = this;
			if (_this.calendarBox.length) {
				_this.calendarBox.hide();
				$('#documentBtn').css({
					visibility: 'hidden'
				});
			}
		};

		// // 设置标题日期
		// _thisPrototype.setTitle = function(h) {
		// 	var _this = this;
		// 	_this.calendarBox.find('h1').html(h);
		// };

		// 
		_thisPrototype.setList = function(h) {
			var _this = this;
			_this.calendarBox.find('.c-list').html(h);
		};

		// 创建日期列表
		_thisPrototype.setDateList = function() {
			var _this = this;
			_this.active = 'd';
			var fday = _this.info.fDay;
			var days = _this.info.days;
			var month = _this.info.month;
			var className = '';
			var tmpClassName = '';
			var now_d = '';
			var html = '';
			var now = _this.now;

			// 判断后面要加多少空白
			if (fday !== 0) {
				var l = days + fday;
			} else if (fday === 0) {
				var l = days + fday + 7;
			}
			var tL = 42 - l;

			if (now.year === _this.info.year && now.month === _this.info.month) {
				now_d = 'now';
			} else {
				now_d = '';
			}

			// 补齐前面的空白
			var year = _this.info.year;
			var month = _this.info.month;
			if (month === 0) {
				year--;
				month = 12;
			} else if (month === 11) {
				year++;
				month = 1;
			}
			var prevMonth = year + '/' + (month) + '/1';
			var prevLast = _this.getDateInfo(prevMonth).days;
			if (fday !== 0) {
				for (var i = 0; i < fday; i++) {
					html += '<li class="d prev">' + (prevLast - fday + i + 1) + '</li>';
				}
			} else if (fday === 0) {
				for (var i = 0; i < 7; i++) {
					html += '<li class="d prev">' + (prevLast - fday + i + 1) + '</li>';
				}
			}
			// 循环输出日期
			for (var i = 0; i < days; i++) {

				if ((i + 1) == _this.now.date) {
					className = now_d;
				} else {
					className = '';
				}

				if ((i + 1) == _this.info.date) {
					className = className + ' selected';
				}

				// if ((i + 1) == _this.selected.date) {
				// 	if (_this.selected.year === _this.info.year && _this.selected.month === _this.info.month) {
				// 		className = className + ' selected';
				// 	}
				// }
				html += '<li class="d ' + className + '" d="' + (i + 1) + '">' + (i + 1) + '</li>';
			}
			// 补足后面的空白
			if (tL > 0) {
				for (var i = 0; i < tL; i++) {

					html += '<li class="d next">' + (i + 1) + '</li>';
				}
			}
			_this.setList(html);
		};

		// 创建月份列表
		_thisPrototype.setMonthList = function() {
			var _this = this;
			_this.active = 'm';
			var className = '';
			var now_m = '';
			var html = '';
			var now = _this.now;

			if (now.year === _this.info.year) {
				now_m = 'now';
			} else {
				now_m = '';
			}

			for (var i = 0; i < 12; i++) {
				if (i === now.month) {
					className = now_m;
				} else {
					className = '';
				}

				if (i === _this.info.month) {
					className = className + ' selected';
				}

				// if (i === _this.selected.month) {
				// 	if (_this.selected.year === _this.info.year) {
				// 		className = className + ' selected';
				// 	}
				// }
				html += '<li class="m ' + className + '" m="' + i + '">' + (i + 1) + '</li>';
			}
			_this.setList(html);
		};

		// 创建年份列表
		_thisPrototype.setYearList = function() {
			var _this = this;
			_this.active = 'y';
			var y = _this.info.year / 10;
			y = Math.floor(y) * 10;
			var html = '';
			var className = '';
			var now = _this.now;
			// html += '<li class="y"></li>';
			html += '<li class="y gray" y="' + (y - 1) + '">' + (y - 1) + '</li>';
			for (var i = y; i < y + 10; i++) {
				if (i === _this.now.year) {
					className = 'now';
				} else {
					className = '';
				}

				if (i === _this.info.year) {
					className = className + ' selected';
				}

				// if (i === _this.selected.year) {
				// 	className = className + ' selected';
				// }
				html += '<li class="y ' + className + '" y="' + i + '">' + i + '</li>';
			}
			// html += '<li class="y"></li>';
			html += '<li class="y gray" y="' + (y + 10) + '">' + (y + 10) + '</li>';

			_this.setList(html);
		};

		// 跳转到月份选择界面
		_thisPrototype.goMonthList = function() {
			var _this = this;
			_this.calendarBox.find('h1').on('click', '.title-d', function() {

				$(this).children('span').html(_this.info.year + '年');
				$(this).attr('class', 'title title-m');
				_this.calendarBox.find('.c-list').prev().hide();
				_this.setMonthList();
				_this.active = 'm';
			});

		};

		// 跳转到年份选择界面
		_thisPrototype.goYearList = function() {
			var _this = this;
			_this.calendarBox.find('h1').on('click', '.title-m', function() {
				var y = _this.info.year / 10;
				y = Math.floor(y) * 10;
				$(this).children('span').html(y + '-' + (y + 9));
				$(this).attr('class', 'title title-y');
				_this.calendarBox.find('.c-list').prev().hide();
				_this.setYearList();
			});

		};

		// 选择年份
		_thisPrototype.selectYear = function() {
			var _this = this;
			_this.calendarBox.find('.c-list').on('click', '.y', function(e) {
				var y = parseInt($(this).html());
				$(this).addClass('selected').siblings().removeClass('selected');
				_this.info.year = y - 0;
				_this.calendarBox.find('h1').find('.title').attr('class', 'title title-m').children('span').html(_this.info.year + '年');
				_this.calendarBox.find('.c-list').prev().hide();
				_this.setMonthList();
			});
		};

		// 选择月份
		_thisPrototype.selectMonth = function() {
			var _this = this;
			_this.calendarBox.find('.c-list').on('click', '.m', function(e) {
				var m = parseInt($(this).html());
				$(this).addClass('selected').siblings().removeClass('selected');
				_this.info.month = m - 1;
				_this.info = _this.getDateInfo(_this.info.year + '/' + (_this.info.month + 1) + '/' + _this.info.date);
				_this.calendarBox.find('h1').find('.title').attr('class', 'title title-d').children('span').html(_this.info.year + '年' + (_this.info.month + 1) + '月');
				_this.calendarBox.find('.c-list').prev().show();
				_this.setDateList();
			});
		};

		// 选择日期
		_thisPrototype.selectDate = function() {
			var _this = this;
			var year;
			var month;
			var date;
			_this.calendarBox.find('.c-list').on('click', '.d', function(e) {
				if ($(this).hasClass('prev')) {
					_this.info.date = parseInt($(this).html());

					if (_this.info.month === 0) {
						year = _this.info.year - 1;
						month = 12;
						// var v = (_this.info.year - 1) + '/12/' + _this.info.date;
					} else {
						year = _this.info.year;
						month = _this.info.month;
						// var v = _this.info.year + '/' + (_this.info.month) + '/' + _this.info.date;
					}

					date = _this.info.date;
					// $(_this.input).val(v);
					// return false;
				} else if ($(this).hasClass('next')) {
					_this.info.date = parseInt($(this).html());
					if (_this.info.month === 11) {
						year = _this.info.year + 1;
						month = 1;
						// var v = (_this.info.year + 1) + '/1/' + _this.info.date;
					} else {
						year = _this.info.year;
						month = _this.info.month + 2;
						// var v = _this.info.year + '/' + (_this.info.month + 2) + '/' + _this.info.date;
					}
					date = _this.info.date;

					// $(_this.input).val(v);
					// return false;
				} else if ($(_this.input).length) {
					$(this).addClass('selected').siblings().removeClass('selected');
					_this.info.date = parseInt($(this).html());
					year = _this.info.year;
					month = _this.info.month + 1;
					date = _this.info.date;
					// var v = _this.setDateFormat({
					// 	year: _this.info.year,
					// 	month: _this.info.month + 1,
					// 	date: _this.info.date
					// });

				}
				$(_this.input).val(_this.setDateFormat({
					year: year,
					month: month,
					date: date
				}));
				_this.hide();
			});
		};

		// today
		_thisPrototype.today = function() {
			var _this = this;
			_this.calendarBox.find('.today').on('click', function() {
				$(_this.input).val(_this.setDateFormat({
					year: _this.now.year,
					month: _this.now.month + 1,
					date: _this.now.date
				}));
				_this.hide();
			});
		};

		// prev
		_thisPrototype.prev = function() {
			var _this = this;
			_this.calendarBox.find('h1').on('click', '.prev', function() {

				switch (_this.active) {
					case 'd':
						_this.info.month--;
						_this.changeOnD();
						break;
					case 'm':
						_this.info.year--;
						_this.changeOnM();
					case 'y':
						_this.info.year = _this.info.year - 10;
						_this.changeOnY();
						break;
				}

			});
		};

		// next
		_thisPrototype.next = function() {
			var _this = this;
			_this.calendarBox.find('h1').on('click', '.next', function() {
				switch (_this.active) {
					case 'd':
						_this.info.month++;
						_this.changeOnD();
						break;
					case 'm':
						_this.info.year++;
						_this.changeOnM();
						break;
					case 'y':
						_this.info.year = _this.info.year + 10;
						_this.changeOnY();
						break;
				}

			});
		};

		// d
		_thisPrototype.changeOnD = function() {
			var _this = this;
			if (_this.info.month < 0) {
				_this.info.month = 0;
			} else if (_this.info.month > 11) {
				_this.info.month = 11;
			}
			_this.calendarBox.find('h1').find('.title').children('span').html(_this.info.year + '年' + (_this.info.month + 1) + '月');
			_this.info = _this.getDateInfo(_this.info.year + '/' + (_this.info.month + 1) + '/' + _this.info.date);
			_this.setDateList();
		};

		// m
		_thisPrototype.changeOnM = function() {
			var _this = this;
			_this.calendarBox.find('h1').find('.title').children('span').html(_this.info.year + '年');
			// _this.info = _this.getDateInfo(_this.info.year + '/' + (_this.info.month + 1) + '/' + _this.info.date);
			_this.setMonthList();
		};

		// y
		_thisPrototype.changeOnY = function() {
			var _this = this;
			var y = _this.info.year / 10;
			y = Math.floor(y) * 10;
			_this.calendarBox.find('h1').find('.title').children('span').html(y + '-' + (y + 9));
			// _this.info = _this.getDateInfo(_this.info.year + '/' + (_this.info.month + 1) + '/' + _this.info.date);
			_this.setYearList();
		};

		// 设置日期显示格式
		_thisPrototype.setDateFormat = function(o) {
			var _this = this;
			var t = _this.dateFormat;
			t = t.replace('yyyy', o.year);
			t = t.replace('mm', o.month);
			t = t.replace('dd', o.date);
			return t;
		};

		// 点击遮罩层隐藏日历
		_thisPrototype.otherHideEvent = function() {

			var _this = this;
			$('#documentBtn').on('click', function(e) {
				_this.allHide();
				$(this).css({
					visibility: 'hidden'
				});
			});
		};

		// 运行
		_thisPrototype.run = function() {
			var _this = this;
			_this.initDom()
			_this.setDateList()
			_this.goMonthList()
			_this.goYearList()
			_this.selectYear()
			_this.selectMonth()
			_this.selectDate()
			_this.today();
			_this.prev();
			_this.next();
			_this.otherHideEvent();
		}

	}
}
// 获取向上范围的指定父级元素
function parentsUntil(o, select) {
	var parent = o;
	var type = typeof select;
	var el;

	function setCondition(parent) {

		var obj;
		var condition;
		var arr = [];

		if (parent === document) {
			return false;
		}

		if (type === 'string') {
			if (select.indexOf('.') !== -1) {

				arr = select.split('.');
				arr.shift();

				var i = 0;
				var l = arr.length;
				if (parent && parent.className) {
					for (; i < l; i++) {
						if (parent.className.search(arr[i]) !== -1) {

							obj = parent;
							break;
						}
					}
				}

				// condition = arr.indexOf(parent.className) === -1;
			} else if (select.indexOf('#') !== -1) {
				arr = select.split('#');
				arr.shift();

				if (parent.id) {
					if (parent.id.search(arr[i]) !== -1) {

						obj = parent;
					}
				}
				// condition = arr.indexOf(parent.id) === -1;
			} else {
				if (parent.nodeName.toLowerCase() === select) {
					obj = parent;
				}

				// condition = parent.nodeName.toLowerCase() !== select;
			}

		} else if (type === 'object') {
			if (parent === select) {
				obj = select;
			}
			// condition = parent != select;
		}

		if (obj) {
			return false;
		} else {
			return true;
		}
	}

	while (setCondition(parent)) {
		if (parent.parentNode) {
			parent = parent.parentNode;
		} else {
			break;
		}

	}

	return parent;
}
