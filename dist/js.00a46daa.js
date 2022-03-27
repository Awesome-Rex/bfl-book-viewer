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
})({"js/index.js":[function(require,module,exports) {
// const { update } = require("lodash");
function addGlobalEventListener(type, selector, callback, options) {
  document.addEventListener(type, function (e) {
    if (e.target.matches(selector)) {
      callback(e);
    }
  }, options);
}

function mouseHover(element, event) {
  var rect = element.getBoundingClientRect();
  return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
}

function updateTouch() {}

initial = function () {
  console.log("initial load");
  {
    //helpers
    //min/max area
    addGlobalEventListener("load", ".-live-area", function (e) {// boxes.forEach(box => {
      //     new ResizeObserver(entries => {
      //         const width = Math.floor(entries[0].contentRect.width);
      //         const height = Math.floor(entries[0].contentRect.height);
      //         entries[0].target.value = `I'm ${width}px and ${height}px tall`;
      //     }).observe(box);
      // });
    }); // areaObserver = new ResizeObserver(entries => {
    // });
    // areaObserver.observe()
    // window.addEventListener('storage', e => {
    //     console.log("storage");
    //     document.querySelectorAll(".-live-area").forEach((area, index, array) => {
    //     });
    // });
    //range update fill

    addGlobalEventListener("load", "input[type='range']", function (e) {});
  }
}();

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("document load"); // elem = document.createElement("span");
  // elem.classList.add("-live-area");
  // elem.innerText = "new";
  // document.querySelector("body").append(elem);

  {
    //helpers
    //range slider fill
    addGlobalEventListener("input", "input[type='range']", function (e) {
      e.target.style.setProperty("--range-progress", (e.target.value - e.target.min) / (e.target.max - e.target.min) * 100 + "%");
    }); //range slider restrictions

    addGlobalEventListener("change", "input[type='number']", function (e) {
      e.target.value = Math.min(Math.max(e.target.value, e.target.min), e.target.max);
    });
  }
  {
    //page
    //navbar
    document.querySelector("#navbar .toggle").addEventListener("change", function () {
      document.querySelector("#navbar .right-navbar").classList.toggle("-active", document.querySelector("#navbar .toggle").checked);
    }); //progress bar

    {
      //data
      var updatePages = function updatePages(bookPlayer) {
        //set slider
        bookPlayer.querySelector(".slider").value = parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--current-page"));
        bookPlayer.querySelector(".slider").min = 1;
        bookPlayer.querySelector(".slider").max = parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--total-pages"));
        /**/

        bookPlayer.querySelector(".slider").style.setProperty("--range-progress", (bookPlayer.querySelector(".slider").value - bookPlayer.querySelector(".slider").min) / (bookPlayer.querySelector(".slider").max - bookPlayer.querySelector(".slider").min) * 100 + "%"); //set point counter

        bookPlayer.querySelector(".point-counter .page").value = parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--current-page"));
        bookPlayer.querySelector(".point-counter .page").min = 1;
        bookPlayer.querySelector(".point-counter .page").max = parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--total-pages"));
        bookPlayer.querySelector(".point-counter .max").innerText = window.getComputedStyle(bookPlayer).getPropertyValue("--total-pages");
        bookPlayer.querySelector(".point-counter").style.setProperty("--comp-width", bookPlayer.querySelector(".point-counter").offsetWidth + "px");
      };

      document.querySelectorAll(".book-player").forEach(function (elem, i, arr) {
        updatePages(elem);
      });
      addGlobalEventListener("input", ".book-player .slider", function (e) {
        e.target.closest(".book-player").style.setProperty("--current-page", e.target.value);
        updatePages(e.target.closest(".book-player"));
      });
      addGlobalEventListener("change", ".book-player .point-counter .page", function (e) {
        // console.log(e.target.value);
        e.target.closest(".book-player").style.setProperty("--current-page", e.target.value);
        updatePages(e.target.closest(".book-player"));
      });
    }
    {
      //styling
      document.addEventListener("mousemove", function (event) {
        document.querySelectorAll(".book-player .progress .zone").forEach(function (elem, i, arr) {
          elem.closest(".progress").classList.toggle("-near", mouseHover(elem, event));
        });
      });
      addGlobalEventListener("mouseover", ".book-player .progress .slider", function (e) {
        e.target.closest(".progress").classList.add("-hover");
        e.target.addEventListener("mouseout", function (e) {
          e.target.closest(".progress").classList.remove("-hover");
        }, {
          once: true
        });
      });
      addGlobalEventListener("input", ".book-player .progress .slider", function (e) {
        e.target.closest(".progress").classList.add("-active");
        e.target.addEventListener("change", function (e) {
          e.target.closest(".progress").classList.remove("-active");
        }, {
          once: true
        });
      });
    }
  }
});
window.addEventListener("load", function (e) {
  console.log("window load");
  {
    //device accomodations
    window.addEventListener("resize", function (event) {
      document.querySelectorAll(".book-player .progress").forEach(function (elem) {
        elem.classList.toggle("-touch", window.matchMedia("(hover: none)").matches);
      });
    });
    document.querySelectorAll(".book-player .progress").forEach(function (elem) {
      elem.classList.toggle("-touch", window.matchMedia("(hover: none)").matches);
    });
  }
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "14163" + '/');

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
      }); // Enable HMR for CSS by default.

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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map