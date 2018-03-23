/* global require */
var fs = require('fs');
var appJson = require('./app.json');

function parse(versionString) {
  return versionString.split('.').map(s => parseInt(s, 10));
}

function bump(versionArray) {
  versionArray[2] = versionArray[2] + 1;
  return versionArray;
}

function stringify(versionArray) {
  return versionArray.map(i => i.toString()).join('.');
}

appJson.expo.version = stringify(bump(parse(appJson.expo.version)));
appJson.expo.ios.buildNumber = stringify(
  bump(parse(appJson.expo.ios.buildNumber)),
);

fs.writeFile('app.json', JSON.stringify(appJson, null, 2), () => {});
console.log('Bumped app.json to version', appJson.expo.version); // eslint-disable-line no-console
