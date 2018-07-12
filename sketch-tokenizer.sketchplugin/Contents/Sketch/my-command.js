var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/my-command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/my-command.js":
/*!***************************!*\
  !*** ./src/my-command.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// My plugin (command shift s)
var colorVariables = {
  baseColors: {
    green: {
      default: "#14B39D",
      25: "#0B8171",
      40: "#19CCB3",
      85: "#B4FFF6",
      95: "#E6FFFC"
    },
    white: {
      default: "#FFFFFF"
    },
    navy: {
      default: "#1D3D45",
      30: "#2E5768",
      40: "#407A8B",
      95: "#EEF4F6",
      98: "#F9FBFB"
    },
    blue: {
      default: "#0090E0",
      95: "#B2E3FF",
      98: "#E5F6FF"
    },
    gray: {
      default: "#CCCCCC",
      60: "#999999",
      90: "#E6E6E6",
      95: "#F2F2F2"
    },
    orange: {
      default: "#F1690E",
      95: "#FEF0E7"
    },
    red: {
      default: "#E50051",
      95: "#FFE5EE"
    },
    purple: {
      default: "#B26DFF"
    },
    black: {
      default: "#181818"
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var selection = context.selection;
  context.document.showMessage('Plugin 🏃');

  if (selection.length == 0) {
    return context.document.showMessage('🗝🌈: Please select a layer');
  }

  if (selection[0] instanceof MSTextLayer) {
    var _lay = createTextLayer('tone', 'tone: ' + 'NEGATIVE'); // gets the position of selection


    var midX = context.selection[0].frame().midX();
    var midY = context.selection[0].frame().midY(); // pass the position to the text layer to be inserter

    _lay.frame().midX = midX;
    _lay.frame().midY = midY;
    return context.document.currentPage().addLayers([_lay]);
  }

  var colorMapping = getColorVariablesMapping(colorVariables);
  var currentSelectedColor = getFillHexColor(selection).toString().toUpperCase();
  var lay = createTextLayer('design', 'color: ' + colorMapping["#" + currentSelectedColor]); // gets the position of selection

  var midX = context.selection[0].frame().midX();
  var midY = context.selection[0].frame().midY(); // pass the position to the text layer to be inserter

  lay.frame().midX = midX;
  lay.frame().midY = midY; // add the layer to the artboar

  context.document.currentPage().addLayers([lay]);
});

function getFillHexColor(selection) {
  var layer = context.selection[0];
  var selectedColor = getFillRGBColor("fill", layer);
  var colorHex = selectedColor.immutableModelObject().hexValue().toString();
  return colorHex;
}

function getFillRGBColor(type, layer) {
  var color;

  if (type === "fill") {
    if (layer instanceof MSTextLayer) {
      color = layer.textColor();
    } else {
      color = layer.style().fills().firstObject().color();
    }
  } else {
    color = layer.style().borders().firstObject().color();
  }

  return color;
} // Hex to Color - helper function


var hexToColor = function hexToColor(hex, alpha) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
      red = parseInt(result[1], 16) / 255,
      green = parseInt(result[2], 16) / 255,
      blue = parseInt(result[3], 16) / 255,
      alpha = typeof alpha !== 'undefined' ? alpha : 1;
  return NSColor.colorWithCalibratedRed_green_blue_alpha(red, green, blue, alpha);
};

function createTextLayer(name, stringValue) {
  var textLayer = MSTextLayer.new();
  textLayer.stringValue = stringValue;
  textLayer.name = name;
  textLayer.setTextColor = hexToColor("CCCCCC");
  return textLayer;
}

function getColorVariablesMapping(variables) {
  var obj = variables.baseColors;
  var colorNames = {}; // gets default color variables

  Object.keys(obj).map(function (colorGroupName) {
    var colorGroup = obj[colorGroupName];
    colorNames[colorGroup.default] = '--color-' + colorGroupName;
    Object.keys(colorGroup).forEach(function (variation) {
      // filters out default values
      if (variation !== 'default') {
        colorNames[colorGroup[variation]] = '--color-' + colorGroupName + '-' + variation;
      }
    });
  });
  return colorNames;
}

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=my-command.js.map