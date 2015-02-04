/**
 * External dependencies
 */
var React = require( 'react/addons' ),
	page = require( 'page' );

/**
 * Internal dependencies
 */
Comments = require( '../comments/comments.jsx' );

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
		return (
			<article className={this.props.post_class}>
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

				<div className="entry-content" dangerouslySetInnerHTML={{__html: this.props.content}} />

				<Comments postID={ this.props.id } />
			</article>
		);
	}
});

module.exports = Hentry;