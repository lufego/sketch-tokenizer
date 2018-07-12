const colorVariables = {
  baseColors: {
    green: {
      default: "#14B39D",
      25: "#0B8171",
      40: "#19CCB3",
      85: "#B4FFF6",
      95: "#E6FFFC",
    },
    white: {
      default: "#FFFFFF"
    },
    navy: {
      default: "#1D3D45",
      30: "#2E5768",
      40: "#407A8B",
      95: "#EEF4F6",
      98 : "#F9FBFB"
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
      default: "#B26DFF",
    },
    black: {
      default: "#181818",
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

// Hex to Color - helper export function
export function hexToColor(hex, alpha) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
        red = parseInt(result[1], 16) / 255,
        green = parseInt(result[2], 16) / 255,
        blue = parseInt(result[3], 16) / 255,
        alpha = (typeof alpha !== 'undefined') ? alpha : 1;
    return NSColor.colorWithCalibratedRed_green_blue_alpha(red, green, blue, alpha)
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
        colorNames[colorGroup[variation]] = '--color-' + colorGroupName + '-' + variation;
      }
    })
  })

  return colorNames
}

export function createTextLayer(name, stringValue) {
    var textLayer = MSTextLayer.new();
    textLayer.stringValue = stringValue
    textLayer.name = name
    textLayer.setTextColor(MSColor.colorWithRGBADictionary(quoteColor))
    return textLayer;
}
