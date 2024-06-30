const express = require('express');
const { authenticate, adminAuth } = require('../middlewares/auth');
const UserController  = require("../controller/user")

const router = express.Router();

// router.get('/profile', authenticate, (req, res) => {
//   res.json({ message: `Welcome ${req.user.username}`,auth: true });
// });

router.get('/profile', authenticate, UserController.getUser)
router.delete("/profile/:id",adminAuth ,UserController.deleteUser)


module.exports = router;