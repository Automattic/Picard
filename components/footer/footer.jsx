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
Footer = React.createClass( {
	componentWillMount: function() {},
	componentDidMount: function() {},
	componentWillUnmount: function() {},

	render: function() {
		return (
			<footer id="colophon" className="site-footer" role="contentinfo">
				<div className="site-info">
					<a href="http://wordpress.org/">Proudly powered by WordPress</a>
					<span className="sep"> | </span>
					_s by Automattic
				</div>
			</footer>
		);
	}
} );

module.exports = Footer;