/**
 * External dependencies
 */
var React = require( 'react/addons' ),
	request = require( 'superagent' );

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

		var self = this;

		var data,
			url = repliesLink;
		request
			.get( url )
			.end( function( err, res ) {
				data = JSON.parse( res.text );
				self.setState({ data: data.reverse() });
			});
	},

	handleCommentSubmit: function( comment ) {

		var newComment,
			self = this,
			url = '/wp-json/picard/comments';
		request
			.post( url )
			.type( 'form' )
			.send( comment )
			.end( function( err, res ) {
				if ( res.ok ) {
					newComment = JSON.parse( res.text );
					self.setState( { data: self.state.data.concat( [ newComment ] ) } );
				} else {
					console.error( '/wp-json/picard/comments', err.toString() );
				}
			});

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