/**
 * External dependencies
 */
var React = require( 'react/addons' ),
	page = require( 'page' );

/**
 * Internal dependencies
 */
var Hentry = require( './hentry/hentry.jsx' );

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * Renders list of posts
 */
Loop = React.createClass({
	addMoveRight: function( e ) {
		var bodyClass = document.body.className;
		document.body.className = bodyClass + ' move-right';
	},

	addMoveLeft: function( e ) {
		var bodyClass = document.body.className;
		document.body.className = bodyClass + ' move-left';
	},

	removeMove: function( e ) {
		document.body.className = 'single';
	},

	render: function() {
		var context = this.props.context,
			showExtra = false,
			next,
			previous;
		if ( this.props.postID !== 0 && this.props.postID === this.props.data[0].ID ) {
			showExtra = true;
		}

		// Detect keydown events for arrow navigation
		var self = this;

		document.onkeydown = function( e ) {
			// Left arrow keydown
			if ( e.keyCode === 37 ) {
				e.preventDefault();
				self.removeMove();
				self.addMoveLeft();
				var el = document.querySelector('.nav-previous a');
				var url = el.href;
				url = url.replace(/^.*\/\/[^\/]+/, '');
				page( url );
			}

			// Right arrow keydown
			if ( e.keyCode === 39 ) {
				e.preventDefault();
				self.removeMove();
				self.addMoveRight();
				var el = document.querySelector('.nav-next a');
				var url = el.href;
				url = url.replace(/^.*\/\/[^\/]+/, '');
				page( url );
			}
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
						<div onMouseEnter={ this.addMoveRight } onMouseOut={ this.removeMove } className="nav-next" dangerouslySetInnerHTML={{__html: next}} />
						<div onMouseEnter={ this.addMoveLeft } onMouseOut={ this.removeMove } className="nav-previous" dangerouslySetInnerHTML={{__html: previous}} />
					</div>
				</nav>
			</div>
		);
	}
});

module.exports = Loop;
