var PostList = require( '../postList/postList.jsx' );

module.exports = React.createClass({
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
						title = data.title.rendered;
						data = [ data ];
						document.title = title;
					}
					if ( this.props.url.indexOf('filter[name]') >= 0 ) {
						document.title = data[0].title.rendered;
					}
					localStorage.setItem( this.props.url, JSON.stringify( data ) );
					this.setState({data: data});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			});
		}
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
			<PostList data={this.state.data} />
		);
	}
});