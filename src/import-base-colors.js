let baseColors;
export default function(context) {
  var selection = context.selection;
  context.document.showMessage('Plugin 🏃');

  //ask for JSON file path, passing the last location if available
  let dataPath = askForJSON('lastJSONPath')
  // console.log('dataPath', dataPath)
  if (!dataPath) return

  //load json data
  let jsonData = loadJSONData(dataPath)
  if (!jsonData) return

  //get root dir used when populating local images
  let jsonDir = NSString.stringWithString(dataPath).stringByDeletingLastPathComponent()

  // console.log('jsonData', jsonData)

  let threadDictionary = NSThread.mainThread().threadDictionary();
  threadDictionary.importedBaseColors = {...jsonData.baseColors};

  context.document.showMessage('📩🎉: File imported! Ready to use!')
}

export function askForJSON(path) {
  //create panel
  let panel = NSOpenPanel.openPanel()

  //set panel properties
  panel.setTitle("Select JSON")
  panel.setMessage("Please select the JSON file you'd like to use.")
  panel.setPrompt("Select")
  panel.setCanCreateDirectories(false)
  panel.setCanChooseFiles(true)
  panel.setCanChooseDirectories(false)
  panel.setAllowsMultipleSelection(false)
  panel.setShowsHiddenFiles(false)
  panel.setExtensionHidden(false)

  //set initial panel path
  if (path) {
    panel.setDirectoryURL(NSURL.fileURLWithPath(path))
  }
  else {
    panel.setDirectoryURL(NSURL.fileURLWithPath('/Users/' + NSUserName()))
  }

  //show panel
  let pressedButton = panel.runModal()
  if (pressedButton == NSOKButton) {
    return panel.URL().path()
  }
}

export function loadJSONData(path) {

  //load contents
  let contents = readFileAsText(path)

  //get data from JSON
  let data
  try {
    data = JSON.parse(contents)
  }
  catch (e) {
    context.document.showMessage("There was an error parsing data. Please make sure it's valid.")
    return
  }

  return data
}

export function readFileAsText(path) {
  return NSString.stringWithContentsOfFile_encoding_error(path, NSUTF8StringEncoding, false)
}
