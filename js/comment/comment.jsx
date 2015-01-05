var Comment = React.createClass({

	render: function() {
		return (
			<li id="li-comment-{this.props.id}">
				<article id="comment-{this.props.id}" className="comment">
					<div className="comment-content" dangerouslySetInnerHTML={{__html: this.props.content}} />
				</article>
			</li>
		);
	}

});

module.exports = Comment;