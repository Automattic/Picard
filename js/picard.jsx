var page = require( 'page' );
var Posts = require( './posts' );

jQuery( 'li.page_item a' ).click( function( e ) {
	e.preventDefault();
	var url = jQuery( this ).attr('href');
	url = url.replace(/^.*\/\/[^\/]+/, '');
	page( url );
});

page( '/', function() {
	React.render(
		<Posts url="/wp-json/posts" />,
		document.getElementById( 'main' )
	);
});

page( '/:year/:month/:day/:slug', function(ctx, next) {
	var slug = ctx.params.slug;
	url = "/wp-json/posts/?filter[name]=" + slug;
	React.render(
		<Posts url={url} />,
		document.getElementById( 'main' )
	);
});

page( '*', function(ctx, next ) {
	var slug = ctx.pathname;
	if(slug.substr(-1) == '/') {
		slug = slug.substr(0, slug.length - 1);
	}
	var part = slug.substring(slug.lastIndexOf('/') + 1);
	url = "/wp-json/posts/?type[]=page&filter[name]=" + part;
	React.render(
		<Posts url={url} />,
		document.getElementById( 'main' )
	);
});

page();