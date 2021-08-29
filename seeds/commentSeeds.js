const { Comment } = require('../models');

const commentSeed = [
    {
        user_id: 1,
        post_id: 5,
        comment_text: "Count fiddies!"
    },
    {
        user_id: 1,
        post_id: 4,
        comment_text: "Stay Silent!"
    },
    {
        user_id: 1,
        post_id: 4,
        comment_text: "Don't worry be Happy"
    },
    {
        user_id: 4,
        post_id: 5,
        comment_text: "Life is hard, Starburst is soft"
    },
    {
        user_id: 4,
        post_id: 3,
        comment_text: "We have the meats"
    },
    {
        user_id: 3,
        post_id: 4,
        comment_text: "Dont follow the loops"
    },
    {
        user_id: 5,
        post_id: 1,
        comment_text: "Code all day everyday"
    },
    {
        user_id: 2,
        post_id: 1,
        comment_text: "Why are you, you"
    }
]

const CommentSeed = () => Comment.bulkCreate(commentSeed);

module.exports = CommentSeed;