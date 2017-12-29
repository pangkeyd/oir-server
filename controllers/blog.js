const blog = require('../models/blog')

class Blog {

  static auth(req, res, next){
    if(req.headers.token){
      return next()
    }
    let login = 'Login Dulu!'
    res.send(login)
    console.log(login)
  }

  static getData(req, res){
    blog.getBlog(result => {
      res.send(result)
    })
  }

  static getDataBySlug(req, res){
    blog.getBlogBySlug(req.params, (result) => {
      res.send(result)
    })
  }

  static getDataById(req, res){
    blog.getBlogById(req.params, (result) => {
      res.send(result)
    })
  }

  static postData(req, res){
    blog.postBlog(req.headers, req.body, req.file, (result, auth) => {
      if(result){
        res.send(result)
        console.log(result)
      }else{
        res.send(auth)
        console.log(auth)
      }
    })
  }

}

module.exports = Blog