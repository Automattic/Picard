/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */


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
					<h1 className="site-title">site title</h1>
					<h2 className="site-description">site description</h2>
				</div>

				<nav id="site-navigation" className="main-navigation" role="navigation">
					<button className="menu-toggle" aria-controls="menu" aria-expanded="false">menu button</button>
					menu
				</nav>
			</header>
		);
	}
} );
