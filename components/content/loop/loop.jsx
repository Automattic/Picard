/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Internal dependencies
 */
var Hentry = require( './hentry/hentry.jsx' );

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

			// Get next and previous post links
			if ( context === 'single' ) {
				next = post.next_post;
				previous = post.previous_post;
			}

			return (
				<Hentry key={post.ID} id={post.ID} post_class={post.post_class} link={post.link} title={post.title} date={post.date} content={post.content} featured_image={ post.featured_image } context={ context } showExtra={ showExtra } />
			);
		});

		return (
			<div>
			<ReactCSSTransitionGroup transitionName="picard">
				{ postNodes }
			</ReactCSSTransitionGroup>
			<nav className="navigation post-navigation" role="navigation">
				<div className="nav-links">
					<div className="nav-next" dangerouslySetInnerHTML={{__html: next}} />
					<div className="nav-previous" dangerouslySetInnerHTML={{__html: previous}} />
				</div>
			</nav>
			</div>
		);
	}
});

module.exports = Loop;
