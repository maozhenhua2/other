var maskBox = {
	// 点击确定后执行函数的队列
	okFnArr: [],
	// 点击取消后执行函数的队列
	cancelFnArr: [],
	// 是否默认点击取消关闭对话框
	cancelClose: function(c) {
		var _this = this;
		_this.cancel_close = !!c;

		return _this;
	},
	// 是否默认点击确定关闭对话框
	okClose: function(c) {
		var _this = this;
		_this.ok_close = !!c;

		return _this;
	},
	// 获取对话框元素
	mask: $('.mask-box'),
	// 初始化对话框点击确定和取消事件
	init: function() {
		var _this = this;
		_this.maskEvent();
		_this.okEvent()
		_this.cancelEvent();

		return _this;
	},
	// 显示对话框
	show: function() {
		var _this = this;
		if (!_this.mask.hasClass('active')) {
			_this.mask.addClass('active');
		}

		return _this;
	},
	// 点击提示框旁边关闭提示框
	maskEvent: function() {
		var _this = this;
		$('.mask').on('click', function(e) {
			_this.close();
		});

		return _this;
	},
	//　确定按钮事件
	okEvent: function() {
		var _this = this;
		$('#ok').on('click', function() {
			if (typeof _this.ok_close === 'undefined') {
				_this.ok_close = false;
			}
			if (_this.ok_close) {
				_this.close();
			}
			if (_this.okFnArr.length) {
				_this.okFnArr.shift().call(_this);
			}
		});

		return _this;
	},
	// 取消按钮事件
	cancelEvent: function() {
		var _this = this;
		$('#cancel').on('click', function() {
			if (typeof _this.cancel_close === 'undefined') {
				_this.cancel_close = true;
			}
			if (_this.cancel_close) {
				_this.close();
			}
			if (_this.cancelFnArr.length) {
				_this.cancelFnArr.shift().call(_this);
			}
		});

		return _this;
	},
	// 确定按钮点击后执行的事件队列
	okFn: function(f) {
		var _this = this;
		if (f) {
			_this.okFnArr.push(f);
		}

		return _this;
	},
	// 取消按钮点击后执行的事件队列
	cancelFn: function(f) {
		var _this = this;
		if (f) {
			_this.cancelFnArr.push(f);
		}

		return _this;
	},
	// 设置对话框文字
	setText: function(t) {
		var _this = this;
		var span = _this.mask.find('.msg span');

		// span.addClass('hide');
		span.html(t);
		// setTimeout(function() {
		// 	span.removeClass('hide')
		// }, 200);

		return _this;
	},
	// 关闭对话框
	close: function() {
		var _this = this;
		_this.mask.removeClass('active');

		return _this;
	},
	// 设置确定按钮文字
	okText: function(t) {
		$('#ok').val(t || '确定');

		return _this;
	},
	// 设置取消按钮文字
	cancelText: function(t) {
		$('#cancel').val(t || '取消');

		return _this;
	}
}
