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
	getInitialState: function() {
		return {
			posts: []
		}
	},

	componentDidMount: function() {
		var wp = new WP({ endpoint: 'http://localhost/trunk/src/wp-json' });

		wp.posts().then( function( data ) {
			var posts = JSON.parse( data ); console.log(posts);
		} ).catch( function( err ) {
			console.log( err );
		} );

		if ( this.isMounted() ) {
			this.setState( {
				posts: posts
			} );
		}
	},

	render: function() {
		
		return (
			<div id="content" className="site-content">
				<div id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						<Loop posts={ this.state.posts } />
					</main>
				</div>
			</div>
		);
	}
} );
