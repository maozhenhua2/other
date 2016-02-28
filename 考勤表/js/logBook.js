var data = [{
	name: '售前培训',
	sh: [{
		time: {start: '2015-10-01', end: '2015-10-09'}, // 连续日期  开始、结束的年和月必须相同
		content: '延时1-3天'
	}, {
		time: ['2015-10-10', '2015-10-15', '2015-10-17', '2015-10-11'], // 日期集合
		content: '正常上课'
	}, {
		time: '2015-10-13', // 单独日期
		content: '延时超过3天'
	}]
}, {
	name: '话术培训',
	sh: [{
		time: '2015-10-11',
		content: '正常上课'
	}, {
		time: '2015-10-12',
		content: '延时超过3天'
	}]
}, {
	name: '技术培训',
	sh: [{
		time: '2015-10-11',
		content: '延时1-3天'
	}, {
		time: '2015-9-12',
		content: '正常上课'
	}]
}];

// 模拟数据
function changeData(obj) {
	var year = obj.year;
	var month = obj.month + 1;
	return [{
		name: '售前培训',
		sh: [{
			time: {start: year + '-' + month + '-01', end: year + '-' + month + '-09'}, // 连续日期  开始、结束的年和月必须相同
			content: '延时1-3天'
		}, {
			time: [year + '-' + month + '-10', year + '-' + month + '-15', year + '-' + month + '-17', year + '-' + month + '-11'], // 日期集合
			content: '正常上课'
		}, {
			time: year + '-' + month + '-13', // 单独日期
			content: '延时超过3天'
		}]
	}, {
		name: '话术培训',
		sh: [{
			time: year + '-' + month + '-11',
			content: '正常上课'
		}, {
			time: year + '-' + month + '-12',
			content: '延时超过3天'
		}]
	}, {
		name: '技术培训',
		sh: [{
			time: year + '-' + month + '-11',
			content: '延时1-3天'
		}, {
			time: year + '-' + month + '-12',
			content: '正常上课'
		}]
	}];
}
var d1 = new logTable({
  input: '#table',
  data: data,
  onchangefn: function() {
    // 模拟数据
		var data = changeData(this.info);
		//console.log(data);
		d1.reset(data);
  }
});
d1.run();

var t1 = new mCalendar({
  dateFormat: 'yyyy-mm',
  input: '#t1',
  showToday: false,
  startView: 'month',
  selectedFn: function() {
  	var v = $('#t1').val().split('-');
    // d1.info = t1.info;
    // d1.createTable();
    // d1.setTitle();
    d1.setInfoData({
			year: parseInt(v[0], 10),
			month: parseInt(v[1], 10)
		});
		// 模拟数据
		var data = changeData(d1.info);

		d1.reset(data);
  }
});
t1.run()

$('#t1').click(function() {
  t1.show();
});

$('#serachBtn').click(function() {
  // var v = $('#serach').val();
  // var arr = d1.filter(v);
  // d1.setTableData(arr);
  // d1.createTable();
  var v = $('#serach').val();
	if (v) {
		var arr = d1.filter(v);
		d1.setTableData(arr);
	} else {
		d1.reset();
	}
});
