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
		var d = new Date( this.props.date ),
			formattedDate = d.toDateString();

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
		var entryHeader,
			postClass;
		if ( this.props.featured_image ) {
			var thumbnailImage = {
				backgroundImage: 'url(' + this.props.featured_image.source + ')'
			};
			entryHeader = <div className="entry-thumbnail" style={thumbnailImage}>
				<header className="entry-header">
					<h1 className="entry-title">
						<a onClick={this.handleAdd} href={this.props.link} rel="bookmark">
							{this.props.title}
						</a>
					</h1>
					<div className="entry-meta">
						{formattedDate}
					</div>
				</header>
			</div>;
			postClass = this.props.post_class + " has-post-thumbnail";
		} else {
			entryHeader = <header className="entry-header">
				<h1 className="entry-title">
					<a onClick={this.handleAdd} href={this.props.link} rel="bookmark">
						{this.props.title}
					</a>
				</h1>
				<div className="entry-meta">
					{formattedDate}
				</div>
			</header>;
			postClass = this.props.post_class;
		}

		return (
			<div className="hentry-wrapper">
				<article className={ postClass }>
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