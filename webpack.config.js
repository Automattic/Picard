var fs = require( 'fs' ),
	data = require( './sample.json' ),
	React = require( 'react' ),
	babel = require( 'babel/register' ),
<<<<<<< HEAD
<<<<<<< HEAD
=======
	//posts = require( './components/content/content.jsx' );
>>>>>>> Non-working beginnings of server-side render
=======
>>>>>>> Update components for server-side rendering
	posts = React.createFactory( require( './components/content/content.jsx' ) );

//data = JSON.parse( data );

<<<<<<< HEAD
<<<<<<< HEAD
var markup = "<?php get_header(); ?>";
markup += React.renderToStaticMarkup( posts({ data: data }) );
markup += "<?php get_footer(); ?>";
=======
//var markup = "<?php get_header(); ?>";
markup = React.renderToStaticMarkup( posts({ data: data }) );
//markup += "<?php get_footer(); ?>";
>>>>>>> Non-working beginnings of server-side render
=======
var markup = "<?php get_header(); ?>";
markup += React.renderToStaticMarkup( posts({ data: data }) );
markup += "<?php get_footer(); ?>";
>>>>>>> Update components for server-side rendering

console.log( markup );

//var replacedMarkup = markup.replace( /the_title/gi, '<?php the_title(); ?>' );
//replacedMarkup = markup.replace( /the_content/gi, '<?php the_content(); ?>' );
//replacedMarkup = markup.replace( /the_loop/gi, '<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>');
//replacedMarkup = markup.replace( /end_loop/gi, '<?php endwhile; endif; ?>' );

//fs.writeFileSync( 'page.php', replacedMarkup );
