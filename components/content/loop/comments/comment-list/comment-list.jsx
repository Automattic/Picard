/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Internal dependencies
 */
var Comment = require( './comment/comment.jsx' );

/**
 * Renders list of comments
 */
var CommentList = React.createClass({

	render: function() {
		var commentNodes = this.props.data.map( function ( comment ) {
			return (
				<Comment key={comment.ID} comment={comment} />
			);
		});
		return (
			<ol className="comment-list">
				{commentNodes}
			</ol>
		);
	}

});

module.exports = CommentList;