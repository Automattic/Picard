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
		var context = this.props.context;
		var postNodes = this.props.data.map( function ( post ) {
			return (
				<Hentry key={post.ID} id={post.ID} post_class={post.post_class} link={post.link} title={post.title} date={post.date} content={post.content} context={ context } /> 
			);
		});
		return (
			<div>
				<ReactCSSTransitionGroup transitionName="picard">
					{postNodes}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
});

module.exports = Loop;