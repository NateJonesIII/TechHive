// Dependencies
const seedPosts = require('./postSeeds');
const seedUsers = require('./userSeeds');
const seedComments = require('./commentSeeds');
//Use sequelize to update DB
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('DB Synced \n');

    await seedUsers();
    console.log('Users seed successful \n');

    await seedPosts();
    console.log('Posts seed successful \n');

    await seedComments();
    console.log('Comments seed successful \n');

    process.exit(0);
};

seedAll();