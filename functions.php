<?php

function picard_scripts() {
	wp_enqueue_style( 'picard-style', get_stylesheet_uri(), '20141119' );

	wp_register_script( 'picard-react', get_template_directory_uri() . '/libs/react.min.js', '20141119', true );
	wp_register_script( 'picard-jsx', get_template_directory_uri() . '/libs/JSXTransformer.js', '20141119', true );
	wp_register_script( 'picard-script', get_template_directory_uri() . '/js/picard.js', array( 'jquery', 'picard-react', 'picard-jsx' ), '20141119', true );

	wp_enqueue_script( 'picard-react' );
	wp_enqueue_script( 'picard-jsx' );
	wp_enqueue_script( 'jquery' );
}
// add_action( 'wp_enqueue_scripts', 'picard_scripts' );