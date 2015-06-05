var path = require('path');
var archiveHelpers = require('../helpers/archive-helpers');
// require more modules/folders here!
var urlParser = require('url');
var httpHelpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    var parts = urlParser.parse(req.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    httpHelpers.serveAssets(res, urlPath, function () {
      archiveHelpers.isUrlInList(urlPath.slice(1), function (found) {
        if (found) {
          httpHelpers.sendRedirect(res, '/loading.html');
        } else {
          httpHelpers.sendResponse(res, 'It\'s not here', 404);
        }
      });
    });
  }
  if (req.method === 'POST') {
    httpHelpers.dataHelper(req, function (url) {
      archiveHelpers.isUrlInList(url, function (found) {
        if (found) {
          archiveHelpers.isURLArchived(url, function (exists) {
            if (exists) {
              httpHelpers.sendRedirect(res, '/' + url);
            } else {
              httpHelpers.sendRedirect(res, '/loading.html');
            }
          });
        } else {
          archiveHelpers.addUrlToList(url, function () {
            httpHelpers.sendRedirect(res, '/loading.html');
          });
        }
      });
    });
  }

  //   // receive data
  //   httpHelpers.dataHelper(req, function (siteUrl) {
  //     // check archive
  //     archiveHelpers.readListOfUrls(function (sites) {
  //       if (!archiveHelpers.isUrlInList(siteUrl, sites)) {
  //         archiveHelpers.addUrlToList(siteUrl);
  //       }
  //     });
  //     httpHelpers.sendResponse(res, siteUrl, 302);
  //   });
  // }
};


// if (req.method === 'GET') {
//   if (req.url === '/') {
//     httpHelpers.serveAssets(res, archiveHelpers.paths.siteAssets + '/index.html',
//       httpHelpers.sendResponse);
//   } else {
//     var site = req.url;
//     httpHelpers.serveAssets(res, archiveHelpers.paths.archivedSites + site,
//       httpHelpers.sendResponse);

//     archiveHelpers.readArchivedSites(function(files) {
//       // if the file is available do this
//       if (archiveHelpers.isURLArchived(site, files)) {

//       } else {

//       }
//     });
//   }
// }
// 'GET' : function(req, res) {
