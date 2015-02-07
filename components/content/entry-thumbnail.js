/**
 * entry_thumbnail.js
 *
 * Handles the height of the Entry Thumbnail.
 */
var $ = jQuery;

var entry_thumbnail = function() {

	var site_header_height  = $( '.site-header' ).outerHeight();
	if ( $( 'body' ).hasClass( 'admin-bar' ) ) {
		site_header_height += $( '#wpadminbar' ).outerHeight();
	}
	if ( ( $( 'body' ).hasClass( 'page' ) || $( 'body' ).hasClass( 'single' ) ) && $( '.hentry' ).hasClass( 'has-post-thumbnail' ) ) {
		$( '.entry-thumbnail' ).height( $( window ).height() - site_header_height );
	} else {
		$( '.entry-thumbnail' ).css( 'height', '' );
	}

};

module.exports = entry_thumbnail;