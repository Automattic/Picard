/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Renders comment
 */
var Comment = React.createClass({

	render: function() {
		var comment = this.props.comment,
			author = this.props.comment.author;

		return (
			<li id={"comment-" + comment.ID}>
				<article id={"div-comment-" + comment.ID} className="comment-body">
					<footer className="comment-meta">
						<div className="comment-author vcard">
							<img src={author.avatar} className="avatar avatar-56" height="56" width="56" />
							<b className="fn">
								<a href={author.URL} rel="external nofollow" className="url">{author.name}</a>
							</b>
						</div>
						<div className="comment-metadata">
							<time datetime={comment.date}>{comment.date}</time>
						</div>
					</footer>
					<div className="comment-content" dangerouslySetInnerHTML={{__html: comment.content}} />
					<div className="reply">
						<a className="comment-reply-link">Reply</a>
					</div>
				</article>
			</li>
		);
	}

});

module.exports = Comment;