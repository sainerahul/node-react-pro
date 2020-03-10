const express = require('express')
const {signup,signin,signout,
    // forgotPassword,
    // resetPassword,
    // socialLogin
} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {userSignupValidator,passwordResetValidator } = require('../validators/index')
const router = express.Router()

// social media login
// router.post("/social-login", socialLogin); 
//forgot p/w
// router.put("/forgot-password", forgotPassword);
// router.put("/reset-password", passwordResetValidator, resetPassword);

router.post("/signup",userSignupValidator,signup)
router.post("/signin",signin)
router.get("/signout",signout)
// any route containing userId our app will first execute userById()
router.param("userId",userById)
module.exports={router};