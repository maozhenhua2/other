var d1 = new mCalendar({
	input: '#d1',
	dateFormat: 'yyyy-mm-dd'
});
d1.run()
var d2 = new mCalendar({
	input: '#d2'
});
d2.run()

$('#d1').on('click', function() {
	d1.show();
});
$('#d2').on('click', function() {
	d2.show();
});
