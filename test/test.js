import Chai from 'chai';
import ChaiClient from 'chai-http';
import validator from 'validator';
import ServerConfig from '../src/server/config/ServerConfig';
import users from '../src/server/data/seeds/users.json';

var Expect = Chai.expect;
Chai.use(ChaiClient);

describe('Jodel Backend Challange Testing', () => {
  describe('Clear test DB before testing.', () => {
    it('should delete all records on DB.', (done) => {
      Chai.request(ServerConfig.SERVER_TEST)
        .delete('/users')
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Test results for POST requests.', () => {
    it('should create a single user with given body.', (done) => {
      Chai.request(ServerConfig.SERVER_TEST)
        .post('/user')
        .send({
          "name": "John Doe",
          "uname": "johndoe",
          "email": "john@doe.com",
          "age": 33
        })
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          done();
        });
    });

    it('should create many user with given list.', (done) => {
      Chai.request(ServerConfig.SERVER_TEST)
        .post('/users')
        .send(users)
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Test results for PUT requests.', () => {
    it('should update the user with given email.', (done) => {
      Chai.request(ServerConfig.SERVER_TEST)
        .put('/user')
        .query({ email: 'john@doe.com' })
        .send({
          "name": "Updated John Doe",
          "uname": "johndoe",
          "email": "john@doe.com",
          "age": 45
        })
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Test results for GET requests.', () => {
    it('should return a user name with email.', (done) => {
      Chai.request(ServerConfig.SERVER_TEST)
        .get('/user')
        .query({ email: 'ssimsek@outlook.com' })
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          Expect(res).to.not.be.empty;
          Expect(res).to.be.json;
          Expect(res.body).to.have.property('email');
          Expect(validator.isEmail(res.body.email)).to.be.true;
          done();
        });
    });

    it('should return a list of users.', (done) => {
      Chai.request(ServerConfig.SERVER_TEST)
        .get('/users')
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          Expect(res).to.be.json;
          Expect(res).not.to.be.empty;
          Expect(res.body).to.be.lengthOf.above(0);
          Expect(validator.isEmail(res.body[0].email)).to.be.true;
          done();
        });
    });

    it('should return limited list of users who are older than age 32.', (done) => {
      Chai.request(ServerConfig.SERVER_TEST)
        .get('/users/list')
        .query({ age: 32, limit: 3, page: 0 })
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          Expect(res).to.be.json;
          Expect(res).not.to.be.empty;
          Expect(res.body).to.have.lengthOf.within(0, 4);
          Expect(validator.isEmail(res.body[0].email)).to.be.true;
          done();
        });
    });

    it('should return limited list of users who are older than age 32.', (done) => {
      Chai.request(ServerConfig.SERVER_TEST)
        .get('/users')
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          Expect(res).to.be.json;
          Expect(res).not.to.be.empty;
          Expect(validator.isEmail(res.body[0].email)).to.be.true;
          done();
        });
    });
  });

  describe('Test results for DELETE requests.', () => {
    it('should delete the user with given email.', (done) => {
      Chai.request(ServerConfig.SERVER_TEST)
        .delete('/user')
        .query({ email: 'john@doe.com' })
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          done();
        });
    });
  });
});