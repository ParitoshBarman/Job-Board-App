const express = require('express');
const {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobById
} = require('../controllers/jobController');

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', protect, getJobs);

router.get('/:id', getJobById);
router.post('/', protect, authorizeRoles('admin', 'recruiter'), createJob);
router.put('/:id', protect, authorizeRoles('admin', 'recruiter'), updateJob);
router.delete('/:id', protect, authorizeRoles('admin', 'recruiter'), deleteJob);


module.exports = router;