/**
 * Created by justlogin on 10/22/14.
 */

var request = require('request'),
  utils = require('../utils'),
  session = require('../session-data');


/**
 * Creates a public container. If additional headers are needed, the can be passed with 'additionalHeaders' parameter.
 * @param {String} containerPath Path to container without URL
 * @param {Object} [additionalHeaders]
 * @param {Function} callback
 */
module.exports = function(containerPath, additionalHeaders, callback) {
	if (typeof additionalHeaders  === 'function') {
		callback = additionalHeaders;
		additionalHeaders = null;
	}
  var fullLink = session.xUrl + containerPath,
    req = {
    url: fullLink,
    method: 'PUT',
    headers: {'X-Auth-Token': session.authToken}};
  utils.copyHeaders(req, additionalHeaders);

  request(req, function(err, data) {
    if (err || !data) {
      callback(err, {success: false});
    } else {
      if (data.statusCode == 201) {
        callback(null, {
          success: true,
          link: fullLink
        });
      } else {
        callback(null, {
          success: false,
          selectelMessage: data.body
        });
      }
    }
  });
};
