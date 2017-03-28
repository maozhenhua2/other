var o = {
	min: 6,
	max: 20,
	minTxt: '密码太短',
	maxTxt: '密码太长'
};

$('#password').on('input', function() {
	var v = $(this).val();
	var s = checkStrength(v, o);
	$('.bg')[0].className = 'bg ' + 's' + s;
	if(s < 2){
		$('.bg')[0].innerHTML = '弱';
		// console.log('弱');
	} else if( s >= 4){
		$('.bg')[0].innerHTML = '强';
		// console.log('强');
	} else {
		$('.bg')[0].innerHTML = '中';
		// console.log('中');
	}
});

// document.getElementById('password').addEventListener('input', function(){
// 	v = this.value;
// 	console.log(v);
// });

function checkStrength(v, o) {
	var t = '';
	var r = 0;
	var a = 'abcdefghijklmnopqrstuvwxyz';
	if (v.length < o.min) {
		t = o.minTxt || 1;

	} else if (v.length > o.max) {
		t = o.maxTxt || 1;

	} else {

		if (v.match(/[a-z]/g)) {
			r++;
		}
		if (v.match(/[A-Z]/g)) {
			r++;
		}
		if (v.match(/[0-9]/g)) {
			r++;
		}
		if (v.match(/([-_\.])/g)) {
			r++;
		}
		if (v.match(/[^\w\+\{\}\[\]\\\|\.\$\?\^\s\(\)\*\!\=\:\,-_@'";/`~#<>%&]/g)) {
			r++;
		}
		if (/\W{6}/.test(v)) {
			r--;
		}

	}

	// console.log(r)
	return r;
}
