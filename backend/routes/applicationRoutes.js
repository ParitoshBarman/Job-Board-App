import express from 'express';
import {
    applyToJob,
    getMyApplications,
    getApplicationsForRecruiter,
    getAllApplications,
    updateApplicationStatus
} from '../controllers/applicationController.js';

import upload from '../middleware/uploadMiddleware.js';
import protect from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/:jobId', protect, upload.single('resume'), applyToJob);

router.get('/me', protect, getMyApplications);

router.get('/recruiter', protect, authorizeRoles('recruiter'), getApplicationsForRecruiter);

router.get('/admin', protect, authorizeRoles('admin'), getAllApplications);

router.patch('/:id/status', protect, authorizeRoles('admin', 'recruiter'), updateApplicationStatus);

export default router;