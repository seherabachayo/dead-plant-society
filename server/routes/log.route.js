import express from 'express';
import { createLog, getLogs } from '../controllers/logcontroller.js';

const router = express.Router();

// Route to create a new plant log
router.post('/', createLog);

// Route to get all plant logs
router.get('/', getLogs);

export default router; 