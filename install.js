exports.installAlias = installAlias;
var fs = require("fs");

function installAlias(alias) {
  validateParameters(alias);
  var bashProfilePath = require("path").resolve(process.env.HOME + "/.bash_profile");
  var bashProfile = fs.readFileSync(bashProfilePath, "utf-8");
  if (bashProfile.match(alias) === null) {
    addAlias(bashProfile, bashProfilePath, alias);
    sourceBashProfile(bashProfilePath);
  }
}

function validateParameters(alias) {
  if (typeof alias !== "string") {
    throw "alias argument must be a string";
  }
}

function addAlias(profile, bashProfilePath, alias) {
  var profile = profile + "\n" + alias;
  fs.writeFileSync(bashProfilePath, profile, "utf-8");
}

function sourceBashProfile(bashProfilePath) {
  var exec = require('child_process').exec;
  exec("source " + bashProfilePath);
}
