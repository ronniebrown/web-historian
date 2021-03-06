var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, function(err, sites){
    sites = sites.toString().split('\n');
    if (cb) {
      cb(sites);
    }
  });
};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(sites) {
    var exists = _.any(sites, function(site, i) {
      return site.match(url)
    });
    cb(exists);
  });
};

// exports.readListOfUrls = function(cb){
//   fs.readFile(exports.paths.list, {'encoding': 'utf8'}, function(err, data) {
//     // if (err) throw err;
//     var sites = data.split('\n');
//     cb(sites);
//   });
// };

// exports.isUrlInList = function(url, cb){
//   exports.readListOfUrls(function(sites) {
//     var exists = sites.indexOf(url) > -1;
//     cb(exists);
//   });
// };

exports.addUrlToList = function(url, cb){
  url = url + '\n';
  fs.appendFile(exports.paths.list, url, {'encoding': 'utf8'}, function (err) {
    if (err) throw err;
    cb();
  });
};

exports.readArchivedSites = function(cb){
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    if (err) throw err;
    cb(files)
  });
};

exports.isURLArchived = function(url, cb){
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    var isArchived = files.indexOf(url) > -1;
    cb(isArchived);
  });
};

exports.downloadUrls = function(){

};
