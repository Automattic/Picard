var Posts = React.createClass({
	render: function() {
		return (
			<PostList />
		);
	}
});

var PostList = React.createClass({
	render: function() {
		return (
			// TODO: Add post_class to REST API
			<article className="post_class">
				<Post />
			</article>
		);
	}
})