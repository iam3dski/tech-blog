const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage - Get all blog posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['comment_text', 'createdAt'], include: { model: User, attributes: ['username'] } }
      ],
      order: [['createdAt', 'DESC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve blog posts' });
  }
});

// Post - Get a specific blog post by ID
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: { model: User, attributes: ['username'] } }
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', { ...post, belongs_to_user: req.session.user_id === post.user_id, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve blog post' });
  }
});

// Edit - Render edit page for a specific blog post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }],
    });

    const post = postData.get({ plain: true });

    res.render('edit', { ...post, loggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve blog post' });
  }
});

// Dashboard - Get user's dashboard with their posts
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post, order: [['createdAt', 'DESC']] }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', { ...user, loggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve user dashboard' });
  }
});

// Login - Render login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// Signup - Render signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

// Logout - Destroy user session
router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
