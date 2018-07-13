// const colorVariables = {
//   baseColors: {
//     green: {
//       default: "#00B39E",
//       25: "25%",
//       40: "40%",
//       85: "85%",
//       95: "95%",
//     },
//     white: {
//       default: "#FFFFFF"
//     },
//     navy: {
//       default: "#213C45",
//       30: "30%",
//       40: "40%",
//       95: "95%",
//       98 : "98%"
//     },
//     blue: {
//       default: "#078CDF",
//       95: "95%",
//       98: "98%"
//     },
//     gray: {
//       default: "#CCCCCC",
//       60: "60%",
//       90: "90%",
//       95: "95%"
//     },
//     orange: {
//       default: "#F16D0E",
//       95: "95%"
//     },
//     red: {
//       default: "#E60050",
//       95: "95%"
//     },
//     purple: {
//       default: "#B866FF",
//     },
//     black: {
//       default: "#1A1A1A",
//     }
//   }
// }

const quoteColor = {r: 1, g: 0.369, b: 0.941, a: 1}

export function insertTokenText({x, y, width}, layerName, title, text, isBorder = false) {
  const textWithToken = createTextLayer(layerName, title + text);
  // pass the position to the text layer to be inserted
  textWithToken.frame().x = x + width + 100;
  textWithToken.frame().midY = y;

  // pass the position to quote line
  createQuoteLine(x, y, width, isBorder);

  // add the layer to the artboar
  context.document.currentPage().addLayers([textWithToken]);
}

export function createQuoteLine(x, y, elementWidth, isBorder) {

  // if its a border, we want the quote line to touch it, otherwise touch fill
  const touchOffset = isBorder ? 0 : 5

  // if its a border, we want the quote line to start from the same point as fill quoted line
  const startPointOffset = isBorder ? 30 : 0
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(x + elementWidth - touchOffset, y + startPointOffset));
  path.lineToPoint(NSMakePoint(x + elementWidth + 90, y));

  var shape = MSShapeGroup.shapeWithBezierPath(MSPath.pathWithBezierPath(path));
  var border = shape.style().addStylePartOfType(1);
  border.color = MSColor.colorWithRGBADictionary(quoteColor);
  border.thickness = 1;

  context.document.currentPage().addLayers([shape]);
}

export function getFillHexColor(selection) {
  var layer = context.selection[0]
  var selectedColor = getRGBColor("fill", layer)
  var colorHex = selectedColor.immutableModelObject().hexValue().toString()
  return colorHex
}

export function getBorderHexColor(selection) {
  var layer = context.selection[0]
  var selectedColor = getRGBColor("border", layer)
  var colorHex = selectedColor.immutableModelObject().hexValue().toString()
  return colorHex
}

export function getRGBColor (type, layer) {
  var color

  if (type === "fill") {
    if (layer instanceof MSTextLayer) {
      color = layer.textColor()
    } else {
      color = layer.style().fills().firstObject().color()
    }
  } else {
    color = layer.style().borders().firstObject().color()
  }

  return color
}

export function colorChecker(color, callback) {
  if(typeof color === 'undefined') {
    return context.document.showMessage('🎨🚫: Non UI Kit color. Please make sure to use a valid color');
  } else {
    return callback()
  }
}

export function getBaseColorsVariablesMapping() {
  // Gets the json data stored in global state
  let threadDictionary = NSThread.mainThread().threadDictionary();
  let importedBaseColors = threadDictionary.importedBaseColors
  if (!importedBaseColors) return context.document.showMessage('🗃👎🏻 No file imported. Please import your base colors file in `Import base colors file...`')

  // console.log('importedBaseColors', importedBaseColors.baseColors.green)
  const colorNames = {}
  // gets default color variables
  Object.keys(importedBaseColors).map(colorGroupName => {
    // console.log('colorGroupName', colorGroupName)
    const colorGroup = importedBaseColors[colorGroupName]
    const colorDefaultName = colorGroup.default;
    colorNames[colorDefaultName.toString().toUpperCase()] = '--color-' + colorGroupName;

    // console.log('colorGroup.default', colorGroup.default);

    Object.keys(colorGroup).forEach(variation => {
      // filters out default values
      if (variation !== 'default') {
        const variationName = colorGroup[variation]
        const variationNameWithoutPercetageSign = variationName.toString().replace('%', '');
        // console.log('colorGroup.default', colorGroup.default)
        colorNames[transformColorLightness(colorGroup.default, variationNameWithoutPercetageSign).toUpperCase()] = '--color-' + colorGroupName + '-' + variation;
      }
    })
  })
  // console.log('colorNames', colorNames)
  return colorNames
}

export function createTextLayer(name, stringValue) {
    var textLayer = MSTextLayer.new();
    textLayer.stringValue = stringValue
    textLayer.name = name
    textLayer.setTextColor(MSColor.colorWithRGBADictionary(quoteColor))
    return textLayer;
}

// Color converters

function transformColorLightness(hex, lightness) {
    const hslColor = hexToHsl(hex, lightness);
    const hexColor = hslToHex(hslColor);
    console.log('hexColor', hexColor)
    return hexColor;
}

function hexToHsl(hex, lightness){
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(360*h);
    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = lightness ? lightness : Math.round(l);

  return [h,s,l]
}

function hslToHex(hsl){
    const rgbColor = hslToRgb(hsl[0], hsl[1], hsl[2])
    const r = rgbColor[0];
    const g = rgbColor[1];
    const b = rgbColor[2];

    // console.log('rgb', r, g, b)

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hslToRgb(h, s, l){
  var m1, m2, hue;
  s = s / 100;
  l = l / 100;
  var r, g, b

	if (s == 0)
		r = g = b = (l * 255);
	else {
    m2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;
		hue = h / 360;

		r = hue2rgb(m1, m2, hue + 1/3);
		g = hue2rgb(m1, m2, hue);
		b = hue2rgb(m1, m2, hue - 1/3);
	}

  function multiplyBy255(num) {
    return num * 255
  }

  if (r < 1 || g < 1 || b < 1) {
    r = multiplyBy255(r);
    g = multiplyBy255(g);
    b = multiplyBy255(b);
  }

  console.log('rgb', Math.round(r), Math.round(g),Math.round(b))

	return [Math.round(r), Math.round(g), Math.round(b)]
}

function hue2rgb(m1, m2, hue) {
  if(hue < 0) hue += 1;
  if(hue > 1) hue -= 1;
  if(hue < 1 / 6) return m1 + (m2 - m1) * 6 * hue;
  if(hue < 1 / 2) return m2;
  if(hue < 2 / 3) return m1 + (m2 - m1) * (2 / 3 - hue) * 6;
  return m1;
}
