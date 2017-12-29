const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')

chai.use(chaiHttp)

// USER

describe('/GET || get all user', () => {
  it('it should be GET all user', (done) => {
    chai.request(server)
    .get('/user')
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})