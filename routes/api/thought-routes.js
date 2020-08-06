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
//router
  //.route('/:userId/:thoughtId')
  //.get(getThoughtById)
  //.put(updateThought)
  //.delete(removeThought)

// /api/thoughts/:thoughtId/reactions or should it be /api/thoughts/:userId/:thoughtId?
router
  .route('/:userId/:thoughtId') // should this be /:thoughtId/reactions?
  .get(getThoughtById)
  .post(addReaction)
  .put(updateThought)
  .delete(removeThought);

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;