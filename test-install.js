require("./install.js").installAlias(alias());

function alias() {
  var path = require("path");
  var rmovePath = path.resolve(__dirname, "./install.js");
  return 'alias testInstaller="node ' + rmovePath + '"';
}
