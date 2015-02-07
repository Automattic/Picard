/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Internal dependencies
 */
var CommentList = require( './comment-list/comment-list.jsx' ),
	CommentForm = require( './comment-form/comment-form.jsx' );

/**
 * Handles getting of comments from the server and posting of comments to the server
 */
var Comments = React.createClass({
	loadCommentsFromServer: function() {
		var repliesLink = '/wp-json/posts/' + this.props.postID + '/comments/';
		jQuery.ajax({
			url: repliesLink,
			dataType: 'json',
			success: function( data ) {
				this.setState({data: data.reverse() });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(repliesLink, status, err.toString());
			}.bind(this)
		});
	},
	handleCommentSubmit: function( comment ) {
		comment['comment_post_ID'] = this.props.postID;
		jQuery.ajax( {
			url: '/wp-json/picard/comments',
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function( newComment ) {
				this.setState( { data: this.state.data.concat( [ newComment ] ) } );
			}.bind( this ),
			error: function( xhr, status, err ) {
				console.error( '/wp-json/picard/comments', status, err.toString() );
			}.bind( this )
		} );
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadCommentsFromServer();
	},
	render: function() {
		return (
			<div id="comments" className="comments-area">
				<h2 className="comments-title">Comments</h2>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}

});

module.exports = Comments;