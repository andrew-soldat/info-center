$('.expend').click(function(event) {
	$('.expend, .rollup').toggleClass('active');
	$('.oglavl').addClass('open');
	$('.gradient').addClass('hidden');
});

$('.rollup').click(function(event) {
	$('.expend, .rollup').toggleClass('active');
	$('.oglavl').removeClass('open');
	$('.gradient').removeClass('hidden');
});