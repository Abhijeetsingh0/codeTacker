const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog");
const { authenticate } = require("../middlewares/auth");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploads = multer({ storage });

router.post('/', authenticate, uploads.array('images', 5), blogController.createBlog);
router.get('/', authenticate, blogController.getBlogs);
router.get('/:id', authenticate, blogController.getBlogById);

module.exports = router;