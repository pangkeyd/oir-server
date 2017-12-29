const user = require('../models/user')

class User {

  static getData(req, res){
    user.getUser(result => {
      res.send(result)
    })
  }

}

module.exports = User