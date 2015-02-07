/**
 * External dependencies
 */
var React = require( 'react/addons' );

/**
 * Internal dependencies
 */
var Loop = require( './loop/loop.jsx' );

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

		// Set body class
		document.body.className = this.props.bodyClass;
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
	},
	render: function() {
		return (
			<Loop data={this.state.data} context={ this.props.bodyClass } />
		);
	}
});

module.exports = Content;