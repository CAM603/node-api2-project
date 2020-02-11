const express = require("express");

const Posts = require("./db");

const router = express.Router();

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Posts.findById(id)
        .then(post => {
            if(post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;

    Posts.findById(id)
        .then(post => {
            if(post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                Posts.findPostComments(id)
                    .then(comments => {
                        res.status(200).json(comments)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ error: "The comments information could not be retrieved." })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.post('/', (req, res) => {
    const postInfo = req.body;

    if(!postInfo.title || !postInfo.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.insert(req.body)
            .then(post => {
                res.status(201).json(postInfo)
            })
            .catch(err => {
                res.status(500).json({ 
                    error: "There was an error while saving the post to the database" })
            })
    }
})

// Needs checking
router.post('/:id/comments', (req, res) => {
    const commentInfo = req.body;
    const { id } = req.params;

    Posts.findById(id)
        .then(post => {
            if(post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else if (!commentInfo.text) {
                res.status(400).json({ errorMessage: "Please provide text for the comment." })
            } else {
                Posts.insertComment(req.body)
                    .then(comment => {
                        res.status(201).json(comment)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ error: "There was an error while saving the comment to the database" })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })

})

module.exports = router;