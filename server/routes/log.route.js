import express from 'express';
import { createLog, getLogs, getLogsByUser } from '../controllers/logcontroller.js';

const router = express.Router();

// Route to create a new plant log
router.post('/', createLog);

// Route to get all plant logs
router.get('/', getLogs);

// Route to get logs by user ID
router.get('/user/:userId', getLogsByUser);

export default router; 