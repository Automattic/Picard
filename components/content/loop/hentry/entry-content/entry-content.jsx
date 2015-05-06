/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Renders content
 */
var EntryContent = React.createClass({

	render: function() {
		return (
			<div className="entry-content" dangerouslySetInnerHTML={{__html: this.props.content}} />
		);
	}

});

module.exports = EntryContent;