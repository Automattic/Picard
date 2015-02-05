/**
 * External dependencies
 */
var React = require( 'react/addons' ),
	page = require( 'page' );

/**
 * Internal dependencies
 */
var Content = require( '../content/content.jsx' );

var Router = React.createClass({

	componentDidMount: function() {
		
		var self = this;

		page( '/', function ( ctx ) {
			self.setState({ component: <Content url="/wp-json/posts" /> });
		});

		page( '/:year/:month/:day/:slug', function ( ctx ) {
			var slug = ctx.params.slug;
			var url = "/wp-json/posts/?filter[name]=" + slug;
			self.setState({ component: <Content url={url} /> });
		});

		page( '*', function ( ctx ) {
			var slug = ctx.pathname;
			if(slug.substr(-1) == '/') {
				slug = slug.substr(0, slug.length - 1);
			}
			var part = slug.substring(slug.lastIndexOf('/') + 1);
			var url = "/wp-json/posts/?type[]=page&filter[name]=" + part;
			self.setState({ component: <Content url={url} /> });
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