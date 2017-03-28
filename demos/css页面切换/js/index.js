var index = $('.page-box .active').index();
var delayTimer = 50;
var isAnimated = false;
var condition = 'css';
var timeouts;

$('#prev').click(function(e) {
	if (isAnimated) {
		return false;
	}

	index--;
	if (index < 0) {
		index = 0;
		return false;
	}

	isAnimated = true;

	if (condition === 'js') {
		// js动画
		$('.page-box li').eq(index).next().css({
			'z-index': 2,
			left: '0'
		});

		$('.page-box li').eq(index).css({
			'z-index': 2,
			left: '-100%'
		});

		$('.page-box li').eq(index).stop(true, false).animate({
			left: '0'
		}, 500, function() {
			$(this).attr('style', '').addClass('active').siblings().removeClass('active');
		});

		$('.page-box li').eq(index).next().delay(150).stop(true, false).animate({
			left: '100%'
		}, 500, function() {
			$(this).attr('style', '');
			isAnimated = false;
		});
	} else {
		// css动画
		$('.page-box li').eq(index).addClass('page-prev');
		setTimeout(function() {
			$('.page-box li').eq(index).next().addClass('page-next page-out').removeClass('active')
			$('.page-box li').eq(index).addClass('page-in active').removeClass('page-prev');
			pageSlideOver();
		}, delayTimer);
	}

});

$('#next').click(function(e) {
	if (isAnimated) {
		return false;
	}

	index++;
	if (index >= 5) {
		index = 4;
		return false;
	}

	isAnimated = true;

	if (condition === 'js') {
		// js动画
		$('.page-box li').eq(index).css({
			'z-index': 2,
			left: '100%'
		});

		$('.page-box li').eq(index).prev().css({
			'z-index': 2,
			left: 0
		});

		$('.page-box li').eq(index).stop(true, false).animate({
			left: '0'
		}, 350, function() {
			$(this).attr('style', '').addClass('active').siblings().removeClass('active');
		});

		$('.page-box li').eq(index).prev().delay(100).stop(true, false).animate({
			left: '-100%'
		}, 500, function() {
			$(this).attr('style', '').removeClass('active');
			isAnimated = false;
		});
	} else {
		// css动画
		$('.page-box li').eq(index).addClass('page-next');
		setTimeout(function() {
			$('.page-box li').eq(index).prev().addClass('page-prev page-out').removeClass('active');
			$('.page-box li').eq(index).addClass('page-in active').removeClass('page-next');
			pageSlideOver();
		}, delayTimer);
	}

});

function pageSlideOver() {
	$('.page-out').on('transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd', function() {

		$('.page-in').removeClass('page-in')
		$('.page-out').removeClass('page-out page-prev')
		$('.page-box li').eq(index).siblings().removeClass('active page-next page-prev');

		isAnimated = false;
		// $('.page-box li').eq(index).removeClass('page-next')
		// $('.page-box li').eq(index - 1).removeClass('page-prev active')
	});

	// $('.active').on('transitionend', function() {
	//   console.log('end')
	//   $(this).removeClass('page-in')

	// });

	$('.page-in').on('transitionend', function() {
		// $(this).removeClass('page-in')
	});
}
