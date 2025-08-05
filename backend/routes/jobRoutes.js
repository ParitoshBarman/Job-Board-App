import express from 'express';
import {
    getJobs,
    createJob,
    updateJob,
    deleteJob
} from '../controllers/jobController.js';

import protect from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getJobs);
router.post('/', protect, authorizeRoles('admin', 'recruiter'), createJob);
router.put('/:id', protect, authorizeRoles('admin', 'recruiter'), updateJob);
router.delete('/:id', protect, authorizeRoles('admin', 'recruiter'), deleteJob);

export default router;