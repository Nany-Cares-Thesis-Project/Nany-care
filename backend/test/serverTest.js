let mongoose = require("mongoose");
let Users = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp)

/*
  * Test the /ret endpoint
  */
 describe('/GET test', () => {
  it(' test ret endpoint - home page', (done) => {
    chai.request(server)
        .get('/ret')
        .end((err, res) => {
          res.status.should.be.to.equal(200);
          res.body.should.be.an('array')
          // console.log(res.body)

          done();
        });
  });
});

/*
  * Test the /profile endpoint
  */

 describe('/GET test ', () => {
  it(' test profile endpoint - profile page', (done) => {
    chai.request(server)
        .get('/profile')
        .end((err, res) => {
          res.status.should.be.to.equal(500);
          res.body.should.be.an('object')
          //console.log(res.status)

          done();
        });
  });
});


/*
  * Test the /profile endpoint
  */

 describe('/GET test ', () => {
  it(' test logout endpoint ', (done) => {
    chai.request(server)
        .get('/logout')
        .end((err, res) => {
          res.status.should.be.to.equal(200);
          res.body.should.be.an('object')

          done();
        });
  });
});

/*
  * Test the /admin endpoint
  */
 describe('/GET test', () => {
  it(' test admin endpoint ', (done) => {
    chai.request(server)
        .get('/admin')
        .end((err, res) => {
          res.status.should.be.to.equal(200);
          res.body.should.be.an('array');
          done();
        });
  });
});

/*
  * Test the /POST route
  */
//  describe('/POST user', () => {
//   it('it should POST a new user', (done) => {
//       let user = {
//           name: "hala1",
//           email: "hello11@hi.com",
//           password: 1234567111,
//           phoneNumber: 0712431111
//       }
//       chai.request(server)
//       .post('/signup')
//       .send(user)
//       .end((err, res) => {
//             // res.should.have.status(200);
//             // res.body.should.be.an('object')
//             // res.body.should.have.property('errors');
//             done();
//         });
//   });

// });
