var Months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
var nowDate = new Date();
var monthIndex = nowDate.getMonth();
var yearIndex = nowDate.getFullYear();

setMonthValue(monthIndex);
document.querySelector('.c-left-btn').addEventListener('click', function () {
  monthIndex--;
  monthIndex = monthIndex <= 0 ? 0 : monthIndex;
  setMonthValue(monthIndex);
  calendar1.change(yearIndex, monthIndex);
  getDate(monthIndex);
});

document.querySelector('.c-right-btn').addEventListener('click', function () {
  monthIndex++;
  monthIndex = monthIndex >= 11 ? 11 : monthIndex;
  setMonthValue(monthIndex);
  calendar1.change(yearIndex, monthIndex);
  getDate(monthIndex);
});

function setMonthValue(i) {
  document.getElementById('monthValue').value = (Months[i]);
}

// 模拟数据
function getDate(i) {
  var state = ['REJECT', 'PASS', 'SCHEDULED', 'COMPLETE'];

  var index = 0;
  var l = randomRange(1, 2);
  var arr = [];
  for (; index < l; index++) {
    var date = randomRange(1, 27);
    var stateIndex = randomRange(0, 3);
    var data = {
      "ID": date + "b412db9e-5e1b-4dbe-87a5-87b4a347f463",
      "ImplementTime": "2016/" + (i + 1) + "/" + date + " 0:00:00",
      "PerformState": [{
        txt: '事件1' + date
      }, {
        txt: '事件2' + date
      }, {
        txt: '事件3' + date
      }, {
        txt: '事件4' + date
      }]
    };
    arr.push(data);
  }
//    console.log(arr)
  setTimeout(function () {
    calendar1.createSchedule(arr);
  }, 100);
}

// 生成日历
calendar1.init({
  id: 'tableCcalendar',
  contentId: 'popContent',
  popId: '#pop1',
  okFn: function () {
    
  }
  // callback: function (o) {
  //   var index = o.getAttribute('data-arrIndex');
  //   // console.log(index)
  //   calendar1.createPopContent(index);
  //   popbox.show('#pop1');
  // },
  // className: {
  //   REJECT: 'plan plan-reject',
  //   PASS: 'plan plan-complete',
  //   SCHEDULED: 'plan',
  //   COMPLETE: 'plan plan-nosubmit'
  // }
});

getDate(monthIndex);

// 指定范围随机数
function randomRange(start, end) {
  var total = end - start + 1;
  return Math.floor(Math.random() * total + start);
}