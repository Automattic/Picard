/**
 * entry_thumbnail.js
 *
 * Handles the height of the Entry Thumbnail.
 */
var entry_thumbnail = ( function( $ ) {

	function single_entry_thumbnail() {

		var site_header_height        = $( '.site-header' ).outerHeight(),
		    entry_thumbnail           = $( '.entry-thumbnail' ),
		    entry_thumbnail_img       = entry_thumbnail.find( 'img' );
		if ( $( 'body' ).hasClass( 'admin-bar' ) ) {
			var admin_bar_height      = $( '#wpadminbar' ).outerHeight();
			site_header_height       += admin_bar_height;
		}

		entry_thumbnail_img.each( function() {
			var img = $( this ),
			    new_img = new Image();
			new_img.src = img.attr( 'src' );
			img.removeAttr( 'width' ).removeAttr( 'height' );
			$( new_img ).load( function() {
				var img_width = new_img.width,
				    img_height = new_img.height,
				    ratio_screen = entry_thumbnail.width() / entry_thumbnail.height(),
				    ratio_image = img_width / img_height;
				if ( ratio_image >= ratio_screen ) {
					img.css( {
						'height': site_header_height,
						'max-width': 'none'
					} );
				} else {
					img.css( {
						'height': '',
						'max-width': '100%'
					} );
				}
			} );
		} );

		if ( ( $( 'body' ).hasClass( 'page' ) || $( 'body' ).hasClass( 'single' ) ) && $( '.hentry' ).hasClass( 'has-post-thumbnail' ) ) {

			entry_thumbnail.height( $( window ).height() - site_header_height );
			entry_thumbnail_img.css( 'min-height', $( window ).height() - site_header_height );

		} else {

			entry_thumbnail.each( function() {
				$( this ).height( $( this ).find( '.entry-header' ).outerHeight() );
			} );

		}

		/*
$( 'body.page .entry-thumbnail, body.single .entry-thumbnail, .entry-media iframe, .entry-media object, .entry-media embed, .entry-media video, .entry-media .wp-video-shortcode' ).height( $( window ).height() - site_header_height );
		if ( ( $( 'body' ).hasClass( 'single' ) || $( 'body' ).hasClass( 'page' ) ) && $( '.hentry' ).hasClass( 'has-post-thumbnail' ) ) {
			if ( $( '.entry-header' ).outerHeight() + 48 >  $( window ).height() - site_header_height ) {
				$( '.entry-thumbnail' ).css( 'min-height', $( '.entry-header' ).outerHeight() + 48 );
			} else {
				$( '.entry-thumbnail' ).css( 'min-height', '' );
			}
		}
*/

	}

	$( window ).load( single_entry_thumbnail ).resize( single_entry_thumbnail );

} )( jQuery );

module.exports = entry_thumbnail;