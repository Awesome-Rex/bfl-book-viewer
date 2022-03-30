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
// import pages from "../books/The Cat in the Hat/*.png"; 
// import pages from "../../books";
function addGlobalEventListener(type, selector, callback, options) {
  document.addEventListener(type, function (e) {
    if (e.target.matches(selector)) {
      callback(e);
    }
  }, options);
}

function startEventListener(type, selector, callback, options) {
  document.addEventListener("DOMContentLoaded", function (e) {
    return callback(e);
  });
  addGlobalEventListener(type, selector, function (e) {
    return callback(e);
  }, options);
}

function startResize(callback, options) {
  document.addEventListener("DOMContentLoaded", function (e) {
    return callback(e);
  });
  window.addEventListener("resize", function (e) {
    return callback(e);
  }, options);
  screen.orientation.addEventListener("change", function (e) {
    return callback(e);
  }, options);
  /* deprecated */

  window.addEventListener("orientationchange", function (e) {
    return callback(e);
  }, options); // window.orientation.addEventListener("change", e => callback(e), options);
}

function mouseHover(element, event) {
  var rect = element.getBoundingClientRect();
  return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
}

function overflowX(element) {
  return element.scrollWidth > element.clientWidth;
}

function overflowY(element) {
  return element.scrollHeight > element.clientHeight;
}

function overflow(element) {
  return overflowX(element) || overflowY(element);
}

function getMetaImg(url, callback) {
  var img = new Image();
  img.src = url;

  img.onload = function () {
    callback(this.width, this.height);
  };
} // getMetaImg("http://snook.ca/files/mootools_83_snookca.png", (width, height) => { alert(width + 'px ' + height + 'px') });


initial = function () {
  console.log("initial load");
  {
    //helpers
    //window size (excluding mobile toolbar)
    startResize(function (e) {
      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      document.documentElement.style.setProperty("--viewport-height-fill", window.innerHeight + "px");
    }); //min/max area

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
  {
    //page
    //book info drawer layout
    startResize(function (e) {
      document.querySelectorAll(".book-player-info .info > .drawer").forEach(function (elem, i, arr) {
        elem.closest(".book-player-info").classList.toggle("-overflow", overflowY(elem.closest(".book-player-info").querySelector(".info > .description")));
        elem.closest(".book-player-info").style.setProperty("--min-info-desc", elem.closest(".book-player-info").querySelector(".info > .description").scrollHeight + "px");
      });
    });
  }
}();

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("document load"); // elem = document.createElement("span");
  // elem.classList.add("-live-area");
  // elem.innerText = "new";
  // document.querySelector("body").append(elem);

  var pages = ["THE-CAT-IN-THE-HAT-03", "THE-CAT-IN-THE-HAT-04", "THE-CAT-IN-THE-HAT-05", "THE-CAT-IN-THE-HAT-06", "THE-CAT-IN-THE-HAT-07", "THE-CAT-IN-THE-HAT-08", "THE-CAT-IN-THE-HAT-09", "THE-CAT-IN-THE-HAT-10", "THE-CAT-IN-THE-HAT-11", "THE-CAT-IN-THE-HAT-12"];
  {
    //helpers
    //range slider fill
    addGlobalEventListener("input", "input[type='range']", function (e) {
      e.target.style.setProperty("--range-progress", (e.target.value - e.target.min) / (e.target.max - e.target.min) * 100 + "%");
    }); //range slider restrictions

    addGlobalEventListener("change", "input[type='number']", function (e) {
      e.target.value = Math.min(Math.max(e.target.value, e.target.min), e.target.max);
    }); //scroll container input

    addGlobalEventListener("input", "*:is(.scroll-container-x, .scroll-container-y) input", function (e) {
      var scrollX = e.target.closest(".scroll-container-x");
      var scrollY = e.target.closest(".scroll-container-y");

      if (scrollX != null) {
        scrollX.style.setProperty("overflow-x", "hidden");
      }

      if (scrollY != null) {
        scrollY.style.setProperty("overflow-y", "hidden");
      }

      e.target.addEventListener("change", function (e) {
        if (scrollX != null) {
          scrollX.style.setProperty("overflow-x", "scroll");
        }

        if (scrollY != null) {
          scrollY.style.setProperty("overflow-y", "scroll");
        }
      }, {
        once: true
      });
    });
  }
  {
    //page
    //navbar
    document.querySelector("#navbar .toggle").addEventListener("change", function () {
      document.querySelector("#navbar .right-navbar").classList.toggle("-active", document.querySelector("#navbar .toggle").checked);
    }); //book player page
    // addGlobalEventListener("load", ".book-player > .page > img", e => {
    // document.querySelectorAll(".book-player > .page > img").forEach((elem, i, arr) => {
    //     console.log("img load");
    //     getMetaImg(elem.src, (width, height) => elem.style.setProperty("aspect-ratio", width / height));
    // });
    //progress bar

    {
      // data / interactivity
      var updatePages = function updatePages(bookPlayer) {
        //set internal custom propertes
        bookPlayer.style.setProperty("--current-page", Math.min(Math.max(parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--current-page")), 1), parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--total-pages")))); //clamp current page
        //set page

        bookPlayer.querySelector(":scope > .page > img").src = "./The Cat in the Hat/" + pages[parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--current-page")) - 1] + ".png"; // bookPlayer.querySelector(":scope > .page > img").src = "../books/The Cat in the Hat/" + pages[parseInt(window.getComputedStyle(bookPlayer).getPropertyValue("--current-page")) - 1] + ".png";
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
      }); //slider input

      addGlobalEventListener("input", ".book-player .slider", function (e) {
        e.target.closest(".book-player").style.setProperty("--current-page", e.target.value);
        updatePages(e.target.closest(".book-player"));
      }); //slider change

      addGlobalEventListener("change", ".book-player .point-counter .page", function (e) {
        // console.log(e.target.value);
        e.target.closest(".book-player").style.setProperty("--current-page", e.target.value);
        updatePages(e.target.closest(".book-player"));
      }); //page turn click

      document.addEventListener("pointerdown", function (event) {
        document.querySelectorAll(".book-player .page-turn .zone").forEach(function (elem, i, arr) {
          if (mouseHover(elem, event)) {
            document.addEventListener("pointerup", function (event) {
              if (elem.closest(".page-turn").classList.contains("next")) {
                elem.closest(".book-player").style.setProperty("--current-page", parseInt(window.getComputedStyle(elem.closest(".book-player")).getPropertyValue("--current-page")) + 1);
              } else if (elem.closest(".page-turn").classList.contains("last")) {
                elem.closest(".book-player").style.setProperty("--current-page", parseInt(window.getComputedStyle(elem.closest(".book-player")).getPropertyValue("--current-page")) - 1);
              }

              updatePages(elem.closest(".book-player"));
            }, {
              once: true
            });
          }
        });
      });
    }
    {
      //styling
      //progress near
      document.addEventListener("mousemove", function (event) {
        document.querySelectorAll(".book-player .progress .zone").forEach(function (elem, i, arr) {
          elem.closest(".progress").classList.toggle("-near", mouseHover(elem, event));
          lift = setTimeout(function () {
            elem.closest(".progress").classList.toggle("-near", false);
          }, 2000);
          document.addEventListener("mousemove", function (event) {
            clearTimeout(lift);
          }, {
            once: true
          });
        });
      }); //progress hover

      addGlobalEventListener("pointerover", ".book-player .progress .slider", function (e) {
        e.target.closest(".progress").classList.add("-hover");
        e.target.addEventListener("pointerout", function (e) {
          e.target.closest(".progress").classList.remove("-hover");
        }, {
          once: true
        });
      }); //progress active

      addGlobalEventListener("input", ".book-player .progress .slider", function (e) {
        e.target.closest(".progress").classList.add("-active");
        e.target.addEventListener("change", function (e) {
          e.target.closest(".progress").classList.remove("-active");
        }, {
          once: true
        });
      }); //page turn hover

      document.addEventListener("mousemove", function (event) {
        document.querySelectorAll(".book-player .page-turn .zone").forEach(function (elem, i, arr) {
          elem.closest(".page-turn").classList.toggle("-hover", mouseHover(elem, event));
          var lift = setTimeout(function () {
            elem.closest(".page-turn").classList.toggle("-hover", false);
          }, 2000);
          document.addEventListener("mousemove", function (event) {
            clearTimeout(lift);
          }, {
            once: true
          });
        });
      }); //page turn active

      document.addEventListener("pointerdown", function (event) {
        document.querySelectorAll(".book-player .page-turn .zone").forEach(function (elem, i, arr) {
          if (mouseHover(elem, event)) {
            elem.closest(".page-turn").classList.toggle("-active", true);
            document.addEventListener("pointerup", function (event) {
              elem.closest(".page-turn").classList.toggle("-active", false);
            }, {
              once: true
            });
          }
        });
      }); //book info drawer

      addGlobalEventListener("click", ".book-player-info .info > .drawer", function (e) {
        e.target.closest(".book-player-info").classList.toggle("-expand");
      });
    }
  }
});
window.addEventListener("load", function (e) {
  console.log("window load");
  {//device accomodations
    // window.addEventListener("resize", event => {
    //     document.querySelectorAll(".book-player .progress").forEach((elem) => {
    //         elem.classList.toggle("-touch", window.matchMedia("(hover: none)").matches);
    //     });
    // });
    // document.querySelectorAll(".book-player .progress").forEach((elem) => {
    //     elem.classList.toggle("-touch", window.matchMedia("(hover: none)").matches);
    // });
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "12837" + '/');

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