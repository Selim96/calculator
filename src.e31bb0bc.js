// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provaiders = void 0;
var provaiders = [{
  name: "backblaze",
  icon: null,
  color: "rgba(243, 53, 53, 0.527)",
  values: {
    minPrice: 7,
    maxPrice: +Infinity,
    storage: 0.005,
    transfer: 0.01,
    freeStorage: 0,
    freeTransfer: 0
  }
}, {
  name: "bunny",
  icon: null,
  color: "rgba(248, 146, 50, 0.527)",
  values: {
    minPrice: 0,
    maxPrice: 10,
    storage: {
      hdd: 0.01,
      ssd: 0.02
    },
    transfer: 0.01,
    freeStorage: 0,
    freeTransfer: 0
  }
}, {
  name: "scaleway",
  icon: null,
  color: "rgba(248, 55, 206, 0.527)",
  values: {
    minPrice: 0,
    maxPrice: +Infinity,
    storage: {
      multi: 0.06,
      single: 0.03
    },
    transfer: 0.02,
    freeStorage: 75,
    freeTransfer: 75
  }
}, {
  name: "vultr",
  icon: null,
  color: "rgba(55, 155, 248, 0.527)",
  values: {
    minPrice: 5,
    maxPrice: +Infinity,
    storage: 0.01,
    transfer: 0.01,
    freeStorage: 0,
    freeTransfer: 0
  }
}];
exports.provaiders = provaiders;
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"sass/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../public/icon.webp":[function(require,module,exports) {
module.exports = "/icon.babd7d53.webp";
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _data = require("./data.js");
require("./sass/main.scss");
var _icon = _interopRequireDefault(require("../public/icon.webp"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var refs = {
  storageInput: document.querySelector('#storage'),
  transferInput: document.querySelector('#transfer'),
  handlInputStorage: document.querySelector('#inputStorage'),
  handlInputTransfer: document.querySelector('#inputTransfer'),
  provaidersNames: document.querySelector('.provaiders_names'),
  provaidersSchedule: document.querySelector('.schedule')
};
var TABLET_WIDTH = 860;
// const MOBILE_WIDTH = 480;

var storageValue = 1;
var transferValue = 1;
var switcher = [];
var minValues = [];
renderSignatures();
renderColumns();
changeColor();
window.addEventListener("resize", addListenerOnSignature);
window.onresize = renderColumns;
// window.onresize = changeColor ;
window.addEventListener("resize", function (e) {
  return changeColor();
});
var allInputs = document.querySelectorAll(".inputBtn");
allInputs.forEach(function (item) {
  item.addEventListener("change", handlChangeSwitcher);
});
refs.storageInput.addEventListener("input", changeStorageValue);
refs.transferInput.addEventListener("input", changeTransferValue);
refs.handlInputStorage.addEventListener("input", handlChangeStorage);
refs.handlInputTransfer.addEventListener("input", handlChangeTransfer);
function renderColumns() {
  var markup = _data.provaiders.map(function (_ref, index) {
    var values = _ref.values,
      color = _ref.color;
    var minPrice = values.minPrice,
      maxPrice = values.maxPrice,
      storage = values.storage,
      transfer = values.transfer,
      freeStorage = values.freeStorage,
      freeTransfer = values.freeTransfer;
    var result = 0;
    if (storageValue <= 1000 && transferValue <= 1000) {}
    if (_typeof(storage) !== "object") {
      var columnSize = (storageValue > freeStorage ? storageValue - freeStorage : 0) * storage + (transferValue > freeTransfer ? transferValue - freeTransfer : 0) * transfer;
      result = columnSize < maxPrice ? columnSize < minPrice ? minPrice : columnSize : maxPrice;
    } else {
      var switcherType = switcher.find(function (item) {
        return (item === null || item === void 0 ? void 0 : item.id) === index;
      }).type;
      var _columnSize = (storageValue > freeStorage ? storageValue - freeStorage : 0) * storage[switcherType] + (transferValue > freeTransfer ? transferValue - freeTransfer : 0) * transfer;
      result = _columnSize < maxPrice ? _columnSize < minPrice ? minPrice : _columnSize : maxPrice;
    }
    minValues.push(result);
    return "<div class=\"schedule_item\" style=".concat(getItemSize(), ">\n                    <div class=\"column\" style=").concat(getColumnSize(result), " data-result=").concat(result, " data-color=\"").concat(color, "\"></div>\n                    <span class=\"value\" >$").concat(result.toFixed(2), "</span>\n                </div>");
  }).join("");
  refs.provaidersSchedule.innerHTML = markup;
}
function renderSignatures() {
  var namesMarkup = _data.provaiders.map(function (_ref2, index) {
    var name = _ref2.name,
      values = _ref2.values,
      icon = _ref2.icon;
    var storage = values.storage;
    if (_typeof(storage) === "object") {
      switcher.push({
        id: index,
        type: Object.keys(storage)[0]
      });
      return "<div class=\"signature\" style=".concat(getItemSize(), ">\n                <img src=\"").concat(icon ? icon : _icon.default, "\" alt=\"provaider icon\" width=\"30\" height=\"30\" class=\"signature_icon\"/>\n                <div>\n                    <p class=\"signature_name\">").concat(name, "</p>\n                    <div class=\"name_switcher\">\n                        <label class=\"\">\n                            ").concat(Object.keys(storage)[0], " <input type=\"radio\" id=\"").concat(index, "\" name=\"storageType").concat(index, "\" value=").concat(Object.keys(storage)[0], "  ").concat(switcher.find(function (item) {
        return item.id === index;
      }).type === Object.keys(storage)[0] && "checked", " class=\"inputBtn\"/>\n                        </label>\n                        <label class=\"\">\n                            ").concat(Object.keys(storage)[1], " <input type=\"radio\" id=\"").concat(index, "\" name=\"storageType").concat(index, "\" value=").concat(Object.keys(storage)[1], " ").concat(switcher.find(function (item) {
        return item.id === index;
      }).type === Object.keys(storage)[1] && "checked", " class=\"inputBtn\"/>\n                        </label> \n                    </div>\n                </div>\n            </div>");
    }
    return "<div class=\"signature\" style=".concat(getItemSize(), ">\n            <img src=\"").concat(icon ? icon : _icon.default, "\" alt=\"provaider icon\" width=30 height=30 class=\"signature_icon\"/>\n            <p class=\"signature_name\">").concat(name, "</p>\n        </div>");
  }).join("");
  refs.provaidersNames.innerHTML = namesMarkup;
}
;
function getColumnSize(result) {
  return window.innerWidth >= TABLET_WIDTH ? "\"width: ".concat(result * 5, "px; height: 75%;\"") : "\"width: 75%; height: ".concat(result * 5, "px;\"");
}
;
function getItemSize() {
  return window.innerWidth < TABLET_WIDTH ? "\"width: calc((100% - 15px)/".concat(_data.provaiders.length, "); height: 100%\"") : "\"width: 100%; height: calc((100% - 15px)/".concat(_data.provaiders.length, ");\"");
}
;
function changeStorageValue(e) {
  var currentValue = e.currentTarget.value;
  refs.handlInputStorage.value = currentValue;
  storageValue = currentValue;
  renderColumns();
  changeColor();
}
;
function changeTransferValue(e) {
  var currentValue = e.currentTarget.value;
  refs.handlInputTransfer.value = currentValue;
  transferValue = currentValue;
  renderColumns();
  changeColor();
}
;
function handlChangeStorage(e) {
  var currentValue = e.currentTarget.value;
  refs.storageInput.value = currentValue;
  refs.handlInputStorage.value = currentValue;
  storageValue = currentValue <= 1000 ? currentValue : 1000;
  renderColumns();
  changeColor();
}
;
function handlChangeTransfer(e) {
  var currentValue = e.currentTarget.value;
  refs.transferInput.value = currentValue;
  refs.handlInputTransfer.value = currentValue;
  transferValue = currentValue <= 1000 ? currentValue : 1000;
  ;
  renderColumns();
  changeColor();
}
;
function handlChangeSwitcher(e) {
  switcher.forEach(function (item) {
    if (item.id.toString() === e.currentTarget.id) {
      item.type = e.currentTarget.value;
    }
  });
  renderColumns();
  changeColor();
}
;
function changeColor() {
  var allColumns = document.querySelectorAll(".column");
  allColumns.forEach(function (item) {
    item.style.backgroundColor = Number(item.dataset.result) === Math.min.apply(Math, _toConsumableArray(minValues)) ? item.dataset.color : "rgba(109, 108, 108, 0.39)";
  });
  minValues = [];
}
;
function addListenerOnSignature(e) {
  renderSignatures();
  var allInputs = document.querySelectorAll(".inputBtn");
  allInputs.forEach(function (item) {
    item.addEventListener("change", handlChangeSwitcher);
  });
}
;
},{"./data.js":"data.js","./sass/main.scss":"sass/main.scss","../public/icon.webp":"../public/icon.webp"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54945" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map