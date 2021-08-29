const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const Auth = require('../../utils/auth');

// Get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        order: [['created_at', 'DESC']],
        include: [

            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'twitter', 'github']
                }
            },
            {
                model: User,
                attributes: ['username', 'twitter', 'github']
            },
        ]
    })
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Locate post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: User,
                attributes: ['username', 'twitter', 'github']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'twitter', 'github']
                }
            }
        ]
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'Post not found with this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a post with data from body
router.post('/', Auth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update post using id
router.put('/:id', Auth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete post by passing params :id
router.delete('/:id', Auth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;