const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('How to Blog', 'Blog post about how to blog', 'Tapper', 'March 9th, 2019');

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

module.exports = router;