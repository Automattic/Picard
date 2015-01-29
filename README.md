# Picard

Picard is a prototype WordPress theme that makes use of [React](http://facebook.github.io/react/) and the new [WP-API](http://wp-api.org/) which, at some point, will be going into WordPress core.

## Getting Started

You can run this theme right away by [downloading the compiled version of the theme](http://picardtheme.com/wp-content/uploads/2015/01/picard.zip). You'll just need to download, install and activate the WP-API plugin by following [these instructions](https://github.com/WP-API/WP-API/tree/master#installation).
Note: WP-API run develop as their main branch so switch to master to run Picard.
You also need node and gulp installed on your machine. You can follow this tutorial to do that: http://travismaynard.com/writing/getting-started-with-gulp

If you want to start developing with this theme, you'll need to:

1. Clone this repo to your computer (e.g. `git clone git@github.com:Automattic/Picard.git`)
1. Run `npm install` to install the node dependencies
1. Run `gulp js` to compile the JavaScript
1. Set your permlinks to /%year%/%monthnum%/%day%/%postname%/ and if required clear your localStorage.
