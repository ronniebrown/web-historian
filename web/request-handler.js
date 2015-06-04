var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
//var headers = require('./http-helpers');
// var url = require('url');
var httpHelpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html',
        httpHelpers.sendResponse);
    } else {
      var site = req.url;
      httpHelpers.serveAssets(res, archive.paths.archivedSites + site,
        httpHelpers.sendResponse);
    }
  }

  if (req.method === 'POST') {
    // receive data

      // check archive

        // if !data in archive add to archive

        // serveAssets
  } else {
    // serverAssets
  }
};
