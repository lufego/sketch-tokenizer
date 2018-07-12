const Utils = require('./utils.js')

// My plugin (command shift s)
export default function(context) {
  var selection = context.selection;
  context.document.showMessage('Plugin 🏃');

  if (selection.length == 0) {
    return context.document.showMessage('🗝🌈: Please select an object');
  }
  // if its a text
  if (selection[0] instanceof MSTextLayer) {
    return context.document.showMessage('❌: Please use `Tokenizer > Get Tone` for texts');
  }
  
  const colorMapping = Utils.getBaseColorsVariablesMapping()
  const currentSelectedColor = Utils.getFillHexColor(selection).toString().toUpperCase();
  
  
  const color = colorMapping["#" + currentSelectedColor];
  
  const callback = () => getFillColorVariable(selection, color);

  // checks if color belongs to UI Kit, if not returns an error
  Utils.colorChecker(color, callback)
}




function getFillColorVariable(selection, text) {
  // gets the position of selection
  var x = selection[0].frame().x();
  var selectedElementWidth = selection[0].frame().width();
  var midY =selection[0].frame().midY();

  const position = {
    x, y: midY, width: selectedElementWidth
  }
  Utils.insertTokenText(position, 'Token', 'Fill color: ', text)
}
