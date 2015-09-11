# Picard

Picard is an **experimental** prototype WordPress theme that makes use of [React](http://facebook.github.io/react/) and the new [WP-API](http://wp-api.org/).
It means, that instead of loading new page every time you click a link, it uses background *AJAX* requests to *WP REST API* to fetch data without reloading the page.

**Please note,** it is STRONGLY recommended that this theme is not used in any production environment. It is purely for educational and testing purposes. This theme is under development so it is not recommended that you rely on any aspect of it.

## Installation

### 1. Working WordPress installation
First, prepare a proper WordPress environment:

* You will obviously need a working *WordPress* installation,
* You will also need *WP REST API*. It is a plugin (with plans to incorporate into the WordPress core) that creates REST API to be used by the theme. Plugin is currently **NOT** in plugins repository, you have to upload the files manually. Install and activate the [WP REST API](https://github.com/WP-API/WP-API/tree/master) plugin (make sure that you are using the `master` branch – the default is currently develop),
* Set your permlink structure to `/%year%/%monthnum%/%day%/%postname%/`.

### 2. Theme building (for _team_ building go to your local meetup)
Unlike other themes, this one uses a build process. JavaScript is an interpreted language, but we need to take certain steps (like transpiling React JSX syntax or SASS CSS syntax) to take the files from development phase to production. You will need the following tools:

* *node.js* and *npm* - node is an command line JavaScript interpreter that is used for build process. npm stands for node package manager. You can install both from [nodejs.org](https://nodejs.org/download/),
* *[gulp](http://gulpjs.com/)* is a build system running on node. Once you install node and npm, type `npm install -g gulp` to install gulp in your system (`-g` flag installs package globally so you will now have gulp command in your command line). 

**Next, you have to set up the theme:**

1. Download the theme files to `wp-content/themes` directory of your WordPress installation. You can clone this repository (`git clone git@github.com:Automattic/Picard.git`) or just press download on the right side - [also here](https://github.com/Automattic/Picard/archive/master.zip) (remember to unzip).
2. In Picard directory, run `npm install` to install the node dependencies. npm will take care of the rest (npm installs dependencies listed in the [package.json](./package.json) file).
3. In Picard directory, run `gulp build` to compile the JavaScript and SASS. Gulp will know what to do, because proper actions are listed in the [gulpfile.js](./gulpfile.js),
4. In Picard directory, run `gulp watch` to actively develop the theme and have the styles and JS files automatically update. Watch command listens for file changes and starts build process every time you save a source file.


## Contributing

Pull requests and issues are very much welcome!

## Todos

A not exhaustive list of all things Picard still needs to do:

1. Work with different permalink structures.
2. Allow user to set a static front page.
3. Allow user to use sidebars and widgets.
4. Support all permalinks (archives, search etc)