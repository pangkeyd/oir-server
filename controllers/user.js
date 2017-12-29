const user = require('../models/user')

class User {

  static getData(req, res){
    user.getUser(result => {
      res.send(result)
    })
  }

  static getUniqueEmail(req, res){
    user.uniqueEmail(req.params, (result) => {
      res.send(result)
    })
  }

  static getUniqueUsername(req, res){
    user.uniqueUsername(req.params, (result) => {
      res.send(result)
    })
  }

  static signUp(req, res){
    user.signUp(req.body, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
        console.log(auth)
      }
    })
  }

}

module.exports = User