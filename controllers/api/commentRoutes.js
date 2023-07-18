const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const { withAuth } = require('../../utils/auth');

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = {
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    };

    const comment = await Comment.create(commentData);

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// Update a comment by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = {
      comment_text: req.body.comment_text,
    };

    const comment = await Comment.update(commentData, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (comment[0] === 0) {
      res.status(404).json({ error: 'Comment not found or you are not authorized to update it' });
    } else {
      res.status(200).json({ message: 'Comment updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// Delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!comment) {
      res.status(404).json({ error: 'Comment not found or you are not authorized to delete it' });
    } else {
      res.status(200).json({ message: 'Comment deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

module.exports = router;