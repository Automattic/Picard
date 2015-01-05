(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var page = require( 'page' );
var Posts = require( './posts' );

jQuery( 'li.page_item a' ).click( function( e ) {
	e.preventDefault();
	var url = jQuery( this ).attr('href');
	url = url.replace(/^.*\/\/[^\/]+/, '');
	page( url );
});

page( '/', function() {
	React.render(
		React.createElement(Posts, {url: "/wp-json/posts"}),
		document.getElementById( 'main' )
	);
});

page( '/:year/:month/:day/:slug', function(ctx, next) {
	var slug = ctx.params.slug;
	url = "/wp-json/posts/?filter[name]=" + slug;
	React.render(
		React.createElement(Posts, {url: url}),
		document.getElementById( 'main' )
	);
});

page( '*', function(ctx, next ) {
	var slug = ctx.pathname;
	if(slug.substr(-1) == '/') {
		slug = slug.substr(0, slug.length - 1);
	}
	var part = slug.substring(slug.lastIndexOf('/') + 1);
	url = "/wp-json/posts/?type[]=page&filter[name]=" + part;
	React.render(
		React.createElement(Posts, {url: url}),
		document.getElementById( 'main' )
	);
});

page();
},{"./posts":8,"page":9}],2:[function(require,module,exports){
var Comment = React.createClass({displayName: "Comment",

	render: function() {
		return (
			React.createElement("li", {id: "li-comment-{this.props.id}"}, 
				React.createElement("article", {id: "comment-{this.props.id}", className: "comment"}, 
					React.createElement("div", {className: "comment-content", dangerouslySetInnerHTML: {__html: this.props.content}})
				)
			)
		);
	}

});

module.exports = Comment;
},{}],3:[function(require,module,exports){
var commentForm = React.createClass({displayName: "commentForm",
	handleSubmit: function( e ) {
		e.preventDefault();
		var author = this.refs.author.getDOMNode().value.trim();
		var emailAddress = this.refs.emailAddress.getDOMNode().value.trim();
		var website = this.refs.website.getDOMNode().value.trim();
		var text = this.refs.text.getDOMNode().value.trim();
		if ( !text || !author ) {
			return;
		}
		this.props.onCommentSubmit({comment_author: author, comment_author_email: emailAddress, comment_author_url: website, content: {rendered: text} });
		this.refs.author.getDOMNode().value = '';
		this.refs.text.getDOMNode().value = '';
	},
	render: function() {
		return (
			React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
				React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
				React.createElement("input", {type: "text", placeholder: "Your email address", ref: "emailAddress"}), 
				React.createElement("input", {type: "text", placeholder: "Your website", ref: "website"}), 
				React.createElement("input", {type: "text", placeholder: "Say something…", ref: "text"}), 
				React.createElement("input", {type: "submit", value: "Post"})
			)
		);
	}

});

module.exports = commentForm;
},{}],4:[function(require,module,exports){
var Comment = require( '../comment/comment.jsx' );

var CommentList = React.createClass({displayName: "CommentList",

	render: function() {
		var commentNodes = this.props.data.map( function ( comment ) {
			return (
				React.createElement(Comment, {key: comment.id, date: comment.date, content: comment.content.rendered})
			);
		});
		return (
			React.createElement("div", null, 
				commentNodes
			)
		);
	}

});

module.exports = CommentList;
},{"../comment/comment.jsx":2}],5:[function(require,module,exports){
var CommentList = require( '../commentList/commentList.jsx' );
var CommentForm = require( '../commentForm/commentForm.jsx' );

var Comments = React.createClass({displayName: "Comments",
	loadCommentsFromServer: function() {
		var repliesLink = '/wp-json/posts/' + this.props.postID + '/comments/';
		jQuery.ajax({
			url: repliesLink,
			dataType: 'json',
			success: function( data ) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(repliesLink, status, err.toString());
			}.bind(this)
		});
	},
	handleCommentSubmit: function( comment ) {
		var comments = this.state.data;
		var newComments = comments.concat([comment]);
		newComments.unshift( newComments.pop() );
		this.setState({data: newComments});
		comment['comment_post_ID'] = this.props.postID;
		jQuery.ajax({
			url: '/wp-json/picard/comments',
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data) {
				// this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('/wp-json/picard/comments', status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadCommentsFromServer();
	},
	render: function() {
		return (
			React.createElement("div", {className: "commentBox"}, 
				React.createElement("h1", null, "Comments"), 
				React.createElement(CommentList, {data: this.state.data}), 
				React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
			)
		);
	}

});

module.exports = Comments;
},{"../commentForm/commentForm.jsx":3,"../commentList/commentList.jsx":4}],6:[function(require,module,exports){
var page = require( 'page' );
var Comments = require( '../comments/comments.jsx' );

module.exports = React.createClass({displayName: "exports",
	handleAdd: function( e ) {
		e.preventDefault();
		url = this.props.link;
		url = url.replace(/^.*\/\/[^\/]+/, '');
		page( url );
	},
	render: function() {
		return (
			React.createElement("article", {className: this.props.post_class}, 
				React.createElement("header", {className: "entry-header"}, 
					React.createElement("h1", {className: "entry-title"}, 
						React.createElement("a", {onClick: this.handleAdd, href: this.props.link, rel: "bookmark"}, 
							this.props.title
						)
					), 
					React.createElement("div", {className: "entry-meta"}, 
						this.props.date
					)
				), 

				React.createElement("div", {className: "entry-content", dangerouslySetInnerHTML: {__html: this.props.content}}), 

				React.createElement(Comments, {postID:  this.props.id})
			)
		);
	}
});
},{"../comments/comments.jsx":5,"page":9}],7:[function(require,module,exports){
var Post = require( '../post/post.jsx' );
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({displayName: "exports",
	render: function() {
		var postNodes = this.props.data.map( function ( post ) {
			return (
				React.createElement(Post, {key: post.id, id: post.id, post_class: post.post_class, link: post.link, title: post.title, date: post.date, content: post.content.rendered}) 
			);
		});
		return (
			React.createElement("div", null, 
				React.createElement(ReactCSSTransitionGroup, {transitionName: "example"}, 
					postNodes
				)
			)
		);
	}
});
},{"../post/post.jsx":6}],8:[function(require,module,exports){
var PostList = require( '../postList/postList.jsx' );

module.exports = React.createClass({displayName: "exports",
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
			React.createElement(PostList, {data: this.state.data})
		);
	}
});
},{"../postList/postList.jsx":7}],9:[function(require,module,exports){
  /* globals require, module */

/**
   * Module dependencies.
   */

  var pathtoRegexp = require('path-to-regexp');

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = window.history.location || window.location;

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
  * HashBang option
  */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {String|Function} path
   * @param {Function} fn...
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(path);
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
    // show <path> with [state]
    } else if ('string' == typeof path) {
      'string' === typeof fn
        ? page.redirect(path, fn)
        : page.show(path, fn);
    // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Get or set basepath to `path`.
   *
   * @param {String} path
   * @api public
   */

  page.base = function(path){
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options){
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) window.addEventListener('click', onclick, false);
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!'))
      ? location.hash.substr(2) + location.search
      : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function(){
    if (!running) return;
    running = false;
    window.removeEventListener('click', onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {String} path
   * @param {Object} state
   * @param {Boolean} dispatch
   * @return {Context}
   * @api public
   */

  page.show = function(path, state, dispatch){
    var ctx = new Context(path, state);
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled) ctx.pushState();
    return ctx;
  };

  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {String} from - if param 'to' is undefined redirects to 'from'
   * @param {String} [to]
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function (e) {
        setTimeout(function() {
          page.replace(to);
        },0);
      });
    }

    // Wait for the push state and replace it with another
    if('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
          page.replace(from);
      },0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {String} path
   * @param {Object} state
   * @return {Context}
   * @api public
   */

  page.replace = function(path, state, init, dispatch){
    var ctx = new Context(path, state);
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Object} ctx
   * @api private
   */

  page.dispatch = function(ctx){
    var prev = prevContext;
    var i = 0;
    var j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */

  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!','');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path == 'function') {
      return page.exit('*', path);
    };

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
  * Remove URL encoding from the given `str`.
  * Accommodates whitespace in both x-www-form-urlencoded
  * and regular percent-encoded form.
  *
  * @param {str} URL component to decode
  */
  function decodeURLEncodedURIComponent(str) {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @param {String} path
   * @param {Object} state
   * @api public
   */

  function Context(path, state) {
    path = decodeURLEncodedURIComponent(path);
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i
      ? path.slice(i + 1)
      : '';
    this.pathname = ~i
      ? path.slice(0, i)
      : path;
    this.params = [];

    // fragment
    this.hash = '';
    if (!~this.path.indexOf('#')) return;
    var parts = this.path.split('#');
    this.path = parts[0];
    this.hash = parts[1] || '';
    this.querystring = this.querystring.split('#')[0];
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function(){
    history.pushState(this.state
      , this.title
      , hashbang && this.path !== '/'
        ? '#!' + this.path
        : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function(){
    history.replaceState(this.state
      , this.title
      , hashbang && this.path !== '/'
        ? '#!' + this.path
        : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @param {String} path
   * @param {Object} options.
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options.sensitive,
      options.strict);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn){
    var self = this;
    return function(ctx, next){
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {String} path
   * @param {Array} params
   * @return {Boolean}
   * @api private
   */

  Route.prototype.match = function(path, params){
    var keys = this.keys,
        qsIndex = path.indexOf('?'),
        pathname = ~qsIndex
          ? path.slice(0, qsIndex)
          : path,
        m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];

      var val = 'string' === typeof m[i]
        ? decodeURIComponent(m[i])
        : m[i];

      if (key) {
        params[key.name] = undefined !== params[key.name]
          ? params[key.name]
          : val;
      } else {
        params.push(val);
      }
    }

    return true;
  };

  /**
   * Handle "populate" events.
   */

  function onpopstate(e) {
    if (e.state) {
      var path = e.state.path;
      page.replace(path, e.state);
    }
  }

  /**
   * Handle "click" events.
   */

  function onclick(e) {
    if (1 != which(e)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;

    // ensure link
    var el = e.target;
    while (el && 'A' != el.nodeName) el = el.parentNode;
    if (!el || 'A' != el.nodeName) return;

    // Ignore if tag has a "download" attribute
    if (el.getAttribute("download")) return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (el.pathname === location.pathname && (el.hash || '#' === link)) return;

    // Check for mailto: in the href
    if (link && link.indexOf("mailto:") > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;

    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // same page
    var orig = path;

    path = path.replace(base, '');

    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which
      ? e.button
      : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

},{"path-to-regexp":10}],10:[function(require,module,exports){
var isArray = require('isarray');

/**
 * Expose `pathtoRegexp`.
 */
module.exports = pathtoRegexp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match already escaped characters that would otherwise incorrectly appear
  // in future matches. This allows the user to escape special characters that
  // shouldn't be transformed.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)" => [undefined, undefined, undefined, "\d+", undefined]
  '([\\/.])?(?:\\:(\\w+)(?:\\(((?:\\\\.|[^)])*)\\))?|\\(((?:\\\\.|[^)])*)\\))([+*?])?',
  // Match regexp special characters that should always be escaped.
  '([.+*?=^!:${}()[\\]|\\/])'
].join('|'), 'g');

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;

  return re;
};

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array should be passed in, which will contain the placeholder key
 * names. For example `/user/:id` will then contain `["id"]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 keys
 * @param  {Object}                options
 * @return {RegExp}
 */
function pathtoRegexp (path, keys, options) {
  if (!isArray(keys)) {
    options = keys;
    keys = null;
  }

  keys = keys || [];
  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var flags = options.sensitive ? '' : 'i';
  var index = 0;

  if (path instanceof RegExp) {
    // Match all capturing groups of a regexp.
    var groups = path.source.match(/\((?!\?)/g);

    // Map all the matches to their numeric indexes and push into the keys.
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name:      i,
          delimiter: null,
          optional:  false,
          repeat:    false
        });
      }
    }

    // Return the source back to the user.
    return attachKeys(path, keys);
  }

  // Map array parts into regexps and return their source. We also pass
  // the same keys and options instance into every generation to get
  // consistent matching groups before we join the sources together.
  if (isArray(path)) {
    var parts = [];

    for (var i = 0; i < path.length; i++) {
      parts.push(pathtoRegexp(path[i], keys, options).source);
    }
    // Generate a new regexp instance by joining all the parts together.
    return attachKeys(new RegExp('(?:' + parts.join('|') + ')', flags), keys);
  }

  // Alter the path string into a usable regexp.
  path = path.replace(PATH_REGEXP, function (match, escaped, prefix, key, capture, group, suffix, escape) {
    // Avoiding re-escaping escaped characters.
    if (escaped) {
      return escaped;
    }

    // Escape regexp special characters.
    if (escape) {
      return '\\' + escape;
    }

    var repeat   = suffix === '+' || suffix === '*';
    var optional = suffix === '?' || suffix === '*';

    keys.push({
      name:      key || index++,
      delimiter: prefix || '/',
      optional:  optional,
      repeat:    repeat
    });

    // Escape the prefix character.
    prefix = prefix ? '\\' + prefix : '';

    // Match using the custom capturing group, or fallback to capturing
    // everything up to the next slash (or next period if the param was
    // prefixed with a period).
    capture = escapeGroup(capture || group || '[^' + (prefix || '\\/') + ']+?');

    // Allow parameters to be repeated more than once.
    if (repeat) {
      capture = capture + '(?:' + prefix + capture + ')*';
    }

    // Allow a parameter to be optional.
    if (optional) {
      return '(?:' + prefix + '(' + capture + '))?';
    }

    // Basic parameter support.
    return prefix + '(' + capture + ')';
  });

  // Check whether the path ends in a slash as it alters some match behaviour.
  var endsWithSlash = path[path.length - 1] === '/';

  // In non-strict mode we allow an optional trailing slash in the match. If
  // the path to match already ended with a slash, we need to remove it for
  // consistency. The slash is only valid at the very end of a path match, not
  // anywhere in the middle. This is important for non-ending mode, otherwise
  // "/test/" will match "/test//route".
  if (!strict) {
    path = (endsWithSlash ? path.slice(0, -2) : path) + '(?:\\/(?=$))?';
  }

  // In non-ending mode, we need prompt the capturing groups to match as much
  // as possible by using a positive lookahead for the end or next path segment.
  if (!end) {
    path += strict && endsWithSlash ? '' : '(?=\\/|$)';
  }

  return attachKeys(new RegExp('^' + path + (end ? '$' : ''), flags), keys);
};

},{"isarray":11}],11:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}]},{},[1]);
