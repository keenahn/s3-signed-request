var signedRequest = require('../index');
    should = require('should');


describe('signedRequest', function () {
  it('should', function () {
    var request = signedRequest('filename', 'text/plain', 'SECRET_KEY', 'ACCESS_KEY', 'bucket');
    
    request.url.should.equal('https://bucket.s3.amazonaws.com/filename');
    
    request.signedRequest.should.containEql('https://bucket.s3.amazonaws.com/filename');
    request.signedRequest.should.not.containEql('SECRET_KEY');
    request.signedRequest.should.containEql('ACCESS_KEY');
    
    request.signedRequest.should.not.containEql('+');
  });
});