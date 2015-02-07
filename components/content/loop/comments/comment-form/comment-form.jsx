/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Renders comment form
 */
var commentForm = React.createClass({
	handleSubmit: function( e ) {
		e.preventDefault();
		var author = this.refs.author.getDOMNode().value.trim();
		var emailAddress = this.refs.emailAddress.getDOMNode().value.trim();
		var website = this.refs.website.getDOMNode().value.trim();
		var text = this.refs.text.getDOMNode().value.trim();
		if ( !text || !author ) {
			return;
		}
		this.props.onCommentSubmit({comment_author: author, comment_author_email: emailAddress, comment_author_url: website, content: text });
		this.refs.author.getDOMNode().value = '';
		this.refs.emailAddress.getDOMNode().value = '';
		this.refs.website.getDOMNode().value = '';
		this.refs.text.getDOMNode().value = '';
	},
	render: function() {
		return (
			<div id="respond" className="comment-respond js">
				<h3 id="reply-title" className="comment-reply-title">
					Leave a reply <small><a rel="nofollow" id="cancel-comment-reply-link">Cancel reply</a></small>
				</h3>
				<form className="comment-form" onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Your name" ref="author" />
					<input type="text" placeholder="Your email address" ref="emailAddress" />
					<input type="text" placeholder="Your website" ref="website" />
					<input type="text" placeholder="Say something…" ref="text" />
					<input type="submit" value="Post" />
				</form>
			</div>
		);
	}

});

module.exports = commentForm;