/**
 * External dependencies
 */
var React = require( 'react' ),
	WP = require( 'wordpress-rest-api' );;

/**
 * Internal dependencies
 */
var Loop = require( 'loop' );

/**
 * 
 */
module.exports = React.createClass( {
	render: function() {
		return (
			<div id="content" className="site-content">
				<div id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						<Loop />
					</main>
				</div>
			</div>
		);
	}
} );
