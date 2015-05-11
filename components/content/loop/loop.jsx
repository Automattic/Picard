/**
 * External dependencies
 */
var React = require( 'react/addons' ),
	page = require( 'page' );

/**
 * Internal dependencies
 */
var Hentry = require( './hentry/hentry.jsx' ),
	PostNavigation = require( './navigation/post-navigation.jsx');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * Renders list of posts
 */
Loop = React.createClass({

	render: function() {
		var context = this.props.context,
			showExtra = false,
			next,
			previous;
		if ( this.props.postID !== 0 && this.props.postID === this.props.data[0].ID ) {
			showExtra = true;
		}

		var postNodes = this.props.data.map( function ( post ) {
			return (
				<Hentry key={post.ID} id={post.ID} post_class={post.post_class} link={post.link} title={post.title} date={post.date} content={post.content} featured_image={ post.featured_image } context={ context } showExtra={ showExtra } />
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
				<ReactCSSTransitionGroup transitionName="picard">
					{ postNodes }
				</ReactCSSTransitionGroup>
				{ navigationNodes }
			</div>
		);
	}
});

module.exports = Loop;