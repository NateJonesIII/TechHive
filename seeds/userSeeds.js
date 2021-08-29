const { User } = require('../models');

const userSeed = [
    {
        username: "superMan",
        twitter: "manOfSteel",
        github: "steelIO",
        email: "DcSups@yahoo.com",
        password: "p@ssword1"
    },
    {
        username: "queenB",
        twitter: "queenB",
        github: "queenB",
        email: "queenB11@gmail.com",
        password: "Password1234"
    },
    {
        username: "smiles",
        twitter: "smilecon",
        github: "shuany",
        email: "smiles@gmail.com",
        password: "password!!"
    },
    {
        username: "sparkey",
        twitter: "ssparken",
        github: "sparky",
        email: "sparkxn@live.com",
        password: "teehrv34"
    },
    {
        username: "tweekney",
        twitter: "spatula",
        github: "eggsLord",
        email: "saltyJeez@gmail.com",
        password: "p@ssword5673"
    },
    {
        username: "Trance",
        twitter: "hypmoeszd",
        github: "megSPsy",
        email: "spsi@gmail.com",
        password: "p#ssword056"
    }
]

const UserSeed = () => User.bulkCreate(userSeed);

module.exports = UserSeed;