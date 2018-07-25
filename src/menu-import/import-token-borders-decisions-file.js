const importFile = require('./../utils.js').importFile;

export default function(context) {
  const fileName = 'Border decisions';

  // the value global state will hold
  const objName = 'border';

  importFile(fileName, objName);

  context.document.showMessage(
    `📩🎉: File for ${fileName} imported! Ready to use!`
  );
}
