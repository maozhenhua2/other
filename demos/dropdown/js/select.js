var customSelect = {
	// beforeArr: [],
	run: function() {
		var _this = this;
		_this.btnEvent();
		_this.otherHideEvent();
		_this.selectEvent();

		return _this;
	},
	// 点击按钮事件
	btnEvent: function() {
		var _this = this;
		$('.select .btn, .select .txt').on('click', function() {
			// 获取对应的下拉列表
			_this.ul = $(this).parent().children('ul');
			// console.log(_this.ul)
			// _this.ul.beforeArr = [];
			// 判断是否下拉框要在上方显示
			_this.isUp = $(this).parent().hasClass('up');
			// 获取下拉框的高度
			var h = _this.ul.outerHeight(true);
			// 获取下拉框的宽度
			_this.w = $(this).parent().outerWidth();
			// 获取下拉框的最大高度
			var maxH = parseInt(_this.ul.css('max-height'), 10);
			// 判断下拉框的高度是否大于其最大高度140
			_this.top = h < maxH ? h : maxH;

			_this.setTop();
			_this.setStyle();
			_this.showList();

		});
	},
	// 展开列表运行的事件
	setFn: function(f) {
		var _this = this;
		if (f) {
			_this.fn = f;
		}

		return _this;
	},
	// // 只有第一次展开列表时才运行的事件
	// setOnceFn: function(f) {
	// 	var _this = this;
	// 	if (f && _this.ul) {
	// 		_this.ul.beforeArr.push(f);
	// 	}

	// 	return _this;
	// },
	// 点击选项后运行的事件
	selectFn: function(f) {
		var _this = this;
		if (f) {
			_this.afterSelectFn = f;
		}

		return _this;
	},
	// 根据 .up class 来设置列表显示的位置
	setTop: function() {
		var _this = this;
		if (_this.isUp) {
			_this.top = -_this.top;
		} else {
			_this.top = 30;
		}
	},
	// 设置列表的出现的位置和宽度
	setStyle: function() {
		var _this = this;
		_this.ul.css({
			width: _this.w + 'px',
			top: _this.top + 'px'
		});
	},
	// 显示列表并运行所设置的事件
	showList: function() {
		var _this = this;
		var style = _this.ul.css('display');
		_this.allHide();
		if (style === 'none') {
			/*if (_this.ul.beforeArr.length) {
				_this.ul.beforeArr.shift().call(_this);
			} else */if (_this.fn) {
				_this.fn.call(_this);
			} else {
				_this.show();
			}

		} else {
			_this.hide();

		}
	},
	// 显示列表
	show: function() {
		var _this = this;
		if (_this.ul.length) {
			_this.ul.show();
		}
	},
	// 隐藏列表
	hide: function() {
		var _this = this;
		if (_this.ul.length) {
			_this.ul.hide();
		}
	},
	// 隐藏所有打开的列表
	allHide: function() {
		$('.select ul').hide();
	},
	// 点击页面其他地方隐藏打开的列表
	otherHideEvent: function() {
		var _this = this;
		// 点击页面其他地方隐藏下拉框
		$(document).on('click', function(e) {
			e.stopPropagation();
			var select_btn = document.querySelectorAll('.select .btn');
			var option = document.querySelectorAll('.select .option');
			var txt = document.querySelectorAll('.select .txt');
			var tri = document.querySelectorAll('.select .tri');
			var i = select_btn.length;
			var select = document.querySelectorAll('.select');

			for (; i > 0; i--) {
				if (
					e.target === tri[i - 1] ||
					e.target === select_btn[i - 1] ||
					e.target === option[i - 1] ||
					e.target === txt[i - 1]
				) {
					return false;
				}
			}
			_this.allHide();
		});
	},
	// 选择列表中的选项事件
	selectEvent: function() {
		var _this = this;
		// 选择选项
		$('.select').on('click', '.option', function() {
			_this.txt = $(this).html();
			$(this).addClass('active').parent().siblings().children().removeClass('active').end()
				.parentsUntil('.select').parent().children('.txt').html(_this.txt).next('ul').hide();

			if (_this.afterSelectFn) {
				_this.afterSelectFn(_this.txt);
			}
		});
	}
};
