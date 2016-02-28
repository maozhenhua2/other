function logBook(obj) {
	var __this = this;
	var _thisPrototype = logBook.prototype;
	var s = 0;

	__this.now;
	__this.active = 'd';
	__this.input = obj.input || '';
	__this.showToday = (obj.showToday !== undefined) ? obj.showToday : true;
	__this.dateFormat = obj.dateFormat || 'yyyy/mm/dd';
	__this.onchangefn = obj.onchangefn || function() {};
	__this.tableData = obj.data || [];
	__this.sourceData = obj.data || [];

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

			if (!$('.log-calendar.mc' + s).length) {

				// var left = $(_this.input)[0].offsetLeft || 0;
				// var top = $(_this.input)[0].offsetHeight || 0;
				_this.info = _this.getDateInfo(new Date());
				_this.now = _this.getDateInfo(new Date());
				var dTitle = _this.info.year + '年' + (_this.info.month + 1) + '月';
				var html = '';
				// 创建文档碎片
				var tmp = document.createDocumentFragment();
				// 创建div
				var div = document.createElement('div');
				// div.style.left = left + 'px';
				// div.style.top = top + 'px';
				div.className = 'log-calendar mc' + s;

				html += '<div class="serach-box">';
				html += '<label>搜索老师</label>';
				html += '<input type="text" name="" id="serach" class="serach">';
				html += '<input type="button" id="serachBtn" value="search">';
				html += '</div>';

				html += '<div class="date-box">';
				html += '<label>选择时间</label>';
				html += '<input type="text" name="" id="t1">';
				html += '</div>';

				html += '<h1><a class="prev">&lt;</a><a class="title title-d"><span>' + dTitle + '</span></a><a class="next">&gt;</a></h1>';

				html += '<table>';
				html += '<thead>';
				html += '<tr>';
				html += '<td class="thv">';
				html += '<div class="top">时间</div>';
			  html += '<div class="bottom">老师</div>';
			  html += '<div class="bg"></div>';
				html += '</td>';
				eachArr(0, 31, function(i) {
					html += '<td>' + (i + 1) + '</td>';
				});
				html += '</thead>';				
				html += '</tr>';
				html += '<tbody>';

				html += '</tbody>';
				html += '</table>';



				/*html += '<div class="th">';
				html += '<ul>';
				html += '<li class="thv">';
				// html += '<div>';
			  html += '<div class="top">时间</div>';
			  html += '<div class="bottom">老师</div>';
			  html += '<div class="bg"></div>';
			  // html += '</div>';
				html += '</li>';
				eachArr(0, 31, function(i) {
					html += '<li>' + (i + 1) + '</li>';
				});*/
				// html += '</ul>';
				// html += '</div>';

				// html += '<div class="tbody"></div>';

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

				$(_this.input).html(tmp);
				_this.calendarBox = $('.log-calendar.mc' + s);
				s++;
			} else {
				_this.show();
			}
			// var w = $(_this.input).width();
			// var l = $(_this.input).find('.th li').length;
			// console.log(w , l)
			// $('.log-calendar li').css({
			// 	'width': w / l + 'px'
			// })
			// $('.log-calendar li').width($(_this.input).width() / 32);
		};

		_thisPrototype.createTable = function() {
			var _this = this;
			var html = '';
			var isThisMonth = false;
			eachArr(0, _this.tableData.length, function(i) {
				html += '<tr>';
				html += '<td>' + _this.tableData[i].name + '</td>';
				var dateArr = {};
				var arr = _this.tableData[i].sh;
				eachArr(0, 31, function(k) {
					var t = '';
					var style = '';
					if (arr.length > 0) {
						eachArr(0, arr.length, function(j) {
							var o = arr[j];
							var date = o.time.split('-');
							dateArr.year = parseInt(date[0], 10);
							dateArr.month = parseInt(date[1], 10);
							dateArr.date = parseInt(date[2], 10);
							if (
								_this.info.year === dateArr.year &&
								_this.info.month === (dateArr.month - 1) &&
								(dateArr.date - 1) === k
							) {
								t = o.content;
								style = o.style;
							}

						});

						html += '<td class="' + style + '">' + t + '</td>';
					}
				});

				html += "</tr>";
			});

			$(_this.input).find('tbody').html(html);
		};

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

			if (now.year === _this.info.year && now.month === _this.info.month) {
				now_d = 'now';
			} else {
				now_d = '';
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

				html += '<li class="d ' + className + '" d="' + (i + 1) + '">' + (i + 1) + '</li>';
			}

			_this.setList(html);
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
				}

			});
		};

		// d
		_thisPrototype.changeOnD = function() {
			var _this = this;
			if (_this.info.month < 0) {
				_this.info.month = 11;
				_this.info.year--;
			} else if (_this.info.month > 11) {
				_this.info.month = 0;
				_this.info.year++;
			}
			_this.setTitle();
			_this.info = _this.getDateInfo(_this.info.year + '/' + (_this.info.month + 1) + '/' + _this.info.date);

			_this.createTable();

			if (_this.onchangefn) {
				_this.onchangefn();
			}
		};

		_thisPrototype.setTitle = function() {
			var _this = this;
			_this.calendarBox.find('h1').find('.title').children('span').html(_this.info.year + '年' + (_this.info.month + 1) + '月');
		};

		// 查找数据
		_thisPrototype.filter = function(v) {
			var _this = this;
			var arr = [];
			var i = 0;
			var l = _this.sourceData.length;
			var o;
			for (; i < l; i++) {
				o = _this.sourceData[i];
				if (o.name.indexOf(v) !== -1) {
					arr.push(i);
					continue;
				} else {
					var j = 0;
					var k = o.sh.length;
					for (; j < k; j++) {
						var b = o.sh[j];
						if (b.content.indexOf(v) !== -1) {
							arr.push(i);
							continue;
						}
					}
				}
			}
			return arr;
		};

		_thisPrototype.setTableData = function(arr) {
			var _this = this;
			var newArr = [];
			var i = 0;
			var l = _this.sourceData.length;
			for (; i < l; i++) {
				var j = 0;
				var k = arr.length;
				for (; j < k; j++) {
					if (i === arr[j]) {
						newArr.push(_this.sourceData[i]);
						arr.splice(j, 1);
						break;
					}
				}
			}
			_this.tableData = newArr;
		}

		// 运行
		_thisPrototype.run = function() {
			var _this = this;
			_this.initDom();
			_this.createTable();
			_this.prev();
			_this.next();
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

function eachArr(s, e, fn) {
	var i = s || 0;
	var l = e || 0;
	for (; i < l; i++) {
		if (fn) {
			fn(i);
		}
	}
}
