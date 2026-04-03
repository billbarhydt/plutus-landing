const fs = require('fs');
const { exec } = require('child_process');

// Read the HTML
const html = fs.readFileSync('index.html', 'utf8');

// Escape for embedding in Apps Script
const escaped = html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

// Create Apps Script files
const gasCode = `function doGet() {
  return HtmlService.createHtmlOutput(getHtml())
    .setTitle('Plutus Financial')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getHtml() {
  return HtmlService.createHtmlOutputFromFile('page').getContent();
}`;

fs.writeFileSync('gas-project/Code.gs', gasCode);
fs.writeFileSync('gas-project/page.html', fs.readFileSync('index.html', 'utf8'));

console.log('Apps Script project created in gas-project/');
