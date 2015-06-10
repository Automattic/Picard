/**
 * External dependencies
 */
var React = require( 'react' ),
	page = require( 'page' ),
	url = require('url'),
	request = require( 'superagent' ),
	apiURL,
	path;

/**
 * Internal dependencies
 */
var Content = require( '../content/content.jsx' );

if(PICARD_CONFIG && PICARD_CONFIG.URL) {
	//Setting up base url for installations directories in
	apiURL = PICARD_CONFIG.URL + "/wp-json/";
	path = url.parse(PICARD_CONFIG.URL).path;
	if(path.length > 1) {
		page.base(path);
	}
} else {
	console.warn("Please ensure PICARD_CONFIG global value is set up");
	apiURL = "/wp-json/";
}



var Router = React.createClass({

	componentDidMount: function() {
		
		var self = this;

		page( '/', function ( ctx ) {
			var data,
				slug = ctx.params.slug,
				url = apiURL + "posts";
			request
				.get( url )
				.end( function( err, res ) {
					data = JSON.parse( res.text );
					self.setState({ component: <Content data={ data } bodyClass="index" /> });
				});
		});

		page( '/:year/:month/:day/:slug', function ( ctx ) {
			var data,
				slug = ctx.params.slug,
				url = apiURL + "posts/?filter[name]=" + slug;
			request
				.get( url )
				.end( function( err, res ) {
					data = JSON.parse( res.text );
					self.setState({ component: <Content data={ data } bodyClass="single" /> });
				});
		});

		page( '*', function ( ctx ) {
			if ( ctx.state.pageData ) {
				self.setState({ component: <Content data={ ctx.state.pageData } bodyClass="page" /> });
			} else {
				var admin = 'wp-admin';
				var slug = ctx.pathname;

				if ( slug.indexOf( admin ) > -1 ) {
					document.location.href = ctx.path;
					return;
				}

				if(slug.substr(-1) == '/') {
					slug = slug.substr(0, slug.length - 1);
				}
				var part = slug.substring(slug.lastIndexOf('/') + 1);
				var url = apiURL + "posts/?type[]=page&filter[name]=" + part;
				request
					.get( url )
					.end( function( err, res ) {
						data = JSON.parse( res.text );
						ctx.state.pageData = data;
						ctx.save();
						self.setState({ component: <Content data={ data } bodyClass="page" /> });
					});
			}
		});

		page.start();

	},

	getInitialState: function() {
		return { component: <div /> };
	},

	render: function() {
		return this.state.component;
	}

});

module.exports = Router;