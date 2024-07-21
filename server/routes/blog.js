const express = require("express")
const router = express.Router()
const blogController = require("../controller/blog")
const {authenticate} = require("../middlewares/auth")

router.post('/', authenticate, blogController.createBlog)
router.get('/', authenticate, blogController.getBlogs)

module.exports = router