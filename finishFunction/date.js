//两个日期的月份差
function monthDiff(start, end) {
  var date1 = end;
  var date2 = start;
  // 拆分年月日
  date1 = date1.split('-');
  // 得到月数
  date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
  // 拆分年月日
  date2 = date2.split('-');
  // 得到月数
  date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
  var m = Math.abs(date1 - date2);
  return m;
}
// 月份加减后的日期
function opMonth(start, month) {
  var d = new Date(start);
  d.setMonth(d.getMonth() + month);
  var m = d.getMonth() + 1;
  return d.getFullYear() + '/' + m + '/' + d.getDate();
}
// 日期的天数差
function opDate(date, days) {
  var d = date;
  d.setDate(d.getDate() + days);
  var m = d.getMonth() + 1;
  return d.getFullYear() + '/' + m + '/' + d.getDate();
}

// 获取日期相关数据
function getDateInfo(s) {
  var d = new Date(s);
  return {
    year: d.getFullYear(),
    month: d.getMonth(),
    date: d.getDate(),
    days: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),
    fDay: new Date(d.getFullYear(), d.getMonth(), 1).getDay(),
    weekday: d.getDay(),
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds()
  }
}