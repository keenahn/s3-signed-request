# S3 Signed Request

Generate a signed request for a direct S3 upload.


# Usage

An example with Express:

    var generateRequest = require('s3-generate-request');
    
    router.route('/s3/auth').get(function (req, res) {
      var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY,
          AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY,
      
      var filename = req.query.name,
          mimeType = req.query.mimeType,
          bucket = 'some-bucket';
      
      var signedRequest = generateRequest(filename, mimeType, AWS_SECRET_KEY, AWS_ACCESS_KEY, bucket);
      
      // signedRequest contains 'signedRequest' and 'url'
      
      res.json(signedRequest);
    });