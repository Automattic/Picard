/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Internal dependencies
 */
var Hentry = require( './hentry/hentry.jsx' ),
	PostNavigation = require( './navigation/post-navigation.jsx');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * Renders list of posts
 */
var Loop = React.createClass({

	render: function() {
		var context = this.props.context,
			showExtra = false,
			next,
			previous;
		if ( this.props.postID !== 0 && this.props.postID === this.props.data[0].ID ) {
			showExtra = true;
		}

		var loop;

		var postNodes = this.props.data.map( function ( post ) {
			loop = post.loop;
			return (
				<Hentry key={post.id} id={post.id} post_class={post.post_class} link={post.link} title={post.title} date={post.date} content={post.content} featured_image={ post.featured_image } context={ context } loop={post.loop} showExtra={ showExtra } />
			);
		});

		var navigationNodes = this.props.data.map( function ( post ) {
			if ( context === 'single' ) {
				return (
					<PostNavigation previous_post_url={post.previous_post_url} previous_post_title={post.previous_post_title} next_post_url={post.next_post_url} next_post_title={post.next_post_title} />
				);
			}
		});

		return (
			<div>
				{ loop ? 'the_loop' : null }
				<ReactCSSTransitionGroup transitionName="picard" component="div">
					{ postNodes }
				</ReactCSSTransitionGroup>
				{ navigationNodes }
				{ loop ? 'end_loop' : null }
			</div>
		);
	}
});

module.exports = Loop;
