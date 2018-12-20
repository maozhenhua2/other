let sheets;
document.getElementById('file').addEventListener('change', function() {
	// true: readAsBinaryString
	// false: readAsArrayBuffer
	const rABS = true;
	let f = this.files[0];
	const reader = new FileReader();

	if (rABS) {
		reader.readAsBinaryString(f);
	} else {
		reader.readAsArrayBuffer(f);
	}

	reader.onload = function(e) {
		let data = e.target.result;
		if (!rABS) {
			data = new Uint8Array(data);
		}
		let workbook = XLSX.read(data, {
			type: rABS ? 'binary' : 'array'
		});

		sheets = workbook.Sheets;
		let sheetNames = [];
		for (let key in sheets) {
			sheetNames.push(key);
		}
		sheetNames = sheetNames.map((v) => `<button class="btn">${v}</button>`);

		document.querySelector('.sheets').innerHTML = sheetNames.join('');
	};
}, false);

document.querySelector('.sheets').addEventListener('click', function(e) {
	let target = e.target;
	if (target.nodeName === 'BUTTON') {
		let sheetsName = target.innerHTML;
		document.querySelector('#sheetName').innerHTML = sheetsName;
		let jsonData = sheets[sheetsName];
		let tableData = setxlsx(jsonData);
		console.log(tableData);
		let html = `<table><tbody>${createtable(tableData)}</tbody></table>`;
		document.getElementById('table').innerHTML = html;
	}
}, false);

function setxlsx(jsonData) {
	let maxRange = jsonData['!ref'].split(':').map((v, i) => {
		let rarr = [
			v.match(/[A-Z]+/g)[0],
			v.match(/[0-9]+/g)[0] - 0,
		];
		return rarr;
	});
	// console.log(maxRange);

	let narr = maxRange[0].map((v, i) => {
		return maxRange.map((row) => {
			return row[i];
		})
	});

	let xrange = r2(narr[0]);
	let yrange = narr[1];
	let data = [];
	let yi = yrange[0];
	let yl = yrange[1];
	for (; yi <= yl; yi++) {
		let lineObj = [];
		xrange.map((xv, xi) => {
			let lineKey = xv + yi;
			lineObj.push({
				key: lineKey,
				value: jsonData[lineKey]
			});
		});
		data.push(lineObj);
	}
	return data;
}

// test
// r2(['a', 'z']);
// r2(['b', 'z']);
// r2(['a', 'aa']);
// r2(['a', 'ab']);
// r2(['aa', 'ab']);
// r2(['aa', 'ez']);
// r2(['ba', 'ez']);
// r2(['ca', 'ez']);
// r2(['da', 'ez']);
// r2(['ea', 'ez']);

// 单字母范围 a-z b-z
function r1(arr) {
	arr = arr.map((v) => v.toUpperCase());
	let start = arr[0].charCodeAt();
	let end = arr[1].charCodeAt();
	let arr2 = [];

	let i = start - 65;
	let l = end - 65 + 1;
	for (; i < l; i++) {
		arr2.push(String.fromCharCode(65 + i));
	}
	return arr2;
}

// 单双字母范围 a-z a-aa b-aa
function r2(arr) {
	arr = arr.map((v) => v.toUpperCase());
	let start1 = arr[0].split('');
	let end1 = arr[1].split('');
	let arr1 = [];
	let arr2 = [];

	if (end1.length === 1) {
		arr1 = r1(arr);
		return arr1;
	}

	if (start1.length === 1) {
		arr1 = r1([start1[0], 'Z']);
	}

	if (start1.length === 1) {
		start1.push('A');
	}
	start1 = start1.map((v) => v !== -1 ? v.charCodeAt() : -1);
	end1 = end1.map((v) => v.charCodeAt());
	let startindex = 0;
	if (start1[0] >= 65) {
		startindex = Math.floor(start1[0] % 65);
	}
	let i = 0;
	i = startindex * 26 + start1[1] - 65;

	let endindex = 0;
	if (end1[0] > 65) {
		endindex = Math.floor(end1[0] % 65);
	}
	let l = endindex * 26 + end1[1] - 65 + 1;
	for (; i < l; i++) {
		let code1 = 65 + Math.floor(i / 26);
		let code2 = 65 + i % 26;
		code1 = String.fromCharCode(code1);
		code2 = String.fromCharCode(code2);
		arr2.push(code1 + code2);
	}
	return arr1.concat(arr2);
}

// 生成表格
function createtable(data) {
	let yi = 0;
	let yl = data.length;
	let html = '';
	for (; yi < yl; yi++) {
		let tdobj = data[yi];
		html += '<tr>';
		let xi = 0;
		let xl = tdobj.length;
		for (; xi < xl; xi++) {
			let tdHtml = '';

			if (typeof tdobj[xi].value !== 'undefined' && typeof tdobj[xi].value) {
				tdHtml = tdobj[xi].value.v;
			}
			html += `<td>${tdHtml}</td>`;
		}
		html += '</tr>';
	}
	return html;
}