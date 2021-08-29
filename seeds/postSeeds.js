const { Post } = require('../models');

const postSeed = [
    {
        title: "I love candy",
        post_content: "I need to devour the candy supply",
        user_id: 1
    },
    {
        title: "Biscuits",
        post_content: "Gravy is needed for saucey time",
        user_id: 2
    },
    {
        title: "I love helping people",
        post_content: "Pray everyday",
        user_id: 3

    },
    {
        title: "I am shy",
        post_content: "I can't speak to large groups",
        user_id: 4
    },
    {
        title: "Jumping Jacks",
        post_content: "I stay fit by jumping 50 times a day",
        user_id: 5
    }
]

const PostSeed = () => Post.bulkCreate(postSeed);

module.exports = PostSeed;