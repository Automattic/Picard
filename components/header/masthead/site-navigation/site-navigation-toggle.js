/**
 * site-navigation-toggle.js
 *
 * Handles toggling the navigation menu.
 */
// var navigation = ( function( $ ) {
	
// 	/* Add dropdown toggle to items */
// 	$( '.main-navigation ul > .page_item_has_children > a, .main-navigation ul > .menu-item-has-children > a' ).after( '<button class="dropdown-toggle" aria-expanded="false">' /* + screen_reader_text.expand */ + '</button>' );
	
// 	/* Toggle child menu items */
// 	$( '.main-navigation' ).on( 'click', '.dropdown-toggle', function() {
// 		$( this ).toggleClass( 'toggle-on' );
// 		$( this ).prev( 'a' ).toggleClass( 'toggle-on' );
// 		$( this ).next( '.sub-menu' ).toggleClass( 'toggle-on' );
// 		$( this ).attr( 'aria-expanded', $( this ).attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
// 		//$( this ).html( $( this ).html() === screen_reader_text.expand ? screen_reader_text.collapse : screen_reader_text.expand )
// 	} );
	
// 	/* Toggle navigation */
// 	$( '.main-navigation' ).on( 'click', '.menu-toggle', function() {
// 		$( 'body' ).toggleClass( 'menu-open' );
// 		$( this ).toggleClass( 'toggle-on' )
// 		         .attr( 'aria-expanded', $( this ).attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' )
// 		         .parent().find( '.menu' ).toggleClass( 'toggle-on' );
// 	} );

// } )( jQuery );

// module.exports = navigation;