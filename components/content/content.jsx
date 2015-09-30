/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Internal dependencies
 */
var Loop = require( './loop/loop.jsx' ),
	entry_thumbnail = require( './entry-thumbnail.js' );

/**
 * Handles getting of posts from the server
 */
var Content = React.createClass({

	componentDidMount: function() {

		// Update body class
		document.body.className = this.props.bodyClass;

		// Call the single entry function render hack
		entry_thumbnail();
	},

	componentDidUpdate: function(prevProps, prevState) {

		// Update body class
		document.body.className = this.props.bodyClass;

		// Call the single entry function render hack
		entry_thumbnail();

		// Scroll to top of page so user can see page transition
		//window.scroll(0,0);
	},

	render: function() {

		var singlePostID;

		// Check if we're just viewing one post, if so, pass the ID down
		if ( this.props.data.length === 1 ) {
			singlePostID = this.props.data[0].id;
		} else {
			singlePostID = 0;
		}

		return (
			<Loop data={this.props.data} context={ this.props.bodyClass } postID={ singlePostID } />
		);

	}
});

module.exports = Content;
