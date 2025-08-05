import express from 'express';
import { applyToJob } from '../controllers/applicationController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/:jobId', upload.single('resume'), applyToJob);

export default router;