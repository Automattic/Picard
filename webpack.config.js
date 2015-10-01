var fs = require( 'fs' ),
	data = require( './sample.json' ),
	React = require( 'react' ),
	babel = require( 'babel/register' ),
	//posts = require( './components/content/content.jsx' );
	posts = React.createFactory( require( './components/content/content.jsx' ) );

//data = JSON.parse( data );

var markup = "<?php get_header(); ?>";
markup += React.renderToStaticMarkup( posts({ data: data, bodyClass: 'index' }) );
markup += "<?php get_footer(); ?>";

markup = markup.replace( /the_title/gi, '<?php the_title(); ?>' );
markup = markup.replace( /the_link/gi, '<?php the_permalink(); ?>' );
markup = markup.replace( /the_date/gi, '<?php the_date(); ?>' );
markup = markup.replace( /the_content/gi, '<?php the_content(); ?>' );
markup = markup.replace( /the_loop/gi, '<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>');
markup = markup.replace( /end_loop/gi, '<?php endwhile; endif; ?>' );

console.log( markup );

fs.writeFileSync( 'index.php', markup );



markup = "<?php get_header(); ?>";
markup += React.renderToStaticMarkup( posts({ data: data, bodyClass: 'page' }) );
markup += "<?php get_footer(); ?>";

markup = markup.replace( /the_title/gi, '<?php the_title(); ?>' );
markup = markup.replace( /the_link/gi, '<?php the_permalink(); ?>' );
markup = markup.replace( /the_date/gi, '<?php the_date(); ?>' );
markup = markup.replace( /the_content/gi, '<?php the_content(); ?>' );
markup = markup.replace( /the_loop/gi, '<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>');
markup = markup.replace( /end_loop/gi, '<?php endwhile; endif; ?>' );

console.log( markup );

fs.writeFileSync( 'page.php', markup );



markup = "<?php get_header(); ?>";
markup += React.renderToStaticMarkup( posts({ data: data, bodyClass: 'single' }) );
markup += "<?php get_footer(); ?>";

markup = markup.replace( /the_title/gi, '<?php the_title(); ?>' );
markup = markup.replace( /the_link/gi, '<?php the_permalink(); ?>' );
markup = markup.replace( /the_date/gi, '<?php the_date(); ?>' );
markup = markup.replace( /the_content/gi, '<?php the_content(); ?>' );
markup = markup.replace( /the_loop/gi, '<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>');
markup = markup.replace( /end_loop/gi, '<?php endwhile; endif; ?>' );

console.log( markup );

fs.writeFileSync( 'single.php', markup );
