maskBox
	.init()

$('#show').on('click', function() {
	maskBox
		.setText('这是弹出框')
		.okFn(function() {
			this
				.setText('第一次确定')
		})
		.cancelFn(function(){
			this
				.setText('第一次取消')
		})
		.show()
		.okFn(function() {
			var _this = this;
			var i = 5;
			_this
				.setText('第二次确定，' + i + '秒后自动关闭');
			var t = setInterval(function(){
				i--;
				_this
				.setText('第二次确定，' + i + '秒后自动关闭');
				if(i <= 0){
					_this.close();
					clearInterval(t);
				}
			}, 1000);
			
		})
});
