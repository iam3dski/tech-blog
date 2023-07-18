const sequelize = require('../config/connection');
const { User, Post } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed users
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Get seeded users
  const users = await User.findAll();

  // Add user_id to each post in the postData
  const postsWithUserIds = postData.map((post) => {
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const { id: user_id } = users[randomUserIndex];
    return { ...post, user_id };
  });

  // Seed posts
  await Post.bulkCreate(postsWithUserIds);

  process.exit(0);
};

seedDatabase();