setBoxSize();
$(window).on('resize', function(){
	setBoxSize();
});

function setBoxSize(){
	$('.box').height($('.box').width());
}
