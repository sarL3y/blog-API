const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('How to Blog', 'Blog post about how to blog', 'Tapper', 'March 9th, 2019');
BlogPosts.create('How to Blog Part 2', 'Second blog post about how to blog', 'Tapper', 'March 16th, 2019');

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'date'];

    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields;

        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }

    const post = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.date);

    res.status(201).send(message);
});

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);

    console.log(`Deleted shopping list item \`${req.params.ID}\``);

    res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['id', 'content'];

    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields;

        if(!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`

            console.error(message);

            return res.status(400).send(message);
        }
    }

    if (req.params.id !== req.body.id) {
        const message = (`Request path id (${req.params.id}) and request body id (${req.body.id}) must match`);
        
        console.error(message);

        return res.status(400).send(message);
    }

    console.log(`Updating shopping list item \`${req.parapms.id}\``);

    const updatedItem = BlogPosts.update({
        id: req.params.id,
        content: req.body.content
    });

    res.status(204).end();
});

module.exports = router;