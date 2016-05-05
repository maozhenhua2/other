// customSelect();

customSelect
	.run()
	// .setOnceFn(function() {
	// 	var _this = this;
	// 	setTimeout(function() {
	// 		console.log('once');
	// 		_this.show();
	// 	}, 1000);

// })
.setFn(function() {
		var _this = this;
		var h = _this.ul.html();
		h = h.replace(/(^\s*)|(\s*$)/g, "");
		if (h) {
			_this.show();
		} else {
			setTimeout(function() {
				h += '<li><span class=" input option">北京北京北京北京北京北京北京北京北京北京北京</span></li>';
				h += '<li><span class=" input option">上海</span></li>';
				h += '<li><span class=" input option">北京</span></li>';
				h += '<li><span class=" input option">上海</span></li>';
				h += '<li><span class=" input option">北京</span></li>';
				h += '<li><span class=" input option">上海</span></li>';
				h += '<li><span class=" input option">北京</span></li>';
				h += '<li><span class=" input option">上海</span></li>';
				h += '<li><span class=" input option">北京</span></li>';
				h += '<li><span class=" input option">上海</span></li>';
				_this.ul.html(h);
				console.log('always');
				_this.show();
			}, 500);
		}
	})
	.selectFn(function(t) {
		console.log('select: ' + t);
	})
