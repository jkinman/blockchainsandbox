require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(96);
  
  var _path = __webpack_require__(26);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(113);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(110);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(108);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(115);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(114);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(122);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _server = __webpack_require__(129);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _prettyError = __webpack_require__(128);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _passport = __webpack_require__(42);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _schema = __webpack_require__(46);
  
  var _schema2 = _interopRequireDefault(_schema);
  
  var _routes = __webpack_require__(50);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(95);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(13);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ETHERIUM_ENDPOINT = 'https://mainnet.infura.io/mRUmnxLJW2t5fZP6WfDN'; /**
                                                                             * React Starter Kit (https://www.reactstarterkit.com/)
                                                                             *
                                                                             * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                             *
                                                                             * This source code is licensed under the MIT license found in the
                                                                             * LICENSE.txt file in the root directory of this source tree.
                                                                             */
  
  var server = global.server = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  server.use((0, _cookieParser2.default)());
  server.use(_bodyParser2.default.urlencoded({ extended: true }));
  server.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  server.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
    /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
  }));
  server.use(_passport2.default.initialize());
  
  server.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  server.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  server.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
      schema: _schema2.default,
      graphiql: true,
      rootValue: { request: req },
      pretty: ("development") !== 'production'
    };
  }));
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      var statusCode, template, data, css, context;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              statusCode = 200;
              template = __webpack_require__(92);
              data = { title: '', description: '', css: '', body: '', entry: _assets2.default.main.js };
  
  
              if (false) {
                data.trackingId = _config.analytics.google.trackingId;
              }
  
              css = [];
              context = {
                insertCss: function insertCss(styles) {
                  return css.push(styles._getCss());
                },
                onSetTitle: function onSetTitle(value) {
                  return data.title = value;
                },
                onSetMeta: function onSetMeta(key, value) {
                  return data[key] = value;
                },
                onPageNotFound: function onPageNotFound() {
                  return statusCode = 404;
                }
              };
              _context.next = 9;
              return _routes2.default.dispatch({ path: req.path, query: req.query, context: context }, function (state, component) {
                data.body = _server2.default.renderToString(component);
                data.css = css.join('');
              });
  
            case 9:
  
              res.status(statusCode);
              res.send(template(data));
              _context.next = 16;
              break;
  
            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](0);
  
              next(_context.t0);
  
            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 13]]);
    }));
  
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  server.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var template = __webpack_require__(91);
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.send(template({
      message: err.message,
      stack:  false ? '' : err.stack
    }));
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  server.listen(_config.port, function () {
    /* eslint-disable no-console */
    console.log('The server is running at http://localhost:' + _config.port + '/');
  });

/***/ }),
/* 1 */
/***/ (function(module, exports) {

  module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(23);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(22);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(105);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(17);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

  module.exports = require("graphql");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable max-len */
  /* jscs:disable maximumLineLength */
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'postgresql://demo:Lqk62xg6TBm5UhfR@demo.ctbl5itzitm4.us-east-1.rds.amazonaws.com:5432/membership01';
  
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(103);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(104);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(7);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(8);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(9);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(11);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(10);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Location = __webpack_require__(40);
  
  var _Location2 = _interopRequireDefault(_Location);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _ref;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        var allowTransition = true;
  
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          if (_this.props.to) {
            _Location2.default.push(_this.props.to);
          } else {
            _Location2.default.push({
              pathname: event.currentTarget.pathname,
              search: event.currentTarget.search
            });
          }
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    } // eslint-disable-line react/prefer-stateless-function
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            to = _props.to,
            props = (0, _objectWithoutProperties3.default)(_props, ['to']); // eslint-disable-line no-use-before-define
  
        return _react2.default.createElement('a', (0, _extends3.default)({ href: _Location2.default.createHref(to) }, props, { onClick: this.handleClick }));
      }
    }]);
    return Link;
  }(_react.Component);
  
  Link.propTypes = {
    to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
    onClick: _react.PropTypes.func
  };
  exports.default = Link;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(18);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(124);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(13);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

  "use strict";
  
  exports.__esModule = true;
  
  exports.default = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

/***/ }),
/* 17 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

  module.exports = require("bluebird");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _defineProperty = __webpack_require__(99);
  
  var _defineProperty2 = _interopRequireDefault(_defineProperty);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }
  
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */
  
  exports.merge = function merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = merge(attrs, a[i]);
      }
      return attrs;
    }
    var ac = a['class'];
    var bc = b['class'];
  
    if (ac || bc) {
      ac = ac || [];
      bc = bc || [];
      if (!Array.isArray(ac)) ac = [ac];
      if (!Array.isArray(bc)) bc = [bc];
      a['class'] = ac.concat(bc).filter(nulls);
    }
  
    for (var key in b) {
      if (key != 'class') {
        a[key] = b[key];
      }
    }
  
    return a;
  };
  
  /**
   * Filter null `val`s.
   *
   * @param {*} val
   * @return {Boolean}
   * @api private
   */
  
  function nulls(val) {
    return val != null && val !== '';
  }
  
  /**
   * join array as classes.
   *
   * @param {*} val
   * @return {String}
   */
  exports.joinClasses = joinClasses;
  function joinClasses(val) {
    return (Array.isArray(val) ? val.map(joinClasses) :
      (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
      [val]).filter(nulls).join(' ');
  }
  
  /**
   * Render the given classes.
   *
   * @param {Array} classes
   * @param {Array.<Boolean>} escaped
   * @return {String}
   */
  exports.cls = function cls(classes, escaped) {
    var buf = [];
    for (var i = 0; i < classes.length; i++) {
      if (escaped && escaped[i]) {
        buf.push(exports.escape(joinClasses([classes[i]])));
      } else {
        buf.push(joinClasses(classes[i]));
      }
    }
    var text = joinClasses(buf);
    if (text.length) {
      return ' class="' + text + '"';
    } else {
      return '';
    }
  };
  
  
  exports.style = function (val) {
    if (val && typeof val === 'object') {
      return Object.keys(val).map(function (style) {
        return style + ':' + val[style];
      }).join(';');
    } else {
      return val;
    }
  };
  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  exports.attr = function attr(key, val, escaped, terse) {
    if (key === 'style') {
      val = exports.style(val);
    }
    if ('boolean' == typeof val || null == val) {
      if (val) {
        return ' ' + (terse ? key : key + '="' + key + '"');
      } else {
        return '';
      }
    } else if (0 == key.indexOf('data') && 'string' != typeof val) {
      if (JSON.stringify(val).indexOf('&') !== -1) {
        console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                     'will be escaped to `&amp;`');
      };
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will eliminate the double quotes around dates in ' +
                     'ISO form after 2.0.0');
      }
      return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
    } else if (escaped) {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + exports.escape(val) + '"';
    } else {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + val + '"';
    }
  };
  
  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} escaped
   * @return {String}
   */
  exports.attrs = function attrs(obj, terse){
    var buf = [];
  
    var keys = Object.keys(obj);
  
    if (keys.length) {
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i]
          , val = obj[key];
  
        if ('class' == key) {
          if (val = joinClasses(val)) {
            buf.push(' ' + key + '="' + val + '"');
          }
        } else {
          buf.push(exports.attr(key, val, false, terse));
        }
      }
    }
  
    return buf.join('');
  };
  
  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */
  
  var jade_encode_html_rules = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };
  var jade_match_html = /[&<>"]/g;
  
  function jade_encode_char(c) {
    return jade_encode_html_rules[c] || c;
  }
  
  exports.escape = jade_escape;
  function jade_escape(html){
    var result = String(html).replace(jade_match_html, jade_encode_char);
    if (result === '' + html) return html;
    else return result;
  };
  
  /**
   * Re-throw the given `err` in context to the
   * the jade in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @api private
   */
  
  exports.rethrow = function rethrow(err, filename, lineno, str){
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || __webpack_require__(25).readFileSync(filename, 'utf8')
    } catch (ex) {
      rethrow(err, null, lineno)
    }
    var context = 3
      , lines = str.split('\n')
      , start = Math.max(lineno - context, 0)
      , end = Math.min(lines.length, lineno + context);
  
    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');
  
    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Jade') + ':' + lineno
      + '\n' + context + '\n\n' + err.message;
    throw err;
  };
  
  exports.DebugItem = function DebugItem(lineno, filename) {
    this.lineno = lineno;
    this.filename = filename;
  }


/***/ }),
/* 22 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

  module.exports = require("fs");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

  module.exports = require("path");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

  module.exports = require("web3");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _create = __webpack_require__(19);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _classCallCheck2 = __webpack_require__(16);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  var Match = function Match(route, path, keys, match) {
    (0, _classCallCheck3.default)(this, Match);
  
    this.route = route;
    this.path = path;
    this.params = (0, _create2.default)(null);
    for (var i = 1; i < match.length; i++) {
      this.params[keys[i - 1].name] = decodeParam(match[i]);
    }
  };
  
  function decodeParam(val) {
    if (!(typeof val === 'string' || val instanceof String)) {
      return val;
    }
  
    try {
      return decodeURIComponent(val);
    } catch (e) {
      var err = new TypeError('Failed to decode param \'' + val + '\'');
      err.status = 400;
      throw err;
    }
  }
  
  exports.default = Match;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _classCallCheck2 = __webpack_require__(16);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(20);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _pathToRegexp = __webpack_require__(93);
  
  var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);
  
  var _Match = __webpack_require__(28);
  
  var _Match2 = _interopRequireDefault(_Match);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  var Route = function () {
    function Route(path, handlers) {
      (0, _classCallCheck3.default)(this, Route);
  
      this.path = path;
      this.handlers = handlers;
      this.regExp = (0, _pathToRegexp2.default)(path, this.keys = []);
    }
  
    (0, _createClass3.default)(Route, [{
      key: 'match',
      value: function match(path) {
        var m = this.regExp.exec(path);
        return m ? new _Match2.default(this, path, this.keys, m) : null;
      }
    }]);
    return Route;
  }();
  
  exports.default = Route;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _slicedToArray2 = __webpack_require__(61);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _regenerator = __webpack_require__(62);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _getIterator2 = __webpack_require__(59);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _asyncToGenerator2 = __webpack_require__(60);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _create = __webpack_require__(19);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _classCallCheck2 = __webpack_require__(16);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(20);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _Route = __webpack_require__(29);
  
  var _Route2 = _interopRequireDefault(_Route);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var emptyFunction = function emptyFunction() {}; /**
                                                    * React Routing | http://www.kriasoft.com/react-routing
                                                    * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
                                                    */
  
  var Router = function () {
  
    /**
     * Creates a new instance of the `Router` class.
     */
    function Router(initialize) {
      (0, _classCallCheck3.default)(this, Router);
  
      this.routes = [];
      this.events = (0, _create2.default)(null);
  
      if (typeof initialize === 'function') {
        initialize(this.on.bind(this));
      }
    }
  
    /**
     * Adds a new route to the routing table or registers an event listener.
     *
     * @param {String} path A string in the Express format, an array of strings, or a regular expression.
     * @param {Function|Array} handlers Asynchronous route handler function(s).
     */
  
  
    (0, _createClass3.default)(Router, [{
      key: 'on',
      value: function on(path) {
        for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          handlers[_key - 1] = arguments[_key];
        }
  
        if (path === 'error') {
          this.events[path] = handlers[0];
        } else {
          this.routes.push(new _Route2.default(path, handlers));
        }
      }
    }, {
      key: 'dispatch',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, cb) {
          var next = function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
              var _handlers$next;
  
              var _value, _value2, match, handler;
  
              return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!((_handlers$next = handlers.next(), value = _handlers$next.value, done = _handlers$next.done, _handlers$next) && !done)) {
                        _context2.next = 13;
                        break;
                      }
  
                      _value = value, _value2 = (0, _slicedToArray3.default)(_value, 2), match = _value2[0], handler = _value2[1];
  
                      state.params = match.params;
  
                      if (!(handler.length > 1)) {
                        _context2.next = 9;
                        break;
                      }
  
                      _context2.next = 6;
                      return handler(state, next);
  
                    case 6:
                      _context2.t0 = _context2.sent;
                      _context2.next = 12;
                      break;
  
                    case 9:
                      _context2.next = 11;
                      return handler(state);
  
                    case 11:
                      _context2.t0 = _context2.sent;
  
                    case 12:
                      return _context2.abrupt('return', _context2.t0);
  
                    case 13:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
  
            return function next() {
              return _ref2.apply(this, arguments);
            };
          }();
  
          var routes, handlers, value, result, done;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (typeof state === 'string' || state instanceof String) {
                    state = { path: state };
                  }
                  cb = cb || emptyFunction;
                  routes = this.routes;
                  handlers = /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, route, match, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, handler;
  
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3.default)(routes);
  
                          case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                              _context.next = 38;
                              break;
                            }
  
                            route = _step.value;
                            match = route.match(state.path);
  
                            if (!match) {
                              _context.next = 35;
                              break;
                            }
  
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context.prev = 12;
                            _iterator2 = (0, _getIterator3.default)(match.route.handlers);
  
                          case 14:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                              _context.next = 21;
                              break;
                            }
  
                            handler = _step2.value;
                            _context.next = 18;
                            return [match, handler];
  
                          case 18:
                            _iteratorNormalCompletion2 = true;
                            _context.next = 14;
                            break;
  
                          case 21:
                            _context.next = 27;
                            break;
  
                          case 23:
                            _context.prev = 23;
                            _context.t0 = _context['catch'](12);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context.t0;
  
                          case 27:
                            _context.prev = 27;
                            _context.prev = 28;
  
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                              _iterator2.return();
                            }
  
                          case 30:
                            _context.prev = 30;
  
                            if (!_didIteratorError2) {
                              _context.next = 33;
                              break;
                            }
  
                            throw _iteratorError2;
  
                          case 33:
                            return _context.finish(30);
  
                          case 34:
                            return _context.finish(27);
  
                          case 35:
                            _iteratorNormalCompletion = true;
                            _context.next = 5;
                            break;
  
                          case 38:
                            _context.next = 44;
                            break;
  
                          case 40:
                            _context.prev = 40;
                            _context.t1 = _context['catch'](3);
                            _didIteratorError = true;
                            _iteratorError = _context.t1;
  
                          case 44:
                            _context.prev = 44;
                            _context.prev = 45;
  
                            if (!_iteratorNormalCompletion && _iterator.return) {
                              _iterator.return();
                            }
  
                          case 47:
                            _context.prev = 47;
  
                            if (!_didIteratorError) {
                              _context.next = 50;
                              break;
                            }
  
                            throw _iteratorError;
  
                          case 50:
                            return _context.finish(47);
  
                          case 51:
                            return _context.finish(44);
  
                          case 52:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, this, [[3, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
                  })();
                  value = void 0, result = void 0, done = false;
  
                case 5:
                  if (done) {
                    _context3.next = 15;
                    break;
                  }
  
                  _context3.next = 8;
                  return next();
  
                case 8:
                  result = _context3.sent;
  
                  if (!result) {
                    _context3.next = 13;
                    break;
                  }
  
                  state.statusCode = typeof state.statusCode === 'number' ? state.statusCode : 200;
                  cb(state, result);
                  return _context3.abrupt('return');
  
                case 13:
                  _context3.next = 5;
                  break;
  
                case 15:
                  if (!this.events.error) {
                    _context3.next = 31;
                    break;
                  }
  
                  _context3.prev = 16;
  
                  state.statusCode = 404;
                  _context3.next = 20;
                  return this.events.error(state, new Error('Cannot found a route matching \'' + state.path + '\'.'));
  
                case 20:
                  result = _context3.sent;
  
                  cb(state, result);
                  _context3.next = 31;
                  break;
  
                case 24:
                  _context3.prev = 24;
                  _context3.t0 = _context3['catch'](16);
  
                  state.statusCode = 500;
                  _context3.next = 29;
                  return this.events.error(state, _context3.t0);
  
                case 29:
                  result = _context3.sent;
  
                  cb(state, result);
  
                case 31:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[16, 24]]);
        }));
  
        function dispatch(_x, _x2) {
          return _ref.apply(this, arguments);
        }
  
        return dispatch;
      }()
    }]);
    return Router;
  }();
  
  exports.default = Router;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(7);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(8);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(9);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(11);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(10);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(116);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(78);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Header = __webpack_require__(36);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(34);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(35);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App(props, context) {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props, context));
      //   this.state = {
      //     blockNumber:0,
      //     blockArray:[],
      // };
      //   if (typeof web3 !== 'undefined') {
      //     web3 = new Web3(web3.currentProvider);
      //   } else {
      //     // set the provider you want from Web3.providers
      //     web3 = new Web3(new Web3.providers.HttpProvider(ETHERIUM_ENDPOINT));
      //   }
    }
  
    (0, _createClass3.default)(App, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // web3.eth.subscribe( 'newBlockHeaders', (error, result) => {
        //   this.setState({blockArray: [...this.state.blockArray, result]})
        // });
  
        // web3.eth.getBlockNumber().then((data) => {
        //   this.setState({blockNumber: data})
        // });
  
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _emptyFunction2.default,
          onSetTitle: context.onSetTitle || _emptyFunction2.default,
          onSetMeta: context.onSetMeta || _emptyFunction2.default,
          onPageNotFound: context.onPageNotFound || _emptyFunction2.default
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        var insertCss = this.props.context.insertCss;
  
        this.removeCss = insertCss(_App2.default);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        return !this.props.error ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, null),
          this.props.children
        ) : this.props.children;
      }
    }]);
    return App;
  }(_react.Component);
  
  App.propTypes = {
    context: _react.PropTypes.shape({
      insertCss: _react.PropTypes.func,
      onSetTitle: _react.PropTypes.func,
      onSetMeta: _react.PropTypes.func,
      onPageNotFound: _react.PropTypes.func
    }),
    children: _react.PropTypes.element.isRequired,
    error: _react.PropTypes.object
  };
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    onSetTitle: _react.PropTypes.func.isRequired,
    onSetMeta: _react.PropTypes.func.isRequired,
    onPageNotFound: _react.PropTypes.func.isRequired
  };
  exports.default = App;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(7);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(8);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(9);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(11);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(10);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ContentPage = __webpack_require__(79);
  
  var _ContentPage2 = _interopRequireDefault(_ContentPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ContentPage = function (_Component) {
    (0, _inherits3.default)(ContentPage, _Component);
  
    function ContentPage() {
      (0, _classCallCheck3.default)(this, ContentPage);
      return (0, _possibleConstructorReturn3.default)(this, (ContentPage.__proto__ || (0, _getPrototypeOf2.default)(ContentPage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ContentPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(this.props.title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _ContentPage2.default.root },
          _react2.default.createElement(
            'div',
            { className: _ContentPage2.default.container },
            this.props.path === '/' ? null : _react2.default.createElement(
              'h1',
              null,
              this.props.title
            ),
            _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content || '' } })
          )
        );
      }
    }]);
    return ContentPage;
  }(_react.Component); /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  ContentPage.propTypes = {
    path: _react.PropTypes.string.isRequired,
    content: _react.PropTypes.string.isRequired,
    title: _react.PropTypes.string
  };
  ContentPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(ContentPage, _ContentPage2.default);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(7);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(8);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(9);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(11);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(10);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(80);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Error'; /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  var ErrorPage = function (_Component) {
    (0, _inherits3.default)(ErrorPage, _Component);
  
    function ErrorPage() {
      (0, _classCallCheck3.default)(this, ErrorPage);
      return (0, _possibleConstructorReturn3.default)(this, (ErrorPage.__proto__ || (0, _getPrototypeOf2.default)(ErrorPage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ErrorPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            title
          ),
          _react2.default.createElement(
            'p',
            null,
            'Sorry, an critical error occurred on this page.'
          )
        );
      }
    }]);
    return ErrorPage;
  }(_react.Component);
  
  ErrorPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired,
    onPageNotFound: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(ErrorPage, _ErrorPage2.default);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Feedback = __webpack_require__(81);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Feedback() {
    return _react2.default.createElement(
      'div',
      { className: _Feedback2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Feedback2.default.container },
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://gitter.im/kriasoft/react-starter-kit'
          },
          'Ask a question'
        ),
        _react2.default.createElement(
          'span',
          { className: _Feedback2.default.spacer },
          '|'
        ),
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://github.com/kriasoft/react-starter-kit/issues/new'
          },
          'Report an issue'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  exports.default = (0, _withStyles2.default)(Feedback, _Feedback2.default);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Footer = __webpack_require__(82);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Link = __webpack_require__(14);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Footer() {
    return _react2.default.createElement(
      'div',
      { className: _Footer2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Footer2.default.container },
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.text },
          '\xA9 Your Company'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '\xB7'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/' },
          'Home'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '\xB7'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/privacy' },
          'Privacy'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '\xB7'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/not-found' },
          'Not Found'
        )
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(Footer, _Footer2.default);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Header = __webpack_require__(83);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Link = __webpack_require__(14);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(37);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Header(props) {
    return _react2.default.createElement(
      'div',
      { className: _Header2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Header2.default.container },
        _react2.default.createElement(_Navigation2.default, { className: _Header2.default.nav }),
        _react2.default.createElement(
          'span',
          { className: _Header2.default.brandTxt },
          'Crypto Litterbox'
        ),
        _react2.default.createElement(
          'div',
          { className: _Header2.default.banner },
          _react2.default.createElement(
            'h2',
            { className: _Header2.default.bannerTitle },
            'Block Number'
          )
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  exports.default = (0, _withStyles2.default)(Header, _Header2.default);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(109);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(84);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(14);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Navigation(_ref) {
    var className = _ref.className;
  
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_Navigation2.default.root, className), role: 'navigation' },
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/about' },
        'About'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/contact' },
        'Contact'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        ' | '
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/login' },
        'Log in'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        'or'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight), to: '/register' },
        'Sign up'
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Navigation.propTypes = {
    className: _react.PropTypes.string
  };
  
  exports.default = (0, _withStyles2.default)(Navigation, _Navigation2.default);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(7);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(8);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(9);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(11);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(10);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _NotFoundPage = __webpack_require__(85);
  
  var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Page Not Found'; /**
                                 * React Starter Kit (https://www.reactstarterkit.com/)
                                 *
                                 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                 *
                                 * This source code is licensed under the MIT license found in the
                                 * LICENSE.txt file in the root directory of this source tree.
                                 */
  
  var NotFoundPage = function (_Component) {
    (0, _inherits3.default)(NotFoundPage, _Component);
  
    function NotFoundPage() {
      (0, _classCallCheck3.default)(this, NotFoundPage);
      return (0, _possibleConstructorReturn3.default)(this, (NotFoundPage.__proto__ || (0, _getPrototypeOf2.default)(NotFoundPage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(NotFoundPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        this.context.onPageNotFound();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            title
          ),
          _react2.default.createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          )
        );
      }
    }]);
    return NotFoundPage;
  }(_react.Component);
  
  NotFoundPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired,
    onPageNotFound: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(NotFoundPage, _NotFoundPage2.default);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _toConsumableArray2 = __webpack_require__(106);
  
  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
  
  var _getPrototypeOf = __webpack_require__(7);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(8);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(9);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(11);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(10);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _web = __webpack_require__(27);
  
  var _web2 = _interopRequireDefault(_web);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _SnakeGame = __webpack_require__(86);
  
  var _SnakeGame2 = _interopRequireDefault(_SnakeGame);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ETHERIUM_ENDPOINT = 'https://mainnet.infura.io/mRUmnxLJW2t5fZP6WfDN';
  var web3 = void 0;
  
  // Canvas & Context
  var canvas;
  var ctx;
  
  // Snake
  var snake;
  var snake_dir;
  var snake_next_dir;
  var snake_speed;
  
  // Food
  var food = [{ x: 0, y: 0 }];
  
  // Score
  var score;
  
  // Wall
  var wall;
  
  // HTML Elements
  var screen_snake;
  var screen_menu;
  var screen_setting;
  var screen_gameover;
  var button_newgame_menu;
  var button_newgame_setting;
  var button_newgame_gameover;
  var button_setting_menu;
  var button_setting_gameover;
  var ele_score;
  var speed_setting;
  var wall_setting;
  
  var SnakeGame = function (_Component) {
      (0, _inherits3.default)(SnakeGame, _Component);
  
      function SnakeGame(props, context) {
          (0, _classCallCheck3.default)(this, SnakeGame);
  
          var _this = (0, _possibleConstructorReturn3.default)(this, (SnakeGame.__proto__ || (0, _getPrototypeOf2.default)(SnakeGame)).call(this, props, context));
  
          _this.state = {
              blockNumber: 0,
              blockArray: []
          };
  
          web3 = new _web2.default(new _web2.default.providers.HttpProvider('https://mainnet.infura.io/mRUmnxLJW2t5fZP6WfDN'));
  
          return _this;
      }
  
      (0, _createClass3.default)(SnakeGame, [{
          key: 'activeDot',
          value: function activeDot(x, y) {
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(x * 10, y * 10, 10, 10);
          }
      }, {
          key: 'changeDir',
          value: function changeDir(key) {
  
              if (key == 38 && snake_dir != 2) {
                  snake_next_dir = 0;
              } else {
  
                  if (key == 39 && snake_dir != 3) {
                      snake_next_dir = 1;
                  } else {
  
                      if (key == 40 && snake_dir != 0) {
                          snake_next_dir = 2;
                      } else {
  
                          if (key == 37 && snake_dir != 1) {
                              snake_next_dir = 3;
                          }
                      }
                  }
              }
          }
      }, {
          key: 'addFood',
          value: function addFood(data) {
              var x = Math.floor(Math.random() * (canvas.width / 10 - 1));
              var y = Math.floor(Math.random() * (canvas.height / 10 - 1));
              for (var i = 0; i < snake.length; i++) {
                  if (this.checkBlock(x, y, snake[i].x, snake[i].y)) {
                      this.addFood();
                  }
              }
              food.push({ x: x, y: y });
          }
      }, {
          key: 'checkBlock',
          value: function checkBlock(x, y, _x, _y) {
              return x == _x && y == _y ? true : false;
          }
      }, {
          key: 'altScore',
          value: function altScore(score_val) {
              this.refs.ele_score.innerHTML = String(score_val);
          }
      }, {
          key: 'mainLoop',
          value: function mainLoop() {
              var _this2 = this;
  
              var _x = snake[0].x;
              var _y = snake[0].y;
              snake_dir = snake_next_dir;
  
              // 0 - Up, 1 - Right, 2 - Down, 3 - Left
              switch (snake_dir) {
                  case 0:
                      _y--;break;
                  case 1:
                      _x++;break;
                  case 2:
                      _y++;break;
                  case 3:
                      _x--;break;
              }
  
              snake.pop();
              snake.unshift({ x: _x, y: _y });
  
              // Wall
  
              if (wall == 1) {
                  // On
                  if (snake[0].x < 0 || snake[0].x == canvas.width / 10 || snake[0].y < 0 || snake[0].y == canvas.height / 10) {
                      this.showScreen(3);
                      return;
                  }
              } else {
                  // Off
                  for (var i = 0, x = snake.length; i < x; i++) {
                      if (snake[i].x < 0) {
                          snake[i].x = snake[i].x + canvas.width / 10;
                      }
                      if (snake[i].x == canvas.width / 10) {
                          snake[i].x = snake[i].x - canvas.width / 10;
                      }
                      if (snake[i].y < 0) {
                          snake[i].y = snake[i].y + canvas.height / 10;
                      }
                      if (snake[i].y == canvas.height / 10) {
                          snake[i].y = snake[i].y - canvas.height / 10;
                      }
                  }
              }
  
              // Autophagy death
              for (var i = 1; i < snake.length; i++) {
                  if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                      this.showScreen(3);
                      return;
                  }
              }
  
              // Eat Food
              food.map(function (nug, i, a) {
                  if (_this2.checkBlock(snake[0].x, snake[0].y, nug.x, nug.y)) {
                      snake[snake.length] = { x: snake[0].x, y: snake[0].y };
                      score += 1;
                      _this2.altScore(score);
                      // this.addFood();
                      a.splice(i, 1);
                      _this2.activeDot(nug.x, nug.y);
                  }
              });
  
              ctx.beginPath();
              ctx.fillStyle = "#000000";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              for (var i = 0; i < snake.length; i++) {
                  this.activeDot(snake[i].x, snake[i].y);
              }
  
              food.map(function (e, i) {
                  return _this2.activeDot(e.x, e.y);
              });
              setTimeout(this.mainLoop.bind(this), snake_speed);
          }
      }, {
          key: 'newGame',
          value: function newGame() {
              var _this3 = this;
  
              this.showScreen(0);
              this.refs.screen_snake.focus();
  
              snake = [];
              for (var i = 4; i >= 0; i--) {
                  snake.push({ x: i, y: 15 });
              }
  
              snake_next_dir = 1;
  
              score = 0;
              this.altScore(score);
  
              this.addFood();
  
              canvas.onkeydown = function (evt) {
                  evt = evt || window.event;
                  _this3.changeDir(evt.keyCode);
              };
              this.mainLoop();
          }
  
          // Change the snake speed...
          // 150 = slow
          // 100 = normal
          // 50 = fast
  
      }, {
          key: 'setSnakeSpeed',
          value: function setSnakeSpeed(speed_value) {
              snake_speed = speed_value;
          }
      }, {
          key: 'setWall',
          value: function setWall(wall_value) {
              wall = wall_value;
              if (wall == 0) {
                  this.refs.screen_snake.style.borderColor = "#606060";
              }
              if (wall == 1) {
                  this.refs.screen_snake.style.borderColor = "#202020";
              }
          }
  
          /////////////////////////////////////////////////////////////
  
          // 0 for the game
          // 1 for the main menu
          // 2 for the settings screen
          // 3 for the game over screen
  
      }, {
          key: 'showScreen',
          value: function showScreen(screen_opt) {
  
              switch (screen_opt) {
  
                  case 0:
                      this.refs.screen_snake.style.display = "block";
                      this.refs.screen_menu.style.display = "none";
                      this.refs.screen_setting.style.display = "none";
                      this.refs.screen_gameover.style.display = "none";
                      break;
  
                  case 1:
                      this.refs.screen_snake.style.display = "none";
                      this.refs.screen_menu.style.display = "block";
                      this.refs.screen_setting.style.display = "none";
                      this.refs.screen_gameover.style.display = "none";
                      break;
  
                  case 2:
                      this.refs.screen_snake.style.display = "none";
                      this.refs.screen_menu.style.display = "none";
                      this.refs.screen_setting.style.display = "block";
                      this.refs.screen_gameover.style.display = "none";
                      break;
  
                  case 3:
                      this.refs.screen_snake.style.display = "none";
                      this.refs.screen_menu.style.display = "none";
                      this.refs.screen_setting.style.display = "none";
                      this.refs.screen_gameover.style.display = "block";
                      break;
              }
          }
      }, {
          key: 'makeBlockChainEvents',
          value: function makeBlockChainEvents() {
              var _this4 = this;
  
              this.syncingSubscription = web3.eth.subscribe('syncing', function (error, sync) {
                  console.log('syncing event ' + sync);
                  if (!error) console.log('error syncing event ' + error);
              }).on("data", function (sync) {
                  console.log('data event ' + sync);
              }).on("changed", function (isSyncing) {
                  console.log('changed event ' + sync);
                  if (isSyncing) {
                      // stop app operation
                  } else {
                          // regain app operation
                      }
              });
  
              this.newBlocksSubscription = web3.eth.subscribe('newBlockHeaders', console.log).on("data", console.log);
  
              web3.eth.getBlockNumber().then(function (data) {
                  console.log('getBlockNumber ' + data);
                  if (_this4.state.blockNumber !== data) {
                      var currBlockObj = web3.eth.getBlock(data).then(function (block) {
                          if (!block) return;
                          _this4.setState({ blockArray: [].concat((0, _toConsumableArray3.default)(_this4.state.blockArray), [block]) });
                          _this4.addFood(block);
                      }).error(console.error);
                  }
                  _this4.setState({ blockNumber: data });
              }).error(console.error);
  
              setTimeout(this.makeBlockChainEvents.bind(this), 3000);
          }
      }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
              this.newBlocksSubscription.unsubscribe();
              this.syncingSubscription.unsubscribe();
          }
      }, {
          key: 'componentDidMount',
          value: function componentDidMount() {
              var _this5 = this;
  
              this.makeBlockChainEvents();
  
              canvas = document.getElementById("snake");
              ctx = canvas.getContext("2d");
  
              this.refs.button_newgame_menu.onclick = function () {
                  _this5.newGame();
              };
              this.refs.button_newgame_gameover.onclick = function () {
                  _this5.newGame();
              };
              // this.refs.button_newgame_setting.onclick = () =>  {this.newGame();}; 
              // this.refs.button_setting_menu.onclick = () => {this.showScreen(2);};
              // this.refs.button_setting_gameover.onclick = () => {this.showScreen(2)};
  
              this.setSnakeSpeed(150);
              this.setWall(1);
              this.showScreen(1);
  
              document.addEventListener("keydown", function (evt) {
                  if (_this5.refs.screen_gameover.style.display == "block") {
                      evt = evt || window.event;
                      if (evt.keyCode == 32) {
                          _this5.newGame();
                      }
                  }
              });
  
              this.newGame();
          }
      }, {
          key: 'render',
          value: function render() {
  
              return _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                      'header',
                      { className: 'wrap' },
                      _react2.default.createElement(
                          'h1',
                          null,
                          'Current Block - ',
                          this.state.blockNumber
                      ),
                      _react2.default.createElement(
                          'p',
                          { className: 'score' },
                          'Score: ',
                          _react2.default.createElement(
                              'span',
                              { id: 'score_value', ref: 'ele_score' },
                              '0'
                          )
                      )
                  ),
                  _react2.default.createElement('canvas', { className: 'wrap', id: 'snake', ref: 'screen_snake', width: '800', height: '600', tabIndex: '1' }),
                  _react2.default.createElement(
                      'div',
                      { id: 'gameover', ref: 'screen_gameover' },
                      _react2.default.createElement(
                          'h2',
                          null,
                          'Game Over'
                      ),
                      _react2.default.createElement(
                          'p',
                          null,
                          'press ',
                          _react2.default.createElement(
                              'span',
                              null,
                              'space'
                          ),
                          ' to begin a'
                      ),
                      _react2.default.createElement(
                          'h2',
                          null,
                          _react2.default.createElement(
                              'a',
                              { id: 'newgame_gameover', ref: 'button_newgame_gameover' },
                              'new game'
                          )
                      )
                  ),
                  _react2.default.createElement(
                      'ul',
                      null,
                      this.state.blockArray.map(function (e, i) {
                          return _react2.default.createElement(
                              'li',
                              { key: i },
                              e.hash
                          );
                      })
                  ),
                  _react2.default.createElement(
                      'div',
                      { id: 'setting', ref: 'screen_setting' },
                      _react2.default.createElement(
                          'h2',
                          null,
                          'Settings'
                      ),
                      _react2.default.createElement(
                          'h2',
                          null,
                          '  ',
                          _react2.default.createElement(
                              'a',
                              { id: 'newgame_setting' },
                              'new game'
                          )
                      ),
                      _react2.default.createElement(
                          'p',
                          null,
                          'Speed:',
                          _react2.default.createElement('input', { id: 'speed1', type: 'radio', name: 'speed', value: '120', checked: true }),
                          _react2.default.createElement(
                              'label',
                              { 'for': 'speed1' },
                              'Slow'
                          ),
                          _react2.default.createElement('input', { id: 'speed2', type: 'radio', name: 'speed', ref: 'speed_setting', value: '75' }),
                          _react2.default.createElement(
                              'label',
                              { 'for': 'speed2' },
                              'Normal'
                          ),
                          _react2.default.createElement('input', { id: 'speed3', type: 'radio', name: 'speed', value: '35' }),
                          _react2.default.createElement(
                              'label',
                              { 'for': 'speed3' },
                              'Fast'
                          )
                      ),
                      _react2.default.createElement(
                          'p',
                          null,
                          'Wall:',
                          _react2.default.createElement('input', { id: 'wallon', type: 'radio', name: 'wall', value: '1' }),
                          _react2.default.createElement(
                              'label',
                              { 'for': 'wallon' },
                              'On'
                          ),
                          _react2.default.createElement('input', { id: 'walloff', type: 'radio', name: 'wall', value: '0' }),
                          _react2.default.createElement(
                              'label',
                              { 'for': 'walloff' },
                              'Off'
                          )
                      )
                  ),
                  _react2.default.createElement(
                      'div',
                      { id: 'menu', ref: 'screen_menu' },
                      _react2.default.createElement(
                          'h2',
                          null,
                          'Snake'
                      ),
                      _react2.default.createElement(
                          'a',
                          { id: 'newgame_menu', ref: 'button_newgame_menu' },
                          'new game'
                      )
                  )
              );
          }
      }]);
      return SnakeGame;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(SnakeGame, _SnakeGame2.default);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(118);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(119);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(120);
  
  var _useQueries2 = _interopRequireDefault(_useQueries);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var location = (0, _useQueries2.default)( false ? _createBrowserHistory2.default : _createMemoryHistory2.default)(); /**
                                                                                                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                     *
                                                                                                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                     *
                                                                                                                                     * This source code is licensed under the MIT license found in the
                                                                                                                                     * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                     */
  
  exports.default = location;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _pg = __webpack_require__(127);
  
  var _pg2 = _interopRequireDefault(_pg);
  
  var _bluebird = __webpack_require__(18);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _config = __webpack_require__(13);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // TODO: Customize database connection settings
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  _pg2.default.defaults.ssl = true; /**
                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                     *
                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                     *
                                     * This source code is licensed under the MIT license found in the
                                     * LICENSE.txt file in the root directory of this source tree.
                                     */
  
  _pg2.default.defaults.poolSize = 2;
  _pg2.default.defaults.application_name = 'RSK';
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
  
  /**
   * Promise-based wrapper for pg.Client
   * https://github.com/brianc/node-postgres/wiki/Client
   */
  function AsyncClient(client) {
    this.client = client;
    this.query = this.query.bind(this);
    this.end = this.end.bind(this);
  }
  
  AsyncClient.prototype.query = function query(sql) {
    var _this = this;
  
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
  
    return new _bluebird2.default(function (resolve, reject) {
      if (args.length) {
        _this.client.query(sql, args, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } else {
        _this.client.query(sql, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  };
  
  AsyncClient.prototype.end = function end() {
    this.client.end();
  };
  
  /**
   * Promise-based wrapper for pg.connect()
   * https://github.com/brianc/node-postgres/wiki/pg
   */
  _pg2.default.connect = function (connect) {
    return function (callback) {
      return new _bluebird2.default(function (resolve, reject) {
        connect.call(_pg2.default, _config.databaseUrl, function (err, client, done) {
          if (err) {
            if (client) {
              done(client);
            }
  
            reject(err);
          } else {
            callback(new AsyncClient(client)).then(function () {
              done();
              resolve();
            }).catch(function (error) {
              done(client);
              reject(error);
            });
          }
        });
      });
    };
  }(_pg2.default.connect);
  
  exports.default = _pg2.default;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(125);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(126);
  
  var _db = __webpack_require__(41);
  
  var _db2 = _interopRequireDefault(_db);
  
  var _config = __webpack_require__(13);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */
  
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    var loginName = 'facebook';
    _db2.default.connect(function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
        var query = _ref2.query;
  
        var result, _result, userId;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 24;
                  break;
                }
  
                _context.next = 3;
                return query('SELECT 1 FROM user_login WHERE name = $1 AND key = $2', loginName, profile.id);
  
              case 3:
                result = _context.sent;
  
                if (!result.rowCount) {
                  _context.next = 8;
                  break;
                }
  
                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 22;
                break;
  
              case 8:
                _context.next = 10;
                return query('\n          INSERT INTO user_account (id, email) SELECT $1, $2::character\n            WHERE NOT EXISTS (SELECT 1 FROM user_account WHERE id = $1);', req.user.id, profile._json.email);
  
              case 10:
                _context.next = 12;
                return query('\n          INSERT INTO user_login (user_id, name, key) VALUES ($1, \'facebook\', $2);', req.user.id, profile.id);
  
              case 12:
                _context.next = 14;
                return query('\n          INSERT INTO user_claim (user_id, type, value) VALUES\n            ($1, \'urn:facebook:access_token\', $3);', req.user.id, profile.id);
  
              case 14:
                _context.next = 16;
                return query('\n          INSERT INTO user_profile (user_id) SELECT $1\n            WHERE NOT EXISTS (SELECT 1 FROM user_profile WHERE user_id = $1);', req.user.id);
  
              case 16:
                _context.next = 18;
                return query('\n          UPDATE user_profile SET\n            display_name = COALESCE(NULLIF(display_name, \'\'), $2),\n            gender       = COALESCE(NULLIF(gender, \'\'), $3),\n            picture      = COALESCE(NULLIF(picture, \'\'), $4),\n          WHERE user_id = $1;', req.user.id, profile.displayName, profile._json.gender, 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
  
              case 18:
                _context.next = 20;
                return query('\n          SELECT id, email FROM user_account WHERE id = $1;', req.user.id);
  
              case 20:
                result = _context.sent;
  
                done(null, result.rows[0]);
  
              case 22:
                _context.next = 52;
                break;
  
              case 24:
                _context.next = 26;
                return query('\n        SELECT u.id, u.email FROM user_account AS u\n          LEFT JOIN user_login AS l ON l.user_id = u.id\n        WHERE l.name = $1 AND l.key = $2', loginName, profile.id);
  
              case 26:
                _result = _context.sent;
  
                if (!_result.rowCount) {
                  _context.next = 31;
                  break;
                }
  
                done(null, _result.rows[0]);
                _context.next = 52;
                break;
  
              case 31:
                _context.next = 33;
                return query('SELECT 1 FROM user_account WHERE email = $1', profile._json.email);
  
              case 33:
                _result = _context.sent;
  
                if (!_result.rowCount) {
                  _context.next = 38;
                  break;
                }
  
                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 52;
                break;
  
              case 38:
                _context.next = 40;
                return query('\n            INSERT INTO user_account (email) VALUES ($1) RETURNING (id)', profile._json.email);
  
              case 40:
                _result = _context.sent;
                userId = _result.rows[0].id;
                _context.next = 44;
                return query('\n            INSERT INTO user_login (user_id, name, key) VALUES ($1, \'facebook\', $2)', userId, profile.id);
  
              case 44:
                _context.next = 46;
                return query('\n            INSERT INTO user_claim (user_id, type, value) VALUES\n              ($1, \'urn:facebook:access_token\', $2);', userId, accessToken);
  
              case 46:
                _context.next = 48;
                return query('\n            INSERT INTO user_profile (user_id, display_name, gender, picture)\n            VALUES ($1, $2, $3, $4);', userId, profile.displayName, profile._json.gender, 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
  
              case 48:
                _context.next = 50;
                return query('SELECT id, email FROM user_account WHERE id = $1;', userId);
  
              case 50:
                _result = _context.sent;
  
                done(null, _result.rows[0]);
  
              case 52:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
  
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()).catch(done);
  }));
  
  exports.default = _passport2.default;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getIterator2 = __webpack_require__(17);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(23);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var resolveExtension = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path, extension) {
      var fileNameBase, ext, fileName;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fileNameBase = (0, _path.join)(CONTENT_DIR, '' + (path === '/' ? '/index' : path));
              ext = extension;
  
              if (!ext.startsWith('.')) {
                ext = '.' + extension;
              }
  
              fileName = fileNameBase + ext;
              _context.next = 6;
              return fileExists(fileName);
  
            case 6:
              if (_context.sent) {
                _context.next = 9;
                break;
              }
  
              fileNameBase = (0, _path.join)(CONTENT_DIR, path + '/index');
              fileName = fileNameBase + ext;
  
            case 9:
              _context.next = 11;
              return fileExists(fileName);
  
            case 11:
              if (_context.sent) {
                _context.next = 13;
                break;
              }
  
              return _context.abrupt('return', { success: false });
  
            case 13:
              return _context.abrupt('return', { success: true, fileName: fileName });
  
            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
  
    return function resolveExtension(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  
  var resolveFileName = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(path) {
      var extensions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, extension, maybeFileName;
  
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              extensions = ['.jade', '.md', '.html'];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 4;
              _iterator = (0, _getIterator3.default)(extensions);
  
            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 16;
                break;
              }
  
              extension = _step.value;
              _context2.next = 10;
              return resolveExtension(path, extension);
  
            case 10:
              maybeFileName = _context2.sent;
  
              if (!maybeFileName.success) {
                _context2.next = 13;
                break;
              }
  
              return _context2.abrupt('return', { success: true, fileName: maybeFileName.fileName, extension: extension });
  
            case 13:
              _iteratorNormalCompletion = true;
              _context2.next = 6;
              break;
  
            case 16:
              _context2.next = 22;
              break;
  
            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context2.t0;
  
            case 22:
              _context2.prev = 22;
              _context2.prev = 23;
  
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
  
            case 25:
              _context2.prev = 25;
  
              if (!_didIteratorError) {
                _context2.next = 28;
                break;
              }
  
              throw _iteratorError;
  
            case 28:
              return _context2.finish(25);
  
            case 29:
              return _context2.finish(22);
  
            case 30:
              return _context2.abrupt('return', { success: false, fileName: null, extension: null });
  
            case 31:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 18, 22, 30], [23,, 25, 29]]);
    }));
  
    return function resolveFileName(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  
  var _fs = __webpack_require__(25);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(26);
  
  var _bluebird = __webpack_require__(18);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(121);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(117);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _markdownIt = __webpack_require__(123);
  
  var _markdownIt2 = _interopRequireDefault(_markdownIt);
  
  var _graphql = __webpack_require__(12);
  
  var _ContentType = __webpack_require__(47);
  
  var _ContentType2 = _interopRequireDefault(_ContentType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var md = new _markdownIt2.default();
  
  // A folder with Jade/Markdown/HTML content pages
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseContent = function parseContent(path, fileContent, extension) {
    var fmContent = (0, _frontMatter2.default)(fileContent);
    var htmlContent = void 0;
    switch (extension) {
      case '.jade':
        htmlContent = _jade2.default.render(fmContent.body);
        break;
      case '.md':
        htmlContent = md.render(fmContent.body);
        break;
      case '.html':
        htmlContent = fmContent.body;
        break;
      default:
        return null;
    }
    var smth = (0, _assign2.default)({ path: path, content: htmlContent }, fmContent.attributes);
    return smth;
  };
  
  var readFile = _bluebird2.default.promisify(_fs2.default.readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2.default(function (resolve) {
      _fs2.default.exists(filename, resolve);
    });
  };
  
  var content = {
    type: _ContentType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref3, _ref4) {
      var _this = this;
  
      var request = _ref3.request;
      var path = _ref4.path;
      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var _ref5, success, fileName, extension, source;
  
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return resolveFileName(path);
  
              case 2:
                _ref5 = _context3.sent;
                success = _ref5.success;
                fileName = _ref5.fileName;
                extension = _ref5.extension;
  
                if (success) {
                  _context3.next = 8;
                  break;
                }
  
                return _context3.abrupt('return', null);
  
              case 8:
                _context3.next = 10;
                return readFile(fileName, { encoding: 'utf8' });
  
              case 10:
                source = _context3.sent;
                return _context3.abrupt('return', parseContent(path, source, extension));
  
              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }))();
    }
  };
  
  exports.default = content;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserType = __webpack_require__(49);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var me = {
    type: _UserType2.default,
    resolve: function resolve(_ref) {
      var request = _ref.request;
  
      return request.user && {
        id: request.user.id,
        email: request.user.email
      };
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */
  
  exports.default = me;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(12);
  
  var _fetch = __webpack_require__(15);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _NewsItemType = __webpack_require__(48);
  
  var _NewsItemType2 = _interopRequireDefault(_NewsItemType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // React.js News Feed (RSS)
  var url = 'http://ajax.googleapis.com/ajax/services/feed/load' + '?v=1.0&num=10&q=https://reactjsnews.com/feed.xml'; /**
                                                                                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                        *
                                                                                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                        *
                                                                                                                        * This source code is licensed under the MIT license found in the
                                                                                                                        * LICENSE.txt file in the root directory of this source tree.
                                                                                                                        */
  
  var items = [];
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  
  var news = {
    type: new _graphql.GraphQLList(_NewsItemType2.default),
    resolve: function resolve() {
      if (lastFetchTask) {
        return lastFetchTask;
      }
  
      if (new Date() - lastFetchTime > 1000 * 3 /* 10 mins */) {
          lastFetchTime = new Date();
          lastFetchTask = (0, _fetch2.default)(url).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.responseStatus === 200) {
              items = data.responseData.feed.entries;
            }
  
            return items;
          }).finally(function () {
            lastFetchTask = null;
          });
  
          if (items.length) {
            return items;
          }
  
          return lastFetchTask;
        }
  
      return items;
    }
  };
  
  exports.default = news;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(12);
  
  var _me = __webpack_require__(44);
  
  var _me2 = _interopRequireDefault(_me);
  
  var _content = __webpack_require__(43);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _news = __webpack_require__(45);
  
  var _news2 = _interopRequireDefault(_news);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: {
        me: _me2.default,
        content: _content2.default,
        news: _news2.default
      }
    })
  });
  
  exports.default = schema;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(12);
  
  var ContentType = new _graphql.GraphQLObjectType({
    name: 'Content',
    fields: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      component: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ContentType;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(12);
  
  var NewsItemType = new _graphql.GraphQLObjectType({
    name: 'NewsItem',
    fields: {
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      link: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      author: { type: _graphql.GraphQLString },
      publishedDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      contentSnippet: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = NewsItemType;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(12);
  
  var UserType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
      email: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = UserType;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Router = __webpack_require__(30);
  
  var _Router2 = _interopRequireDefault(_Router);
  
  var _fetch = __webpack_require__(15);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _App = __webpack_require__(31);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ContentPage = __webpack_require__(32);
  
  var _ContentPage2 = _interopRequireDefault(_ContentPage);
  
  var _NotFoundPage = __webpack_require__(38);
  
  var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);
  
  var _ErrorPage = __webpack_require__(33);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var routes = [__webpack_require__(54), __webpack_require__(52), __webpack_require__(56), __webpack_require__(58)]; /**
                                                                                                                                  * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                  *
                                                                                                                                  * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                  *
                                                                                                                                  * This source code is licensed under the MIT license found in the
                                                                                                                                  * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                  */
  
  var router = new _Router2.default(function (on) {
    on('*', function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, next) {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
                return _context.abrupt('return', component && _react2.default.createElement(
                  _App2.default,
                  { context: state.context },
                  component
                ));
  
              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
  
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  
    routes.forEach(function (route) {
      on(route.path, route.action);
    });
  
    on('*', function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state) {
        var query, response, _ref3, data;
  
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = '/graphql?query={content(path:"' + state.path + '"){path,title,content,component}}';
                _context2.next = 3;
                return (0, _fetch2.default)(query);
  
              case 3:
                response = _context2.sent;
                _context2.next = 6;
                return response.json();
  
              case 6:
                _ref3 = _context2.sent;
                data = _ref3.data;
                return _context2.abrupt('return', data && data.content && _react2.default.createElement(_ContentPage2.default, data.content));
  
              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));
  
      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }());
  
    on('error', function (state, error) {
      return state.statusCode === 404 ? _react2.default.createElement(
        _App2.default,
        { context: state.context, error: error },
        _react2.default.createElement(_NotFoundPage2.default, null)
      ) : _react2.default.createElement(
        _App2.default,
        { context: state.context, error: error },
        _react2.default.createElement(_ErrorPage2.default, null)
      );
    });
  });
  
  exports.default = router;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Contact = __webpack_require__(87);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Contact(_ref) {
    var title = _ref.title;
  
    return _react2.default.createElement(
      'div',
      { className: _Contact2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Contact2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          '...'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Contact.propTypes = { title: _react.PropTypes.string.isRequired };
  
  exports.default = (0, _withStyles2.default)(Contact, _Contact2.default);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Contact = __webpack_require__(51);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var path = exports.path = '/contact';
  var action = exports.action = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state) {
      var title;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = 'Contact Us';
  
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Contact2.default, { title: title }));
  
            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  
    return function action(_x) {
      return _ref.apply(this, arguments);
    };
  }();

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Home = __webpack_require__(88);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _SnakeGame = __webpack_require__(39);
  
  var _SnakeGame2 = _interopRequireDefault(_SnakeGame);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Home(_ref) {
    var news = _ref.news;
  
  
    return _react2.default.createElement(
      'div',
      { className: _Home2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Home2.default.container },
        _react2.default.createElement(_SnakeGame2.default, null)
      )
    );
  }
  
  Home.propTypes = {
    news: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      title: _react.PropTypes.string.isRequired,
      link: _react.PropTypes.string.isRequired,
      contentSnippet: _react.PropTypes.string
    })).isRequired
  };
  
  exports.default = (0, _withStyles2.default)(Home, _Home2.default);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(53);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _fetch = __webpack_require__(15);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/'; /**
                                  * React Starter Kit (https://www.reactstarterkit.com/)
                                  *
                                  * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                  *
                                  * This source code is licensed under the MIT license found in the
                                  * LICENSE.txt file in the root directory of this source tree.
                                  */
  
  var action = exports.action = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state) {
      var response, _ref2, data;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _fetch2.default)('/graphql?query={news{title,link,contentSnippet}}');
  
            case 2:
              response = _context.sent;
              _context.next = 5;
              return response.json();
  
            case 5:
              _ref2 = _context.sent;
              data = _ref2.data;
  
              state.context.onSetTitle('Blockchain Sandox');
              return _context.abrupt('return', _react2.default.createElement(_Home2.default, { news: data.news }));
  
            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  
    return function action(_x) {
      return _ref.apply(this, arguments);
    };
  }();

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(89);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Login(_ref) {
    var title = _ref.title;
  
    return _react2.default.createElement(
      'div',
      { className: _Login2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Login2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          '...'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Login.propTypes = { title: _react.PropTypes.string.isRequired };
  
  exports.default = (0, _withStyles2.default)(Login, _Login2.default);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(55);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var path = exports.path = '/login';
  var action = exports.action = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state) {
      var title;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = 'Log In';
  
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Login2.default, { title: title }));
  
            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  
    return function action(_x) {
      return _ref.apply(this, arguments);
    };
  }();

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Register = __webpack_require__(90);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Register(_ref) {
    var title = _ref.title;
  
    return _react2.default.createElement(
      'div',
      { className: _Register2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Register2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          '...'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Register.propTypes = { title: _react.PropTypes.string.isRequired };
  
  exports.default = (0, _withStyles2.default)(Register, _Register2.default);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Register = __webpack_require__(57);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var path = exports.path = '/register';
  var action = exports.action = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state) {
      var title;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = 'New User Registration';
  
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Register2.default, { title: title }));
  
            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  
    return function action(_x) {
      return _ref.apply(this, arguments);
    };
  }();

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _promise = __webpack_require__(24);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new _promise2.default(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }
  
          if (info.done) {
            resolve(value);
          } else {
            return _promise2.default.resolve(value).then(function (value) {
              return step("next", value);
            }, function (err) {
              return step("throw", err);
            });
          }
        }
  
        return step("next");
      });
    };
  };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _isIterable2 = __webpack_require__(97);
  
  var _isIterable3 = _interopRequireDefault(_isIterable2);
  
  var _getIterator2 = __webpack_require__(17);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;
  
      try {
        for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
  
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
  
      return _arr;
    }
  
    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if ((0, _isIterable3.default)(Object(arr))) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

  // This method of obtaining a reference to the global object needs to be
  // kept identical to the way it is obtained in runtime.js
  var g =
    typeof global === "object" ? global :
    typeof window === "object" ? window :
    typeof self === "object" ? self : this;
  
  // Use `getOwnPropertyNames` because not all browsers support calling
  // `hasOwnProperty` on the global `self` object in a worker. See #183.
  var hadRuntime = g.regeneratorRuntime &&
    Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
  
  // Save the old regeneratorRuntime in case it needs to be restored later.
  var oldRuntime = hadRuntime && g.regeneratorRuntime;
  
  // Force reevalutation of runtime.js.
  g.regeneratorRuntime = undefined;
  
  module.exports = __webpack_require__(63);
  
  if (hadRuntime) {
    // Restore the original runtime.
    g.regeneratorRuntime = oldRuntime;
  } else {
    // Remove the global property added by runtime.js.
    try {
      delete g.regeneratorRuntime;
    } catch(e) {
      g.regeneratorRuntime = undefined;
    }
  }
  
  module.exports = { "default": module.exports, __esModule: true };


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(module) {"use strict";
  
  var _promise = __webpack_require__(24);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _setPrototypeOf = __webpack_require__(100);
  
  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
  
  var _create = __webpack_require__(98);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _typeof2 = __webpack_require__(107);
  
  var _typeof3 = _interopRequireDefault(_typeof2);
  
  var _iterator = __webpack_require__(102);
  
  var _iterator2 = _interopRequireDefault(_iterator);
  
  var _symbol = __webpack_require__(101);
  
  var _symbol2 = _interopRequireDefault(_symbol);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */
  
  !function (global) {
    "use strict";
  
    var hasOwn = Object.prototype.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var iteratorSymbol = typeof _symbol2.default === "function" && _iterator2.default || "@@iterator";
  
    var inModule = ( false ? "undefined" : (0, _typeof3.default)(module)) === "object";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      if (inModule) {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }
  
    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = inModule ? module.exports : {};
  
    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided, then outerFn.prototype instanceof Generator.
      var generator = (0, _create2.default)((outerFn || Generator).prototype);
      var context = new Context(tryLocsList || []);
  
      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);
  
      return generator;
    }
    runtime.wrap = wrap;
  
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
  
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
  
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
  
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
  
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = "GeneratorFunction";
  
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }
  
    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction ||
      // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
  
    runtime.mark = function (genFun) {
      if (_setPrototypeOf2.default) {
        (0, _setPrototypeOf2.default)(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
      }
      genFun.prototype = (0, _create2.default)(Gp);
      return genFun;
    };
  
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `value instanceof AwaitArgument` to determine if the yielded value is
    // meant to be awaited. Some may consider the name of this method too
    // cutesy, but they are curmudgeons.
    runtime.awrap = function (arg) {
      return new AwaitArgument(arg);
    };
  
    function AwaitArgument(arg) {
      this.arg = arg;
    }
  
    function AsyncIterator(generator) {
      // This invoke function is written in a style that assumes some
      // calling function (or Promise) will handle exceptions.
      function invoke(method, arg) {
        var result = generator[method](arg);
        var value = result.value;
        return value instanceof AwaitArgument ? _promise2.default.resolve(value.arg).then(invokeNext, invokeThrow) : _promise2.default.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          return result;
        });
      }
  
      if ((typeof process === "undefined" ? "undefined" : (0, _typeof3.default)(process)) === "object" && process.domain) {
        invoke = process.domain.bind(invoke);
      }
  
      var invokeNext = invoke.bind(generator, "next");
      var invokeThrow = invoke.bind(generator, "throw");
      var invokeReturn = invoke.bind(generator, "return");
      var previousPromise;
  
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return invoke(method, arg);
        }
  
        return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
        // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : new _promise2.default(function (resolve) {
          resolve(callInvokeWithMethodAndArg());
        });
      }
  
      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }
  
    defineIteratorMethods(AsyncIterator.prototype);
  
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
  
      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };
  
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
  
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
  
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
  
          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }
  
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
              // A return or throw (when the delegate iterator has no throw
              // method) always terminates the yield* loop.
              context.delegate = null;
  
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              var returnMethod = delegate.iterator["return"];
              if (returnMethod) {
                var record = tryCatch(returnMethod, delegate.iterator, arg);
                if (record.type === "throw") {
                  // If the return method threw an exception, let that
                  // exception prevail over the original return or throw.
                  method = "throw";
                  arg = record.arg;
                  continue;
                }
              }
  
              if (method === "return") {
                // Continue with the outer return, now that the delegate
                // iterator has been terminated.
                continue;
              }
            }
  
            var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
  
            if (record.type === "throw") {
              context.delegate = null;
  
              // Like returning generator.throw(uncaught), but without the
              // overhead of an extra function call.
              method = "throw";
              arg = record.arg;
              continue;
            }
  
            // Delegate generator ran and handled its own exceptions so
            // regardless of what the method was, we continue as if it is
            // "next" with an undefined arg.
            method = "next";
            arg = undefined;
  
            var info = record.arg;
            if (info.done) {
              context[delegate.resultName] = info.value;
              context.next = delegate.nextLoc;
            } else {
              state = GenStateSuspendedYield;
              return info;
            }
  
            context.delegate = null;
          }
  
          if (method === "next") {
            context._sent = arg;
  
            if (state === GenStateSuspendedYield) {
              context.sent = arg;
            } else {
              context.sent = undefined;
            }
          } else if (method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw arg;
            }
  
            if (context.dispatchException(arg)) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              method = "next";
              arg = undefined;
            }
          } else if (method === "return") {
            context.abrupt("return", arg);
          }
  
          state = GenStateExecuting;
  
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
  
            var info = {
              value: record.arg,
              done: context.done
            };
  
            if (record.arg === ContinueSentinel) {
              if (context.delegate && method === "next") {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                arg = undefined;
              }
            } else {
              return info;
            }
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(arg) call above.
            method = "throw";
            arg = record.arg;
          }
        }
      };
    }
  
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
  
    Gp[iteratorSymbol] = function () {
      return this;
    };
  
    Gp.toString = function () {
      return "[object Generator]";
    };
  
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
  
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
  
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
  
      this.tryEntries.push(entry);
    }
  
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
  
    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
  
    runtime.keys = function (object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
  
      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }
  
        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };
  
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
  
        if (typeof iterable.next === "function") {
          return iterable;
        }
  
        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
  
            next.value = undefined;
            next.done = true;
  
            return next;
          };
  
          return next.next = next;
        }
      }
  
      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;
  
    function doneResult() {
      return { value: undefined, done: true };
    }
  
    Context.prototype = {
      constructor: Context,
  
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = undefined;
        this.done = false;
        this.delegate = null;
  
        this.tryEntries.forEach(resetTryEntry);
  
        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
  
      stop: function stop() {
        this.done = true;
  
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
  
        return this.rval;
      },
  
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }
  
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          return !!caught;
        }
  
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
  
          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }
  
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
  
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
  
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
  
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }
  
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
  
        if (finallyEntry) {
          this.next = finallyEntry.finallyLoc;
        } else {
          this.complete(record);
        }
  
        return ContinueSentinel;
      },
  
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
  
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = record.arg;
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
      },
  
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
  
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
  
        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },
  
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };
  
        return ContinueSentinel;
      }
    };
  }(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  (typeof global === "undefined" ? "undefined" : (0, _typeof3.default)(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : (0, _typeof3.default)(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : (0, _typeof3.default)(self)) === "object" ? self : undefined);
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)(module)))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio, canvas, progress, video {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden], template {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active, a:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb, strong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub, sup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode, kbd, pre, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton, input, optgroup, select, textarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton, select {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton, html input[type=\"button\"], input[type=\"reset\"], input[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled], html input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"], input[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button, input[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button, input[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd, th {\n  padding: 0;\n}\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n/*\r\n * Colors\r\n * ========================================================================== */\n\n/* #222 */\n\n/* #404040 */\n\n/* #555 */\n\n/* #777 */\n\n/* #eee */\n\n/*\r\n * Typography\r\n * ========================================================================== */\n\n/*\r\n * Layout\r\n * ========================================================================== */\n\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\n\n/* Extra small screen / phone */\n\n/* Small screen / tablet */\n\n/* Medium screen / desktop */\n\n/* Large screen / wide desktop */\n\n/*\r\n * Animations\r\n * ========================================================================== */\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: 'Segoe UI','HelveticaNeue-Light',sans-serif;\n  line-height: 1.375; /* ~22px */\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio, canvas, iframe, img, svg, video {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *, *:before, *:after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a, a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^=\"#\"]:after, a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n\n  pre, blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr, img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p, h2, h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2, h3 {\n    page-break-after: avoid;\n  }\n}\n", "", {"version":3,"sources":["/./src/components/App/App.scss","/./node_modules/normalize.css/normalize.css","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH,4EAA4E;;AAE5E;;;;GAIG;;AAEH;EACE,wBAAwB,CAAC,OAAO;EAChC,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;gFACgF;;AAEhF;;;;;GAKG;;AAEH;EAaE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EAIE,sBAAsB,CAAC,OAAO;EAC9B,yBAAyB,CAAC,OAAO;CAClC;;AAED;;;GAGG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;;GAGG;;AAEH;EAEE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,8BAA8B;CAC/B;;AAED;;;GAGG;;AAEH;EAEE,WAAW;CACZ;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,0BAA0B;CAC3B;;AAED;;GAEG;;AAEH;EAEE,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,YAAY;CACb;;AAED;EACE,gBAAgB;CACjB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,gCAAwB;UAAxB,wBAAwB;EACxB,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EAIE,kCAAkC;EAClC,eAAe;CAChB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;;GAKG;;AAEH;EAKE,eAAe,CAAC,OAAO;EACvB,cAAc,CAAC,OAAO;EACtB,UAAU,CAAC,OAAO;CACnB;;AAED;;GAEG;;AAEH;EACE,kBAAkB;CACnB;;AAED;;;;;GAKG;;AAEH;EAEE,qBAAqB;CACtB;;AAED;;;;;;GAMG;;AAEH;EAIE,2BAA2B,CAAC,OAAO;EACnC,gBAAgB,CAAC,OAAO;CACzB;;AAED;;GAEG;;AAEH;EAEE,gBAAgB;CACjB;;AAED;;GAEG;;AAEH;EAEE,UAAU;EACV,WAAW;CACZ;;AAED;;;GAGG;;AAEH;EACE,oBAAoB;CACrB;;AAED;;;;;;GAMG;;AAEH;EAEE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,WAAW,CAAC,OAAO;CACpB;;AAED;;;;GAIG;;AAEH;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,gCAAwB;UAAxB,wBAAwB,CAAC,OAAO;CACjC;;AAED;;;;GAIG;;AAEH;EAEE,yBAAyB;CAC1B;;AAED;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,cAAc;EACd,+BAA+B;CAChC;;AAED;;;GAGG;;AAEH;EACE,UAAU,CAAC,OAAO;EAClB,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EACE,kBAAkB;CACnB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,kBAAkB;CACnB;;AAED;EAEE,WAAW;CACZ;;AD5ZD,yEAAyE;;AEXzE;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;AFnBhF;;gFAEgF;;AAEhF;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe,CAAC,YAAY;EAC5B,yDAA+B;EAC/B,mBAAmB,CAAC,WAAW;CAChC;;AAED;;;;;;GAMG;;AAEH;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,cAAc;EACd,WAAW;CACZ;;AAED;;;;GAIG;;AAEH;EAME,uBAAuB;CACxB;;AAED;;GAEG;;AAEH;EACE,UAAU;EACV,UAAU;EACV,WAAW;CACZ;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;gFAEgF;;AAEhF;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAClB;;AAED;;;;gFAIgF;;AAEhF;EACE;IAGE,mCAAmC;IACnC,uBAAuB,CAAC,+DAA+D;IACvF,oCAA4B;YAA5B,4BAA4B;IAC5B,6BAA6B;GAC9B;;EAED;IAEE,2BAA2B;GAC5B;;EAED;IACE,6BAA6B;GAC9B;;EAED;IACE,8BAA8B;GAC/B;;EAED;;;KAGG;;EAEH;IAEE,YAAY;GACb;;EAED;IAEE,uBAAuB;IACvB,yBAAyB;GAC1B;;EAED;;;KAGG;;EAEH;IACE,4BAA4B;GAC7B;;EAED;IAEE,yBAAyB;GAC1B;;EAED;IACE,2BAA2B;GAC5B;;EAED;IAGE,WAAW;IACX,UAAU;GACX;;EAED;IAEE,wBAAwB;GACzB;CACF","file":"App.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../../node_modules/normalize.css/normalize.css';\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n@import '../variables.scss';\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: $font-family-base;\n  line-height: 1.375; /* ~22px */\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n:global(.browserupgrade) {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *:before,\n  *:after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n","/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n.ContentPage_root_1Kg {\r\n\r\n}\r\n\r\n.ContentPage_container_1JT {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 1000px;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/ContentPage/ContentPage.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;;CAEC;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"ContentPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n@import '../variables.scss';\r\n\r\n.root {\r\n\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: $max-content-width;\r\n}\r\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "ContentPage_root_1Kg",
  	"container": "ContentPage_container_1JT"
  };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n\r\n  }\r\n\r\n}\r\n", "", {"version":3,"sources":["/./src/components/ErrorPage/ErrorPage.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,UAAU;EACV,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,wBAAwB;CACzB;;AAED;EACE,oBAAoB;EACpB,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;;EAEE;IACE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;;GAEnB;;CAEF","file":"ErrorPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n\r\n  }\r\n\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n.Feedback_root_LW7 {\r\n  background: #f5f5f5;\r\n  color: #333;\r\n}\r\n\r\n.Feedback_container_3dV {\r\n  margin: 0 auto;\r\n  padding: 20px 8px;\r\n  max-width: 1000px;\r\n  text-align: center;\r\n  font-size: 1.5em; /* ~24px */\r\n}\r\n\r\n.Feedback_link_17l, .Feedback_link_17l:active, .Feedback_link_17l:hover, .Feedback_link_17l:visited {\r\n  color: #333;\r\n  text-decoration: none;\r\n}\r\n\r\n.Feedback_link_17l:hover {\r\n  text-decoration: underline;\r\n}\r\n\r\n.Feedback_spacer_Iut {\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/Feedback/Feedback.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;EAC9B,mBAAmB;EACnB,iBAAiB,CAAC,WAAW;CAC9B;;AAED;EAIE,YAAY;EACZ,sBAAsB;CACvB;;AAED;EACE,2BAA2B;CAC5B;;AAED;EACE,oBAAoB;EACpB,mBAAmB;CACpB","file":"Feedback.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n@import '../variables.scss';\r\n\r\n.root {\r\n  background: #f5f5f5;\r\n  color: #333;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 20px 8px;\r\n  max-width: $max-content-width;\r\n  text-align: center;\r\n  font-size: 1.5em; /* ~24px */\r\n}\r\n\r\n.link,\r\n.link:active,\r\n.link:hover,\r\n.link:visited {\r\n  color: #333;\r\n  text-decoration: none;\r\n}\r\n\r\n.link:hover {\r\n  text-decoration: underline;\r\n}\r\n\r\n.spacer {\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n}\r\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Feedback_root_LW7",
  	"container": "Feedback_container_3dV",
  	"link": "Feedback_link_17l",
  	"spacer": "Feedback_spacer_Iut"
  };

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n.Footer_root_3dP {\r\n  background: #333;\r\n  color: #fff;\r\n}\r\n\r\n.Footer_container_26p {\r\n  margin: 0 auto;\r\n  padding: 20px 15px;\r\n  max-width: 1000px;\r\n  text-align: center;\r\n}\r\n\r\n.Footer_text_tTp {\r\n  color: rgba(255, 255, 255, .5);\r\n}\r\n\r\n.Footer_textMuted_1h3 {\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n\r\n.Footer_spacer_3n7 {\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n\r\n.Footer_text_tTp, .Footer_link_NoJ {\r\n  padding: 2px 5px;\r\n  font-size: 1em;\r\n}\r\n\r\n.Footer_link_NoJ, .Footer_link_NoJ:active, .Footer_link_NoJ:visited {\r\n  color: rgba(255, 255, 255, .6);\r\n  text-decoration: none;\r\n}\r\n\r\n.Footer_link_NoJ:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n", "", {"version":3,"sources":["/./src/components/Footer/Footer.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,mBAAmB;EACnB,kBAA8B;EAC9B,mBAAmB;CACpB;;AAED;EACE,+BAA+B;CAChC;;AAED;EAEE,+BAA+B;CAChC;;AAED;EACE,+BAA+B;CAChC;;AAED;EAEE,iBAAiB;EACjB,eAAe;CAChB;;AAED;EAGE,+BAA+B;EAC/B,sBAAsB;CACvB;;AAED;EACE,8BAA8B;CAC/B","file":"Footer.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n@import '../variables.scss';\r\n\r\n.root {\r\n  background: #333;\r\n  color: #fff;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 20px 15px;\r\n  max-width: $max-content-width;\r\n  text-align: center;\r\n}\r\n\r\n.text {\r\n  color: rgba(255, 255, 255, .5);\r\n}\r\n\r\n.textMuted {\r\n  composes: text;\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n\r\n.spacer {\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n\r\n.text,\r\n.link {\r\n  padding: 2px 5px;\r\n  font-size: 1em;\r\n}\r\n\r\n.link,\r\n.link:active,\r\n.link:visited {\r\n  color: rgba(255, 255, 255, .6);\r\n  text-decoration: none;\r\n}\r\n\r\n.link:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Footer_root_3dP",
  	"container": "Footer_container_26p",
  	"text": "Footer_text_tTp",
  	"textMuted": "Footer_textMuted_1h3 Footer_text_tTp",
  	"spacer": "Footer_spacer_3n7",
  	"link": "Footer_link_NoJ"
  };

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n.Header_root_14I {\r\n  background: #373277;\r\n  color: #fff;\r\n}\r\n\r\n.Header_container_izf {\r\n  margin: 0 auto;\r\n  padding: 20px 0;\r\n  max-width: 1000px;\r\n}\r\n\r\n.Header_brand_1-T {\r\n  color: rgb(146, 229, 252);\r\n  text-decoration: none;\r\n  font-size: 1.75em; /* ~28px */\r\n}\r\n\r\n.Header_brandTxt_162 {\r\n  margin-left: 10px;\r\n}\r\n\r\n.Header_nav_3wx {\r\n  float: right;\r\n  margin-top: 6px;\r\n}\r\n\r\n.Header_banner_UgC {\r\n  text-align: center;\r\n}\r\n\r\n.Header_bannerTitle_3Qi {\r\n  margin: 0;\r\n  padding: 10px;\r\n  font-weight: normal;\r\n  font-size: 4em;\r\n  line-height: 1em;\r\n}\r\n\r\n.Header_bannerDesc_3Ow {\r\n  padding: 0;\r\n  color: rgba(255, 255, 255, .5);\r\n  font-size: 1.25em;\r\n  margin: 0;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/Header/Header.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADrBhF;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,gBAAgB;EAChB,kBAA8B;CAC/B;;AAED;EACE,0BAA2C;EAC3C,sBAAsB;EACtB,kBAAkB,CAAC,WAAW;CAC/B;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,aAAa;EACb,gBAAgB;CACjB;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,UAAU;EACV,cAAc;EACd,oBAAoB;EACpB,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,WAAW;EACX,+BAA+B;EAC/B,kBAAkB;EAClB,UAAU;CACX","file":"Header.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n@import '../variables.scss';\r\n\r\n$brand-color: #61dafb;\r\n\r\n.root {\r\n  background: #373277;\r\n  color: #fff;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 20px 0;\r\n  max-width: $max-content-width;\r\n}\r\n\r\n.brand {\r\n  color: color($brand-color lightness(+10%));\r\n  text-decoration: none;\r\n  font-size: 1.75em; /* ~28px */\r\n}\r\n\r\n.brandTxt {\r\n  margin-left: 10px;\r\n}\r\n\r\n.nav {\r\n  float: right;\r\n  margin-top: 6px;\r\n}\r\n\r\n.banner {\r\n  text-align: center;\r\n}\r\n\r\n.bannerTitle {\r\n  margin: 0;\r\n  padding: 10px;\r\n  font-weight: normal;\r\n  font-size: 4em;\r\n  line-height: 1em;\r\n}\r\n\r\n.bannerDesc {\r\n  padding: 0;\r\n  color: rgba(255, 255, 255, .5);\r\n  font-size: 1.25em;\r\n  margin: 0;\r\n}\r\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Header_root_14I",
  	"container": "Header_container_izf",
  	"brand": "Header_brand_1-T",
  	"brandTxt": "Header_brandTxt_162",
  	"nav": "Header_nav_3wx",
  	"banner": "Header_banner_UgC",
  	"bannerTitle": "Header_bannerTitle_3Qi",
  	"bannerDesc": "Header_bannerDesc_3Ow"
  };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n.Navigation_root_2Gx {\r\n\r\n}\r\n\r\n.Navigation_link_12k {\r\n  display: inline-block;\r\n  padding: 3px 8px;\r\n  text-decoration: none;\r\n  font-size: 1.125em; /* ~18px */\r\n}\r\n\r\n.Navigation_link_12k, .Navigation_link_12k:active, .Navigation_link_12k:visited {\r\n  color: rgba(255, 255, 255, .6);\r\n}\r\n\r\n.Navigation_link_12k:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n\r\n.Navigation_highlight_2cu {\r\n  margin-right: 8px;\r\n  margin-left: 8px;\r\n  border-radius: 3px;\r\n  background: rgba(0, 0, 0, .15);\r\n  color: #fff;\r\n}\r\n\r\n.Navigation_highlight_2cu:hover {\r\n  background: rgba(0, 0, 0, .3);\r\n}\r\n\r\n.Navigation_spacer_2MV {\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n", "", {"version":3,"sources":["/./src/components/Navigation/Navigation.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;CAEC;;AAED;EACE,sBAAsB;EACtB,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB,CAAC,WAAW;CAChC;;AAED;EAGE,+BAA+B;CAChC;;AAED;EACE,8BAA8B;CAC/B;;AAED;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,+BAA+B;EAC/B,YAAY;CACb;;AAED;EACE,8BAA8B;CAC/B;;AAED;EACE,+BAA+B;CAChC","file":"Navigation.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n.root {\r\n\r\n}\r\n\r\n.link {\r\n  display: inline-block;\r\n  padding: 3px 8px;\r\n  text-decoration: none;\r\n  font-size: 1.125em; /* ~18px */\r\n}\r\n\r\n.link,\r\n.link:active,\r\n.link:visited {\r\n  color: rgba(255, 255, 255, .6);\r\n}\r\n\r\n.link:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n\r\n.highlight {\r\n  margin-right: 8px;\r\n  margin-left: 8px;\r\n  border-radius: 3px;\r\n  background: rgba(0, 0, 0, .15);\r\n  color: #fff;\r\n}\r\n\r\n.highlight:hover {\r\n  background: rgba(0, 0, 0, .3);\r\n}\r\n\r\n.spacer {\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Navigation_root_2Gx",
  	"link": "Navigation_link_12k",
  	"highlight": "Navigation_highlight_2cu",
  	"spacer": "Navigation_spacer_2MV"
  };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n  }\r\n\r\n}\r\n", "", {"version":3,"sources":["/./src/components/NotFoundPage/NotFoundPage.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,UAAU;EACV,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,wBAAwB;CACzB;;AAED;EACE,oBAAoB;EACpB,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;;EAEE;IACE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;;CAEF","file":"NotFoundPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n  }\r\n\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=VT323);", ""]);
  
  // module
  exports.push([module.id, "\n/*\r\n * Colors\r\n * ========================================================================== *//* #222 *//* #404040 *//* #555 *//* #777 *//* #eee *//*\r\n * Typography\r\n * ========================================================================== *//*\r\n * Layout\r\n * ========================================================================== *//*\r\n * Media queries breakpoints\r\n * ========================================================================== *//* Extra small screen / phone *//* Small screen / tablet *//* Medium screen / desktop *//* Large screen / wide desktop *//*\r\n * Animations\r\n * ========================================================================== */#SnakeGame_gameover_2iv a, #SnakeGame_setting_k17 a, #SnakeGame_menu_1Om a{\n    display: block;\n    color: #FFF;\n}#SnakeGame_gameover_2iv a, #SnakeGame_setting_k17 a:hover, #SnakeGame_menu_1Om a:hover{\n    cursor: pointer;\n}#SnakeGame_gameover_2iv a:hover::before, #SnakeGame_setting_k17 a:hover::before, #SnakeGame_menu_1Om a:hover::before{\n    content: \">\";\n    margin-right: 10px;\n}/* Menu Screen Style */#SnakeGame_menu_1Om{\n    display: block;\n    width: 340px;\n    padding-top: 95px;\n    padding-bottom: 95px;\n    font-size: 40px;\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center;\n    color: #FFF;\n}#SnakeGame_menu_1Om h2{\n    -webkit-animation: SnakeGame_logo-ani_1oZ 1000ms linear infinite;\n            -o-animation: SnakeGame_logo-ani_1oZ 1000ms linear infinite;\n       animation: SnakeGame_logo-ani_1oZ 1000ms linear infinite;\n    margin-bottom: 30px;\n    color: #FFF;\n    \n}#SnakeGame_menu_1Om a{\n    font-size: 30px;\n    color: #FFF;\n}@-webkit-keyframes SnakeGame_logo-ani_1oZ{\n   50%{-webkit-transform: scale(1.3,1.3);}\n  100%{-webkit-transform: scale(1.0,1.0);}\n}@-o-keyframes SnakeGame_logo-ani_1oZ{\n   50%{-o-transform: scale(1.3,1.3);transform: scale(1.3,1.3);}\n  100%{-o-transform: scale(1.0,1.0);transform: scale(1.0,1.0);}\n}@keyframes SnakeGame_logo-ani_1oZ{\n   50%{-webkit-transform: scale(1.3,1.3);-o-transform: scale(1.3,1.3);transform: scale(1.3,1.3);}\n  100%{-webkit-transform: scale(1.0,1.0);-o-transform: scale(1.0,1.0);transform: scale(1.0,1.0);}\n}/* Game Over Screen Style */#SnakeGame_gameover_2iv{\n    display: none;\n    width: 340px;\n    padding-top: 95px;\n    padding-bottom: 95px;\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center;\n    font-size: 30px;\n    color: #FFF;\n}#SnakeGame_gameover_2iv p{\n    margin-top: 25px;\n    font-size: 20px;\n}/* Settings Screen Style */#SnakeGame_setting_k17{\n    display: none;\n    width: 340px;\n    margin-left: auto;\n    margin-right: auto;\n    padding-top: 85px;\n    padding-bottom: 85px;\n    font-size: 30px;\n    color: #FFF;\n    text-align: center;\n}#SnakeGame_setting_k17 h2{\n    margin-bottom: 15px;\n}#SnakeGame_setting_k17 p{\n    margin-top: 10px;\n}#SnakeGame_setting_k17 input{\n    display:none;\n}#SnakeGame_setting_k17 label{\n    cursor: pointer;\n}#SnakeGame_setting_k17 input:checked + label{\n    background-color: #FFF;\n    color: #000;\n}", "", {"version":3,"sources":["/./src/components/SnakeGame/SnakeGame.scss","/./src/components/variables.scss"],"names":[],"mappings":";AAC6D;;gFCCmB,UAGd,aACG,UACH,UACA,UACA;;gFAIc;;gFAMA;;gFAMA,gCAEhB,2BACL,6BACE,iCACI;;gFD1BjE;IACI,eAAe;IACf,YAAY;CACf;IAGG,gBAAgB;CACnB;IAGG,aAAa;IACb,mBAAmB;CACtB,uBAEsB;IAEnB,eAAe;IACf,aAAa;IACb,kBAAkB;IAClB,qBAAqB;IACrB,gBAAgB;IAChB,kBAAkB;IAClB,mBAAmB;IACnB,mBAAmB;IACnB,YAAY;CACf;IAGG,iEAAmD;YAC3C,4DAA2C;OAA3C,yDAA2C;IACnD,oBAAoB;IACpB,YAAY;;CAEf;IAGG,gBAAgB;IAChB,YAAY;CACf;GAGE,IAAI,kCAAkC,CAAC;EACxC,KAAK,kCAAkC,CAAC;CACzC;GAGE,IAAI,6BAAA,0BAA0B,CAAC;EAChC,KAAK,6BAAA,0BAA0B,CAAC;CAFlC;GACG,IAAI,kCAAA,6BAAA,0BAA0B,CAAC;EAChC,KAAK,kCAAA,6BAAA,0BAA0B,CAAC;CACjC,4BAG2B;IAGxB,cAAc;IACd,aAAa;IACb,kBAAkB;IAClB,qBAAqB;IACrB,kBAAkB;IAClB,mBAAmB;IACnB,mBAAmB;IACnB,gBAAgB;IAChB,YAAY;CACf;IAGG,iBAAiB;IACjB,gBAAgB;CACnB,2BAE0B;IAEvB,cAAc;IACd,aAAa;IACb,kBAAkB;IAClB,mBAAmB;IACnB,kBAAkB;IAClB,qBAAqB;IACrB,gBAAgB;IAChB,YAAY;IACZ,mBAAmB;CACtB;IAGG,oBAAoB;CACvB;IAGG,iBAAiB;CACpB;IAGG,aAAa;CAChB;IAGG,gBAAgB;CACnB;IAGG,uBAAuB;IACvB,YAAY;CACf","file":"SnakeGame.scss","sourcesContent":["@import '../../components/variables.scss';\n@import url(\"https://fonts.googleapis.com/css?family=VT323\");\n\n\n#gameover a, #setting a, #menu a{\n    display: block;\n    color: #FFF;\n}\n\n#gameover a, #setting a:hover, #menu a:hover{\n    cursor: pointer;\n}\n\n#gameover a:hover::before, #setting a:hover::before, #menu a:hover::before{\n    content: \">\";\n    margin-right: 10px;\n}\n\n/* Menu Screen Style */\n#menu{\n    display: block;\n    width: 340px;\n    padding-top: 95px;\n    padding-bottom: 95px;\n    font-size: 40px;\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center;\n    color: #FFF;\n}\n\n#menu h2{\n    -webkit-animation: logo-ani 1000ms linear infinite;\n            animation: logo-ani 1000ms linear infinite;\n    margin-bottom: 30px;\n    color: #FFF;\n    \n}\n\n#menu a{\n    font-size: 30px;\n    color: #FFF;\n}\n\n@-webkit-keyframes logo-ani{\n   50%{-webkit-transform: scale(1.3,1.3);}\n  100%{-webkit-transform: scale(1.0,1.0);}\n}\n\n@keyframes logo-ani{\n   50%{transform: scale(1.3,1.3);}\n  100%{transform: scale(1.0,1.0);}\n}\n\n\n/* Game Over Screen Style */\n\n#gameover{\n    display: none;\n    width: 340px;\n    padding-top: 95px;\n    padding-bottom: 95px;\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center;\n    font-size: 30px;\n    color: #FFF;\n}\n\n#gameover p{\n    margin-top: 25px;\n    font-size: 20px;\n}\n\n/* Settings Screen Style */\n#setting{\n    display: none;\n    width: 340px;\n    margin-left: auto;\n    margin-right: auto;\n    padding-top: 85px;\n    padding-bottom: 85px;\n    font-size: 30px;\n    color: #FFF;\n    text-align: center;\n}\n\n#setting h2{\n    margin-bottom: 15px;\n}\n\n#setting p{\n    margin-top: 10px;\n}\n\n#setting input{\n    display:none;\n}\n\n#setting label{\n    cursor: pointer;\n}\n\n#setting input:checked + label{\n    background-color: #FFF;\n    color: #000;\n}","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"gameover": "SnakeGame_gameover_2iv",
  	"setting": "SnakeGame_setting_k17",
  	"menu": "SnakeGame_menu_1Om",
  	"logo-ani": "SnakeGame_logo-ani_1oZ"
  };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*\r\n * Colors\r\n * ========================================================================== */\n\n/* #222 */\n\n/* #404040 */\n\n/* #555 */\n\n/* #777 */\n\n/* #eee */\n\n/*\r\n * Typography\r\n * ========================================================================== */\n\n/*\r\n * Layout\r\n * ========================================================================== */\n\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\n\n/* Extra small screen / phone */\n\n/* Small screen / tablet */\n\n/* Medium screen / desktop */\n\n/* Large screen / wide desktop */\n\n/*\r\n * Animations\r\n * ========================================================================== */\n\n.Contact_root_dJi {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Contact_container_D8L {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./src/routes/contact/Contact.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"Contact.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.scss';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: $max-content-width;\n}\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Contact_root_dJi",
  	"container": "Contact_container_D8L"
  };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=VT323);", ""]);
  
  // module
  exports.push([module.id, "\n/*\r\n * Colors\r\n * ========================================================================== *//* #222 *//* #404040 *//* #555 *//* #777 *//* #eee *//*\r\n * Typography\r\n * ========================================================================== *//*\r\n * Layout\r\n * ========================================================================== *//*\r\n * Media queries breakpoints\r\n * ========================================================================== *//* Extra small screen / phone *//* Small screen / tablet *//* Medium screen / desktop *//* Large screen / wide desktop *//*\r\n * Animations\r\n * ========================================================================== *//**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */.Home_root_qf4 {\n  padding-left: 20px;\n  padding-right: 20px;\n}.Home_container_2AB {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}.Home_news_3cv {\n  padding: 0;\n}.Home_newsItem_2e0 {\n  list-style-type: none;\n  padding-bottom: 6px;\n}.Home_newsTitle_1EI {\n  font-size: 1.125em;\n}.Home_newsTitle_1EI, .Home_newsDesc_58O {\n  display: block;\n}::-moz-selection {color:#FFFFFF; background:transparent;}::selection {color:#FFFFFF; background:transparent;}::-moz-selection {color:#FFFFFF; background:transparent;}*{\n    margin: 0;\n    padding: 0;\n    font-family: \"VT323\";\n}body{\n    /* background-color: #000000;*/\n}.Home_wrap_3vE{\n    margin-left: auto;\n    margin-right: auto;\n}header{\n    width: 340px;\n    font-size: 0;\n}canvas{\n    display: none;\n    border-style: solid;\n    border-width: 10px;\n    border-color: #FFFFFF;\n}canvas:focus{\n    outline: none;\n}/* Top Styles */h1{\n    display: inline-block;\n    width: 100px;\n    font-size: 32px;\n    color: #000000;\n}.Home_score_3TG{\n    display: inline-block;\n    width: 240px;\n    font-size: 20px;\n    color: #000000;\n    text-align: right;\n}.Home_score_value_1DM{\n    font-size: inherit;\n}/* All screens style */#Home_gameover_-ud a, #Home_setting_CnX a, #Home_menu_WH_ a{\n    display: block;\n}#Home_gameover_-ud a, #Home_setting_CnX a:hover, #Home_menu_WH_ a:hover{\n    cursor: pointer;\n}#Home_gameover_-ud a:hover::before, #Home_setting_CnX a:hover::before, #Home_menu_WH_ a:hover::before{\n    content: \">\";\n    margin-right: 10px;\n}/* Menu Screen Style */#Home_menu_WH_{\n    display: block;\n    width: 340px;\n    padding-top: 95px;\n    padding-bottom: 95px;\n    font-size: 40px;\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center;\n    color: #000;\n}#Home_menu_WH_ h2{\n    -webkit-animation: Home_logo-ani_3bJ 1000ms linear infinite;\n            -o-animation: Home_logo-ani_3bJ 1000ms linear infinite;\n       animation: Home_logo-ani_3bJ 1000ms linear infinite;\n    margin-bottom: 30px;\n    color: #000;\n\n}#Home_menu_WH_ a{\n    font-size: 30px;\n}color: #000;@-webkit-keyframes Home_logo-ani_3bJ{\n   50%{-webkit-transform: scale(1.3,1.3);}\n  100%{-webkit-transform: scale(1.0,1.0);}\n}@-o-keyframes Home_logo-ani_3bJ{\n   50%{-o-transform: scale(1.3,1.3);transform: scale(1.3,1.3);}\n  100%{-o-transform: scale(1.0,1.0);transform: scale(1.0,1.0);}\n}@keyframes Home_logo-ani_3bJ{\n   50%{-webkit-transform: scale(1.3,1.3);-o-transform: scale(1.3,1.3);transform: scale(1.3,1.3);}\n  100%{-webkit-transform: scale(1.0,1.0);-o-transform: scale(1.0,1.0);transform: scale(1.0,1.0);}\n}/* Game Over Screen Style */#Home_gameover_-ud{\n    display: none;\n    width: 340px;\n    padding-top: 95px;\n    padding-bottom: 95px;\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center;\n    font-size: 30px;\n    color: #FFF;\n}#Home_gameover_-ud p{\n    margin-top: 25px;\n    font-size: 20px;\n}/* Settings Screen Style */#Home_setting_CnX{\n    display: none;\n    width: 340px;\n    margin-left: auto;\n    margin-right: auto;\n    padding-top: 85px;\n    padding-bottom: 85px;\n    font-size: 30px;\n    color: #FFF;\n    text-align: center;\n}#Home_setting_CnX h2{\n    margin-bottom: 15px;\n}#Home_setting_CnX p{\n    margin-top: 10px;\n}#Home_setting_CnX input{\n    display:none;\n}#Home_setting_CnX label{\n    cursor: pointer;\n}#Home_setting_CnX input:checked + label{\n    background-color: #FFF;\n    color: #000;\n}", "", {"version":3,"sources":["/./src/routes/home/Home.scss","/./src/components/variables.scss"],"names":[],"mappings":";AAC6D;;gFCCmB,UAGd,aACG,UACH,UACA,UACA;;gFAIc;;gFAMA;;gFAMA,gCAEhB,2BACL,6BACE,iCACI;;gFD3BjE;;;;;;;GAOG;EAID,mBAAmB;EACnB,oBAAoB;CACrB;EAGC,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B;EAGC,WAAW;CACZ;EAGC,sBAAsB;EACtB,oBAAoB;CACrB;EAGC,mBAAmB;CACpB;EAGC,eAAe;CAChB,kBAGY,cAAc,CAAC,uBAAuB,CAAnD,aAAa,cAAc,CAAC,uBAAuB,CAAC,kBAClC,cAAc,CAAC,uBAAuB,CAAC;IAGrD,UAAU;IACV,WAAW;IACX,qBAAqB;CACxB;IAEG,+BAA6B;CAChC;IAEG,kBAAkB;IAClB,mBAAmB;CACtB;IAEG,aAAa;IACb,aAAa;CAChB;IAEG,cAAc;IACd,oBAAoB;IACpB,mBAAmB;IACnB,sBAAsB;CACzB;IAEG,cAAc;CACjB,gBAEe;IAEZ,sBAAsB;IACtB,aAAa;IACb,gBAAgB;IAChB,eAAe;CAClB;IAEG,sBAAsB;IACtB,aAAa;IACb,gBAAgB;IAChB,eAAe;IACf,kBAAkB;CACrB;IAEG,mBAAmB;CACtB,uBAIsB;IAEnB,eAAe;CAClB;IAGG,gBAAgB;CACnB;IAGG,aAAa;IACb,mBAAmB;CACtB,uBAEsB;IAEnB,eAAe;IACf,aAAa;IACb,kBAAkB;IAClB,qBAAqB;IACrB,gBAAgB;IAChB,kBAAkB;IAClB,mBAAmB;IACnB,mBAAmB;IACnB,YAAY;CACf;IAGG,4DAAmD;YAC3C,uDAA2C;OAA3C,oDAA2C;IACnD,oBAAoB;IACpB,YAAY;;CAEf;IAGG,gBAAgB;CACnB,YAAgB;GAId,IAAI,kCAAkC,CAAC;EACxC,KAAK,kCAAkC,CAAC;CACzC;GAGE,IAAI,6BAAA,0BAA0B,CAAC;EAChC,KAAK,6BAAA,0BAA0B,CAAC;CAFlC;GACG,IAAI,kCAAA,6BAAA,0BAA0B,CAAC;EAChC,KAAK,kCAAA,6BAAA,0BAA0B,CAAC;CACjC,4BAG2B;IAGxB,cAAc;IACd,aAAa;IACb,kBAAkB;IAClB,qBAAqB;IACrB,kBAAkB;IAClB,mBAAmB;IACnB,mBAAmB;IACnB,gBAAgB;IAChB,YAAY;CACf;IAGG,iBAAiB;IACjB,gBAAgB;CACnB,2BAE0B;IAEvB,cAAc;IACd,aAAa;IACb,kBAAkB;IAClB,mBAAmB;IACnB,kBAAkB;IAClB,qBAAqB;IACrB,gBAAgB;IAChB,YAAY;IACZ,mBAAmB;CACtB;IAGG,oBAAoB;CACvB;IAGG,iBAAiB;CACpB;IAGG,aAAa;CAChB;IAGG,gBAAgB;CACnB;IAGG,uBAAuB;IACvB,YAAY;CACf","file":"Home.scss","sourcesContent":["@import '../../components/variables.scss';\n@import url(\"https://fonts.googleapis.com/css?family=VT323\");\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: $max-content-width;\n}\n\n.news {\n  padding: 0;\n}\n\n.newsItem {\n  list-style-type: none;\n  padding-bottom: 6px;\n}\n\n.newsTitle {\n  font-size: 1.125em;\n}\n\n.newsTitle, .newsDesc {\n  display: block;\n}\n\n            \n::selection {color:#FFFFFF; background:transparent;}\n::-moz-selection {color:#FFFFFF; background:transparent;}\n\n*{\n    margin: 0;\n    padding: 0;\n    font-family: \"VT323\";\n}\nbody{\n    // background-color: #000000;\n}\n.wrap{\n    margin-left: auto;\n    margin-right: auto;\n}\nheader{\n    width: 340px;\n    font-size: 0;\n}\ncanvas{\n    display: none;\n    border-style: solid;\n    border-width: 10px;\n    border-color: #FFFFFF;\n}\ncanvas:focus{\n    outline: none;\n}\n\n/* Top Styles */\nh1{\n    display: inline-block;\n    width: 100px;\n    font-size: 32px;\n    color: #000000;\n}\n.score{\n    display: inline-block;\n    width: 240px;\n    font-size: 20px;\n    color: #000000;\n    text-align: right;\n}\n.score_value{\n    font-size: inherit;\n}\n\n\n\n/* All screens style */\n#gameover a, #setting a, #menu a{\n    display: block;\n}\n\n#gameover a, #setting a:hover, #menu a:hover{\n    cursor: pointer;\n}\n\n#gameover a:hover::before, #setting a:hover::before, #menu a:hover::before{\n    content: \">\";\n    margin-right: 10px;\n}\n\n/* Menu Screen Style */\n#menu{\n    display: block;\n    width: 340px;\n    padding-top: 95px;\n    padding-bottom: 95px;\n    font-size: 40px;\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center;\n    color: #000;\n}\n\n#menu h2{\n    -webkit-animation: logo-ani 1000ms linear infinite;\n            animation: logo-ani 1000ms linear infinite;\n    margin-bottom: 30px;\n    color: #000;\n\n}\n\n#menu a{\n    font-size: 30px;\n}    color: #000;\n\n\n@-webkit-keyframes logo-ani{\n   50%{-webkit-transform: scale(1.3,1.3);}\n  100%{-webkit-transform: scale(1.0,1.0);}\n}\n\n@keyframes logo-ani{\n   50%{transform: scale(1.3,1.3);}\n  100%{transform: scale(1.0,1.0);}\n}\n\n\n/* Game Over Screen Style */\n\n#gameover{\n    display: none;\n    width: 340px;\n    padding-top: 95px;\n    padding-bottom: 95px;\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center;\n    font-size: 30px;\n    color: #FFF;\n}\n\n#gameover p{\n    margin-top: 25px;\n    font-size: 20px;\n}\n\n/* Settings Screen Style */\n#setting{\n    display: none;\n    width: 340px;\n    margin-left: auto;\n    margin-right: auto;\n    padding-top: 85px;\n    padding-bottom: 85px;\n    font-size: 30px;\n    color: #FFF;\n    text-align: center;\n}\n\n#setting h2{\n    margin-bottom: 15px;\n}\n\n#setting p{\n    margin-top: 10px;\n}\n\n#setting input{\n    display:none;\n}\n\n#setting label{\n    cursor: pointer;\n}\n\n#setting input:checked + label{\n    background-color: #FFF;\n    color: #000;\n}","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Home_root_qf4",
  	"container": "Home_container_2AB",
  	"news": "Home_news_3cv",
  	"newsItem": "Home_newsItem_2e0",
  	"newsTitle": "Home_newsTitle_1EI",
  	"newsDesc": "Home_newsDesc_58O",
  	"wrap": "Home_wrap_3vE",
  	"score": "Home_score_3TG",
  	"score_value": "Home_score_value_1DM",
  	"gameover": "Home_gameover_-ud",
  	"setting": "Home_setting_CnX",
  	"menu": "Home_menu_WH_",
  	"logo-ani": "Home_logo-ani_3bJ"
  };

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*\r\n * Colors\r\n * ========================================================================== */\n\n/* #222 */\n\n/* #404040 */\n\n/* #555 */\n\n/* #777 */\n\n/* #eee */\n\n/*\r\n * Typography\r\n * ========================================================================== */\n\n/*\r\n * Layout\r\n * ========================================================================== */\n\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\n\n/* Extra small screen / phone */\n\n/* Small screen / tablet */\n\n/* Medium screen / desktop */\n\n/* Large screen / wide desktop */\n\n/*\r\n * Animations\r\n * ========================================================================== */\n\n.Login_root_1Yv {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Login_container_dzJ {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./src/routes/login/Login.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"Login.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.scss';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: $max-content-width;\n}\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Login_root_1Yv",
  	"container": "Login_container_dzJ"
  };

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*\r\n * Colors\r\n * ========================================================================== */\n\n/* #222 */\n\n/* #404040 */\n\n/* #555 */\n\n/* #777 */\n\n/* #eee */\n\n/*\r\n * Typography\r\n * ========================================================================== */\n\n/*\r\n * Layout\r\n * ========================================================================== */\n\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\n\n/* Extra small screen / phone */\n\n/* Small screen / tablet */\n\n/* Medium screen / desktop */\n\n/* Large screen / wide desktop */\n\n/*\r\n * Animations\r\n * ========================================================================== */\n\n.Register_root_154 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Register_container_3Ea {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./src/routes/register/Register.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"Register.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.scss';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: $max-content-width;\n}\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Register_root_154",
  	"container": "Register_container_3Ea"
  };

/***/ }),
/* 77 */
/***/ (function(module, exports) {

  module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(64);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./App.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./App.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(65);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ContentPage.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ContentPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(66);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ErrorPage.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ErrorPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(67);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Feedback.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Feedback.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(68);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Footer.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Footer.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(69);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Header.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Header.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(70);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Navigation.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Navigation.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(71);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./NotFoundPage.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./NotFoundPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(72);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./SnakeGame.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./SnakeGame.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(73);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Contact.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Contact.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(74);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Home.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Home.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(75);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Login.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Login.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(76);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Register.scss", function() {
          var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Register.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(21);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (stack) {
  jade_debug.unshift(new jade.DebugItem( 0, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<html lang=\"en\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<title>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 5, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<style>");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("* {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  line-height: 1.2;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 0;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("html {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  color: #888;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  display: table;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  font-family: sans-serif;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  height: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  text-align: center;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  width: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("body {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  display: table-cell;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  vertical-align: middle;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 2em auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  color: #555;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  font-size: 2em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  font-weight: 400;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 0 auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  width: 280px;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("pre {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  text-align: left;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  max-width: 1000px;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 0 auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("@media only screen and (max-width: 280px) {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  body, p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("    width: 95%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("    font-size: 1.5em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("    margin: 0 0 0.3em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</style>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 59, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 60, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<h1>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 60, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</h1>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 61, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<p>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 61, jade_debug[0].filename ));
  buf.push("Sorry, something went wrong.");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</p>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 62, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<pre>" + (jade.escape(null == (jade_interp = stack) ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</pre>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 63, "/Users/joel/dev/blockchainsandbox/src/views/error.jade" ));
  buf.push("<!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx-->");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"stack" in locals_for_with?locals_for_with.stack:typeof stack!=="undefined"?stack:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\nhtml(lang=\"en\")\n  head\n    meta(charset=\"utf-8\")\n    title Internal Server Error\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\n    style.\n\n      * {\n        line-height: 1.2;\n        margin: 0;\n      }\n\n      html {\n        color: #888;\n        display: table;\n        font-family: sans-serif;\n        height: 100%;\n        text-align: center;\n        width: 100%;\n      }\n\n      body {\n        display: table-cell;\n        vertical-align: middle;\n        margin: 2em auto;\n      }\n\n      h1 {\n        color: #555;\n        font-size: 2em;\n        font-weight: 400;\n      }\n\n      p {\n        margin: 0 auto;\n        width: 280px;\n      }\n\n      pre {\n        text-align: left;\n        max-width: 1000px;\n        margin: 0 auto;\n      }\n\n      @media only screen and (max-width: 280px) {\n\n        body, p {\n          width: 95%;\n        }\n\n        h1 {\n          font-size: 1.5em;\n          margin: 0 0 0.3em;\n        }\n\n      }\n\n  body\n    h1 Internal Server Error\n    p Sorry, something went wrong.\n    pre= stack\n// IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx\n");
  }
  }

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(21);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (body, css, description, entry, title, trackingId) {
  jade_debug.unshift(new jade.DebugItem( 0, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<html lang=\"\" class=\"no-js\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<meta name=\"description\"" + (jade.attr("description", description, true, true)) + ">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 8, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 9, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 10, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<style id=\"css\">" + (null == (jade_interp = css) ? "" : jade_interp));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</style>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 11, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 12, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<div id=\"app\">" + (null == (jade_interp = body) ? "" : jade_interp));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</div>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 13, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<script" + (jade.attr("src", entry, true, true)) + ">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 14, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<script>");
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  buf.push("window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  buf.push("ga('create','" + (jade.escape((jade_interp = trackingId) == null ? '' : jade_interp)) + "','auto');ga('send','pageview')");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 17, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  if ( trackingId)
  {
  jade_debug.unshift(new jade.DebugItem( 18, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  jade_debug.unshift(new jade.DebugItem( 18, "/Users/joel/dev/blockchainsandbox/src/views/index.jade" ));
  buf.push("<script src=\"https://www.google-analytics.com/analytics.js\" async defer>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.shift();
  }
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"entry" in locals_for_with?locals_for_with.entry:typeof entry!=="undefined"?entry:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"trackingId" in locals_for_with?locals_for_with.trackingId:typeof trackingId!=="undefined"?trackingId:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\nhtml(class=\"no-js\", lang=\"\")\n  head\n    meta(charset=\"utf-8\")\n    meta(http-equiv=\"x-ua-compatible\", content=\"ie=edge\")\n    title= title\n    meta(name=\"description\", description=description)\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\n    link(rel=\"apple-touch-icon\", href=\"apple-touch-icon.png\")\n    style#css!= css\n  body\n    #app!= body\n    script(src=entry)\n    script.\n      window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;\n      ga('create','#{trackingId}','auto');ga('send','pageview')\n    if trackingId\n      script(src=\"https://www.google-analytics.com/analytics.js\", async=true, defer=true)\n");
  }
  }

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

  var isarray = __webpack_require__(77)
  
  /**
   * Expose `pathToRegexp`.
   */
  module.exports = pathToRegexp
  module.exports.parse = parse
  module.exports.compile = compile
  module.exports.tokensToFunction = tokensToFunction
  module.exports.tokensToRegExp = tokensToRegExp
  
  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
  ].join('|'), 'g')
  
  /**
   * Parse a string for the raw tokens.
   *
   * @param  {string}  str
   * @param  {Object=} options
   * @return {!Array}
   */
  function parse (str, options) {
    var tokens = []
    var key = 0
    var index = 0
    var path = ''
    var defaultDelimiter = options && options.delimiter || '/'
    var res
  
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0]
      var escaped = res[1]
      var offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length
  
      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        continue
      }
  
      var next = str[index]
      var prefix = res[2]
      var name = res[3]
      var capture = res[4]
      var group = res[5]
      var modifier = res[6]
      var asterisk = res[7]
  
      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path)
        path = ''
      }
  
      var partial = prefix != null && next != null && next !== prefix
      var repeat = modifier === '+' || modifier === '*'
      var optional = modifier === '?' || modifier === '*'
      var delimiter = res[2] || defaultDelimiter
      var pattern = capture || group
  
      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        partial: partial,
        asterisk: !!asterisk,
        pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
      })
    }
  
    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index)
    }
  
    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path)
    }
  
    return tokens
  }
  
  /**
   * Compile a string to a template function for the path.
   *
   * @param  {string}             str
   * @param  {Object=}            options
   * @return {!function(Object=, Object=)}
   */
  function compile (str, options) {
    return tokensToFunction(parse(str, options))
  }
  
  /**
   * Prettier encoding of URI path segments.
   *
   * @param  {string}
   * @return {string}
   */
  function encodeURIComponentPretty (str) {
    return encodeURI(str).replace(/[\/?#]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase()
    })
  }
  
  /**
   * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
   *
   * @param  {string}
   * @return {string}
   */
  function encodeAsterisk (str) {
    return encodeURI(str).replace(/[?#]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase()
    })
  }
  
  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction (tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length)
  
    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === 'object') {
        matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
      }
    }
  
    return function (obj, opts) {
      var path = ''
      var data = obj || {}
      var options = opts || {}
      var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent
  
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i]
  
        if (typeof token === 'string') {
          path += token
  
          continue
        }
  
        var value = data[token.name]
        var segment
  
        if (value == null) {
          if (token.optional) {
            // Prepend partial segment prefixes.
            if (token.partial) {
              path += token.prefix
            }
  
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }
  
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
          }
  
          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }
  
          for (var j = 0; j < value.length; j++) {
            segment = encode(value[j])
  
            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
            }
  
            path += (j === 0 ? token.prefix : token.delimiter) + segment
          }
  
          continue
        }
  
        segment = token.asterisk ? encodeAsterisk(value) : encode(value)
  
        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
        }
  
        path += token.prefix + segment
      }
  
      return path
    }
  }
  
  /**
   * Escape a regular expression string.
   *
   * @param  {string} str
   * @return {string}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
  }
  
  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {string} group
   * @return {string}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }
  
  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {!RegExp} re
   * @param  {Array}   keys
   * @return {!RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys
    return re
  }
  
  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {string}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }
  
  /**
   * Pull out keys from a regexp.
   *
   * @param  {!RegExp} path
   * @param  {!Array}  keys
   * @return {!RegExp}
   */
  function regexpToRegexp (path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g)
  
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          partial: false,
          asterisk: false,
          pattern: null
        })
      }
    }
  
    return attachKeys(path, keys)
  }
  
  /**
   * Transform an array into a regexp.
   *
   * @param  {!Array}  path
   * @param  {Array}   keys
   * @param  {!Object} options
   * @return {!RegExp}
   */
  function arrayToRegexp (path, keys, options) {
    var parts = []
  
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }
  
    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
  
    return attachKeys(regexp, keys)
  }
  
  /**
   * Create a path regexp from string input.
   *
   * @param  {string}  path
   * @param  {!Array}  keys
   * @param  {!Object} options
   * @return {!RegExp}
   */
  function stringToRegexp (path, keys, options) {
    return tokensToRegExp(parse(path, options), keys, options)
  }
  
  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {!Array}          tokens
   * @param  {(Array|Object)=} keys
   * @param  {Object=}         options
   * @return {!RegExp}
   */
  function tokensToRegExp (tokens, keys, options) {
    if (!isarray(keys)) {
      options = /** @type {!Object} */ (keys || options)
      keys = []
    }
  
    options = options || {}
  
    var strict = options.strict
    var end = options.end !== false
    var route = ''
  
    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]
  
      if (typeof token === 'string') {
        route += escapeString(token)
      } else {
        var prefix = escapeString(token.prefix)
        var capture = '(?:' + token.pattern + ')'
  
        keys.push(token)
  
        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*'
        }
  
        if (token.optional) {
          if (!token.partial) {
            capture = '(?:' + prefix + '(' + capture + '))?'
          } else {
            capture = prefix + '(' + capture + ')?'
          }
        } else {
          capture = prefix + '(' + capture + ')'
        }
  
        route += capture
      }
    }
  
    var delimiter = escapeString(options.delimiter || '/')
    var endsWithDelimiter = route.slice(-delimiter.length) === delimiter
  
    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
    }
  
    if (end) {
      route += '$'
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
    }
  
    return attachKeys(new RegExp('^' + route, flags(options)), keys)
  }
  
  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(string|RegExp|Array)} path
   * @param  {(Array|Object)=}       keys
   * @param  {Object=}               options
   * @return {!RegExp}
   */
  function pathToRegexp (path, keys, options) {
    if (!isarray(keys)) {
      options = /** @type {!Object} */ (keys || options)
      keys = []
    }
  
    options = options || {}
  
    if (path instanceof RegExp) {
      return regexpToRegexp(path, /** @type {!Array} */ (keys))
    }
  
    if (isarray(path)) {
      return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
    }
  
    return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
  }


/***/ }),
/* 94 */
/***/ (function(module, exports) {

  module.exports = function(module) {
  	if(!module.webpackPolyfill) {
  		module.deprecate = function() {};
  		module.paths = [];
  		// module.parent = undefined by default
  		module.children = [];
  		module.webpackPolyfill = 1;
  	}
  	return module;
  }


/***/ }),
/* 95 */
/***/ (function(module, exports) {

  module.exports = require("./assets");

/***/ }),
/* 96 */
/***/ (function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ }),
/* 97 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/is-iterable");

/***/ }),
/* 98 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/create");

/***/ }),
/* 99 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/define-property");

/***/ }),
/* 100 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/set-prototype-of");

/***/ }),
/* 101 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/symbol");

/***/ }),
/* 102 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/symbol/iterator");

/***/ }),
/* 103 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 104 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ }),
/* 105 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 106 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),
/* 107 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 108 */
/***/ (function(module, exports) {

  module.exports = require("body-parser");

/***/ }),
/* 109 */
/***/ (function(module, exports) {

  module.exports = require("classnames");

/***/ }),
/* 110 */
/***/ (function(module, exports) {

  module.exports = require("cookie-parser");

/***/ }),
/* 111 */
/***/ (function(module, exports) {

  module.exports = require("core-js/library/fn/get-iterator");

/***/ }),
/* 112 */
/***/ (function(module, exports) {

  module.exports = require("core-js/library/fn/object/create");

/***/ }),
/* 113 */
/***/ (function(module, exports) {

  module.exports = require("express");

/***/ }),
/* 114 */
/***/ (function(module, exports) {

  module.exports = require("express-graphql");

/***/ }),
/* 115 */
/***/ (function(module, exports) {

  module.exports = require("express-jwt");

/***/ }),
/* 116 */
/***/ (function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

  module.exports = require("front-matter");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

  module.exports = require("jade");

/***/ }),
/* 122 */
/***/ (function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

  module.exports = require("markdown-it");

/***/ }),
/* 124 */
/***/ (function(module, exports) {

  module.exports = require("node-fetch");

/***/ }),
/* 125 */
/***/ (function(module, exports) {

  module.exports = require("passport");

/***/ }),
/* 126 */
/***/ (function(module, exports) {

  module.exports = require("passport-facebook");

/***/ }),
/* 127 */
/***/ (function(module, exports) {

  module.exports = require("pg");

/***/ }),
/* 128 */
/***/ (function(module, exports) {

  module.exports = require("pretty-error");

/***/ }),
/* 129 */
/***/ (function(module, exports) {

  module.exports = require("react-dom/server");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map