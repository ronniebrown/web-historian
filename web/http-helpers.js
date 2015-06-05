var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(res, data, status) {
  status = status || 200;
  res.writeHead(status, headers);
  res.end(data);
};

//exports.serveAssets = function(res, asset, callback) {
//  // todo: check if we need encoding
//  fs.readFile(asset, function(err, data) {
//    if (err) {
//      // url is not archived
//      exports.sendResponse(res, 'It\'s not here', 404);
//    } else {
//    callback(res, data);
//    }
//  });
//};

exports.serveAssets = function(res, asset, callback) {
 var encoding = {encoding: 'utf8'};
 fs.readFile(archive.paths.siteAssets + asset, encoding, function(err, data) {
   if(err) {
     fs.readFile(archive.paths.archivedSites + asset, encoding, function(err, data) {
       if(err) {
         callback ? callback() : exports.sendResponse(res, 'It\'s not here', 404);
       } else {
         exports.sendResponse(res, data);
       }
     });
   } else {
     exports.sendResponse(res, data);
   }
 });
};

exports.dataHelper = function(req, callback) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;

  });
  req.on('end', function() {
    callback(data.split('=')[1]);
  });
};

exports.sendRedirect = function(res, location, status) {
  status = status || 302;
  res.writeHead(status, {Location: location});
  res.end();
}
// As you progress, keep thinking about what helper functions you can put here!
