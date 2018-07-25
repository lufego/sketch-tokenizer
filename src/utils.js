const ColorConverter = require('./converters/colors.js');

const quoteColor = { r: 1, g: 0.369, b: 0.941, a: 1 };
const lineHeight = 14;
const lineWidth = 85;

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
    position,
    isBorder
  );
}

export function insertIntoGroup(
  layerGroupName,
  property,
  layers,
  position,
  isBorder
) {
  var groupLayer = MSLayerGroup.new();

  // to simulate the heigt/width
  var bounds = MSLayerGroup.groupBoundsForContainer(
    MSLayerArray.arrayWithLayers([layers.line, layers.text])
  );

  // if its a border, we want the quote line to touch it, otherwise touch fill
  const touchOffset = isBorder ? 0 : 5;

  // if its a border TOKEN, we want the quote line to start from the same point as fill quoted line
  const startingPointOffset = isBorder ? lineHeight : 0;

  // spacing between line and text
  const spacing = 4;

  // moves the text a bit further from object
  layers.text.frame().x = lineWidth + spacing;
  if (isBorder) {
    layers.text.frame().y = -lineHeight;
  }

  groupLayer.name = `Token ${property} for ${layerGroupName}`;
  groupLayer.layers = [layers.line, layers.text];

  groupLayer.resizeToFitChildrenWithOption(1);
  groupLayer.frame().x = position.x + position.width - touchOffset;
  groupLayer.frame().y =
    position.y + position.midY - bounds.size.height / 2 - startingPointOffset;
  var currentParentGroup =
    context.document.currentPage().currentArtboard() ||
    context.document.currentPage();
  currentParentGroup.addLayers([groupLayer]);
}

export function createQuoteLine(position, isBorder) {
  const lineHeightMidY = lineHeight / 2;

  // if its a border TOKEN, we want the quote line to start from the same point as fill quoted line
  const startingPointOffset = isBorder ? 15 : 0;
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(
    NSMakePoint(lineWidth, lineHeightMidY - startingPointOffset)
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

export function getTokenVariable(property, component, hexColor) {
  const baseColorsMap = getBaseColorsVariablesMapping();
  const prefix = '--token';

  // if property has `-`, splits it
  const hasDash = /-/;
  const propertyPrefix = hasDash.test(property)
    ? property.split('-')
    : property;

  let states;
  let decisionsFile;
  let propertyName;

  // if the propery is passed with dash (E.g border-color)
  if (propertyPrefix instanceof Array) {
    decisionsFile = getDecisionsJson(propertyPrefix[0]);
    if (!decisionsFile) {
      return context.document.showMessage(
        `✋🏻❌: Please load a decisions token file for ${property} before continuing`
      );
    }
    states = decisionsFile[propertyPrefix[1]][component];
    propertyName = `${propertyPrefix[0]}-${propertyPrefix[1]}`;
  } else {
    decisionsFile = getDecisionsJson(propertyPrefix);
    if (!decisionsFile) {
      return context.document.showMessage(
        `✋🏻❌: Please load a decisions token file for ${property} before continuing`
      );
    }
    states = decisionsFile[propertyPrefix][component];
    propertyName = propertyPrefix;
  }

  if (!baseColorsMap) {
    return context.document.showMessage(
      '✋🏻❌: Please load a decisions base colors file before continuing'
    );
  }

  // gets the color from selected element
  const selectedColor = baseColorsMap[hexColor].replace('--color-', '');

  const selectedState = Object.keys(states).find(
    state => states[state] == selectedColor
  );

  if (!selectedState) {
    return context.document.showMessage(
      '🎨🚫: Non-recognized token color. Please make sure to use a valid color for this token'
    );
  }

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

function getDecisionsJson(object) {
  // Gets the json data stored in global state
  let threadDictionary = NSThread.mainThread().threadDictionary();
  let decisions = threadDictionary[object];
  return decisions;
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
  const importedBaseColors = getDecisionsJson('baseColors');

  if (!importedBaseColors)
    return context.document.showMessage(
      '🗃👎🏻 No file imported. Please import your base colors file in `Import base colors file...`'
    );

  const colorNames = {};
  // gets default color variables
  Object.keys(importedBaseColors).map(colorGroupName => {
    const colorGroup = importedBaseColors[colorGroupName];
    const colorDefaultName = colorGroup.default;
    colorNames[colorDefaultName.toString().toUpperCase()] =
      '--color-' + colorGroupName;

    Object.keys(colorGroup).forEach(variation => {
      // filters out default values
      if (variation !== 'default') {
        const variationName = colorGroup[variation];
        const variationNameWithoutPercetageSign = variationName
          .toString()
          .replace('%', '');
        colorNames[
          ColorConverter.transformColorLightness(
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

// importers

export function importFile(fileName, objName) {
  //ask for JSON file path, passing the last location if available
  let dataPath = askForJSON('lastJSONPath', fileName);
  if (!dataPath) return;

  //load json data
  let jsonData = loadJSONData(dataPath);
  if (!jsonData) return;

  //get root dir used when populating local images
  let jsonDir = NSString.stringWithString(
    dataPath
  ).stringByDeletingLastPathComponent();

  let threadDictionary = NSThread.mainThread().threadDictionary();
  threadDictionary[objName] = { ...jsonData };
}

function askForJSON(path, fileName) {
  //create panel
  let panel = NSOpenPanel.openPanel();

  //set panel properties
  panel.setTitle('Select JSON');
  panel.setMessage(`Please select the JSON file for ${fileName}`);
  panel.setPrompt('Select');
  panel.setCanCreateDirectories(false);
  panel.setCanChooseFiles(true);
  panel.setCanChooseDirectories(false);
  panel.setAllowsMultipleSelection(false);
  panel.setShowsHiddenFiles(false);
  panel.setExtensionHidden(false);

  //set initial panel path
  if (path) {
    panel.setDirectoryURL(NSURL.fileURLWithPath(path));
  } else {
    panel.setDirectoryURL(NSURL.fileURLWithPath('/Users/' + NSUserName()));
  }

  //show panel
  let pressedButton = panel.runModal();
  if (pressedButton == NSOKButton) {
    return panel.URL().path();
  }
}

function loadJSONData(path) {
  //load contents
  let contents = readFileAsText(path);

  //get data from JSON
  let data;
  try {
    data = JSON.parse(contents);
  } catch (e) {
    context.document.showMessage(
      "There was an error parsing data. Please make sure it's valid."
    );
    return;
  }

  return data;
}

function readFileAsText(path) {
  return NSString.stringWithContentsOfFile_encoding_error(
    path,
    NSUTF8StringEncoding,
    false
  );
}
