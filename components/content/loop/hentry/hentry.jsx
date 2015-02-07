/**
 * External dependencies
 */
var React = require( 'react/addons' ),
	page = require( 'page' );

/**
 * Internal dependencies
 */
var Comments = require( '../comments/comments.jsx' ),
	EntryContent = require( './entry-content/entry-content.jsx' );

/**
 * Animation setup
 */
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * Renders post
 */
Hentry = React.createClass({
	handleAdd: function( e ) {
		e.preventDefault();
		url = this.props.link;
		url = url.replace(/^.*\/\/[^\/]+/, '');
		page( url );
	},
	render: function() {
		// Decide whether or not to render comments and entry-content
		var comments,
			content;
		if ( this.props.context !== 'index' && this.props.showExtra === true ) {
			comments = <Comments postID={ this.props.id } />;
			entryContent = <EntryContent content={ this.props.content } />;
		} else {
			comments = '';
			entryContent = '';
		}

		// Featured image support
		var entryHeader;
		if ( this.props.featured_image ) {
			entryHeader = <div className="entry-thumbnail">
				<img src={ this.props.featured_image.source } />
				<header className="entry-header">
					<h1 className="entry-title">
						<a onClick={this.handleAdd} href={this.props.link} rel="bookmark">
							{this.props.title}
						</a>
					</h1>
					<div className="entry-meta">
						{this.props.date}
					</div>
				</header>
			</div>;
		} else {
			entryHeader = <header className="entry-header">
				<h1 className="entry-title">
					<a onClick={this.handleAdd} href={this.props.link} rel="bookmark">
						{this.props.title}
					</a>
				</h1>
				<div className="entry-meta">
					{this.props.date}
				</div>
			</header>;
		}

		return (
			<div>
				<article className={this.props.post_class}>
					{ entryHeader }

					<ReactCSSTransitionGroup transitionName="picard-content">
						{ entryContent }
					</ReactCSSTransitionGroup>
				</article>
				{ comments }
			</div>
		);
	}
});

module.exports = Hentry;