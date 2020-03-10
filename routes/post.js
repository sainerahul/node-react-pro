const express = require('express')
const { requireSignin } = require('../controllers/auth')
const {
    getPosts,
    createPost,
    postByUser,
    postById,
    isPoster,
    deletePost,
    updatePost,
    photo,
    singlePost,
    comment,
    uncomment
} = require('../controllers/post')
const { createPostValidator } = require('../validators/index')
const { userById } = require('../controllers/user')
const router = express.Router()
router.get("/posts", getPosts)

// // comments
router.put("/post/comment",requireSignin,comment);
router.put("/post/uncomment",requireSignin,uncomment);



router.post("/post/new/:userId", requireSignin, createPost, createPostValidator)
router.get("/post/by/:userId", requireSignin, postByUser)
router.get("/post/:postId",singlePost)
router.put("/post/:postId", requireSignin, isPoster, updatePost)
router.delete("/post/:postId", requireSignin, isPoster, deletePost)
router.get("/post/photo/:postId",photo)
// any route containing userId our app will first execute userById()
router.param("userId", userById)
// any route containing postId our app will first execute postById()
router.param("postId", postById)

module.exports = { router };