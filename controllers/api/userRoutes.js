const router = require('express').Router();
const { User } = require('../../models');

// User sign up
router.post('/signup', async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };

    const user = await User.create(userData);

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.status(201).json(user);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

// User sign in
router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'Invalid username or password' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(404).json({ error: 'Invalid username or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.status(200).json({ message: 'Sign in successful' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

// User sign out
router.post('/signout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).json({ message: 'Sign out successful' });
    });
  } else {
    res.status(200).json({ message: 'No user to sign out' });
  }
});

module.exports = router;
