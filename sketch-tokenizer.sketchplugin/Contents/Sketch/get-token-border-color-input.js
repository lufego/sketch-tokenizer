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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/getters/tokens/get-token-border-color-input.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/getters/tokens/get-token-border-color-input.js":
/*!************************************************************!*\
  !*** ./src/getters/tokens/get-token-border-color-input.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Utils = __webpack_require__(/*! ./../../utils.js */ "./src/utils.js"); // My plugin (command shift s)


/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var selection = context.selection;
  context.document.showMessage('Plugin 🏃');

  if (selection.length == 0) {
    return context.document.showMessage('🗝🌈: Please select an object');
  } // if its a text


  if (selection[0] instanceof MSTextLayer) {
    return context.document.showMessage('❌: Please use `Tokenizer > Get Tone` for texts');
  }

  var colorMapping = Utils.getBaseColorsVariablesMapping(); // console.log('colorMapping', colorMapping);

  var currentSelectedColor = Utils.getFillHexColor(selection).toString().toUpperCase();
  var color = colorMapping['#' + currentSelectedColor];

  var callback = function callback() {
    return getFillColorVariable(selection, color);
  }; // checks if color belongs to UI Kit, if not returns an error


  Utils.colorChecker(color, callback);
});

function getFillColorVariable(selection, text) {
  // gets the position of selection
  var x = selection[0].frame().x();
  var selectedElementWidth = selection[0].frame().width();
  var midY = selection[0].frame().midY();
  var position = {
    x: x,
    y: midY,
    width: selectedElementWidth
  };
  Utils.insertTokenText(position, 'Token', 'Fill color: ', text);
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: insertTokenText, insertIntoGroup, createQuoteLine, createTextLayer, getTokenVariable, getFillHexColor, getBorderHexColor, getRGBColor, getHexValueFromColorVariable, colorChecker, getBaseColorsVariablesMapping */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertTokenText", function() { return insertTokenText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertIntoGroup", function() { return insertIntoGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createQuoteLine", function() { return createQuoteLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextLayer", function() { return createTextLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTokenVariable", function() { return getTokenVariable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFillHexColor", function() { return getFillHexColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBorderHexColor", function() { return getBorderHexColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRGBColor", function() { return getRGBColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHexValueFromColorVariable", function() { return getHexValueFromColorVariable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorChecker", function() { return colorChecker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBaseColorsVariablesMapping", function() { return getBaseColorsVariablesMapping; });
var quoteColor = {
  r: 1,
  g: 0.369,
  b: 0.941,
  a: 1
}; // UI Creators

function insertTokenText(position, layerGroupName, title, text) {
  var isBorder = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var capitalizedTitle = title[0].toUpperCase() + title.slice(1);
  var textWithToken = createTextLayer("".concat(capitalizedTitle, ": ").concat(text));
  var quoteLine = createQuoteLine(position, isBorder); // var bounds = MSLayerGroup.groupBoundsForContainer(
  //   MSLayerArray.arrayWithLayers([quoteLine, textWithToken])
  // );

  insertIntoGroup(layerGroupName, title, {
    text: textWithToken,
    line: quoteLine
  }, position);
}
function insertIntoGroup(layerGroupName, property, layers, position) {
  var groupLayer = MSLayerGroup.new(); // to simulate the heigt/width

  var bounds = MSLayerGroup.groupBoundsForContainer(MSLayerArray.arrayWithLayers([layers.line, layers.text])); // moves the text a bit further from object

  layers.text.frame().x = 85;
  groupLayer.name = "Token ".concat(property, " for ").concat(layerGroupName);
  groupLayer.layers = [layers.line, layers.text];
  groupLayer.resizeToFitChildrenWithOption(1);
  groupLayer.frame().x = position.x + position.width - 5;
  groupLayer.frame().y = position.y + position.midY - bounds.size.height / 2;
  var currentParentGroup = context.document.currentPage().currentArtboard() || context.document.currentPage();
  currentParentGroup.addLayers([groupLayer]);
}
function createQuoteLine(position, isBorder) {
  var lineHeight = 14;
  var lineHeightMidY = lineHeight / 2;
  var lineWidth = 85; // if its a border, we want the quote line to touch it, otherwise touch fill

  var touchOffset = isBorder ? 0 : 5; // if its a border, we want the quote line to start from the same point as fill quoted line

  var startingPointOffset = isBorder ? 30 : 0;
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(lineWidth - touchOffset, lineHeightMidY + startingPointOffset));
  path.lineToPoint(NSMakePoint(0, lineHeightMidY));
  var shape = MSShapeGroup.shapeWithBezierPath(MSPath.pathWithBezierPath(path));
  var border = shape.style().addStylePartOfType(1);
  border.color = MSColor.colorWithRGBADictionary(quoteColor);
  border.thickness = 1;
  return shape;
}
function createTextLayer(stringValue) {
  var textLayer = MSTextLayer.new();
  textLayer.stringValue = stringValue;
  textLayer.name = 'Text';
  textLayer.setTextColor(MSColor.colorWithRGBADictionary(quoteColor));
  return textLayer;
} // Token getters

function getTokenVariable(colorsMap, wholeObject, property, component, hexColor) {
  if (!colorsMap) {
    return context.document.showMessage('✋🏻❌: Please load a decisions base colors file before continuing');
  }

  if (!wholeObject) {
    return context.document.showMessage("\u270B\uD83C\uDFFB\u274C: Please load a decisions token file for ".concat(property, " before continuing"));
  }

  var prefix = '--token'; // if property has `-`, splits it

  var hasDash = /-/;
  var propertyPrefix = hasDash.test(property) ? property.split('-') : property; // gets the color from selected element

  var selectedColor = colorsMap[hexColor].replace('--color-', '');
  var states;
  var propertyName;

  if (propertyPrefix instanceof Array) {
    states = wholeObject['token'][propertyPrefix[0]][propertyPrefix[1]][component];
    propertyName = "".concat(propertyPrefix[0], "-").concat(propertyPrefix[1]);
  } else {
    states = wholeObject['token'][propertyPrefix][component];
    propertyName = propertyPrefix;
  }

  var selectedState = Object.keys(states).find(function (state) {
    return states[state] == selectedColor;
  });
  return "".concat(prefix, "-").concat(propertyName, "-").concat(component, "-").concat(selectedState);
} // Base color getters

function getFillHexColor(selection) {
  var layer = context.selection[0];
  var selectedColor = getRGBColor('fill', layer);
  var colorHex = selectedColor.immutableModelObject().hexValue().toString();
  return colorHex;
}
function getBorderHexColor(selection) {
  var layer = context.selection[0];
  var selectedColor = getRGBColor('border', layer);
  var colorHex = selectedColor.immutableModelObject().hexValue().toString();
  return colorHex;
}
function getRGBColor(type, layer) {
  var color;

  if (type === 'fill') {
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
function getHexValueFromColorVariable(colorVar, baseColorsVariablesMap) {
  var colorVarWithPrefix = "--color-".concat(colorVar);
  return Object.keys(baseColorsVariablesMap).find(function (hexVal) {
    if (baseColorsVariablesMap[hexVal] == colorVarWithPrefix) return hexVal;
  });
} // Checkers

function colorChecker(color, callback) {
  if (typeof color === 'undefined') {
    return context.document.showMessage('🎨🚫: Non UI Kit color. Please make sure to use a valid color');
  } else {
    return callback();
  }
} // General scripts

function getBaseColorsVariablesMapping() {
  // Gets the json data stored in global state
  var threadDictionary = NSThread.mainThread().threadDictionary();
  var importedBaseColors = threadDictionary.importedBaseColors;
  if (!importedBaseColors) return context.document.showMessage('🗃👎🏻 No file imported. Please import your base colors file in `Import base colors file...`');
  var colorNames = {}; // gets default color variables

  Object.keys(importedBaseColors).map(function (colorGroupName) {
    // console.log('colorGroupName', colorGroupName)
    var colorGroup = importedBaseColors[colorGroupName];
    var colorDefaultName = colorGroup.default;
    colorNames[colorDefaultName.toString().toUpperCase()] = '--color-' + colorGroupName; // console.log('colorGroup.default', colorGroup.default);

    Object.keys(colorGroup).forEach(function (variation) {
      // filters out default values
      if (variation !== 'default') {
        var variationName = colorGroup[variation];
        var variationNameWithoutPercetageSign = variationName.toString().replace('%', ''); // console.log('colorGroup.default', colorGroup.default)

        colorNames[transformColorLightness(colorGroup.default, variationNameWithoutPercetageSign).toUpperCase()] = '--color-' + colorGroupName + '-' + variation;
      }
    });
  });
  return colorNames;
} // Color converters

function transformColorLightness(hex, lightness) {
  var hslColor = hexToHsl(hex, lightness);
  var hexColor = hslToHex(hslColor);
  console.log('hexColor', hexColor);
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
  var b = rgbColor[2]; // console.log('rgb', r, g, b)

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hslToRgb(h, s, l) {
  var m1, m2, hue;
  s = s / 100;
  l = l / 100;
  var r, g, b;
  if (s == 0) r = g = b = l * 255;else {
    m2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;
    hue = h / 360;
    r = hue2rgb(m1, m2, hue + 1 / 3);
    g = hue2rgb(m1, m2, hue);
    b = hue2rgb(m1, m2, hue - 1 / 3);
  }

  function multiplyBy255(num) {
    return num * 255;
  }

  if (r < 1 || g < 1 || b < 1) {
    r = multiplyBy255(r);
    g = multiplyBy255(g);
    b = multiplyBy255(b);
  }

  console.log('rgb', Math.round(r), Math.round(g), Math.round(b));
  return [Math.round(r), Math.round(g), Math.round(b)];
}

function hue2rgb(m1, m2, hue) {
  if (hue < 0) hue += 1;
  if (hue > 1) hue -= 1;
  if (hue < 1 / 6) return m1 + (m2 - m1) * 6 * hue;
  if (hue < 1 / 2) return m2;
  if (hue < 2 / 3) return m1 + (m2 - m1) * (2 / 3 - hue) * 6;
  return m1;
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

//# sourceMappingURL=get-token-border-color-input.js.map