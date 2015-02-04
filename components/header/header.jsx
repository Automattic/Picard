/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var	SiteTitle = require( 'site-title' ),
	SiteDescription = require( 'site-description' ),
	SiteNavigation = require( 'site-navigation' );

/**
 * 
 */
module.exports = React.createClass( {
	componentWillMount: function() {},
	componentDidMount: function() {},
	componentWillUnmount: function() {},

	render: function() {
		return (
			<header id="masthead" className="site-header" role="banner">
				<div className="site-branding">
					<SiteTitle />
					<SiteDescription />
				</div>

				<SiteNavigation />
			</header>
		);
	}
} );
