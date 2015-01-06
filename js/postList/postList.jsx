/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Internal dependencies
 */
var Post = require( '../post/post.jsx' );

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

PostList = React.createClass({
	render: function() {
		var postNodes = this.props.data.map( function ( post ) {
			return (
				<Post key={post.id} id={post.id} post_class={post.post_class} link={post.link} title={post.title} date={post.date} content={post.content.rendered}/> 
			);
		});
		return (
			<div>
				<ReactCSSTransitionGroup transitionName="example">
					{postNodes}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
});

module.exports = PostList;