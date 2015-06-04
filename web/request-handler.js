var path = require('path');
var archiveHelpers = require('../helpers/archive-helpers');
// require more modules/folders here!
// var url = require('url');
var httpHelpers = require('./http-helpers');


exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, archiveHelpers.paths.siteAssets + '/index.html',
        httpHelpers.sendResponse);
    } else {
      var site = req.url;
      httpHelpers.serveAssets(res, archiveHelpers.paths.archivedSites + site,
        httpHelpers.sendResponse);
    }
  } 

  if (req.method === 'POST') {
    // receive data
    httpHelpers.dataHelper(req, function(siteUrl) {
      // check archive
      archiveHelpers.readListOfUrls(function(sites){
        if (!archiveHelpers.isUrlInList(siteUrl, sites)) {
          archiveHelpers.addUrlToList(siteUrl);
        }
      });
    httpHelpers.sendResponse(res, siteUrl, 302);
    });
  }
};
