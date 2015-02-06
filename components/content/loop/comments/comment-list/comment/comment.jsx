/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Renders comment
 */
var Comment = React.createClass({

	render: function() {
		return (
			<li id="comment-{this.props.id}">
				<article id="div-comment-{this.props.id}" className="comment-body">
					<footer className="comment-meta">
						<div className="comment-author vcard">
						</div>
					</footer>
					<div className="comment-content" dangerouslySetInnerHTML={{__html: this.props.content}} />
					<div className="reply">
						<a className="comment-reply-link">Reply</a>
					</div>
				</article>
			</li>
		);
	}

});

module.exports = Comment;