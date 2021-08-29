// Dependencies 
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const Auth = require('../../utils/auth');

// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'Line 43: User not found with this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Creating user from body 
router.post('/', async (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        twitter: req.body.twitter,
        github: req.body.github,
        password: req.body.password
    })
        .then(dbData => {
            req.session.save(() => {
                req.session.user_id = dbData.id;
                req.session.username = dbData.username;
                req.session.twitter = dbData.twitter;
                req.session.github = dbData.github;
                req.session.loggedIn = true;

                res.json(dbData);
            });
        });
});

// User login page by email entered in
router.post("/login", async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({ user: dbUserData.username, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Destroy session connection 
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(205).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// Update user using ID
router.put('/:id', Auth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbData => {
            if (!dbData[0]) {
                res.status(404).json({ message: 'Line 136: User found not with this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete user from DB by ID
router.delete('/:id', Auth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'Line: 156: User not found with this id' });
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