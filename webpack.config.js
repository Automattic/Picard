var fs = require( 'fs' ),
	data = require( './sample.json' ),
	React = require( 'react' ),
	babel = require( 'babel/register' ),
	posts = React.createFactory( require( './components/content/content.jsx' ) );

//data = JSON.parse( data );

var markup = "<?php get_header(); ?>";
markup += React.renderToStaticMarkup( posts({ data: data }) );
markup += "<?php get_footer(); ?>";

console.log( markup );

//var replacedMarkup = markup.replace( /the_title/gi, '<?php the_title(); ?>' );
//replacedMarkup = markup.replace( /the_content/gi, '<?php the_content(); ?>' );
//replacedMarkup = markup.replace( /the_loop/gi, '<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>');
//replacedMarkup = markup.replace( /end_loop/gi, '<?php endwhile; endif; ?>' );

//fs.writeFileSync( 'page.php', replacedMarkup );
