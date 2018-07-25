const importFile = require('./../utils.js').importFile;

export default function(context) {
  const fileName = 'Base colors';

  // the value global state will hold
  const objName = 'baseColors';

  importFile(fileName, objName);

  context.document.showMessage(
    `📩🎉: File for ${fileName} imported! Ready to use!`
  );
}
