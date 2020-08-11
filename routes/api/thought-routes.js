const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');

// Set up GET all at /api/thoughts
router.route('/').get(getAllThoughts);

// /api/thoughts/:userId
router.route('/:userId').post(addThought);

// /api/thoughts/:userId/:thoughtId
router
  .route('/:userId/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .post(addReaction)
  .delete(removeThought);

// /api/thoughts/:userId/:thoughtId/reactions/:reactionId
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;