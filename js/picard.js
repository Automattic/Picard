( function( $ ) {
	'use strict';
	var Posts = React.createClass({
		loadPostsFromServer: function() {
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				success: function(data) {
					this.setState({data: data});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			});
		},
		getInitialState: function() {
			return {data: []};
		},
		componentDidMount: function() {
			this.loadPostsFromServer();
		},
		render: function() {
			return (
				<PostList data={this.state.data} />
			);
		}
	});

	var PostList = React.createClass({
		render: function() {
			var postNodes = this.props.data.map( function ( post ) {
				return (
					<Post post_class={post.post_class} link={post.link} title={post.title} date={post.date} content={post.content}/> 
				);
			});
			return (
				<div>
					{postNodes}
				</div>
			);
		}
	});

	var Post = React.createClass({
		render: function() {
			return (
				// TODO: Add post_class to REST API
				<article className={this.props.post_class}>
					<header className="entry-header">
						<h1 className="entry-title">
							<a href={this.props.link} rel="bookmark">
								{this.props.title}
							</a>
						</h1>
						<div className="entry-meta">
							{this.props.date}
						</div>
					</header>

					<div className="entry-content" dangerouslySetInnerHTML={{__html: this.props.content}} />
				</article>
			);
		}
	});

	// var PostHeader = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<header className="entry-header">
	// 				<h1 className="entry-title">
	// 					<a href="{this.props.link}" rel="bookmark">
	// 						{this.props.title}
	// 					</a>
	// 				</h1>
	// 				<div className="entry-meta">
	// 					{this.props.date}
	// 				</div>
	// 			</header>
	// 		);
	// 	}
	// });

	// var PostContent = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div className="entry-content">
	// 				{this.props.content}
	// 			</div>
	// 		);
	// 	}
	// });

	React.render(
		<Posts url="/wp-json/posts" />,
		document.getElementById( 'main' )
	);
} )( jQuery );