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

describe('/GET || get unique email user', () => {
  it('it should be GET unique email user', (done) => {
    chai.request(server)
    .get('/user')
    .end((error, response) => {
      chai.request(server)
      .get('/user/email/' + response.body[0].email)
      .end((err, res) => {
        if(err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  })
})

describe('/GET || get unique username user', () => {
  it('it should be GEt unique username user', (done) => {
    chai.request(server)
    .get('/user')
    .end((error, response) => {
      chai.request(server)
      .get('/user/username/' + response.body[0].username)
      .end((err, res) => {
        if(err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  })
})

describe('/POST || post sign up user', () => {
  it('it should be POST sign up user', (done) => {
    chai.request(server)
    .post('/user/signup')
    .send({
      'email': 'pangkeyd@gmail.com',
      'username': 'pangkeyd',
      'password': '12345678'
    })
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})