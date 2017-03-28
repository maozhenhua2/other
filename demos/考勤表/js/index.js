var d1 = new mCalendar({
	input: '#d1',
	dateFormat: 'yyyy-mm-dd hh:nn:ss',
  showToday: false
});
d1.run()
var d2 = new mCalendar({
	input: '#d2',
	dateFormat: 'yyyy-mm',
  startView: 'month'
});
d2.run()
var d3 = new mCalendar({
	input: '#d3'
});
d3.run()

$('#d1').on('click', function() {
	d1.show();
});
$('#d2').on('click', function() {
	d2.show();
});
$('#d3').on('click', function() {
	d3.show();
});
