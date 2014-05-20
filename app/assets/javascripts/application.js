// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.easing.js
//= require jquery.appear.js
//= require jquery.cookie.js
//= require selectnav.js
//= require isotope/jquery.isotope.js
//= require jquery.turbolinks
// require turbolinks --- Not include to allow isotope to work
//= require_tree .
// Head Libs
//=	require modernizr.js
//= require revolution-slider/js/jquery.themepunch.plugins.js
//= require revolution-slider/js/jquery.themepunch.revolution.js

$(document).ready(function(){

	// Revolution Slider Initialize viene de view.home.js
	if($("#revolutionSlider").get(0)) {
		var rev = $("#revolutionSlider").revolution({
			delay:9000,
			startheight:500,
			startwidth:960,

			hideThumbs:10,

			thumbWidth:100,
			thumbHeight:50,
			thumbAmount:5,

			navigationType:"both",
			navigationArrows:"verticalcentered",
			navigationStyle:"round",

			touchenabled:"on",
			onHoverStop:"on",

			navOffsetHorizontal:0,
			navOffsetVertical:20,

			stopAtSlide:-1,
			stopAfterLoops:-1,

			shadow:1,
			fullWidth:"on"
		});

		$("#revolutionSlider .caption").on("mousedown", function(e) {
			e.preventDefault();
			rev.revpause();
			return false;
		});
	}

	//ISOTOPE
	$("ul.sort-source").each(function() {

			var source = $(this);
			var destination = $("ul.sort-destination[data-sort-id=" + $(this).attr("data-sort-id") + "]");

			if(destination.get(0)) {

				var minParagraphHeight = 0;
				var paragraphs = $("span.thumb-info-caption p", destination);

				paragraphs.each(function() {
					if($(this).height() > minParagraphHeight)
						minParagraphHeight = $(this).height();
				});

				paragraphs.height(minParagraphHeight);

				$(window).load(function() {

					destination.isotope({
						itemSelector: "li",
						layoutMode : "fitRows"
					});

					source.find("a").click(function(e) {

						e.preventDefault();

						var $this = $(this),
							filter = $this.parent().attr("data-option-value");

						source.find("li.active").removeClass("active");
						$this.parent().addClass("active");

						destination.isotope({
							filter: filter
						});

						self.location = "#" + filter.replace(".","");

						return false;

					});

					$(window).bind("hashchange", function(e) {

						var hashFilter = "." + location.hash.replace("#",""),
							hash = (hashFilter == "." || hashFilter == ".*" ? "*" : hashFilter);

						source.find("li.active").removeClass("active");
						source.find("li[data-option-value='" + hash + "']").addClass("active");

						destination.isotope({
							filter: hash
						});

					});

					var hashFilter = "." + (location.hash.replace("#","") || "*");
					source.find("li[data-option-value='" + hashFilter + "'] a").click();

				});

			}

		});

})


