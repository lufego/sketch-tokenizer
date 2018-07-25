const importFile = require('./../utils.js').importFile;

export default function(context) {
  const fileName = 'Background decisions';

  // the value global state will hold
  const objName = 'background';

  importFile(fileName, objName);

  context.document.showMessage(
    `📩🎉: File for ${fileName} imported! Ready to use!`
  );
}
