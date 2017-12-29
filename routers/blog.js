const express = require('express')
const router = express.Router()
const Blog = require('../controllers/blog')
const images = require('../lib/images')

router.get('/', Blog.getData)

router.get('/:slug', Blog.getDataBySlug)

router.get('/:id', Blog.getDataById)

router.post('/add', Blog.auth, images.multer.single('image'), images.sendUploadToGCS, Blog.postData, 
(req, res, next) => {
  let data = req.bodys

  if(req.file && req.file.cloudStoragePublicUrl){
    data.imageUrl = req.file.cloudStoragePublicUrl
  }
})

module.exports = router