function mCalendar(obj) {
	var __this = this;
	var _thisPrototype = mCalendar.prototype;
	var s = 0;

	__this.now;
	__this.active = 'd';
	__this.input = obj.input || '';
	__this.showToday = (obj.showToday !== undefined) ? obj.showToday : true;
	__this.startView = (obj.startView !== undefined) ? obj.startView : 'date';
	__this.dateFormat = obj.dateFormat || 'yyyy/mm/dd';
	__this.selectedFn = obj.selectedFn || function() {};
	__this.showTime = (obj.showTime !== undefined) ? obj.showTime : true;
	__this.everyTime = undefined;
	__this.index = 0;

	if (typeof _thisPrototype.getDateInfo != 'function') {

		// 返回指定日期的详细信息
		_thisPrototype.getDateInfo = function(s) {
			var d = new Date(s);
			return {
				year: d.getFullYear(),
				month: d.getMonth(),
				date: d.getDate(),
				days: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),
				fDay: new Date(d.getFullYear(), d.getMonth(), 1).getDay(),
				hour: d.getHours(),
				minute: d.getMinutes(),
				second: d.getSeconds()
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

				_this.info = _this.getDateInfo(new Date());
				_this.now = _this.getDateInfo(new Date());

				var dTitle = _this.info.year + '年' + (_this.info.month + 1) + '月';
				var html = '';
				// 创建文档碎片
				var tmp = document.createDocumentFragment();
				// 创建div
				var div = document.createElement('div');

				div.className = 'm-calendar mc' + s;
				html += '<h1><a class="prev">&lt;</a><a class="title title-d"><span>' + dTitle + '</span></a><a class="next">&gt;</a></h1>';
				html += '<ul>';
				html += '<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>'
				html += '</ul>';
				html += '<ul class="c-list"></ul>';

				if (_this.showTime && _this.startView === 'date') {
					html += '<div class="times">';
					html += '<div class="time-box hour">';
					html += '<input type="text" class="time-text" value="' + _this.info.hour + '" /><input class="time-btn add" type="button" value="+" /><input  class="time-btn minus" type="button" value="-" />'
					html += '</div>';

					html += '<div class="time-box minute">';
					html += '<input type="text" class="time-text" value="' + _this.info.minute + '" /><input class="time-btn add" type="button" value="+" /><input  class="time-btn minus" type="button" value="-" />'
					html += '</div>';

					html += '<div class="time-box second">';
					html += '<input type="text" class="time-text" value="' + _this.info.second + '" /><input class="time-btn add" type="button" value="+" /><input  class="time-btn minus" type="button" value="-" />'
					html += '</div>';
					html += '</div>';
				}

				if (_this.showToday) {
					html += '<a class="today">今天</a>';
				}

				div.innerHTML = html;
				tmp.appendChild(div);
				if (!document.getElementById('documentBtn')) {
					var documentBtn = document.createElement('div');
					documentBtn.id = 'documentBtn';
					tmp.appendChild(documentBtn);
				}

				$('body').append(tmp);

				// console.log(s);

				_this.index = s;

				_this.calendarBox = $('.m-calendar.mc' + s);
				// _this.header = $('.m-calendar.mc' + s + ' h1');
				// _this.ul = $('.m-calendar.mc' + s + ' .c-list');
				// _this.th = _this.ul.prev();
				s++;
			} else {
				_this.show();
			}
		};

		_thisPrototype.setPos = function() {
			var _this = this;
			// 设置日历的位置
			var div = document.querySelector('.m-calendar.mc' + _this.index);
			var input = document.querySelector(_this.input);
			var left = getElementPosition(input).left || 0;
			var top = getElementPosition(input).top || 0;
			var w = parseInt(getCompleteStyle(input, 'width')[1], 10);
			var h = parseInt(getCompleteStyle(input, 'height')[1], 10);

			var divWidth = parseInt(getCompleteStyle(div, 'width')[1], 10);
			var winWidth = window.screen.availWidth;
			var marginRight = parseInt(getCompleteStyle(input.parentNode, 'margin-right')[1], 10);
			var paddingLeft = parseInt(getCompleteStyle(input.parentNode, 'padding-right')[1], 10);
			left = left - marginRight - paddingLeft;
			// console.log(documentVisibleSize())

			if (left + divWidth > winWidth) {
				left = left - (divWidth - w);
			}

			div.style.left = left + 'px';
			div.style.top = top + h + 'px';
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
				// if (_this.showTime) {
				// _this.getTime();
				// _this.timeEvent();
				// }

				_this.calendarBox.show();
				_this.setPos();

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
				// if (_this.showTime) {
				// _this.removeTime();
				// }

				$('#documentBtn').css({
					visibility: 'hidden'
				});
			}
		};

		// 输出日期列表
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

		// 显示时间
		_thisPrototype.getTime = function() {
			var _this = this;
			var hour = _this.calendarBox[0].querySelector('.hour .time-text');
			var minute = _this.calendarBox[0].querySelector('.minute .time-text');
			var second = _this.calendarBox[0].querySelector('.second .time-text');

			// _this.everyTime = setInterval(function() {
			var d = new Date();
			// var h = new Date().getHours();
			// var m = new Date().getMinutes();
			// var s = new Date().getSeconds();
			_this.info.hour = d.getHours();
			_this.info.minute = d.getMinutes();
			_this.info.second = d.getSeconds();

			hour.value = (_this.info.hour + '').length == 2 ? _this.info.hour : '0' + _this.info.hour;
			minute.value = (_this.info.minute + '').length == 2 ? _this.info.minute : '0' + _this.info.minute;
			second.value = (_this.info.second + '').length == 2 ? _this.info.second : '0' + _this.info.second;
			// }, 1000);

		};

		_thisPrototype.timeEvent = function() {
			var _this = this;
			// var hour = _this.calendarBox[0].querySelector('.hour');
			// var minute = _this.calendarBox[0].querySelector('.minute');
			// var second = _this.calendarBox[0].querySelector('.second');

			// var hourAdd = hour.querySelector('.add');
			// var hourMinus = hour.querySelector('.minus');
			// hour
			_this.calendarBox.find('.hour .add').off('click').on('click', function() {
				var v = parseInt(addEvents(this, 23), 10);
				_this.info.hour = v;
			});

			_this.calendarBox.find('.hour .minus').off('click').on('click', function() {
				var v = parseInt(minusEvents(this), 10);
				_this.info.hour = v;
			});

			// minutes
			_this.calendarBox.find('.minute .add').off('click').on('click', function() {
				var v = parseInt(addEvents(this, 59), 10);
				_this.info.minute = v;
			});

			_this.calendarBox.find('.minute .minus').off('click').on('click', function() {
				var v = parseInt(minusEvents(this), 10);
				_this.info.minute = v;
			});

			// second
			_this.calendarBox.find('.second .add').off('click').on('click', function() {
				var v = parseInt(addEvents(this, 59), 10);
				_this.info.second = v;
			});

			_this.calendarBox.find('.second .minus').off('click').on('click', function() {
				var v = parseInt(minusEvents(this), 10);
				_this.info.second = v;
			});

			function addEvents(o, t) {
				var v = parseInt($(o).parent().children('.time-text').val(), 10);
				v++;
				if (v > t) {
					v = t;
				}
				v = (v + '').length === 2 ? v : '0' + v;
				$(o).parent().children('.time-text').val(v);
				return v;
			}

			function minusEvents(o) {
				var v = parseInt($(o).parent().children('.time-text').val(), 10);
				v--;
				if (v < 0) {
					v = 0;
				}
				v = (v + '').length === 2 ? v : '0' + v;
				$(o).parent().children('.time-text').val(v);
				return v;
			}

		};

		_thisPrototype.removeTime = function() {
			var _this = this;
			// clearInterval(_this.everyTime);
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

		// 设置标题
		_thisPrototype.setTitle = function(obj) {
			var _this = this;
			var title = _this.calendarBox.find('h1 .title');
			if (obj.class) {
				title.attr('class', obj.class);
			}

			if (obj.html) {
				title.children('span').html(obj.html);
			}
		};

		// 设置日显示时的标题
		_thisPrototype.setDateTitle = function() {
			var _this = this;
			_this.setTitle({
				html: _this.info.year + '年' + (_this.info.month + 1) + '月',
				class: 'title title-d'
			});
		};

		// 设置月份显示时的标题
		_thisPrototype.setMonthTitle = function() {
			var _this = this;
			_this.setTitle({
				html: _this.info.year + '年',
				class: 'title title-m'
			});
		};

		// 设置年份显示时的标题
		_thisPrototype.setYearTitle = function() {
			var _this = this;
			var y = _this.info.year / 10;
			y = Math.floor(y) * 10;
			_this.setTitle({
				html: y + '-' + (y + 9),
				class: 'title title-y'
			});
		};

		// 隐藏日期标题
		_thisPrototype.dateThHide = function() {
			var _this = this;
			_this.calendarBox.find('.c-list').prev().hide();
		};

		// 显示日期标题
		_thisPrototype.dateThShow = function() {
			var _this = this;
			_this.calendarBox.find('.c-list').prev().show();
		};

		// 跳转到月份选择界面
		_thisPrototype.goMonthList = function() {
			var _this = this;
			_this.calendarBox.find('h1').on('click', '.title-d', function() {

				// _this.setTitle({
				// 	html: _this.info.year + '年',
				// 	class: 'title title-m'
				// });
				_this.setMonthTitle();
				_this.dateThHide();
				// $(this).children('span').html(_this.info.year + '年');
				// $(this).attr('class', 'title title-m');
				// _this.calendarBox.find('.c-list').prev().hide();
				_this.setMonthList();
				_this.active = 'm';
			});

		};

		// 跳转到年份选择界面
		_thisPrototype.goYearList = function() {
			var _this = this;
			_this.calendarBox.find('h1').on('click', '.title-m', function() {
				// var y = _this.info.year / 10;
				// y = Math.floor(y) * 10;
				// _this.setTitle({
				// 	html: y + '-' + (y + 9),
				// 	class: 'title title-y'
				// });

				// $(this).children('span').html(y + '-' + (y + 9));
				// $(this).attr('class', 'title title-y');
				// _this.calendarBox.find('.c-list').prev().hide();
				_this.setYearTitle();
				_this.dateThHide();
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
				// _this.calendarBox.find('h1').find('.title').attr('class', 'title title-m').children('span').html(_this.info.year + '年');
				// _this.calendarBox.find('.c-list').prev().hide();
				// _this.setTitle({
				// 	html: _this.info.year + '年',
				// 	class: 'title title-m'
				// });
				if (_this.startView !== 'year') {
					_this.setMonthTitle();
					_this.dateThHide();
					_this.setMonthList();
				} else {
					$(_this.input).val(_this.setDateFormat({
						year: _this.info.year
					}));
					_this.selectedFn();
					_this.hide();
				}

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
				// _this.calendarBox.find('h1').find('.title').attr('class', 'title title-d').children('span').html(_this.info.year + '年' + (_this.info.month + 1) + '月');
				// _this.calendarBox.find('.c-list').prev().show();
				// _this.setTitle({
				// 	html: _this.info.year + '年' + (_this.info.month + 1) + '月',
				// 	class: 'title title-d'
				// });
				if (_this.startView !== 'month') {
					_this.setDateTitle();
					_this.dateThShow();
					_this.setDateList();
					if (_this.showTime) {
						_this.getTime();
						_this.timeEvent();
					}
				} else {
					$(_this.input).val(_this.setDateFormat({
						year: _this.info.year,
						month: _this.info.month + 1
					}));
					_this.selectedFn();
					_this.hide();
				}

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

				var o = {
					year: year,
					month: month,
					date: date,
					hour: _this.info.hour,
					minute: _this.info.minute,
					second: _this.info.second
				};

				$(_this.input).val(_this.setDateFormat(o));
				_this.selectedFn();
				_this.hide();
			});
		};

		// today
		_thisPrototype.today = function() {
			var _this = this;
			_this.calendarBox.find('.today').on('click', function() {
				var o = {
					year: _this.now.year,
					month: _this.now.month + 1,
					date: _this.now.date
				};
				$(_this.input).val(_this.setDateFormat(o));
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
			var h = '';
			if (o.year) {
				t = t.replace('yyyy', o.year);
			}
			if (o.month) {
				h = (o.month + '').length === 2 ? o.month : '0' + o.month;
				t = t.replace('mm', h);
			}
			if (o.date) {
				h = (o.date + '').length === 2 ? o.date : '0' + o.date;
				t = t.replace('dd', h);
			}
			if (o.hour) {
				h = (o.hour + '').length === 2 ? o.hour : '0' + o.hour;
				t = t.replace('hh', h);
			}
			if (o.minute) {
				h = (o.minute + '').length === 2 ? o.minute : '0' + o.minute;
				t = t.replace('nn', h);
			}
			if (o.second) {
				h = (o.second + '').length === 2 ? o.second : '0' + o.second;
				t = t.replace('ss', h);
			}

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
			_this.initDom();
			if (_this.startView === 'date') {
				_this.dateThShow();
				_this.setDateTitle();
				_this.setDateList();

				if (_this.showTime) {
					_this.getTime();
					_this.timeEvent();
				}
			}

			if (_this.startView === 'month') {
				_this.dateThHide();
				_this.setMonthTitle();
				_this.setMonthList();
			}

			if (_this.startView === 'year') {
				_this.dateThHide();
				_this.setYearTitle();
				_this.setYearList();
			}

			_this.goMonthList();
			_this.goYearList();
			_this.selectYear();
			_this.selectMonth();
			_this.selectDate();
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

function getCompleteStyle() {
	var objs, PseudoClass, cssName, cssArr = [];

	function getObj(obj) {
		if (obj !== null) {
			if (obj.nodeType === 1 && typeof obj === "object" && obj !== null) {
				return obj;
			} else {
				return false;
			}
		}
	}

	function getPseudoClass(obj) {
		if (obj === null || obj[0] === ":" && typeof obj === "string") {
			return obj;
		} else {
			return false;
		}
	}

	function getCssName(obj) {
		if (typeof obj === "string") {
			return obj;
		} else {
			return false;
		}
	}

	function getArguments(obj) {
		if (getObj(obj)) {
			objs = obj;
		} else if (getPseudoClass(obj)) {
			PseudoClass = obj;
		} else if (getCssName(obj)) {
			cssName = obj;
		} else {
			return false;
		}
	}
	switch (arguments.length) {
		case 0:
			return;
			break;

		case 1:
			if (getObj(arguments[0])) {
				objs = getObj(arguments[0]);
			} else {
				return;
			}
			break;

		case 2:
			for (var i = arguments.length - 1; i >= 0; i--) {
				getArguments(arguments[i]);
			}
			break;

		case 3:
			for (var i = arguments.length - 1; i >= 0; i--) {
				getArguments(arguments[i]);
			}
			break;
	}
	var PseudoClass = PseudoClass || null;
	var cssArr = [];
	if (window.getComputedStyle) {
		cssArr[0] = window.getComputedStyle(objs, PseudoClass);
		if (cssName && typeof cssName === "string") {
			cssArr[1] = cssArr[0].getPropertyValue(cssName);
		}
	} else if (objs.currentStyle) {
		cssArr[0] = objs.currentStyle;
		if (cssName && typeof cssName === "string") {
			cssArr[1] = cssArr[0].getAttribute(cssName);
		}
	}
	return cssArr;
}

// 获取网页元素的绝对位置
function getElementPosition(element) {
	var position = {
		left: element.offsetLeft,
		top: element.offsetTop
	};
	var current = element.offsetParent;
	while (current !== null) {
		position = {
			left: position.left + current.offsetLeft,
			top: position.top + current.offsetTop
		};
		current = current.offsetParent;
	}
	return position;
}
// 网页可视面积，不含滚动条
function documentVisibleSize() {
	if (document.compatMode === "BackCompat") {
		return {
			width: document.body.clientWidth,
			height: document.body.clientHeight
		};
	} else {
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		};
	}
}
