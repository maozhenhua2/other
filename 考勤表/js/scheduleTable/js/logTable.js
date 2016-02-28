function logTable(obj) {
	var __this = this;
	var _thisPrototype = logTable.prototype;
	var s = 0;

	__this.now = undefined;
	__this.active = 'd';
	__this.input = obj.input || '';
	__this.onchangefn = obj.onchangefn || function () {
		};
	__this.tableData = obj.data || [];
	__this.sourceData = obj.data || [];

	if (typeof _thisPrototype.getDateInfo != 'function') {

		// 返回指定日期的详细信息
		_thisPrototype.getDateInfo = function (s) {
			var d = new Date(s);
			return {
				year: d.getFullYear(),
				month: d.getMonth(),
				date: d.getDate(),
				days: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),
				fDay: new Date(d.getFullYear(), d.getMonth(), 1).getDay()
			}
		};

		// 初始化日历不变的元素
		_thisPrototype.initDom = function () {
			var _this = this;

			if (!document.querySelectorAll('.log-calendar.mc' + s).length) {

				_this.info = _this.getDateInfo(new Date());
				_this.now = _this.getDateInfo(new Date());
				var dTitle = _this.info.year + '年' + (_this.info.month + 1) + '月';
				var html = '';
				// 创建文档碎片
				var tmp = document.createDocumentFragment();
				// 创建div
				var div = document.createElement('div');
				div.className = 'log-calendar mc' + s;

				html += '<div class="header-caption">';
				html += '<div class="serach-box">';
				html += '<label>搜索项目</label>';
				html += '<input type="text" name="" id="serach" class="serach form-control" placeholder="请输入关键字">';
				html += '<a id="serachBtn" class="search-btn glyphicon glyphicon-search"></a>';
				html += '</div>';

				html += '<div class="date-box">';
				html += '<label>时间选择</label>';
				html += '<input type="text" name="" id="t1" class="form-control" placeholder="请选择时间">';
				html += '</div>';

				html += '<h1><a class="prev">&lt;</a><a class="title title-d"><span>' + dTitle + '</span></a><a class="next">&gt;</a></h1>';
				html += '</div>';

				// 表格
				html += '<table>';
				html += '<thead>';
				html += '<tr>';
				html += '<td>';
				html += '</td>';
				eachArr(0, 31, function (i) {
					html += '<td>' + (i + 1) + '</td>';
				});
				html += '</tr>';
				html += '</thead>';
				html += '<tbody>';

				html += '</tbody>';
				html += '</table>';
				html += '<div class="legend"></div>';
				html += '<div class="info"></div>';

				div.innerHTML = html;
				tmp.appendChild(div);
				if (!document.getElementById('documentBtn')) {
					var documentBtn = document.createElement('div');
					documentBtn.id = 'documentBtn';
					tmp.appendChild(documentBtn);
				}

				$(_this.input).html(tmp);
				_this.calendarBox = document.querySelector('.log-calendar.mc' + s);
				//_this.calendarBox = $('.log-calendar.mc' + s);
				s++;
			}
		};

		// 获取图例数据
		_thisPrototype.getLegend = function () {
			var _this = this;
			var arr = [];
			var style = [];
			var legend = [];
			var i = 0;
			var l = _this.tableData.length;
			var o;
			var j = 0;
			var k = 0;
			var html = '';
			for (; i < l; i++) {
				o = _this.tableData[i].sh;
				j = 0;
				k = o.length;
				for (; j < k; j++) {
					if (arr.indexOf($.trim(o[j].content)) === -1) {
						arr.push(o[j].content);
						style.push('class' + arr.indexOf(o[j].content));
						_this.tableData[i].sh[j].style = 'class' + arr.indexOf(o[j].content);
					} else {
						_this.tableData[i].sh[j].style = 'class' + arr.indexOf(o[j].content);
					}

				}
			}

			i = 0;
			l = arr.length;
			for (; i < l; i++) {
				legend.push({
					content: arr[i],
					classs: style[i]
				});
			}

			_this.legendData = legend;
		};

		// 生成图例
		_thisPrototype.createLegend = function () {
			var _this = this;
			var i = 0;
			var arr = _this.legendData;
			var l = arr.length;
			var html = '';
			html += '<div class="legend">';
			html += '<ul>';
			for (; i < l; i++) {
				html += '<li><span class="' + arr[i].classs + '"></span><span>' + arr[i].content + '</span></li>';
			}
			html += '</ul>';
			html += '</div>';

			document.querySelector(_this.input).querySelector('.legend').innerHTML = html;
		};

		// 生成表格
		_thisPrototype.createTable = function () {
			var _this = this;
			var html = '';
			var isThisMonth = false;
			eachArr(0, _this.tableData.length, function (i) {
				html += '<tr>';
				html += '<td class="name">' + _this.tableData[i].name + '</td>';
				var dateArr = {};
				var arr = _this.tableData[i].sh;
				eachArr(0, 31, function (k) {
					var t = '';
					var style = '';
					if (arr.length > 0) {
						eachArr(0, arr.length, function (j) {
							var o = arr[j];
							if (!!o.time.start && !!o.time.end) {
								var start = o.time.start.split('-');
								var end = o.time.end.split('-');
								var s = parseInt(start[2]);
								var e = parseInt(end[2]);
								var year = parseInt(start[0]);
								var month = parseInt(start[1]) - 1;
								var date = s;
								for (; s <= e; s++) {
									if (
										_this.info.year === year &&
										_this.info.month === month &&
										s - 1 === k
									) {
										t = o.content;
										style = o.style;
									}
								}
							} else if (Array.isArray(o.time)) {
								var i = 0;
								var l = o.time.length;
								for (; i < l; i++) {
									setData(o.time[i]);
								}
							} else {
								setData(o.time);
							}

							function setData(obj) {
								var date = obj.split('-');
								var dateArr = {};
								dateArr.year = parseInt(date[0], 10);
								dateArr.month = parseInt(date[1], 10) - 1;
								dateArr.date = parseInt(date[2], 10);
								if (
									_this.info.year === dateArr.year &&
									_this.info.month === dateArr.month &&
									(dateArr.date - 1) === k
								) {
									t = o.content;
									style = o.style;
								}
							}

						});

						html += '<td class="' + style + '">' + t + '</td>';
					}
				});

				html += "</tr>";
			});

			//document.querySelector(_this.input).querySelector('tbody').innerHTML = html;
			$(_this.input).find('tbody').html(html);
		};

		// 
		_thisPrototype.setList = function (h) {
			var _this = this;
			_this.calendarBox.querySelector('.c-list').innerHTML = h;
			//_this.calendarBox.find('.c-list').html(h);
		};

		// 创建日期列表
		_thisPrototype.setDateList = function () {
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
		_thisPrototype.prev = function () {
			var _this = this;

			$(_this.calendarBox).find('h1').on('click', '.prev', function () {
				switch (_this.active) {
					case 'd':
						_this.info.month--;
						_this.changeOnD();
						break;
				}

			});
		};

		// next
		_thisPrototype.next = function () {
			var _this = this;
			$(_this.calendarBox).find('h1').on('click', '.next', function () {
				switch (_this.active) {
					case 'd':
						_this.info.month++;
						_this.changeOnD();
						break;
				}

			});
		};

		// d
		_thisPrototype.changeOnD = function () {
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

			_this.onchangefn();
		};

		_thisPrototype.setTitle = function () {
			var _this = this;
			var year = _this.info.year;
			var month = String(_this.info.month + 1).length === 2 ? _this.info.month + 1 : '0' + (_this.info.month + 1);
			_this.calendarBox.querySelector('h1 .title span').innerHTML = year + '年' + month + '月';
		};

		// 查找数据
		_thisPrototype.filter = function (v) {
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

		// 根据查找获得的索引重新生成当前页的数据
		_thisPrototype.setTableData = function (arr) {
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

			if (_this.tableData.length) {
				_this.getLegend();
				_this.createTable();
				_this.createLegend();
				_this.setInfo('');
				_this.tableShow();
			} else {
				_this.setInfo('没有找到数据！');
				_this.tableHide();
			}

		};

		// 设置提示信息
		_thisPrototype.setInfo = function (t) {
			var _this = this;
			$(_this.input).find('.info').html(t);
		};

		// 隐藏表格和图例
		_thisPrototype.tableHide = function () {
			var _this = this;
			$(_this.input).find('table').hide();
			$(_this.input).find('.legend').hide();
		};

		// 显示表格和图例
		_thisPrototype.tableShow = function () {
			var _this = this;
			$(_this.input).find('table').show();
			$(_this.input).find('.legend').show();
		};

		// 初始化
		_thisPrototype.reset = function (arr) {
			var _this = this;
			if (arr && arr.length) {
				_this.tableData = arr;
				_this.sourceData = arr;
			} else {
				_this.resetTableData();
			}

			_this.getLegend();
			_this.createTable();
			_this.setTitle();
			_this.createLegend();

			_this.setInfo('');
			_this.tableShow();
		};

		// 设置日期数据
		_thisPrototype.setInfoData = function (obj) {
			var _this = this;
			_this.info.year = obj.year ? parseInt(obj.year, 10) : _this.now.year;
			_this.info.month = obj.month ? parseInt(obj.month - 1, 10) : _this.now.month;
			_this.info.date = obj.date ? parseInt(obj.date, 10) : _this.now.date;
		};

		// 初始化数据
		_thisPrototype.resetTableData = function () {
			var _this = this;
			_this.tableData = _this.sourceData;
		};

		// 运行
		_thisPrototype.run = function () {
			var _this = this;
			_this.getLegend();
			_this.initDom();
			_this.createTable();
			_this.createLegend();
			_this.prev();
			_this.next();
		}

	}
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

if (!Array.isArray) {
	Array.isArray = function (arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (item) {
		var result = -1,
			a_item = undefined;
		if (this.length == 0) {
			return result;
		}
		for (var i = 0, len = this.length; i < len; i++) {
			a_item = this[i];
			if (a_item === item) {
				result = i;
				break;
			}
		}
		return result;
	}
}
