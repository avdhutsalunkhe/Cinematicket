import express from 'express';
import { addUser, addStore, getDashboardData, getUsersList, getStoresList } from '../controllers/adminController';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// Admin routes
router.post('/add-user', authMiddleware, addUser);
router.post('/add-store', authMiddleware, addStore);
router.get('/dashboard', authMiddleware, getDashboardData);
router.get('/users', authMiddleware, getUsersList);
router.get('/stores', authMiddleware, getStoresList);

export default router;