import express from 'express';
import * as controller from './recipes.control';
let router = express.Router();
// GET methods
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/reviews/:reviewId', controller.showReview);
// POST methods
router.post('/', controller.create);
router.post('/:id/reviews/', controller.createReview);
// PUT methods
router.put('/:id', controller.update);
router.put('/:id/reviews/:reviewId', controller.updateReview);
// DELETE methods
router.delete('/:id', controller.destroy);
router.delete('/:id/reviews/:reviewId', controller.destroyReview);
export {router};
