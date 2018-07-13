const colorVariables = {
  baseColors: {
    green: {
      default: "#00B39E",
      25: "25%",
      40: "40%",
      85: "85%",
      95: "95%",
    },
    white: {
      default: "#FFFFFF"
    },
    navy: {
      default: "#213C45",
      30: "30%",
      40: "40%",
      95: "95%",
      98 : "98%"
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
      default: "#B866FF",
    },
    black: {
      default: "#1A1A1A",
    }
  }
}

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
  const obj = colorVariables.baseColors
  const colorNames = {}
  // gets default color variables
  Object.keys(obj).map(colorGroupName => {
    const colorGroup = obj[colorGroupName]

    colorNames[colorGroup.default] = '--color-' + colorGroupName;

    Object.keys(colorGroup).forEach(variation => {
      // filters out default values
      if (variation !== 'default') {
        const variationName = colorGroup[variation]
        const variationNameWithoutPercetageSign = variationName.replace('%', '');
        colorNames[transformColorLightness(colorGroup.default, variationNameWithoutPercetageSign).toUpperCase()] = '--color-' + colorGroupName + '-' + variation;
      }
    })
  })
  console.log('colorNames', colorNames)
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
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hslToRgb(h, s, l){
    var m1, m2, hue;
	var r, g, b
	s /=100;
	l /= 100;
	if (s == 0)
		r = g = b = (l * 255);
	else {
		if (l <= 0.5)
			m2 = l * (s + 1);
		else
			m2 = l + s - l * s;
		m1 = l * 2 - m2;
		hue = h / 360;
		r = Math.round(hueToRgb(m1, m2, hue + 1/3));
		g = Math.round(hueToRgb(m1, m2, hue));
		b = Math.round(hueToRgb(m1, m2, hue - 1/3));
	}

  const roundedR = Math.round(r);
  const roundedG = Math.round(g);
  const roundedB = Math.round(b);

	return [roundedR, roundedG, roundedB]
}

function hueToRgb(m1, m2, hue) {
	var v;
	if (hue < 0)
		hue += 1;
	else if (hue > 1)
		hue -= 1;

	if (6 * hue < 1)
		v = m1 + (m2 - m1) * hue * 6;
	else if (2 * hue < 1)
		v = m2;
	else if (3 * hue < 2)
		v = m1 + (m2 - m1) * (2/3 - hue) * 6;
	else
		v = m1;

	return 255 * v;
}
