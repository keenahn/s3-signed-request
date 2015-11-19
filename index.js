var crypto = require('crypto');

/**
* @param {String} filename the filename
* @param {String} mimeType the MIME type
* @param {String} acl the ACL permission
    (see http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html)
* @param {String} secretKey the amazon secret key
* @param {String} accessKey the amazon access key
* @param {String} bucket the amazon s3 bucket name
*/
module.exports = function (filename, mimeType, acl, secretKey, accessKey, bucket) {

  var filename = filename.replace(/ /g, '%20');

  var now = new Date();
  var expires = Math.ceil((now.getTime() + 60000) / 1000); // 60 seconds from now

  function generateSignature () {
    var headers = "x-amz-acl:" + acl;
    var request = "PUT\n\n" + mimeType + "\n" + expires + "\n" + headers + "\n/" + bucket + "/" + filename;
    var signature = crypto.createHmac('sha1', secretKey).update(request).digest('base64');

    if (signature.indexOf('+') > 0) {
      expires += 1;
      return generateSignature();
    }

    return encodeURIComponent(signature.trim());
  }
  var signature = generateSignature();

  var url = 'https://' + bucket + '.s3.amazonaws.com/' + filename;

  return {
    signedRequest: url + "?AWSAccessKeyId=" + accessKey + "&Expires=" + expires + "&Signature=" + signature,
    url: url
  };
};