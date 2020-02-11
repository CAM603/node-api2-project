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

module.exports = router;