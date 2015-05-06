# Picard

Picard is an experimental prototype WordPress theme that makes use of [React](http://facebook.github.io/react/) and the new [WP-API](http://wp-api.org/).

**Please note,** it is STRONGLY recommended that this theme is not used in any production environment. It is purely for educational and testing purposes. This theme is under development so it is not recommended that you rely on any aspect of it.

## Installation

1. Install and activate the [WP REST API](https://github.com/WP-API/WP-API/tree/master) plugin (make sure that you are using the `master` branch – the default is currently develop).
2. Clone this repo to your computer in the `wp-content/themes` directory of your WordPress installation (e.g. `git clone git@github.com:Automattic/Picard.git`).
3. Run `npm install` to install the node dependencies.
4. Run `gulp build` to compile the JavaScript and Sass.
6. Run `gulp watch` to actively develop the theme and have the styles and JS files automatically update.
7. Set your permlink structure to `/%year%/%monthnum%/%day%/%postname%/`.

## Contributing

Pull requests and issues are very much welcome!

## Todos

A not exhaustive list of all things Picard still needs to do:

1. Work with different permalink structures.
2. Allow user to set a static front page.
3. Allow user to use sidebars and widgets.
4. Support all permalinks (archives, search etc)