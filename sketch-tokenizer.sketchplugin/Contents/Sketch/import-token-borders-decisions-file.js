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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/menu-import/import-token-borders-decisions-file.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/converters/colors.js":
/*!**********************************!*\
  !*** ./src/converters/colors.js ***!
  \**********************************/
/*! exports provided: transformColorLightness */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformColorLightness", function() { return transformColorLightness; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Color converters
function transformColorLightness(hex, lightness) {
  /* A bit of crazyness happening here;
  But this is the workflow from hsl_picker plugin to 
  generate colors in sketch, so the same scheme is below */
  // HEXtoRGB => RgbToHsl => change light => HSLtoRGB => RGBtoHSL => HSLtoHEX
  var colorRgb = HEXtoRGB(hex);
  var colorHsl = RGBtoHSL(colorRgb, lightness);
  var colorRgbTransformed = HSLtoRGB(colorHsl);
  var colorHslTransformed = RGBtoHSL(colorRgbTransformed);
  var colorHex = HSLtoHEX(colorHslTransformed);
  return colorHex;
}

function HEXtoRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

function RGBtoHSL(_ref, lightness) {
  var _ref2 = _slicedToArray(_ref, 3),
      r = _ref2[0],
      g = _ref2[1],
      b = _ref2[2];

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

  return [Math.round(h * 360), Math.round(s * 100), lightness ? parseInt(lightness) : Math.round(l * 100)];
}

function HSLtoHEX(hsl) {
  var rgbColor = HSLtoRGB([hsl[0], hsl[1], hsl[2]]);
  var r = rgbColor[0];
  var g = rgbColor[1];
  var b = rgbColor[2]; // console.log('rgb', r, g, b)

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function HSLtoRGB(_ref3) {
  var _ref4 = _slicedToArray(_ref3, 3),
      h = _ref4[0],
      s = _ref4[1],
      l = _ref4[2];

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
  } // console.log('rgb', Math.round(r), Math.round(g), Math.round(b));


  return [Math.round(r), Math.round(g), Math.round(b)];
} // Used inside HSLtoRGB function


function hue2rgb(m1, m2, hue) {
  if (hue < 0) hue += 1;
  if (hue > 1) hue -= 1;
  if (hue < 1 / 6) return m1 + (m2 - m1) * 6 * hue;
  if (hue < 1 / 2) return m2;
  if (hue < 2 / 3) return m1 + (m2 - m1) * (2 / 3 - hue) * 6;
  return m1;
}

/***/ }),

/***/ "./src/menu-import/import-token-borders-decisions-file.js":
/*!****************************************************************!*\
  !*** ./src/menu-import/import-token-borders-decisions-file.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var importFile = __webpack_require__(/*! ./../utils.js */ "./src/utils.js").importFile;

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var fileName = 'Border decisions'; // the value global state will hold

  var objName = 'border';
  importFile(fileName, objName);
  context.document.showMessage("\uD83D\uDCE9\uD83C\uDF89: File for ".concat(fileName, " imported! Ready to use!"));
});

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: insertTokenText, insertIntoGroup, createQuoteLine, createTextLayer, getTokenVariable, getFillHexColor, getBorderHexColor, getRGBColor, getHexValueFromColorVariable, colorChecker, getBaseColorsVariablesMapping, importFile */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importFile", function() { return importFile; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ColorConverter = __webpack_require__(/*! ./converters/colors.js */ "./src/converters/colors.js");

var quoteColor = {
  r: 1,
  g: 0.369,
  b: 0.941,
  a: 1
};
var lineHeight = 14;
var lineWidth = 85; // UI Creators

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
  }, position, isBorder);
}
function insertIntoGroup(layerGroupName, property, layers, position, isBorder) {
  var groupLayer = MSLayerGroup.new(); // to simulate the heigt/width

  var bounds = MSLayerGroup.groupBoundsForContainer(MSLayerArray.arrayWithLayers([layers.line, layers.text])); // if its a border, we want the quote line to touch it, otherwise touch fill

  var touchOffset = isBorder ? 0 : 5; // if its a border TOKEN, we want the quote line to start from the same point as fill quoted line

  var startingPointOffset = isBorder ? lineHeight : 0; // spacing between line and text

  var spacing = 4; // moves the text a bit further from object

  layers.text.frame().x = lineWidth + spacing;

  if (isBorder) {
    layers.text.frame().y = -lineHeight;
  }

  groupLayer.name = "Token ".concat(property, " for ").concat(layerGroupName);
  groupLayer.layers = [layers.line, layers.text];
  groupLayer.resizeToFitChildrenWithOption(1);
  groupLayer.frame().x = position.x + position.width - touchOffset;
  groupLayer.frame().y = position.y + position.midY - bounds.size.height / 2 - startingPointOffset;
  var currentParentGroup = context.document.currentPage().currentArtboard() || context.document.currentPage();
  currentParentGroup.addLayers([groupLayer]);
}
function createQuoteLine(position, isBorder) {
  var lineHeightMidY = lineHeight / 2; // if its a border TOKEN, we want the quote line to start from the same point as fill quoted line

  var startingPointOffset = isBorder ? 15 : 0;
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(lineWidth, lineHeightMidY - startingPointOffset));
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

function getTokenVariable(property, component, hexColor) {
  var baseColorsMap = getBaseColorsVariablesMapping();
  var prefix = '--token'; // if property has `-`, splits it

  var hasDash = /-/;
  var propertyPrefix = hasDash.test(property) ? property.split('-') : property;
  var states;
  var decisionsFile;
  var propertyName; // if the propery is passed with dash (E.g border-color)

  if (propertyPrefix instanceof Array) {
    decisionsFile = getDecisionsJson(propertyPrefix[0]);

    if (!decisionsFile) {
      return context.document.showMessage("\u270B\uD83C\uDFFB\u274C: Please load a decisions token file for ".concat(property, " before continuing"));
    }

    states = decisionsFile[propertyPrefix[1]][component];
    propertyName = "".concat(propertyPrefix[0], "-").concat(propertyPrefix[1]);
  } else {
    decisionsFile = getDecisionsJson(propertyPrefix);

    if (!decisionsFile) {
      return context.document.showMessage("\u270B\uD83C\uDFFB\u274C: Please load a decisions token file for ".concat(property, " before continuing"));
    }

    states = decisionsFile[propertyPrefix][component];
    propertyName = propertyPrefix;
  }

  if (!baseColorsMap) {
    return context.document.showMessage('✋🏻❌: Please load a decisions base colors file before continuing');
  } // gets the color from selected element


  var selectedColor = baseColorsMap[hexColor].replace('--color-', '');
  var selectedState = Object.keys(states).find(function (state) {
    return states[state] == selectedColor;
  });

  if (!selectedState) {
    return context.document.showMessage('🎨🚫: Non-recognized token color. Please make sure to use a valid color for this token');
  }

  return "".concat(prefix, "-").concat(propertyName, "-").concat(component, "-").concat(selectedState);
} // Base color getters

function getFillHexColor(selection) {
  var layer = context.selection[0];
  var selectedColor = getRGBColor('fill', layer);
  var colorHex = selectedColor.immutableModelObject().hexValue().toString();
  return colorHex;
}

function getDecisionsJson(object) {
  // Gets the json data stored in global state
  var threadDictionary = NSThread.mainThread().threadDictionary();
  var decisions = threadDictionary[object];
  return decisions;
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
  var importedBaseColors = getDecisionsJson('baseColors');
  if (!importedBaseColors) return context.document.showMessage('🗃👎🏻 No file imported. Please import your base colors file in `Import base colors file...`');
  var colorNames = {}; // gets default color variables

  Object.keys(importedBaseColors).map(function (colorGroupName) {
    var colorGroup = importedBaseColors[colorGroupName];
    var colorDefaultName = colorGroup.default;
    colorNames[colorDefaultName.toString().toUpperCase()] = '--color-' + colorGroupName;
    Object.keys(colorGroup).forEach(function (variation) {
      // filters out default values
      if (variation !== 'default') {
        var variationName = colorGroup[variation];
        var variationNameWithoutPercetageSign = variationName.toString().replace('%', '');
        colorNames[ColorConverter.transformColorLightness(colorGroup.default, variationNameWithoutPercetageSign).toUpperCase()] = '--color-' + colorGroupName + '-' + variation;
      }
    });
  });
  return colorNames;
} // importers

function importFile(fileName, objName) {
  //ask for JSON file path, passing the last location if available
  var dataPath = askForJSON('lastJSONPath', fileName);
  if (!dataPath) return; //load json data

  var jsonData = loadJSONData(dataPath);
  if (!jsonData) return; //get root dir used when populating local images

  var jsonDir = NSString.stringWithString(dataPath).stringByDeletingLastPathComponent();
  var threadDictionary = NSThread.mainThread().threadDictionary();
  threadDictionary[objName] = _objectSpread({}, jsonData);
}

function askForJSON(path, fileName) {
  //create panel
  var panel = NSOpenPanel.openPanel(); //set panel properties

  panel.setTitle('Select JSON');
  panel.setMessage("Please select the JSON file for ".concat(fileName));
  panel.setPrompt('Select');
  panel.setCanCreateDirectories(false);
  panel.setCanChooseFiles(true);
  panel.setCanChooseDirectories(false);
  panel.setAllowsMultipleSelection(false);
  panel.setShowsHiddenFiles(false);
  panel.setExtensionHidden(false); //set initial panel path

  if (path) {
    panel.setDirectoryURL(NSURL.fileURLWithPath(path));
  } else {
    panel.setDirectoryURL(NSURL.fileURLWithPath('/Users/' + NSUserName()));
  } //show panel


  var pressedButton = panel.runModal();

  if (pressedButton == NSOKButton) {
    return panel.URL().path();
  }
}

function loadJSONData(path) {
  //load contents
  var contents = readFileAsText(path); //get data from JSON

  var data;

  try {
    data = JSON.parse(contents);
  } catch (e) {
    context.document.showMessage("There was an error parsing data. Please make sure it's valid.");
    return;
  }

  return data;
}

function readFileAsText(path) {
  return NSString.stringWithContentsOfFile_encoding_error(path, NSUTF8StringEncoding, false);
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

//# sourceMappingURL=import-token-borders-decisions-file.js.map