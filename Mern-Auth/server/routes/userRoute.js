const express = require('express')
const router = express.Router()
const protect = require('../middlewares/authMiddlewares.js')
const { authUser, registerUser, getUserProfile, updateUserProfile, logoutUser } = require('../controllers/userController.js')

router.post('/auth', authUser)
router.post('/register', registerUser)
router.post('/logout', logoutUser)
router.get('/getUserProfile', getUserProfile)
router.put('/updateUserProfile', protect, updateUserProfile)

module.exports = router
