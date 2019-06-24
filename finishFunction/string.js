// 转为unicode 编码  
function encodeUnicode(str) {
	var res = [];
	for (var i = 0; i < str.length; i++) {
		res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
	}
	return "\\u" + res.join("\\u");
}

// 解码  
function decodeUnicode(str) {
	str = str.replace(/\\/g, "%");
	return unescape(str);
}

// encodeUnicode('毛振华maozhenhua')

// decodeUnicode('\u6bdb\u632f\u534e\u006d\u0061\u006f\u007a\u0068\u0065\u006e\u0068\u0075\u0061')