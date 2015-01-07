<?php

function picard_scripts() {
	wp_enqueue_style( 'picard-style', get_stylesheet_uri(), '20141230' );

	wp_register_script( 'picard-script', get_template_directory_uri() . '/js/picard.js', array( 'jquery' ), '20150106', true );

	wp_enqueue_script( 'picard-script' );
}
add_action( 'wp_enqueue_scripts', 'picard_scripts' );

function get_json( $_post ) {
	$counter;
	foreach ( $_post as $post ) {
		$_post['post_class'] = implode( ' ', get_post_class( $_post['id'] ) );
		$counter++;
	}
	// error_log( print_r( $_post, true ) );
	return $_post;
}

add_filter( 'json_prepare_post', 'get_json' );

function picard_api_init() {
	global $picard_api_comments;

	$picard_api_comments = new Picard_API_Comments();
	add_filter( 'json_endpoints', array( $picard_api_comments, 'register_routes' ) );
}
add_action( 'wp_json_server_before_serve', 'picard_api_init' );

class Picard_API_Comments {
	public function register_routes( $routes ) {
		$routes['/picard/comments'] = array(
			array( array( $this, 'get_posts' ), WP_JSON_Server::READABLE ),
			array( array( $this, 'new_post' ), WP_JSON_Server::CREATABLE ),
		);

		return $routes;
	}

	public function new_post() {
		// error_log( print_r( $_POST, true ) );
		$commentdata = array(
			'comment_post_ID'      => $_POST['comment_post_ID'],
			'comment_author'       => $_POST['comment_author'],
			'comment_author_email' => $_POST['comment_author_email'],
			'comment_author_url'   => $_POST['comment_author_url'],
			'comment_content'      => $_POST['content'],
			'comment_author_IP'    => $_SERVER['REMOTE_ADDR'],
		);
		// error_log( print_r( $commentdata, true ) );
		$comment_id = wp_new_comment( $commentdata );
		error_log( $comment_id );
	}

	public function get_posts() {
		error_log( "aaaaaaah" );
	}
}