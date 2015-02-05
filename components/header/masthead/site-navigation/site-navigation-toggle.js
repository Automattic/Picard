/**
 * site-navigation-toggle.js
 *
 * Handles toggling the navigation menu.
 */
var navigation = ( function( $ ) {

	$( '.menu-toggle' ).click( function() {
		$( 'body' ).toggleClass( 'menu-open' );
		$( this ).toggleClass( 'toggle-on' )
		         .attr( 'aria-expanded', $( this ).attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
	} );

} )( jQuery );

module.exports = navigation;