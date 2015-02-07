/**
 * External dependencies
 */
var React = require( 'react/addons' ),
	page = require( 'page' );

/**
 * Internal dependencies
 */
var Router = require( './router/router.jsx' ),
    entry_thumbnail = require( './content/entry-thumbnail.js' ),
	navigation = require( './header/masthead/site-navigation/site-navigation-toggle.js' );

/**
 * A quick and dirty way of hijacking any clicks on the navigation and passing the requests to our router
 */
jQuery( 'li.page_item a' ).click( function( e ) {
	e.preventDefault();
	var url = jQuery( this ).attr('href');
	url = url.replace(/^.*\/\/[^\/]+/, '');
	page( url );
});

/**
 * Make it so…
 */
React.render(
	<Router />, document.getElementById( 'main' )
);

/**
 * The routing of what is effectively the site index
 * @todo Move routing into its own component
 * @todo Don't fire .render when route changes
 * @todo Write more comprehensive routing based on permalink structure of blog
 */
// page( '/', function() {
// 	React.render(
// 		<Content url="/wp-json/posts" />,
// 		document.getElementById( 'main' )
// 	);
// });

/**
 * Post link route
 * @todo As above
 */
// page( '/:year/:month/:day/:slug', function(ctx, next) {
	// var slug = ctx.params.slug;
	// url = "/wp-json/posts/?filter[name]=" + slug;
	// React.render(
	// 	<Content url={url} />,
	// 	document.getElementById( 'main' )
	// );
// });

/**
 * Other link route
 * @todo As above
 */
// page( '*', function(ctx, next ) {
// 	var slug = ctx.pathname;
// 	if(slug.substr(-1) == '/') {
// 		slug = slug.substr(0, slug.length - 1);
// 	}
// 	var part = slug.substring(slug.lastIndexOf('/') + 1);
// 	url = "/wp-json/posts/?type[]=page&filter[name]=" + part;
// 	React.render(
// 		<Content url={url} />,
// 		document.getElementById( 'main' )
// 	);
// });

// page();