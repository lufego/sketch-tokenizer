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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/get-border-color.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/get-border-color.js":
/*!*********************************!*\
  !*** ./src/get-border-color.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Utils = __webpack_require__(/*! ./utils.js */ "./src/utils.js"); // My plugin (command shift s)


/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var selection = context.selection;
  context.document.showMessage('Plugin 🏃');

  if (selection.length == 0) {
    return context.document.showMessage('🗝🌈: Please select an object');
  } // if its a text


  if (selection[0] instanceof MSTextLayer) {
    return context.document.showMessage('❌: Please use `Tokenizer > Get Tone` for texts');
  }

  var colorMapping = Utils.getBaseColorsVariablesMapping();
  var currentSelectedColor = Utils.getBorderHexColor(selection).toString().toUpperCase();
  var color = colorMapping["#" + currentSelectedColor];

  var callback = function callback() {
    return getBorderColorVariable(selection, color);
  }; // checks if color belongs to UI Kit, if not returns an error


  Utils.colorChecker(color, callback);
});

function getBorderColorVariable(selection, text) {
  // gets the position of selection
  var x = selection[0].frame().x();
  var selectedElementWidth = selection[0].frame().width();
  var midY = selection[0].frame().midY();
  var position = {
    x: x,
    y: midY - 30,
    width: selectedElementWidth
  };
  Utils.insertTokenText(position, 'Token', 'Border color: ', text, true);
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: insertTokenText, createQuoteLine, getFillHexColor, getBorderHexColor, getRGBColor, colorChecker, getBaseColorsVariablesMapping, createTextLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertTokenText", function() { return insertTokenText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createQuoteLine", function() { return createQuoteLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFillHexColor", function() { return getFillHexColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBorderHexColor", function() { return getBorderHexColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRGBColor", function() { return getRGBColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorChecker", function() { return colorChecker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBaseColorsVariablesMapping", function() { return getBaseColorsVariablesMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextLayer", function() { return createTextLayer; });
var colorVariables = {
  baseColors: {
    green: {
      default: "#00B39E",
      25: "25%",
      40: "40%",
      85: "85%",
      95: "95%"
    },
    white: {
      default: "#FFFFFF"
    },
    navy: {
      default: "#213C45",
      30: "30%",
      40: "40%",
      95: "95%",
      98: "98%"
    },
    blue: {
      default: "#078CDF",
      95: "95%",
      98: "98%"
    },
    gray: {
      default: "#CCCCCC",
      60: "60%",
      90: "90%",
      95: "95%"
    },
    orange: {
      default: "#F16D0E",
      95: "95%"
    },
    red: {
      default: "#E60050",
      95: "95%"
    },
    purple: {
      default: "#B866FF"
    },
    black: {
      default: "#1A1A1A"
    }
  }
};
var quoteColor = {
  r: 1,
  g: 0.369,
  b: 0.941,
  a: 1
};
function insertTokenText(_ref, layerName, title, text) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width;
  var isBorder = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var textWithToken = createTextLayer(layerName, title + text); // pass the position to the text layer to be inserted

  textWithToken.frame().x = x + width + 100;
  textWithToken.frame().midY = y; // pass the position to quote line

  createQuoteLine(x, y, width, isBorder); // add the layer to the artboar

  context.document.currentPage().addLayers([textWithToken]);
}
function createQuoteLine(x, y, elementWidth, isBorder) {
  // if its a border, we want the quote line to touch it, otherwise touch fill
  var touchOffset = isBorder ? 0 : 5; // if its a border, we want the quote line to start from the same point as fill quoted line

  var startPointOffset = isBorder ? 30 : 0;
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(x + elementWidth - touchOffset, y + startPointOffset));
  path.lineToPoint(NSMakePoint(x + elementWidth + 90, y));
  var shape = MSShapeGroup.shapeWithBezierPath(MSPath.pathWithBezierPath(path));
  var border = shape.style().addStylePartOfType(1);
  border.color = MSColor.colorWithRGBADictionary(quoteColor);
  border.thickness = 1;
  context.document.currentPage().addLayers([shape]);
}
function getFillHexColor(selection) {
  var layer = context.selection[0];
  var selectedColor = getRGBColor("fill", layer);
  var colorHex = selectedColor.immutableModelObject().hexValue().toString();
  return colorHex;
}
function getBorderHexColor(selection) {
  var layer = context.selection[0];
  var selectedColor = getRGBColor("border", layer);
  var colorHex = selectedColor.immutableModelObject().hexValue().toString();
  return colorHex;
}
function getRGBColor(type, layer) {
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
}
function colorChecker(color, callback) {
  if (typeof color === 'undefined') {
    return context.document.showMessage('🎨🚫: Non UI Kit color. Please make sure to use a valid color');
  } else {
    return callback();
  }
}
function getBaseColorsVariablesMapping() {
  var obj = colorVariables.baseColors;
  var colorNames = {}; // gets default color variables

  Object.keys(obj).map(function (colorGroupName) {
    var colorGroup = obj[colorGroupName];
    colorNames[colorGroup.default] = '--color-' + colorGroupName;
    Object.keys(colorGroup).forEach(function (variation) {
      // filters out default values
      if (variation !== 'default') {
        var variationName = colorGroup[variation];
        var variationNameWithoutPercetageSign = variationName.replace('%', '');
        colorNames[transformColorLightness(colorGroup.default, variationNameWithoutPercetageSign).toUpperCase()] = '--color-' + colorGroupName + '-' + variation;
      }
    });
  });
  console.log('colorNames', colorNames);
  return colorNames;
}
function createTextLayer(name, stringValue) {
  var textLayer = MSTextLayer.new();
  textLayer.stringValue = stringValue;
  textLayer.name = name;
  textLayer.setTextColor(MSColor.colorWithRGBADictionary(quoteColor));
  return textLayer;
} // Color converters

function transformColorLightness(hex, lightness) {
  var hslColor = hexToHsl(hex, lightness);
  var hexColor = hslToHex(hslColor);
  return hexColor;
}

function hexToHsl(hex, lightness) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h,
      s,
      l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  h = Math.round(360 * h);
  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = lightness ? lightness : Math.round(l);
  return [h, s, l];
}

function hslToHex(hsl) {
  var rgbColor = hslToRgb(hsl[0], hsl[1], hsl[2]);
  var r = rgbColor[0];
  var g = rgbColor[1];
  var b = rgbColor[2];
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hslToRgb(h, s, l) {
  var m1, m2, hue;
  var r, g, b;
  s /= 100;
  l /= 100;
  if (s == 0) r = g = b = l * 255;else {
    if (l <= 0.5) m2 = l * (s + 1);else m2 = l + s - l * s;
    m1 = l * 2 - m2;
    hue = h / 360;
    r = Math.round(hueToRgb(m1, m2, hue + 1 / 3));
    g = Math.round(hueToRgb(m1, m2, hue));
    b = Math.round(hueToRgb(m1, m2, hue - 1 / 3));
  }
  var roundedR = Math.round(r);
  var roundedG = Math.round(g);
  var roundedB = Math.round(b);
  return [roundedR, roundedG, roundedB];
}

function hueToRgb(m1, m2, hue) {
  var v;
  if (hue < 0) hue += 1;else if (hue > 1) hue -= 1;
  if (6 * hue < 1) v = m1 + (m2 - m1) * hue * 6;else if (2 * hue < 1) v = m2;else if (3 * hue < 2) v = m1 + (m2 - m1) * (2 / 3 - hue) * 6;else v = m1;
  return 255 * v;
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

//# sourceMappingURL=get-border-color.js.map