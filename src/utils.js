const quoteColor = { r: 1, g: 0.369, b: 0.941, a: 1 };

// UI Creators

export function insertTokenText(
  position,
  layerGroupName,
  title,
  text,
  isBorder = false
) {
  const capitalizedTitle = title[0].toUpperCase() + title.slice(1);
  const textWithToken = createTextLayer(`${capitalizedTitle}: ${text}`);
  const quoteLine = createQuoteLine(position, isBorder);

  // var bounds = MSLayerGroup.groupBoundsForContainer(
  //   MSLayerArray.arrayWithLayers([quoteLine, textWithToken])
  // );

  insertIntoGroup(
    layerGroupName,
    title,
    { text: textWithToken, line: quoteLine },
    position
  );
}

export function insertIntoGroup(layerGroupName, property, layers, position) {
  var groupLayer = MSLayerGroup.new();

  // to simulate the heigt/width
  var bounds = MSLayerGroup.groupBoundsForContainer(
    MSLayerArray.arrayWithLayers([layers.line, layers.text])
  );

  // moves the text a bit further from object
  layers.text.frame().x = 85;
  groupLayer.name = `Token ${property} for ${layerGroupName}`;
  groupLayer.layers = [layers.line, layers.text];

  groupLayer.resizeToFitChildrenWithOption(1);
  groupLayer.frame().x = position.x + position.width - 5;
  groupLayer.frame().y = position.y + position.midY - bounds.size.height / 2;
  var currentParentGroup =
    context.document.currentPage().currentArtboard() ||
    context.document.currentPage();
  currentParentGroup.addLayers([groupLayer]);
}

export function createQuoteLine(position, isBorder) {
  const lineHeight = 14;
  const lineHeightMidY = lineHeight / 2;
  const lineWidth = 85;

  // if its a border, we want the quote line to touch it, otherwise touch fill
  const touchOffset = isBorder ? 0 : 5;

  // if its a border, we want the quote line to start from the same point as fill quoted line
  const startingPointOffset = isBorder ? 30 : 0;
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(
    NSMakePoint(lineWidth - touchOffset, lineHeightMidY + startingPointOffset)
  );
  path.lineToPoint(NSMakePoint(0, lineHeightMidY));

  var shape = MSShapeGroup.shapeWithBezierPath(MSPath.pathWithBezierPath(path));
  var border = shape.style().addStylePartOfType(1);
  border.color = MSColor.colorWithRGBADictionary(quoteColor);
  border.thickness = 1;

  return shape;
}

export function createTextLayer(stringValue) {
  var textLayer = MSTextLayer.new();
  textLayer.stringValue = stringValue;
  textLayer.name = 'Text';
  textLayer.setTextColor(MSColor.colorWithRGBADictionary(quoteColor));
  return textLayer;
}

// Token getters

export function getTokenVariable(
  colorsMap,
  wholeObject,
  property,
  component,
  hexColor
) {
  if (!colorsMap) {
    return context.document.showMessage(
      '✋🏻❌: Please load a decisions base colors file before continuing'
    );
  }

  if (!wholeObject) {
    return context.document.showMessage(
      `✋🏻❌: Please load a decisions token file for ${property} before continuing`
    );
  }

  const prefix = '--token';

  // if property has `-`, splits it
  const hasDash = /-/;
  const propertyPrefix = hasDash.test(property)
    ? property.split('-')
    : property;

  // gets the color from selected element
  const selectedColor = colorsMap[hexColor].replace('--color-', '');

  let states;
  let propertyName;
  if (propertyPrefix instanceof Array) {
    states =
      wholeObject['token'][propertyPrefix[0]][propertyPrefix[1]][component];
    propertyName = `${propertyPrefix[0]}-${propertyPrefix[1]}`;
  } else {
    states = wholeObject['token'][propertyPrefix][component];
    propertyName = propertyPrefix;
  }

  const selectedState = Object.keys(states).find(
    state => states[state] == selectedColor
  );

  return `${prefix}-${propertyName}-${component}-${selectedState}`;
}

// Base color getters

export function getFillHexColor(selection) {
  var layer = context.selection[0];
  var selectedColor = getRGBColor('fill', layer);
  var colorHex = selectedColor
    .immutableModelObject()
    .hexValue()
    .toString();
  return colorHex;
}

export function getBorderHexColor(selection) {
  var layer = context.selection[0];
  var selectedColor = getRGBColor('border', layer);
  var colorHex = selectedColor
    .immutableModelObject()
    .hexValue()
    .toString();
  return colorHex;
}

export function getRGBColor(type, layer) {
  var color;

  if (type === 'fill') {
    if (layer instanceof MSTextLayer) {
      color = layer.textColor();
    } else {
      color = layer
        .style()
        .fills()
        .firstObject()
        .color();
    }
  } else {
    color = layer
      .style()
      .borders()
      .firstObject()
      .color();
  }

  return color;
}

export function getHexValueFromColorVariable(colorVar, baseColorsVariablesMap) {
  const colorVarWithPrefix = `--color-${colorVar}`;
  return Object.keys(baseColorsVariablesMap).find(hexVal => {
    if (baseColorsVariablesMap[hexVal] == colorVarWithPrefix) return hexVal;
  });
}

// Checkers

export function colorChecker(color, callback) {
  if (typeof color === 'undefined') {
    return context.document.showMessage(
      '🎨🚫: Non UI Kit color. Please make sure to use a valid color'
    );
  } else {
    return callback();
  }
}

// General scripts

export function getBaseColorsVariablesMapping() {
  // Gets the json data stored in global state
  let threadDictionary = NSThread.mainThread().threadDictionary();
  let importedBaseColors = threadDictionary.importedBaseColors;
  if (!importedBaseColors)
    return context.document.showMessage(
      '🗃👎🏻 No file imported. Please import your base colors file in `Import base colors file...`'
    );

  const colorNames = {};
  // gets default color variables
  Object.keys(importedBaseColors).map(colorGroupName => {
    // console.log('colorGroupName', colorGroupName)
    const colorGroup = importedBaseColors[colorGroupName];
    const colorDefaultName = colorGroup.default;
    colorNames[colorDefaultName.toString().toUpperCase()] =
      '--color-' + colorGroupName;

    // console.log('colorGroup.default', colorGroup.default);

    Object.keys(colorGroup).forEach(variation => {
      // filters out default values
      if (variation !== 'default') {
        const variationName = colorGroup[variation];
        const variationNameWithoutPercetageSign = variationName
          .toString()
          .replace('%', '');
        // console.log('colorGroup.default', colorGroup.default)
        colorNames[
          transformColorLightness(
            colorGroup.default,
            variationNameWithoutPercetageSign
          ).toUpperCase()
        ] =
          '--color-' + colorGroupName + '-' + variation;
      }
    });
  });
  return colorNames;
}

// Color converters

function transformColorLightness(hex, lightness) {
  const hslColor = hexToHsl(hex, lightness);
  const hexColor = hslToHex(hslColor);
  console.log('hexColor', hexColor);
  return hexColor;
}

function hexToHsl(hex, lightness) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  (r /= 255), (g /= 255), (b /= 255);
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
  const rgbColor = hslToRgb(hsl[0], hsl[1], hsl[2]);
  const r = rgbColor[0];
  const g = rgbColor[1];
  const b = rgbColor[2];

  // console.log('rgb', r, g, b)

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hslToRgb(h, s, l) {
  var m1, m2, hue;
  s = s / 100;
  l = l / 100;
  var r, g, b;

  if (s == 0) r = g = b = l * 255;
  else {
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
