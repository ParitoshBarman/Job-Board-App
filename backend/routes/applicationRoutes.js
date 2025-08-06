const express = require('express');
const {
    applyToJob,
    getMyApplications,
    getApplicationsForRecruiter,
    getAllApplications,
    updateApplicationStatus,
    getApplicationById
} = require('../controllers/applicationController');

const upload = require('../middleware/uploadMiddleware');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/:jobId', protect, upload.single('resume'), applyToJob);

router.get('/me', protect, getMyApplications);

router.get('/recruiter', protect, authorizeRoles('recruiter'), getApplicationsForRecruiter);

router.get('/admin', protect, authorizeRoles('admin'), getAllApplications);

router.patch('/:id/status', protect, authorizeRoles('admin', 'recruiter'), updateApplicationStatus);

router.get('/:id', protect, authorizeRoles('admin', 'recruiter', 'job_seeker'), getApplicationById);

module.exports = router;