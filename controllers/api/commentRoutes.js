// Dependencies
const router = require('express').Router();
const { Comment } = require('../../models');
const Auth = require('../../utils/auth');

//get all
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Retrieve post from body
router.post('/', Auth, (req, res) => {
    // check the session
    if (req.session) {
        Comment.create({
            //Retrieve comment and post ID from page
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            // Retrieve logged in session id
            user_id: req.session.user_id,
        })
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// Delete comment by id
router.delete('/:id', Auth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'Comment not found using this id' });
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