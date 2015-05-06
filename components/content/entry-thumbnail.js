/**
 * entry_thumbnail.js
 *
 * Handles the height of the Entry Thumbnail.
 */

var entry_thumbnail = function() {

	var site_header_height  = document.querySelector( '.site-header' ).clientHeight;

	Element.prototype.hasClass = function(className) {
	    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
	};

	if ( ( document.querySelector( 'body' ).hasClass( 'page' ) || document.querySelector( 'body' ).hasClass( 'single' ) ) && document.querySelector( '.hentry' ).hasClass( 'has-post-thumbnail' ) ) {
		document.querySelector( '.entry-thumbnail' ).style.height = window.outerHeight - site_header_height + 'px';

		var elements = document.querySelectorAll( '.entry-thumbnail' );

		for ( var i = 0; i < elements.length; i++ ) {
			elements[i].style.height = window.outerHeight - site_header_height + 'px';
		}
	} else {
		var elements = document.querySelectorAll( '.entry-thumbnail' );

		for ( var i = 0; i < elements.length; i++ ) {
			elements[i].style.height = '';
		}
	}

};

module.exports = entry_thumbnail;