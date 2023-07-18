const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const { withAuth } = require('../../utils/auth');

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const postData = {
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    };

    const post = await Post.create(postData);

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Update a blog post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = {
      title: req.body.title,
      content: req.body.content,
    };

    const post = await Post.update(postData, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (post[0] === 0) {
      res.status(404).json({ error: 'Blog post not found or you are not authorized to update it' });
    } else {
      res.status(200).json({ message: 'Blog post updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Delete a blog post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!post) {
      res.status(404).json({ error: 'Blog post not found or you are not authorized to delete it' });
    } else {
      res.status(200).json({ message: 'Blog post deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

module.exports = router;