const Utils = require('./../../utils.js');

// My plugin (command shift s)
export default function(context) {
  var selection = context.selection;
  context.document.showMessage('Plugin 🏃');

  if (selection.length == 0) {
    return context.document.showMessage('🗝🌈: Please select an object');
  }
  // if its a text
  if (selection[0] instanceof MSTextLayer) {
    return context.document.showMessage(
      '❌: Please use `Tokenizer > Get Tone` for texts'
    );
  }

  const colorMapping = Utils.getBaseColorsVariablesMapping();
  console.log('colorMapping', colorMapping);
  const currentSelectedColor = Utils.getFillHexColor(selection)
    .toString()
    .toUpperCase();

  const color = colorMapping['#' + currentSelectedColor];

  const callback = () => getFillColorVariable(selection, color);

  // checks if color belongs to UI Kit, if not returns an error
  Utils.colorChecker(color, callback);
}

function getFillColorVariable(selection, text) {
  const position = {
    x: selection[0].absoluteRect().rulerX(),
    y: selection[0].absoluteRect().rulerY(),
    width: selection[0].absoluteRect().width()
  };

  Utils.insertTokenText(position, 'Token', 'Fill color: ', text);
}
