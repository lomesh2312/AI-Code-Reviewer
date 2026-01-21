import { Router } from 'express';
import { analyzeCode, getReviews, getReviewById } from '../controllers/review.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateUser);

router.post('/reviews', analyzeCode);
router.get('/reviews', getReviews);
router.get('/reviews/:id', getReviewById);

export default router;
