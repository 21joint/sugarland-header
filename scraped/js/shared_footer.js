// This file will be run in the footer on every page.
// It should be used for content that relates
// to your site as a whole, it should not be used for
// plugin-specific js

require(["jquery", "site_gtm", "sv_load!plugins_dynamic_content", "sv_siteFoundation", "domReady!"], function($, gtm, dynamic) {
	$(document).foundation();
	
	var browserIsIE = document.body.style.msTouchAction !== undefined;
	if (browserIsIE) {
		$('.root_panel').addClass('ie-view');
	}
	// CRM FORM STYLING HELPER JS. This should exist in footer JS file.
	if (location.search.indexOf('action=popupCal') > -1 && document.body.querySelectorAll('.lookup-calHolder')) {
		$('.lookup-calHolder').parents().show().addClass('crm-calendar-parent');
	}
	//hovering on desktop
	$(document).on('mouseenter', '.desktop .main-dropdown', function() {
		var thisUL = $(this).find('ul');
		var parentUL = $(this).closest('ul');
		if (thisUL.outerHeight() > parentUL.outerHeight()) {
			parentUL.css('height', thisUL.outerHeight());
		} else if (thisUL.outerHeight() < parentUL.outerHeight()) {
			thisUL.css('height', parentUL.outerHeight());
		}
	}).on('mouseleave', '.desktop .main-dropdown',  function() {
		$(this).closest('ul').css('height', 'auto');
		$(this).find('ul').css('height', 'auto');
	});

	//menu click
	$('body').on('click', '.menu-toggle', function() {
		$(this).toggleClass('open');
		$('.drawer').toggleClass('open');
	});
	//toggle arrow click
	$('body').on('click', 'i.toggle', function() {
		$(this).toggleClass('fa-caret-up fa-caret-down');
		$(this).closest('li').toggleClass('open');
	});
	
	gtm.update();
});