import Chai from 'chai';
import ChaiClient from 'chai-http';

var Expect = Chai.expect;
Chai.use(ChaiClient);

describe('Jodel Backend Challange Testing', () => {
  describe('Test results for GET requests.', () => {
    it('should return a user name with this email.', (done) => {
      Chai.request('http://localhost:3030')
        .get('/user')
        .query({email: 'ssimsk@outlook.com'})
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          Expect(res).to.not.be.empty;
          Expect(res).to.be.json;
          Expect(res.body).to.have.property('email')
          done(); 
        });
    });

    it('should return a list of users.', (done) => {
      Chai.request('http://localhost:3030')
      .get('/users')
      .end((err, res) => {
        Expect(err).to.be.null;
        Expect(res).to.have.status(200);
        Expect(res).to.be.json;
        Expect(res).to.not.be.empty;
        done();
      });
    });
  })
})