const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

let blog = new Schema({
  title: {
    type: String,
    index: true,
    unique: true
  },
  date: String,
  author: String,
  description: String,
  image: String,
  slug: String,
  like: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User_oir'
  }],
  dislike: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User_oir'
  }]
})

let Blog = mongoose.model('Blog_oir', blog)

let getBlog = (cb) => {
  Blog.find({}, (err, blog) => {
    if(err) res.status(500).send(err)
    cb(blog)
  })
}

let getBlogBySlug = (params, cb) => {
  Blog.find({
    slug: params.slug
  }, (err, user) => {
    if(err) res.status(500).send(err)
    cb(user)
  })
}

let getBlogById = (params, cb) => {
  Blog.find({
    _id: params.id
  }, (err, user) => {
    if(err) res.status(500).send(err)
    cb(user)
  })
}

let postBlog = (head, body, file, cb) => {
  let token = head.token
  let decoded = jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
    if(decode){
      let title = body.title
      let d = new Date()
      let date = d.toDateString()
      let slug = title.split(' ').join('-')
      let blogSchema = new Blog({
        title: title,
        date: date,
        author: decode.username,
        description: body.description,
        image: file.cloudStoragePublicUrl,
        slug: slug
      })
      blogSchema.save((err, blog) => {
        if(!err){
          cb(blog, null)
        }else if(err){
          if(err.message.indexOf('title_1') !== -1){
            let errorTitle = `Title '${title}' already used!`
            cb(null, errorTitle)
          }
        }
      })
    }
  })
}

module.exports = {
  getBlog,
  getBlogBySlug,
  getBlogById,
  postBlog
}