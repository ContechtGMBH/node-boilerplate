var app = require('../app')
var request = require('supertest');
var should = require('should');

// A simple example test

describe('simple GET', function() {
  it('should return false', function(done) {
    request(app)
      .get('/api/v1/isloggedin')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res){
        res.body.should.be.instanceof(Boolean);
      })
      .end(done);
  })
})

describe('simple POST', function() {
  it('should return user id', function(done) {
    request(app)
      .post('/api/v1/login')
      .send({"email":"test@gmail.com", "password": "test"})
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res){
        res.body.should.be.instanceof(String);
      })
      .end(done);
  })
})
