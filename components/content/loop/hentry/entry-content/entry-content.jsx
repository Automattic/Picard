/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Renders content
 */
var EntryContent = React.createClass({

	render: function() {
		console.log( this.props.content );
		return (
			<div className="entry-content" dangerouslySetInnerHTML={{__html: this.props.content.rendered}} />
		);
	}

});

module.exports = EntryContent;
