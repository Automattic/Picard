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
Content = React.createClass({
	loadPostsFromServer: function() {
		var postData = JSON.parse( localStorage.getItem( this.props.url ) );
		console.log( postData );
		if ( postData ) {
			this.setState({data: postData});
		} else {
			jQuery.ajax({
				url: this.props.url,
				dataType: 'json',
				success: function(data) {
					if ( data.constructor !== Array ) {
						title = data.title;
						data = [ data ];
						document.title = title;
					}
					if ( this.props.url.indexOf('filter[name]') >= 0 ) {
						document.title = data[0].title;
					}
					localStorage.setItem( this.props.url, JSON.stringify( data ) );
					this.setState({data: data});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			});
		}

		// Set body class if there isn't an animation happening
		if ( document.body.className.indexOf( 'move' ) > -1 ) {
			console.log('found it!');
		} else {
			console.log("don't found it");
			document.body.className = this.props.bodyClass;
		}

		// Scoll to top on page change
		window.scroll(0,0);
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadPostsFromServer();
	},
	componentDidUpdate: function(prevProps, prevState) {
		if( prevProps !== this.props ) {
			this.loadPostsFromServer();
		}

		// Call the single entry function render hack
		entry_thumbnail();
	},
	render: function() {
		// Check if we're just viewing one post, if so, pass the ID down
		if ( this.state.data.length === 1 ) {
			singlePostID = this.state.data[0].ID;
		} else {
			singlePostID = 0;
		}
		return (
			<Loop data={this.state.data} context={ this.props.bodyClass } postID={ singlePostID } />
		);
	}
});

module.exports = Content;