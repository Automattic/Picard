/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Internal dependencies
 */
var Comment = require( '../comment/comment.jsx' );

/**
 * Renders list of comments
 */
var CommentList = React.createClass({

	render: function() {
		var commentNodes = this.props.data.map( function ( comment ) {
			return (
				<Comment key={comment.id} date={comment.date} content={comment.content} />
			);
		});
		return (
			<div>
				{commentNodes}
			</div>
		);
	}

});

module.exports = CommentList;