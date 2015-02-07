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
				<h3 id="reply-title" className="comment-reply-title">Leave a reply</h3>
				<form className="comment-form" onSubmit={this.handleSubmit}>
					<p className="comment-notes"><span id="email-notes">Your email address will not be published.</span> Required fields are marked <span className="required">*</span></p>
					<p className="comment-form-author">
						<input type="text" placeholder="Name" ref="author" />
					</p>
					<p className="comment-form-email">
						<input type="text" placeholder="Email address" ref="emailAddress" />
					</p>
					<p className="comment-form-url">
						<input type="text" placeholder="Website" ref="website" />
					</p>
					<p className="comment-form-comment">
						<textarea placeholder="What do you think?" ref="text" />
					</p>
					<input type="submit" value="Post" />
				</form>
			</div>
		);
	}

});

module.exports = commentForm;