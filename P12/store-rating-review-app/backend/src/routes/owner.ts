import express from 'express';
import { getOwnerDashboard } from '../controllers/ownerController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get store owner's dashboard
router.get('/dashboard', authenticate, getOwnerDashboard);

export default router;