/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var React = require( 'site-navigation' );

/**
 * 
 */
module.exports = React.createClass( {
	componentWillMount: function() {},
	componentDidMount: function() {},
	componentWillUnmount: function() {},

	render: function() {
		return (
			<nav id="site-navigation" className="main-navigation" role="navigation">
				<button className="menu-toggle" aria-controls="menu" aria-expanded="false">menu button</button>
				menu
			</nav>
		);
	}
} );
