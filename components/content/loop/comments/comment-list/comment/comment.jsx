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
			author = this.props.comment.author,
			d = new Date( this.props.comment.date ),
			formattedDate = d.toDateString(),
			hour = ( d.getHours() < 10 ) ? "0" + d.getHours() : d.getHours(),
			min = ( d.getMinutes() < 10 ) ? "0" + d.getMinutes() : d.getMinutes(),
			sec = ( d.getSeconds() < 10 ) ? "0" + d.getSeconds() : d.getSeconds(),
			formattedTime = [ hour, min, sec ].join( ':' );

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
							<time dateTime={d}>{formattedDate + " " + formattedTime}</time>
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