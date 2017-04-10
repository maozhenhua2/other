var d1 = new mCalendar({
	input: '#d1',
	dateFormat: 'yyyy-mm-dd',
  showToday: false
});
d1.run();
var d2 = new mCalendar({
	input: '#d2',
	dateFormat: 'yyyy-mm',
  startView: 'month'
});
d2.run();
var d3 = new mCalendar({
	input: '#d3'
});
d3.run();

var d4 = new mCalendar({
  input: '#d4'
});
d4.run();
var d5 = new mCalendar({
  input: '#d5',
  showToday: true,
  showTime: true
});
d5.run();
$('#d1').on('click', function() {
	d1.show();
  document.activeElement.blur();
});
$('#d2').on('click', function() {
	d2.show();
  document.activeElement.blur();
});
$('#d3').on('click', function() {
	d3.show();
	document.activeElement.blur();
});
$('#d4').on('click', function() {
  d4.show();
  document.activeElement.blur();
});
$('#d5').on('click', function() {
  d5.show();
  document.activeElement.blur();
});
