const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
const should = chai.should()
const server = require('../app')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNDVkMjc0YTQxNjA2MTdlYWRkMzdmYSIsInVzZXJuYW1lIjoicGFuZ2tleWQiLCJpYXQiOjE1MTQ1MjcyNzB9.wc02TElM4f7ho2qFkSA_LD7E8Rq31M0FxZDAz8KV72Y'

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

describe('/POST || post sign in user with true email', () => {
  it('it should be POST sign in user with true email', (done) => {
    chai.request(server)
    .post('/user/signin')
    .send({
      'email': 'pangkeyd@gmail.com',
      'password': '12345678'
    })
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})

describe('/POST || post sign in user with wrong email', () => {
  it('it should be POST sign in user with wrong email', (done) => {
    chai.request(server)
    .post('/user/signin')
    .send({
      'email': 'salah@email.com',
      'password': 'asdfghjkl'
    })
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})

describe('/POST || post sign in user with true username', () => {
  it('it should be POST sign in user with true username', (done) => {
    chai.request(server)
    .post('/user/signin')
    .send({
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

describe('/POST || post sign in user with wrong username', () => {
  it('it should be POST sign in user with wrong username', (done) => {
    chai.request(server)
    .post('/user/signin')
    .send({
      'username': 'salahusername',
      'password': 'asdhgdgdg'
    })
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})

// BLOG

describe('/GET || get all blog', () => {
  it('it should be GET all blog', (done) => {
    chai.request(server)
    .get('/blog')
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})

describe('/GET || get blog by slug', () => {
  it('it should be GET blog by slug', (done) => {
    chai.request(server)
    .get('/blog')
    .end((error, response) => {
      chai.request(server)
      .get('/blog/' + response.body[0].slug)
      .end((err, res) => {
        if(err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  })
}) // slug undefined

describe('/GET || get blog by id', () => {
  it('it should be GET blog by id', (done) => {
    chai.request(server)
    .get('/blog')
    .end((error, response) => {
      chai.request(server)
      .get('/blog/' + response.body[0]._id)
      .end((err, res) => {
        if(err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  })
}) // id undefined

describe('/POST || post blog with auth', () => {
  it('it should be POST blog with auth', (done) => {
    chai.request(server)
    .post('/blog/add')
    .attach('image', fs.readFileSync('image.jpg'), 'image.jpg')
    .field('title', 'ini title')
    .field('description', 'ini description')
    .set('token', token)
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  }).timeout(15000)
})

describe('/POST || post blog and no auth', () => {
  it('it should be POST blog and no auth', (done) => {
    chai.request(server)
    .post('/blog/add')
    .attach('image', fs.readFileSync('image.jpg'), 'image.jpg')
    .field('title', 'ini title')
    .field('description', 'ini description')
    .end((err, res) => {
      if(err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})