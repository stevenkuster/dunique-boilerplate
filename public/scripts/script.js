$(document).ready(function() {
	$(".contentblock").eqHeight(".equal");
	$(".footerblock").eqHeight(".equal");
	
});

$('#nav-toggle').click(function () {
	$('#main-nav').slideToggle();
	$('#search-box').slideUp();
	return false;
});

$('#search-toggle').click(function () {
	$('#search-box').slideToggle();

	if ($(window).width() <= 710){
		$('#main-nav').slideUp();
	}

	return false;
});


$(window).load(function() {
	$("#slider").carouFredSel({
		responsive	: true,
		width		: "100%",
		height 		: "auto",
		scroll		: {
			fx			: "crossfade",
			duration	: 1000
		},
		items		: {
			visible		: 1,
			width		: 960
		},
		auto: 5000,
		prev: "#slide-prev",
		next: "#slide-next",
		pagination: {
			container: "#pager",
			anchorBuilder: function( nr ) {
				return "<li><a></a></li>";
			}
		}
	});
});
