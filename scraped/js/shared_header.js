// This file will be run in the header on every page.
// It should be used for content that relates
// to your site as a whole, it should not be used for
// plugin-specific js

require(["site_gtm"], function(gtm) {
	// site_gtm triggers the init of the library, binding dom events
	// then we track the primary pageview
	gtm.sendEvents({
		tClient_pageview : {},
		tCore_pageview : {}
	});
});