<?php
if ( ! function_exists( 'picard_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function picard_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Picard, use a find and replace
	 * to change 'picard' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'picard', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'picard' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link', 'chat', 'gallery',
	) );
}
endif; // picard_setup
add_action( 'after_setup_theme', 'picard_setup' );

/**
 * Register Open Sans Google fonts for Picard.
 *
 * @return string
 */
function picard_open_sans_font_url() {
	$open_sans_font_url = '';

	/* translators: If there are characters in your language that are not supported
	 * by Open Sans, translate this to 'off'. Do not translate into your own language.
	 */
	if ( 'off' !== _x( 'on', 'Open Sans font: on or off', 'picard' ) ) {
		$subsets = 'latin,latin-ext';

		/* translators: To add an additional Open Sans character subset specific to your language,
		 * translate this to 'greek', 'cyrillic' or 'vietnamese'. Do not translate into your own language.
		 */
		$subset = _x( 'no-subset', 'Open Sans font: add new subset (greek, cyrillic, vietnamese)', 'picard' );

		if ( 'cyrillic' == $subset ) {
			$subsets .= ',cyrillic,cyrillic-ext';
		} elseif ( 'greek' == $subset ) {
			$subsets .= ',greek,greek-ext';
		} elseif ( 'vietnamese' == $subset ) {
			$subsets .= ',vietnamese';
		}

		$query_args = array(
			'family' => urlencode( 'Open Sans:300italic,400italic,600italic,700italic,300,400,600,700' ),
			'subset' => urlencode( $subsets ),
		);

		$open_sans_font_url = add_query_arg( $query_args, '//fonts.googleapis.com/css' );
	}

	return $open_sans_font_url;
}

/**
 * Register Montserrat Google fonts for Picard.
 *
 * @return string
 */
function picard_montserrat_font_url() {
	$montserrat_font_url = '';

	/* translators: If there are characters in your language that are not supported
	   by Montserrat, translate this to 'off'. Do not translate into your own language. */
	if ( 'off' !== _x( 'on', 'Montserrat font: on or off', 'picard' ) ) {

		$montserrat_font_url = add_query_arg( 'family', urlencode( 'Montserrat:400,700' ), "//fonts.googleapis.com/css" );
	}

	return $montserrat_font_url;
}

function picard_scripts() {
	wp_enqueue_style( 'genericons', get_template_directory_uri() . '/components/_shared/genericons/genericons.css', array(), '3.3' );

	wp_enqueue_style( 'picard-style', get_stylesheet_uri(), '20141230' );

	wp_register_script( 'picard-script', get_template_directory_uri() . '/picard.js', array( 'jquery' ), '20150204', true );

	wp_enqueue_script( 'picard-script' );
}
add_action( 'wp_enqueue_scripts', 'picard_scripts' );

function get_json( $_post ) {
	foreach ( $_post as $post ) {
		$_post['post_class'] = implode( ' ', get_post_class( $_post['ID'] ) );

		// Get next and previous links
		global $post;
		$post = get_post( $_post['ID'] );
		ob_start();
		echo get_next_post_link();
		$next_post_link = ob_get_contents();
		ob_end_clean();
		$next_post_link = str_replace( 'rel="next">', 'rel="next"><span class="screen-reader-text">', $next_post_link );
		$next_post_link = str_replace( '</a> &raquo;', '</span></a>', $next_post_link );
		ob_start();
		echo get_previous_post_link();
		$previous_post_link = ob_get_contents();
		ob_end_clean();
		$previous_post_link = str_replace( 'rel="prev">', 'rel="prev"><span class="screen-reader-text">', $previous_post_link );
		$previous_post_link = str_replace( '</a>', '</span></a>', $previous_post_link );
		$previous_post_link = str_replace( '&laquo; ', '', $previous_post_link );
		$_post['next_post'] = $next_post_link;
		$_post['previous_post'] = $previous_post_link;
	}
	return $_post;
}

add_filter( 'json_prepare_post', 'get_json' );

function picard_api_init() {
	global $picard_api_comments;

	$picard_api_comments = new Picard_API_Comments();
	add_filter( 'json_endpoints', array( $picard_api_comments, 'register_routes' ) );
}
add_action( 'wp_json_server_before_serve', 'picard_api_init' );

class Picard_API_Comments extends WP_JSON_Comments {
	public function register_routes( $routes ) {
		$routes['/picard/comments'] = array(
			array( array( $this, 'new_post' ), WP_JSON_Server::CREATABLE ),
		);

		return $routes;
	}

	public function new_post() {
		$commentdata = array(
			'comment_post_ID'      => $_POST['comment_post_ID'],
			'comment_author'       => $_POST['comment_author'],
			'comment_author_email' => $_POST['comment_author_email'],
			'comment_author_url'   => $_POST['comment_author_url'],
			'comment_content'      => $_POST['content'],
			'comment_author_IP'    => $_SERVER['REMOTE_ADDR'],
			'comment_type'         => '',
		);
		$comment_id = wp_new_comment( $commentdata );

		$new_comment = get_comment( $comment_id );

		$prepared_comment = $this->prepare_comment( $new_comment );

		return ( $comment_id ) ? $prepared_comment : array();
	}
}
