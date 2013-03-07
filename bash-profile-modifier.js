"use strict";

exports.insert = insert;
exports.remove = remove;

var fs = require("fs");

function insert(alias) {
  validateAlias(alias);
  profileModifier(alias, add);

  function add(profile, bashProfilePath, alias) {
    if (profile.match(alias) === null) {
      var profile = profile + "\n" + alias;
      fs.writeFileSync(bashProfilePath, profile, "utf-8");
    }
  }
}

function remove(alias) {
  validateAlias(alias);
  profileModifier(alias, remove);

  function remove(profile, bashProfilePath, alias) {
    var profile = profile.replace("\n" + alias, "");
    fs.writeFileSync(bashProfilePath, profile, "utf-8");
  }
}

function profileModifier(alias, callback) {
  validateCallback(callback);
  var bashProfilePath = require("path").resolve(process.env.HOME + "/.bash_profile");
  var bashProfile = fs.readFileSync(bashProfilePath, "utf-8");
  callback(bashProfile, bashProfilePath, alias);
  sourceBashProfile(bashProfilePath);
}

function validateAlias(alias) {
  if (typeof alias !== "string") {
    throw "alias argument must be a string";
  }
}

function validateCallback(callback) {
  if (typeof callback !== "function") {
    throw "callback must be a function";
  }
}

function sourceBashProfile(bashProfilePath) {
  var exec = require('child_process').exec;
  exec("source " + bashProfilePath);
}
