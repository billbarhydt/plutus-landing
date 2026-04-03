function doGet() {
  return HtmlService.createHtmlOutput(getHtml())
    .setTitle('Plutus Financial')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getHtml() {
  return HtmlService.createHtmlOutputFromFile('page').getContent();
}